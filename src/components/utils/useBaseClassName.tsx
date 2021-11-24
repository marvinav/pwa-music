import React from 'react';
import { BaseComponentProps } from '../types';

export const useBaseClassName = <U, T extends BaseComponentProps<U>>(
    props: T,
    containerName: `${string}-container` | `layer-${0 | 1}` | string,
): string => {
    const joinedClassName = React.useMemo(() => {
        const joined: string[] = [containerName];
        props.className && joined.push(props.className);
        return joined.join(' ');
    }, [props.className, containerName]);

    return joinedClassName;
};
