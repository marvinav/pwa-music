import React, { HTMLAttributes } from 'react';
import { BaseComponentProps } from '../types';
import { useBaseClassName } from '../utils/useBaseClassName';
import { layer } from './index.css';

export interface LayerProps extends BaseComponentProps {
    level: 0 | 1;
}

export const Layer: React.FC<React.DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & LayerProps> = (
    props,
) => {
    const baseClassName = useBaseClassName(props, layer[props.level]);
    const standartProps = { ...props };

    delete standartProps.level;

    return (
        <div {...standartProps} className={baseClassName}>
            {props.children}
        </div>
    );
};
