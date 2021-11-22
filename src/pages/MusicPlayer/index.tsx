import React from 'react';
import { Window } from '../../layouts/Window';
import './index.scss';

import { Playlist as PlaylistType, Track } from '../../services/AudioPlayer/types';
import { Player } from '../../services/AudioPlayer';
import { Playlist } from './components/Playlist';
import { ControlPanel } from './components/ControlPanel';

const playlist: PlaylistType = {
    name: 'Only radio',
    path: 'cache',
    tracks: [
        {
            recordable: true,
            mimeType: 'icy-cast',
            path: 'http://radio.plaza.one/mp3_96',
            mediaMetadata: { album: '', artist: 'Radio Plaza', artwork: null, title: 'Nightwave Plaza' },
        },
        {
            recordable: true,
            mimeType: 'icy-cast',
            path: 'http://radio.plaza.one/mp3_916',
            duration: 100,
            mediaMetadata: {
                album: '',
                artist: 'Left Coast 70s: Mellow album rock from the Seventies. Yacht friendly.',
                artwork: null,
                title: 'Mellow album  Mellow album  Mellow album  Mellow album  Mellow album ',
            },
        },
    ],
};
Player.setPlaylist(playlist);

const MusicPlayer: React.VFC = () => {
    const [selectedTrack, setSelectedTrack] = React.useState<Track>(null);

    return (
        <Window title="player" className="music-player">
            <ControlPanel />
            <Playlist setSelectedTrack={setSelectedTrack} selectedTrack={selectedTrack} tracks={playlist.tracks} />
        </Window>
    );
};

export default MusicPlayer;
