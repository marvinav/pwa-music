import { nanoid } from 'nanoid';

export type Track = IcyCastTrack | Mp3Track;

export type Events = 'mode-changed' | 'playlist-changed' | 'track-start' | 'track-end';
export interface BaseTrack {
    /**
     * Absolute file to path
     */
    path: string;

    /**
     * Total duration of file.
     */
    duration?: number;

    /**
     * Media Metadata
     */
    mediaMetadata: MediaMetadata;

    /**
     * Flag if it can be recorder
     */
    recordable: boolean;
}

export interface Mp3Track extends BaseTrack {
    mimeType: 'mp3';
    recordable: false;
}

export interface IcyCastTrack extends BaseTrack {
    mimeType: 'icy-cast';
    recordable: true;
}

export interface Playlist {
    name: string;
    path: string;
    tracks: Track[];
}

export interface TrackProcessor<T extends Track> {
    type: T['mimeType'];
    play: (context: AudioContext, track: T, onEnd?: () => Promise<void>) => Promise<void>;
    stop: () => Promise<void>;
    pause: () => Promise<void>;
}

/**
 * @class AudioPlayer
 */
export class AudioPlayer {
    private _mode: AudioPlayer['mode'] = 'none';
    private _defaultContext = new AudioContext();
    private _playlist: Playlist;
    private readonly _processors: Record<Track['mimeType'], TrackProcessor<Track>> | Record<string, never>;
    private _subscriptions: {
        [key: string]: Map<string, () => Promise<void>>;
    } = {
        'playlist-changed': new Map(),
        'track-end': new Map(),
        'track-start': new Map(),
        'mode-changed': new Map(),
    };

    private _currenTrack: {
        trackNumber: number;
        track: Track;
        position: number;
    };

    private _state: 'play' | 'stop' | 'pause';

    constructor(processors?: AudioPlayer['_processors']) {
        this._processors = processors ?? {};
    }

    /**
     * Playlist track change mode
     */
    get mode(): 'loop' | 'loop-one' | 'none' {
        return this._mode;
    }

    /**
     * Get music player playlist
     */
    get playlist(): Playlist {
        return this._playlist;
    }

    /**
     * Get player current state
     * @returns Player state
     */
    get currentState(): {
        trackNumber?: number;
        track?: Track;
        position?: number;
        state: 'play' | 'stop' | 'pause';
    } {
        return {
            state: this._state,
            trackNumber: this._currenTrack?.trackNumber,
            track: this._currenTrack?.track,
            position: this._currenTrack.position,
        };
    }

    setMode(mode: AudioPlayer['mode']): void {
        this._mode = mode;
        this.notify('mode-changed');
    }

    addProcessor(processor: TrackProcessor<Track>): void {
        this._processors[processor.type] = processor;
    }

    removeProcessor(mimeType: string): void {
        delete this._processors[mimeType];
    }

    /**
     * Set new playlist
     * If new playlist has different path or does not container current track, when will be call {@link AudioPlayer#stop}.
     *
     * @param playlist Playlist
     */
    setPlaylist = async (playlist: Playlist): Promise<void> => {
        const currentTrack = playlist?.tracks?.findIndex((x) => {
            x.path === this._currenTrack?.track?.path;
        });

        if (playlist.path !== this._playlist?.path || currentTrack < 0) {
            await this.resetState();
        }

        if (currentTrack > -1) {
            this._currenTrack.trackNumber = currentTrack;
        }

        this._playlist = playlist;
        this.notify('playlist-changed');
    };

    /**
     * Play selected track. After track end will be call next track in playlist.
     * @param track Track option
     * @param track.relative If it is true, when playlist mode will be respected
     * @param track.trackNumber If relative, when trackNumber is shift relative to current track.
     * @returns Selected track.
     * - If mode is not respected and index of track is out of range, when {@link AudioPlayer.stop stop} will be called.
     * - If mode is `none`, respected and positive out of range, when will be called {@link AudioPlayer.stop stop}
     * - If mode is `none`, respected and negative out of range, when first track in playlist will be selected.
     * - If mode is respected and {@link AudioPlayer#currentState.track} equal `null`, when first track in playlist will be selected.
     */
    play = async (track: { trackNumber: number; relative: boolean }): Promise<Track> => {
        let _track: Track;
        let trackNumber: number = track.trackNumber;
        if (!track.relative) {
            _track = this._playlist.tracks[track.trackNumber];
        } else {
            trackNumber = this._currenTrack ? this.getNextTrack(this._currenTrack.trackNumber, track.trackNumber) : 0;
            console.log({ trackNumber });
            _track = this._playlist.tracks[trackNumber];
        }

        if (!_track) {
            await this.stop();
            return null;
        }

        this._currenTrack = { track: _track, position: 0, trackNumber };

        const preprocessor = this._processors[_track.mimeType];

        if (!preprocessor) {
            throw new Error('Preprocessor is not found');
        }

        await this._processors[_track.mimeType].play(this._defaultContext, _track, async () => {
            this._currenTrack = null;
            this.notify('track-end');
            await this.play({ trackNumber: 1, relative: true });
        });

        this.notify('track-start');

        return _track;
    };

    stop = async (): Promise<void> => {
        this._state = 'stop';

        if (this._currenTrack) {
            await this._processors[this._currenTrack.track.mimeType].stop();
            this._currenTrack = null;
            this.notify('track-end');
        }
    };

    pause = (): void => {
        if (this._currenTrack) {
            this._processors[this._currenTrack.track.mimeType].pause();
        }
    };

    getMetadata = (trackNumber: number): Track => {
        return this._playlist.tracks[trackNumber];
    };

    subscribe = (event: Events, action: () => Promise<void>, id?: string): string => {
        const _id = id ?? nanoid();
        this._subscriptions[event].set(_id, action);
        return _id;
    };

    unsubscribe = (event: Events, subscriptionId: string): void => {
        this._subscriptions[event].delete(subscriptionId);
    };

    /**
     * Reset audio player state
     */
    private resetState = async () => {
        this._state = 'stop';
        this._currenTrack = null;
    };

    /**
     * Notify subscribers about event
     */
    private notify = (event: Events) => {
        this._subscriptions[event]?.forEach((action) => {
            action();
        });
    };

    /**
     * Get next track in queue
     */
    private getNextTrack(trackNumber: number, step = 1) {
        if (this.mode === 'loop') {
            return this._playlist.tracks.length > trackNumber + step ? trackNumber + step : 0;
        }
        if (this.mode === 'loop-one') {
            return trackNumber;
        }
        if (this.mode === 'none') {
            return this._playlist.tracks.length > trackNumber + step ? trackNumber + step : null;
        }
    }
}
