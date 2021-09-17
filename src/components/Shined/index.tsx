import React, { createContext } from 'react';
import { useContext } from 'react';
import { useRef } from 'react';

interface IShinedInjectOptions {
    onMouseMove: (ev: React.MouseEvent) => void;
    onMouseEnter: (ev: React.MouseEvent) => void;
    onMouseLeave: (ev: React.MouseEvent) => void;
    shine: JSX.Element;
}

export function Shined(props: {
    size?: number;
    background?: string;
    children: (options: IShinedInjectOptions) => JSX.Element;
}) {
    const ref = useRef<HTMLDivElement>();
    const onMouseEnter = React.useCallback(() => {
        ref.current.style.setProperty('display', null);
    }, []);

    const onMouseLeave = React.useCallback(() => {
        ref.current.style.setProperty('display', 'none');
    }, []);

    const shine = React.useMemo(() => {
        return (
            <div
                style={{
                    position: 'fixed',
                    pointerEvents: 'none',
                    borderRadius: '50%',
                    width: `${props.size ?? 72}px`,
                    height: `${props.size ?? 72}px`,
                    overflow: 'clip',
                    filter: 'blur(5px)',
                    transform: 'translate(-50%, -50%)',
                    background:
                        props.background ?? 'radial-gradient(circle, rgba(255,255,0,0.25) 0%,  rgba(255,255,0,0) 70%)',
                }}
                ref={ref}
                className="shine"
            ></div>
        );
    }, [props.size, props.background]);

    const onMouseMove = React.useCallback(
        (ev: React.MouseEvent) => {
            if (ref) {
                const halfWidth = (props.size ?? 72) / 2;
                ref.current.style.setProperty('top', `${ev.clientY}px`);
                ref.current.style.setProperty('left', `${ev.clientX}px`);
                const parentClient = ev.currentTarget.getBoundingClientRect();
                const shineClient = {
                    clientX: ev.clientX,
                    clientY: ev.clientY,
                };
                let bottomOverflow = parentClient.bottom - shineClient.clientY;
                bottomOverflow = bottomOverflow < halfWidth ? halfWidth - bottomOverflow : 0;
                let topOverflow = parentClient.top - shineClient.clientY;
                topOverflow = topOverflow < -halfWidth ? 0 : halfWidth + topOverflow;
                let leftOverflow = parentClient.left - shineClient.clientX;
                leftOverflow = leftOverflow < -halfWidth ? 0 : halfWidth + leftOverflow;
                let rightOverflow = parentClient.right - shineClient.clientX;
                rightOverflow = rightOverflow < halfWidth ? halfWidth - rightOverflow : 0;
                ref.current.style.setProperty(
                    'clip-path',
                    `inset(${topOverflow}px ${rightOverflow}px  ${bottomOverflow}px ${leftOverflow}px)`,
                );
            }
        },
        [props.size],
    );

    return props.children({ onMouseMove, onMouseLeave, onMouseEnter, shine });
}
