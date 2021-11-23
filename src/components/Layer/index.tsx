import React, { HTMLAttributes } from 'react';
import { BaseComponentProps } from '../types';
import { useBaseClassName } from '../utils/useBaseClassName';

export interface LayerProps extends BaseComponentProps {
    level: `layer-0` | `layer-1`;
}

export const Layer: React.FC<React.DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & LayerProps> = (
    props,
) => {
    const baseClassName = useBaseClassName(props, props.level);
    const standartProps = { ...props };

    delete standartProps.level;

    return (
        <div {...standartProps} className={baseClassName}>
            {props.children}
        </div>
    );
};