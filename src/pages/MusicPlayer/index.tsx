import React from 'react';

import { Window } from 'shared/ui/layouts/Window';
import { BottomBar } from 'shared/ui/layouts/Window/BottomBar';
import { Content } from 'shared/ui/layouts/Window/Content';
import { SvgIcon } from 'shared/ui/components/SvgIcon';

import { Player } from 'entities/audio';
import { Playlist as PlaylistType, Track } from 'entities/audio/types';

import { Playlist } from './ui/Playlist';
import { ControlPanel } from './ui/ControlPanel';

import addSong from 'static/assets/player/add-playlist-solid.svg?raw';
import { Visualization } from './ui/Visualization';

const playlist: PlaylistType = {
    name: 'Only radio',
    path: 'cache',
    tracks: [
        {
            recordable: true,
            mimeType: 'icy-cast',
            path: 'https://radio.plaza.one/mp3_96',
            mediaMetadata: { album: '', artist: 'Radio Plaza', artwork: null, title: 'Nightwave Plaza' },
        },
        {
            recordable: true,
            mimeType: 'icy-cast',
            path: 'https://playerservices.streamtheworld.com/api/livestream-redirect/KINK.mp3',
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
    const [selectedPlaylist, setSelectedPlaylist] = React.useState(playlist);

    React.useEffect(() => {
        Player.playlist.path != selectedPlaylist.path && Player.setPlaylist(playlist);
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
    }, [selectedPlaylist]);

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
            <Content>
                <ControlPanel selectedTrack={selectedTrack} />
                <Playlist setSelectedTrack={playTrack} selectedTrack={selectedTrack} tracks={playlist.tracks} />
                <Visualization />
            </Content>
            <BottomBar>
                <SvgIcon
                    src={addSong}
                    onClick={() => {
                        selectedPlaylist.tracks.push({
                            recordable: true,
                            mimeType: 'icy-cast',
                            path: 'http://stream-dc1.radioparadise.com/rp_192m.ogg',
                            duration: 100,
                            mediaMetadata: {
                                artist: 'OGG',
                                artwork: null,
                            },
                        });
                        selectedPlaylist.tracks = [...selectedPlaylist.tracks];
                        setSelectedPlaylist({ ...selectedPlaylist });
                    }}
                ></SvgIcon>
            </BottomBar>
        </Window>
    );
};

export default MusicPlayer;
