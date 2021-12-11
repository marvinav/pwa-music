import React from 'react';

import { Player } from '@/shared/player';
import { DropDown, Slider, SvgButton } from '@/shared/ui';
import HighVolumeSolidIcon from '@/static/assets/player/high-volume-solid.svg?raw';
import LowVolumeSolidIcon from '@/static/assets/player/low-volume-solid.svg?raw';
import MuteSolidIcon from '@/static/assets/player/mute-solid.svg?raw';

const GainHost: React.VFC<{ gain: number }> = ({ gain }) => {
    if (gain === 0) {
        return <SvgButton key="0" src={MuteSolidIcon} />;
    } else if (gain < 50) {
        return <SvgButton key="0,5" src={LowVolumeSolidIcon} />;
    }
    return <SvgButton key="1" src={HighVolumeSolidIcon} />;
};

export const VolumeDropDown: React.VFC = () => {
    const [gain, setGain] = React.useState(Player.nodes.gain.gain.value * 100);

    React.useEffect(() => {
        Player.setVolume(gain / 100);
    }, [gain]);

    return (
        <DropDown host={<GainHost gain={gain} />}>
            <Slider step={2} min={0} max={100} onChange={setGain} value={gain}></Slider>
        </DropDown>
    );
};
