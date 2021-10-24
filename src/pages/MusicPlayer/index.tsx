import React from 'react';
import { Window } from '../../layouts/Window';

import gear from '../../../static/assets/player/gear-solid.svg?raw';
import { SvgIcon } from '../../components/SvgIcon';

const MusicPlayer: React.VFC = () => {
    return (
        <Window title="player" className="music-player">
            <div className="control-panel">
                <SvgIcon src={gear} tooltip={'Settings'}></SvgIcon>
            </div>
            <div className="playlist"></div>
        </Window>
    );
};

export default MusicPlayer;
