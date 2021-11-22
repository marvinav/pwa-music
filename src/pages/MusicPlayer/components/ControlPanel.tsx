import React from 'react';
import { SvgIcon } from '../../../components/SvgIcon';
import { BaseComponentProps } from '../../../components/types';

// import gear from '../../../static/assets/player/gear-solid.svg?raw';
// import record from '../../../static/assets/player/record-solid.svg?raw';
import next from '../../../../static/assets/player/next-solid.svg?raw';
import pause from '../../../../static/assets/player/pause-solid.svg?raw';
import play from '../../../../static/assets/player/play-solid.svg?raw';

const SvgControlClasses: BaseComponentProps['classes'] = ['button', 'rectangle-size-normal'];

export const ControlPanel: React.VFC = () => {
    return (
        <div className="control-panel">
            <SvgIcon src={next} classes={SvgControlClasses} className="previous" />
            <SvgIcon src={play} classes={SvgControlClasses} className="play" />
            <SvgIcon src={pause} classes={SvgControlClasses} className="pause" />
            <SvgIcon src={next} classes={SvgControlClasses} className="next" />
        </div>
    );
};
