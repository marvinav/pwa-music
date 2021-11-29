import React from 'react';

import { BaseComponentProps as BaseComponentProperties } from '../types';

export const useBaseClassName = <U, T extends BaseComponentProperties<U>>(
    properties: T,
    containerName: `${string}-container` | `layer-${0 | 1}` | string,
): string => {
    const joinedClassName = React.useMemo(() => {
        const joined: string[] = [containerName];
        properties.className && joined.push(properties.className);
        return joined.join(' ');
    }, [properties.className, containerName]);

    return joinedClassName;
};
