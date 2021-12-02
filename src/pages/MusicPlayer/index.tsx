import React from 'react';

import { IPlaylist } from 'shared/audio-player/types';
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
    const [playingTrackNumber, setPlayingTrackNumber] = React.useState<number>();
    const [selectedPlaylist] = React.useState(Player.playlist);
    const [tracks, setTracks] = React.useState(selectedPlaylist?.tracks);

    React.useEffect(() => {
        const id = Player.subscribe('playlist-changed', (_event, option) => {
            setPlayingTrackNumber(Player.state?.track?.trackNumber);
            if (option === 'playlist-tracks-changed') {
                setTracks([...(Player?.playlist?.tracks ?? [])]);
            }
        });

        return () => {
            Player.unsubscribe(id);
        };
    }, []);

    React.useEffect(() => {
        const id = Player.subscribe('track-start', () => {
            setPlayingTrackNumber(Player.state?.track?.trackNumber);
        });
        return () => {
            Player.unsubscribe(id);
        };
    }, [selectedPlaylist]);

    const playTrack = React.useCallback(async (position: number) => {
        await Player.play({
            trackNumber: position,
            relative: false,
        });
    }, []);

    return (
        <Window title="player" className="music-player">
            <Content>
                <ControlPanel />
                <PlaylistPanel
                    onPlayTrack={playTrack}
                    playingTrack={playingTrackNumber > -1 && tracks[playingTrackNumber]}
                    tracks={tracks}
                />
                <div style={{ position: 'relative' }}>
                    <Visualization />
                </div>
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
