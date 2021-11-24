import React from 'react';
import { SvgIcon } from '../../../components/SvgIcon';

// import gear from '../../../static/assets/player/gear-solid.svg?raw';
// import record from '../../../static/assets/player/record-solid.svg?raw';
import next from '../../../../static/assets/player/next-solid.svg?raw';
import pause from '../../../../static/assets/player/pause-solid.svg?raw';
import play from '../../../../static/assets/player/play-solid.svg?raw';
import { controlPanel, playerStateButtons } from '../index.css';

export const ControlPanel: React.VFC = () => {
    return (
        <div className={controlPanel}>
            <SvgIcon src={next} className={playerStateButtons({ action: 'previous' })} />
            <SvgIcon src={play} className={playerStateButtons()} />
            <SvgIcon src={pause} className={playerStateButtons()} />
            <SvgIcon src={next} className={playerStateButtons()} />
        </div>
    );
};
