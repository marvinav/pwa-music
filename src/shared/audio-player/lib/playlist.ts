import { AudioPlayer, IPlaylist, ITrack } from '../types';

import { cloneTrack } from './track';

export class Playlist {
    private _path: string;
    private _name: string;
    private _tracks: ITrack[];
    private _updatedAt: Date;
    private _notify: AudioPlayer['notify'];

    constructor(path: string, name: string, tracks: ITrack[], updatedAt?: Date) {
        this._path = path;
        this._name = name;
        this._tracks = tracks.map((t) => cloneTrack(t));
        this._updatedAt = updatedAt;
    }

    get path() {
        return this._path;
    }

    get name() {
        return this._name;
    }

    get tracks() {
        return this._tracks.map((t) => cloneTrack(t));
    }

    get updatedAt() {
        return this._updatedAt;
    }

    bindPlayer(notify: AudioPlayer['notify']) {
        this._notify = notify;
        this._notify('playlist-changed');
    }

    //TODO: should notify player on tracks changed
    addTrack(track: ITrack, order?: number) {
        if (order) {
            this._tracks = [...this._tracks.slice(0, order), track, ...this._tracks.slice(order)];
        } else {
            this._tracks.push(track);
        }
    }

    removeTrack(trackOrder: number) {
        this._tracks = [...this._tracks.slice(0, trackOrder), ...this._tracks.slice(trackOrder + 1)];
    }

    static isSame(target: Playlist | IPlaylist, origin: Playlist | IPlaylist) {
        if (!target || !origin) {
            return false;
        }
        return target === origin;
    }
}
