import 'regenerator-runtime/runtime';
import { AudioPlayer, Mp3Track, TrackProcessor } from '../../services/AudioPlayer';

const playlist: AudioPlayer['_playlist'] = {
    name: 'Test First',
    path: 'test/first',
    tracks: [
        {
            mediaMetadata: { title: '', album: '', artist: '', artwork: [] },
            recordable: true,
            mimeType: 'icy-cast',
            path: 'test/first/s',
        },
    ],
};

const playlistSecond: AudioPlayer['_playlist'] = {
    name: 'Test Second',
    path: 'test/second',
    tracks: [
        {
            mediaMetadata: { title: '1', album: '', artist: '', artwork: [] },
            recordable: false,
            mimeType: 'mp3',
            path: 'test/second/mp3/1',
        },
        {
            mediaMetadata: { title: '2', album: '', artist: '', artwork: [] },
            recordable: false,
            mimeType: 'mp3',
            path: 'test/second/mp3/2',
        },
        {
            mediaMetadata: { title: '3', album: '', artist: '', artwork: [] },
            recordable: false,
            mimeType: 'mp3',
            path: 'test/second/mp3/3',
        },
    ],
};

describe('Audio Player', () => {
    const mockAudioContext = {};

    global.AudioContext = jest.fn().mockImplementation(() => {
        return mockAudioContext;
    });

    it('Add and remove subscription', () => {
        const player = new AudioPlayer();
        const action = async () => {
            return;
        };
        const id = player.subscribe('playlist-changed', action);
        expect(id).toBeTruthy();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let sub = (player as any)._subscriptions as AudioPlayer['_subscriptions'];
        expect(sub['playlist-changed'].size).toBe(1);
        expect(sub['playlist-changed'].get(id)).toBe(action);
        player.unsubscribe(id, 'playlist-changed');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        sub = (player as any)._subscriptions as AudioPlayer['_subscriptions'];
        expect(sub['playlist-changed'].size).toBe(0);
    });

    it('Set playlists', async () => {
        const player = new AudioPlayer();
        expect(player.playlist).toBeUndefined();
        await player.setPlaylist(playlist);
        expect(player.playlist).toBe(playlist);
        await player.setPlaylist(playlistSecond);
        expect(player.playlist).toBe(playlistSecond);
    });

    it('Playlist-change subscriptions', async () => {
        const player = new AudioPlayer();
        const mockFunction = jest.fn();
        const id = player.subscribe('playlist-changed', mockFunction);
        await player.setPlaylist(playlist);
        expect(mockFunction).toBeCalled();
        await player.setPlaylist(playlist);
        expect(mockFunction).toBeCalledTimes(2);
        expect(player.playlist).toBe(playlist);
        player.unsubscribe(id, 'playlist-changed');
        await player.setPlaylist(playlist);
        expect(mockFunction).toBeCalledTimes(2);
    });

    //TODO:
    it('Play music mode=none', async () => {
        const player = new AudioPlayer();
        const mockSubscription = jest.fn();

        player.subscribe('track-end', mockSubscription);
        let currentTrack: number;
        let onEndBox;

        const mockPlay = jest.fn<Promise<void>, Parameters<TrackProcessor<Mp3Track>['play']>>(async (c, t, onEnd?) => {
            onEndBox = async () => {
                currentTrack++;
                await onEnd();
            };
            return null;
        });

        const mockPause = jest.fn<Promise<void>, Parameters<TrackProcessor<Mp3Track>['pause']>>(async () => {
            return null;
        });

        const mockStop = jest.fn<Promise<void>, Parameters<TrackProcessor<Mp3Track>['stop']>>(async () => {
            return null;
        });

        const preprocessor: TrackProcessor<Mp3Track> = {
            type: 'mp3',
            play: mockPlay,
            pause: mockPause,
            stop: mockStop,
        };

        player.addProcessor(preprocessor);
        await player.setPlaylist(playlistSecond);
        player.setMode('none');
        expect(player.playlist.tracks.length).toBe(3);
        currentTrack = 0;
        const track = await player.play({ trackNumber: currentTrack, relative: false });
        expect(mockPlay).toBeCalledTimes(1);
        expect(track).toBe(playlistSecond.tracks[currentTrack]);
        expect(player.state.track?.trackNumber).toBe(0);
        await onEndBox(); // End first, start second
        expect(mockSubscription).toBeCalledTimes(1);
        expect(currentTrack).toBe(1);
        await onEndBox(); // End second, start third
        expect(mockSubscription).toBeCalledTimes(2);
        expect(currentTrack).toBe(2);
        await onEndBox(); // End third, stop playlist
        expect(mockSubscription).toBeCalledTimes(3);
        expect(player.state.state).toBe('stop');
        expect(player.state.track).toBeNull();
        expect(mockStop).toBeCalledTimes(1);
    });

    //TODO:
    // it('Play music with loop-one mode', async () => {
    //     const { mockPlay, modeChangedSub, player } = createPlayer();
    //     await player.setPlaylist(playlistThird);
    //     expect(player.playlist.tracks.length).toBe(3);
    //     player.setMode('loop-one');
    //     expect(player.mode).toBe('loop-one');
    //     // const track = await player.play({ trackNumber: 0, relative: false });
    //     expect(mockPlay).toBeCalledTimes(1);
    //     expect(modeChangedSub).toBeCalledTimes(1);
    // });
});
