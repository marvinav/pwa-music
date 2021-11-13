import { AudioPlayer as AudioPlayerImplementation } from '.';

export type AudioPlayer = AudioPlayerImplementation;

export type Track = IcyCastTrack | Mp3Track;

export type Events = 'mode-changed' | 'playlist-changed' | 'track-start' | 'track-end' | 'state-changed';

export type WithoutOptionEvent = null;

export type ModeChangedEvent = AudioPlayer['_mode'];

export type StateChangedEvent = AudioPlayer['_state'];

export type GetEventOption<T extends Events> = T extends 'state-changed'
    ? StateChangedEvent
    : T extends 'mode-changed'
    ? ModeChangedEvent
    : null;

export type EventHandler<T extends Events> = (ev: T, option: GetEventOption<T>) => Promise<void> | void;

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
