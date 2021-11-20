import React from 'react';
import { BaseComponentProps } from '../types';

export const useBaseClassName = <T extends BaseComponentProps>(
    props: T,
    containerName: `${string}-container` | `layer-${0 | 1}`,
): string => {
    const joinedClassName = React.useMemo(() => {
        const joined: string[] = [containerName];
        props.className && joined.push(props.className);
        props.classes && joined.push(props.classes.join(' '));
        return joined.join(' ');
    }, [props.classes, props.className, containerName]);

    return joinedClassName;
};
