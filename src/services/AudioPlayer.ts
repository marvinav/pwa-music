import { nanoid } from 'nanoid';

export type Track = IcyCastTrack | Mp3Track;

export interface BaseTrack {
    path: string;
    duration: number;
    mediaMetadata: MediaMetadata;
    recordable: boolean;
}

export interface Mp3Track extends BaseTrack {
    mimeType: 'mp3';
    type: 'file';
    recordable: false;
}

export interface IcyCastTrack extends BaseTrack {
    mimeType: 'icy-cast';
    type: 'url';
    recordable: true;
}

export interface Playlist {
    name: string;
    path: string;
    tracks: Track[];
}

export abstract class IAudioPlayer {
    /**
     * Playlist track change mode
     */
    mode: 'loop' | 'loop-one' | 'none' = 'none';

    /**
     * Get music player playlist
     */
    getPlaylist: () => Playlist;

    /**
     * Set music player playlist
     */
    setPlaylist: (playlist: Playlist) => Promise<void>;

    /**
     * Play track
     * @param track Number of track to play. Default 0.
     * @returns Track metadata
     */
    play: (track: { trackNumber: number; relative: boolean }) => Promise<Track>;

    /**
     * Stop
     */
    stop: () => void;

    /**
     * Pause
     */
    pause: () => void;

    /**
     * Get file metadata by tracknumber
     * @returns Track metadata
     */
    getMetadata: (trackNumber: number) => Promise<Track>;

    /**
     * Get player current state
     * @returns Player state
     */
    getCurrentState: () => {
        trackNumber?: number;
        track?: Track;
        position?: number;
        state: 'play' | 'stop' | 'pause';
    };

    /**
     * Subscribe to playlist event
     * @returns subscription id
     */
    subscribe: (
        event: 'playlist-changed' | 'track-start' | 'track-end',
        action: () => Promise<void>,
        id?: string,
    ) => string;

    /**
     * Unsubscribe from playlist event
     */
    unsubscribe: (event: 'playlist-changed' | 'track-start' | 'track-end', subscriptionId: string) => void;
}

export interface TrackProcessor<T extends Track> {
    type: T['mimeType'];
    play: (context: AudioContext, track: T, onEnd?: () => void) => Promise<void>;
    stop: () => Promise<void>;
    pause: () => Promise<void>;
}

export class AudioPlayer extends IAudioPlayer {
    mode: IAudioPlayer['mode'] = 'none';

    private _defaultContext = new AudioContext();
    private _playlist: Playlist;
    private _processors: Record<Track['mimeType'], TrackProcessor<Track>>;
    private _subscriptions: {
        [key: string]: Map<string, () => Promise<void>>;
    } = {
        'playlist-changed': new Map(),
        'track-end': new Map(),
        'track-start': new Map(),
    };

    private _currenTrack: {
        trackNumber: number;
        track: Track;
        position: number;
    };

    private _state: 'play' | 'stop' | 'pause';

    constructor(processors: AudioPlayer['_processors']) {
        super();
        this._processors = processors;
    }

    getPlaylist = (): Playlist => {
        return this._playlist;
    };

    setPlaylist = async (playlist: Playlist): Promise<void> => {
        const currentTrack = playlist.tracks.findIndex((x) => {
            x.path === this._currenTrack.track.path;
        });
        if (playlist.name !== this._playlist.name || currentTrack < 0) {
            await this.resetState();
        }

        if (currentTrack > -1) {
            this._currenTrack.trackNumber = currentTrack;
        }

        this._playlist = playlist;
        this.notify('playlist-changed');
    };

    play = async (track: { trackNumber: number; relative: boolean }): Promise<Track> => {
        let _track: Track;
        if (!track.relative) {
            _track = this._playlist[track.trackNumber];
        } else {
            const position = this._currenTrack?.trackNumber ? this._currenTrack?.trackNumber + track.trackNumber : 0;
            _track = this._playlist[position];
        }

        await this._processors[_track.mimeType].play(this._defaultContext, _track, () => {
            this.notify('track-end');
            this.play({ trackNumber: track.trackNumber + 1, relative: false });
        });

        this.notify('track-start');
        return _track;
    };

    stop: () => void;
    pause: () => void;

    getMetadata = (trackNumber: number): Promise<Track> => {
        return this._playlist[trackNumber];
    };

    getCurrentState = (): {
        trackNumber?: number;
        track?: Track;
        position?: number;
        state: 'play' | 'stop' | 'pause';
    } => {
        return {
            state: this._state,
            trackNumber: this._currenTrack?.trackNumber,
            track: this._currenTrack?.track,
            position: this._currenTrack.position,
        };
    };

    subscribe = (
        event: 'playlist-changed' | 'track-start' | 'track-end',
        action: () => Promise<void>,
        id?: string,
    ): string => {
        const _id = id ?? nanoid();
        this._subscriptions[event].set(_id, action);
        return _id;
    };

    unsubscribe = (event: 'playlist-changed' | 'track-start' | 'track-end', subscriptionId: string): void => {
        this._subscriptions[event].delete(subscriptionId);
    };

    /**
     * Reset audio player state
     */
    private resetState = async () => {
        this._state = 'stop';
        this._currenTrack = null;
        this.notify('track-end');
    };

    /**
     * Notify subscribers about event
     */
    private notify = (event: 'playlist-changed' | 'track-start' | 'track-end') => {
        this._subscriptions[event].forEach((action) => {
            action();
        });
    };

    /**
     * Get next track in queue
     */
    private getNextTrack(trackNumber: number) {
        if (this.mode === 'loop') {
            return this._playlist.tracks.length > trackNumber + 1 ? trackNumber + 1 : 0;
        }
        if (this.mode === 'loop-one') {
            return trackNumber;
        }
        if (this.mode === 'none') {
            return this._playlist.tracks.length > trackNumber + 1 ? trackNumber + 1 : null;
        }
    }
}
