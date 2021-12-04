import React from 'react';

import { sliderContainer, sliderScroll } from './index.css';

export interface SliderProperties {
    size?: 's' | 'normal' | 'l';
    onChange: (value: number) => void;
    value: number;
    maxValue?: number;
}

export const Slider: React.VFC<SliderProperties> = ({ size, value, onChange, maxValue }) => {
    return (
        <div className={sliderContainer({ size })}>
            <input
                value={value}
                type="range"
                max={maxValue}
                onChange={(event) => {
                    onChange(Number.parseInt(event.currentTarget.value, 10));
                }}
                className={sliderScroll({ size })}
            />
        </div>
    );
};
