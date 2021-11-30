import { Playlist } from '../types';

export function isSamePlaylist(origin: Playlist, target: Playlist) {
    return origin.path === target.path && origin.updatedAt === target.updatedAt;
}
