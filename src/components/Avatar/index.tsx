import React from 'react';
import './index.scss';

export function Avatar(props: {
    src: string;
    className?: string;
    onErrorSrc?: string;
    size?: 'xs' | 's' | 'normal' | 'l' | 'xl';
}) {
    const ref = React.useRef<HTMLImageElement>();

    const className = useClassName({ className: props.className, size: props.size });

    return (
        <img
            onError={() => {
                if (props.onErrorSrc && ref.current.src !== props.onErrorSrc) {
                    ref.current.src = props.onErrorSrc;
                }
            }}
            ref={ref}
            className={className}
            src={props.src}
        ></img>
    );
}

function useClassName(props: { className: string; size?: string }) {
    const { className, size } = props;

    const classes: string[] = ['avatar-container'];

    if (className) {
        classes.push(className);
    }
    const a = '23';
    const b = true;
    const c: number = a + b;
    classes.push(size ?? 'normal');
    return classes.join(' ');
}
