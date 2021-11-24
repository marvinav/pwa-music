import { nanoid } from 'nanoid';
import { EventHandler, Events, GetEventOption, Playlist, Track, TrackProcessor } from './types';

/**
 * @class AudioPlayer
 */
export class AudioPlayer {
    private _mode: AudioPlayer['mode'] = 'none';
    private _defaultContext = new AudioContext();
    private _playlist: Playlist;
    private readonly _processors: Record<Track['mimeType'], TrackProcessor<Track>> | Record<string, never>;

    private _subscriptions: {
        [key in Events | 'all']: Map<string, EventHandler<key extends Events ? key : Events>>;
    } = {
        'playlist-changed': new Map(),
        'track-end': new Map(),
        'track-start': new Map(),
        'mode-changed': new Map(),
        'state-changed': new Map(),
        all: new Map(),
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
    get state(): {
        track: AudioPlayer['_currenTrack'];
        state: 'play' | 'stop' | 'pause';
    } {
        return {
            state: this._state,
            track: this._currenTrack,
        };
    }

    setMode(mode: AudioPlayer['mode']): void {
        if (mode != 'none') {
            throw new Error(`${mode} not implemented`);
        }
        this._mode = mode;
        this.notify('mode-changed', mode);
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
            await this.stop();
        }

        if (currentTrack > -1) {
            this._currenTrack.trackNumber = currentTrack;
        }

        this._playlist = playlist;
        this.notify('playlist-changed', undefined);
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
     * - If mode is respected and {@link AudioPlayer#state.track} equal `null`, when first track in playlist will be selected.
     */
    play = async (track: { trackNumber: number; relative: boolean }): Promise<Track> => {
        let _track: Track;
        let trackNumber: number = track.trackNumber;
        if (!track.relative) {
            _track = this._playlist.tracks[track.trackNumber];
        } else {
            trackNumber = this._currenTrack ? this.getNextTrack(this._currenTrack.trackNumber, track.trackNumber) : 0;
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
            this.notify('track-end', null);
            await this.play({ trackNumber: 1, relative: true });
        });

        if (this._state != 'play') {
            this._state = 'play';
            this.notify('state-changed', 'play');
        }

        this.notify('track-start', null);
        return _track;
    };

    stop = async (): Promise<void> => {
        if (this._currenTrack) {
            await this._processors[this._currenTrack.track.mimeType].stop();
            this._currenTrack = null;
        }
        if (this._state != 'stop') {
            this._state = 'stop';
            this.notify('state-changed', this._state);
        }
    };

    pause = async (): Promise<void> => {
        if (this._currenTrack) {
            await this._processors[this._currenTrack.track.mimeType].pause();
        }
        if (this._state != 'pause') {
            this._state = 'pause';
            this.notify('state-changed', 'pause');
        }
    };

    getMetadata = (trackNumber: number): Track => {
        return this._playlist.tracks[trackNumber];
    };

    /**
     * Subscribe to playlist events
     * @param event Type of event to subscribe
     * @param eventHandler Callback then subscription fired
     * @param id Custom subscription id. If not set, random id will be generated
     * @returns Return subscription id
     */
    subscribe = <T extends Events | 'all'>(
        ev: T,
        eventHandler: T extends Events ? EventHandler<T> : EventHandler<Events>,
        id?: string,
    ): string => {
        const _id = id ?? nanoid();
        this._subscriptions[ev].set(_id, eventHandler);
        return _id;
    };

    /**
     * @param ev If missed, than remove subscription from all events
     * @returns number of delted subscriptions
     */
    unsubscribe = (subscriptionId: string, ev?: Events | 'all'): number => {
        if (ev) {
            return this._subscriptions[ev].delete(subscriptionId) ? 1 : 0;
        }
        let deletedSubscriptions = 0;
        for (const event in Object.getOwnPropertyNames(this._subscriptions)) {
            this._subscriptions[event as Events].delete(subscriptionId) && deletedSubscriptions++;
        }
        return deletedSubscriptions;
    };

    /**
     * Notify subscribers about event
     */
    private notify = <T extends Events>(event: T, option: GetEventOption<T>) => {
        this._subscriptions['all']?.forEach((action) => {
            action(event, option);
        });
        this._subscriptions[event]?.forEach((action) => {
            action(event, option);
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
