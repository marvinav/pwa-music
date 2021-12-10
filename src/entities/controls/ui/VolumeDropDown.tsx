import React from 'react';

import { Player } from '@/shared/player';
import { DropDown, Slider, SvgButton } from '@/shared/ui';
import HighVolumeSolidIcon from '@/static/assets/player/high-volume-solid.svg?raw';
import LowVolumeSolidIcon from '@/static/assets/player/low-volume-solid.svg?raw';
import MuteSolidIcon from '@/static/assets/player/mute-solid.svg?raw';

const GainHost: React.VFC<{ gain: number; onClick: () => void }> = ({ gain, onClick }) => {
    if (gain === 0) {
        return <SvgButton onClick={onClick} src={MuteSolidIcon} />;
    } else if (gain < 0.5) {
        return <SvgButton onClick={onClick} src={LowVolumeSolidIcon} />;
    }
    return <SvgButton onClick={onClick} src={HighVolumeSolidIcon} />;
};

export const VolumeDropDown: React.VFC = () => {
    const [gain, setGain] = React.useState(Player.nodes.gain.gain.value * 100);

    React.useEffect(() => {
        Player.nodes.gain.gain.setValueAtTime(gain / 100, 0);
    }, [gain]);

    return (
        <DropDown Host={GainHost}>
            <Slider onChange={setGain} value={gain}></Slider>
        </DropDown>
    );
};
