import React from 'react';

import { Player } from 'shared/audio';
import { Playlist as PlaylistType, Track } from 'shared/audio/types';
import { SvgIcon, Window, BottomBar, Content } from 'shared/ui/index';
import addSong from 'static/assets/player/add-playlist-solid.svg?raw';

import { ControlPanel } from './ui/ControlPanel';
import { Playlist } from './ui/Playlist';
import { Visualization } from './ui/Visualization';

const playlist: PlaylistType = {
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
    const [selectedTrack, setSelectedTrack] = React.useState<Track>();
    const [selectedPlaylist, setSelectedPlaylist] = React.useState(playlist);

    React.useEffect(() => {
        const id = Player.subscribe('playlist-changed', () => {
            setSelectedPlaylist(Player.playlist);
        });
        return () => {
            Player.unsubscribe(id);
        };
    }, []);

    React.useEffect(() => {
        Player.playlist.path != selectedPlaylist && Player.setPlaylist(selectedPlaylist);
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
                <Playlist setSelectedTrack={playTrack} selectedTrack={selectedTrack} tracks={selectedPlaylist.tracks} />
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
                        const tracks = [...selectedPlaylist.tracks];
                        tracks.push({
                            recordable: true,
                            mimeType: 'icy-cast',
                            path: 'http://stream-dc1.radioparadise.com/rp_192m.ogg',
                            duration: 100,
                            mediaMetadata: {
                                artist: 'OGG',
                            },
                        });
                        const newPlaylist = { ...selectedPlaylist, updatedAt: new Date(), tracks };
                        setSelectedPlaylist(newPlaylist);
                    }}
                ></SvgIcon>
            </BottomBar>
        </Window>
    );
};

export default MusicPlayer;
