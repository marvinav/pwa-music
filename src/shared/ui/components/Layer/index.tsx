import React, { HTMLAttributes } from 'react';

import { BaseComponentProperties } from '../types';
import { useBaseClassName } from '../utils/useBaseClassName';

import { layer } from './index.css';

export interface LayerProperties extends BaseComponentProperties {
    level?: 0 | 1;
    rounded?: true;
    fadeIn?: true;
}

export const Layer: React.FC<
    React.DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & LayerProperties
> = ({ level, fadeIn, className, rounded, children, ...properties }) => {
    const baseClassName = useBaseClassName({ className }, layer({ level, rounded, fadeIn }));

    return (
        <div {...properties} className={baseClassName}>
            {children}
        </div>
    );
};
