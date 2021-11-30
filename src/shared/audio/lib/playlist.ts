import { AudioPlayer, Track } from '../types';

export class Playlist {
    private _path: string;
    private _name: string;
    private _tracks: Track[];
    private _updatedAt: Date;
    private _player: AudioPlayer;

    constructor(path: string, name: string, tracks: Track[], updatedAt?: Date) {
        this._path = path;
        this._name = name;
        this._tracks = tracks;
        this._updatedAt = updatedAt;
    }

    bindPlayer(player: AudioPlayer) {
        this._player = player;
    }

    addTrack(track: Track, order?: number) {
        if (order) {
            this._tracks = [...this._tracks.slice(0, order), track, ...this._tracks.slice(order)];
        } else {
            this._tracks.push(track);
        }
    }

    removeTrack(trackOrder: number) {
        this._tracks = [...this._tracks.slice(0, trackOrder), ...this._tracks.slice(trackOrder + 1)];
    }

    compare(playlist: Playlist) {
        return playlist === this ?? (playlist._path === this._path && playlist._updatedAt === this._updatedAt);
    }
}
