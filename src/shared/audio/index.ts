import { AudioPlayer } from './lib/audio-player';
export { Playlist } from './lib/playlist';
import { CommonPreprocessor } from './lib/common-preprocessor';

const Player = new AudioPlayer();

Player.addProcessor(new CommonPreprocessor());

export { Player };
