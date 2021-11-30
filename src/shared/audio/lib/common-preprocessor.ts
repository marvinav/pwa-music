import { ITrack, TrackProcessor } from '../types';

export class CommonPreprocessor implements TrackProcessor<ITrack> {
    _source: MediaElementAudioSourceNode;
    _audio = document.createElement('audio');

    type: 'icy-cast' | 'mp3' = 'icy-cast';

    play: (context: AudioContext, node: GainNode, track: ITrack, onEnd?: () => Promise<void>) => Promise<void> = async (
        c,
        n,
        t,
        onEnd,
    ) => {
        this._audio.load();
        await c.resume();
        this._audio.setAttribute('src', t.path);

        if (!this._source) {
            this._source = c.createMediaElementSource(this._audio);
            this._audio.setAttribute('crossorigin', 'anonymous');
            this._source.connect(n);
        }

        this._audio.addEventListener('ended', async (_event) => {
            this._audio.removeAttribute('src');
            this._audio.load();
            await onEnd();
        });
        this._audio.play();
        return;
    };

    stop: () => Promise<void> = async () => {
        this._audio.removeAttribute('src');
        this._audio.load();
    };

    pause: () => Promise<void> = async () => {
        this._audio.pause();
    };
}