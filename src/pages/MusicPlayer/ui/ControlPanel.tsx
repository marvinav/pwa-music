import React from 'react';

import { ITrack } from 'shared/audio-player/types';
import { Player } from 'shared/player';
import { SvgIcon } from 'shared/ui';
import next from 'static/assets/player/next-solid.svg?raw';
import pause from 'static/assets/player/pause-solid.svg?raw';
import play from 'static/assets/player/play-solid.svg?raw';

import { controlPanel, playerStateButtons } from './index.css';

export const ControlPanel: React.VFC<{ selectedTrack?: ITrack }> = (_properties) => {
    return (
        <div className={controlPanel}>
            <SvgIcon
                onClick={() => Player.play({ trackNumber: -1, relative: true })}
                src={next}
                className={playerStateButtons({ action: 'previous' })}
            />
            <SvgIcon
                onClick={() => Player.play({ trackNumber: 0, relative: true })}
                src={play}
                className={playerStateButtons()}
            />
            <SvgIcon onClick={() => Player.pause()} src={pause} className={playerStateButtons()} />
            <SvgIcon
                onClick={() => Player.play({ trackNumber: 1, relative: true })}
                src={next}
                className={playerStateButtons()}
            />
        </div>
    );
};
