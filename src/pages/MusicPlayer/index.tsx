import React from 'react';
import { Window } from '../../layouts/Window';

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
            path: 'http://playerservices.streamtheworld.com/api/livestream-redirect/KINK.mp3',
            duration: 100,
            mediaMetadata: {
                artist: 'Left Coast 70s: Mellow album rock from the Seventies. Yacht friendly.',
                artwork: null,
            },
        },
    ],
};
Player.setPlaylist(playlist);

const MusicPlayer: React.VFC = () => {
    const [selectedTrack, setSelectedTrack] = React.useState<Track>(null);

    React.useEffect(() => {
        Player.playlist.path != playlist.path && Player.setPlaylist(playlist);
        const id = Player.subscribe('track-start', (_ev) => {
            setSelectedTrack((x) => {
                if (x?.path === Player?.state?.track?.track?.path) {
                    return x;
                }
                return Player.playlist.tracks.find((x) => x.path === Player.state.track.track.path);
            });
        });
        return () => {
            Player.unsubscribe(id);
        };
    }, []);

    const playTrack = React.useCallback(async (track: Track) => {
        const result = await Player.play({
            trackNumber: Player.playlist.tracks.findIndex((x) => x.path === track.path),
            relative: false,
        });
        if (result) {
            setSelectedTrack(track);
        }
    }, []);

    return (
        <Window title="player" className="music-player">
            <ControlPanel />
            <Playlist setSelectedTrack={playTrack} selectedTrack={selectedTrack} tracks={playlist.tracks} />
        </Window>
    );
};

export default MusicPlayer;
