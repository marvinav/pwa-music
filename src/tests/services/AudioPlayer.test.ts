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
            mediaMetadata: { title: '', album: '', artist: '', artwork: [] },
            recordable: false,
            mimeType: 'mp3',
            path: 'test/second/mp3',
        },
    ],
};

const playlistThird: AudioPlayer['_playlist'] = {
    name: 'Test Third',
    path: 'test/third',
    tracks: [
        {
            mediaMetadata: { title: '', album: '', artist: '', artwork: [] },
            recordable: false,
            mimeType: 'mp3',
            path: 'test/third/1',
        },
        {
            mediaMetadata: { title: null, album: null, artist: null, artwork: [] },
            recordable: false,
            mimeType: 'mp3',
            path: 'test/third/2',
        },
        {
            mediaMetadata: { title: null, album: null, artist: null, artwork: [] },
            recordable: false,
            mimeType: 'mp3',
            path: 'test/third/3',
        },
    ],
};

const createPlayer = () => {
    const player = new AudioPlayer();

    const trackStartSub = jest.fn();
    const modeChangedSub = jest.fn();
    const trackEndSub = jest.fn();

    player.subscribe('track-start', trackStartSub);
    player.subscribe('track-end', trackEndSub);
    player.subscribe('mode-changed', modeChangedSub);

    const mockPlay = jest.fn<Promise<void>, Parameters<TrackProcessor<Mp3Track>['play']>>(async () => {
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
    return { mockPlay, mockPause, mockStop, player, trackEndSub, trackStartSub, modeChangedSub };
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
        let sub = (player as any)._subscriptions as AudioPlayer['_subscriptions'];
        expect(sub['playlist-changed'].size).toBe(1);
        expect(sub['playlist-changed'].get(id)).toBe(action);
        player.unsubscribe('playlist-changed', id);
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
        player.unsubscribe('playlist-changed', id);
        await player.setPlaylist(playlist);
        expect(mockFunction).toBeCalledTimes(2);
    });

    it('Add preprocessor and play music', async () => {
        const player = new AudioPlayer();
        const mockPlay = jest.fn<Promise<void>, Parameters<TrackProcessor<Mp3Track>['play']>>(async (c, t, onEnd?) => {
            expect(c).toBe(mockAudioContext);
            expect(t).toBe(playlistSecond.tracks[0]);
            onEnd();
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
        expect(player.playlist.tracks.length).toBe(1);
        const track = await player.play({ trackNumber: 0, relative: false });
        expect(mockPlay).toBeCalledTimes(1);
        expect(track).toBe(playlistSecond.tracks[0]);
        const nullishTrack = await player.play({ trackNumber: 100, relative: false });
        expect(nullishTrack).toBeNull();
        const relativeTrack = await player.play({ trackNumber: 100, relative: true });
        expect(relativeTrack).toBe(playlistSecond.tracks[0]);
    });

    it('Play music with loop-one mode', async () => {
        const { mockPlay, modeChangedSub, player } = createPlayer();
        await player.setPlaylist(playlistThird);
        expect(player.playlist.tracks.length).toBe(3);
        player.setMode('loop-one');
        expect(player.mode).toBe('loop-one');
        // const track = await player.play({ trackNumber: 0, relative: false });
        expect(mockPlay).toBeCalledTimes(1);
        expect(modeChangedSub).toBeCalledTimes(1);
    });
});
