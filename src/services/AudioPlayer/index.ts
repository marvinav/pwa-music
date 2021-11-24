import { AudioPlayer } from './AudioPlayer';
import { CommonPreprocessor } from './CommonPreprocessor';

const Player = new AudioPlayer();

Player.addProcessor(new CommonPreprocessor());

export { Player };
