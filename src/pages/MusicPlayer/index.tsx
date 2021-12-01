import React from 'react';

import { Playlist } from 'shared/audio-player';
import { IPlaylist, ITrack } from 'shared/audio-player/types';
import { Player } from 'shared/player';
import { SvgIcon, Window, BottomBar, Content } from 'shared/ui';
import addSong from 'static/assets/player/add-playlist-solid.svg?raw';

import { ControlPanel } from './ui/ControlPanel';
import { Playlist as PlaylistPanel } from './ui/Playlist';
import { Visualization } from './ui/Visualization';

const playlist: IPlaylist = {
    name: 'Only radio',
    path: 'cache',
    updatedAt: new Date(),
    tracks: [
        {
            recordable: true,
            mimeType: 'icy-cast',
            path: 'https://radio.plaza.one/mp3_96',
            mediaMetadata: { album: '', artist: 'Radio Plaza', title: 'Nightwave Plaza' },
        },
        {
            recordable: true,
            mimeType: 'icy-cast',
            path: 'https://playerservices.streamtheworld.com/api/livestream-redirect/KINK.mp3',
            duration: 100,
            mediaMetadata: {
                artist: 'Left Coast 70s: Mellow album rock from the Seventies. Yacht friendly.',
            },
        },
    ],
};
Player.setPlaylist(playlist);

const MusicPlayer: React.VFC = () => {
    const [selectedTrack, setSelectedTrack] = React.useState<ITrack>();
    const [selectedPlaylist, setSelectedPlaylist] = React.useState(Player.playlist);

    React.useEffect(() => {
        const id = Player.subscribe('playlist-changed', () => {
            setSelectedPlaylist(Player.playlist);
        });
        return () => {
            Player.unsubscribe(id);
        };
    }, []);

    React.useEffect(() => {
        !Playlist.isSame(Player.playlist, selectedPlaylist) && Player.setPlaylist(selectedPlaylist);
        const id = Player.subscribe('track-start', () => {
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

    const playTrack = React.useCallback(async (track: ITrack) => {
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
                <PlaylistPanel
                    setSelectedTrack={playTrack}
                    selectedTrack={selectedTrack}
                    tracks={selectedPlaylist.tracks}
                />
                <Visualization />
            </Content>
            <BottomBar>
                <SvgIcon
                    src={addSong}
                    onContextMenu={(event) => {
                        alert('Context menu');
                        event.preventDefault();
                    }}
                    onClick={() => {
                        selectedPlaylist.addTrack({
                            recordable: true,
                            mimeType: 'icy-cast',
                            path: 'http://stream-dc1.radioparadise.com/rp_192m.ogg',
                            duration: 100,
                            mediaMetadata: {
                                artist: 'OGG',
                            },
                        });
                    }}
                ></SvgIcon>
            </BottomBar>
        </Window>
    );
};

export default MusicPlayer;
