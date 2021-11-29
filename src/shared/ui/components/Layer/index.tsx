import React, { HTMLAttributes } from 'react';

import { BaseComponentProperties } from '../types';
import { useBaseClassName } from '../utils/useBaseClassName';

import { layer } from './index.css';

export interface LayerProperties extends BaseComponentProperties {
    level: 0 | 1;
}

export const Layer: React.FC<
    React.DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & LayerProperties
> = (properties) => {
    const baseClassName = useBaseClassName(properties, layer[properties.level]);
    const standartProperties = { ...properties };

    delete standartProperties.level;

    return (
        <div {...standartProperties} className={baseClassName}>
            {properties.children}
        </div>
    );
};
