import React from 'react';

import { sliderContainer, sliderScroll } from './index.css';

export interface SliderProperties {
    size?: 's' | 'normal' | 'l';
    onChange: (value: number) => void;
    value: number;
    max?: number;
    min?: number;
    step?: number;
    list?: string;
}

export const Slider: React.VFC<SliderProperties> = ({ size, value, onChange, max, step, min, list }) => {
    return (
        <div className={sliderContainer({ size })}>
            <input
                value={value}
                step={step}
                type="range"
                max={max}
                list={list}
                min={min}
                onChange={(event) => {
                    onChange(Number.parseInt(event.currentTarget.value, 10));
                }}
                className={sliderScroll({ size })}
            />
        </div>
    );
};
