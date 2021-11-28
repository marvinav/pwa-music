import React from 'react';
import { SvgIcon } from 'shared/ui/components/SvgIcon';

// import gear from 'static/assets/player/gear-solid.svg?raw';
// import record from 'static/assets/player/record-solid.svg?raw';
import next from 'static/assets/player/next-solid.svg?raw';
import pause from 'static/assets/player/pause-solid.svg?raw';
import play from 'static/assets/player/play-solid.svg?raw';
import { Player } from 'entities/audio';
import { Track } from 'entities/audio/types';
import { controlPanel, playerStateButtons } from './index.css';

export const ControlPanel: React.VFC<{ selectedTrack?: Track }> = (_props) => {
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
