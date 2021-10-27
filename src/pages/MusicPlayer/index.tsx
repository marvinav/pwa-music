import React from 'react';
import { Window } from '../../layouts/Window';
import { SvgIcon } from '../../components/SvgIcon';
import './index.scss';

// import gear from '../../../static/assets/player/gear-solid.svg?raw';
// import record from '../../../static/assets/player/record-solid.svg?raw';
import next from '../../../static/assets/player/next-solid.svg?raw';
import pause from '../../../static/assets/player/pause-solid.svg?raw';
import play from '../../../static/assets/player/play-solid.svg?raw';

const MusicPlayer: React.VFC = () => {
    return (
        <Window title="player" className="music-player">
            <ControlPanel />
            <div className="playlist"></div>
        </Window>
    );
};

const ControlPanel: React.VFC = () => {
    return (
        <div className="control-panel">
            <SvgIcon src={next} className="button previous" />
            <SvgIcon src={play} className="button play" />
            <SvgIcon src={pause} className="button pause" />
            <SvgIcon src={next} className="button next" />
        </div>
    );
};

export default MusicPlayer;
