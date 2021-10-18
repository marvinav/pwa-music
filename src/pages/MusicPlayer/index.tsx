import React from 'react';
import { Window } from '../../layouts/Window';

const MusicPlayer: React.VFC = () => {
    return (
        <Window title="player" className="music-player">
            <div className="control-panel"></div>
            <div className="playlist"></div>
        </Window>
    );
};

export default MusicPlayer;
