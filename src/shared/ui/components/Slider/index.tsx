import React from 'react';

import { sliderAnchor, sliderBackground, sliderContainer, sliderScroll } from './index.css';

export interface SliderProperties {
    size?: 's' | 'normal' | 'l';
}

export const Slider: React.VFC<SliderProperties> = ({ size }) => {
    return (
        <div className={sliderContainer}>
            <div className={sliderBackground({ size })}></div>
            <div className={sliderScroll({ size })}>
                <div className={sliderAnchor({ size })}></div>
            </div>
        </div>
    );
};
