import { AudioPlayer } from 'shared/audio-player';
import { CommonPreprocessor } from 'shared/audio-player';

const Player = new AudioPlayer();

Player.addProcessor(new CommonPreprocessor());

export { Player };
