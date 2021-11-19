import React from 'react';

export interface BaseComponentProps {
    rounded?: boolean;
    className?: string;
    size?: 'xs' | 's' | 'normal' | 'l' | 'xl';
    button?: boolean;
}

export const useBaseClassName = <T extends BaseComponentProps>(props: T, containerName?: string): string => {
    const [className, setClassName] = React.useState<string>();

    React.useEffect(() => {
        const result = [];
        containerName && result.push(containerName);
        props.rounded && result.push('rounded');
        props.className && result.push(props.className);
        props.size && result.push(props.size);
        props.button && result.push('button');

        setClassName(result.join(' '));
    }, [props.rounded, props.className, props.size, props.button, containerName]);

    return className;
};
