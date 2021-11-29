import PropTypes from 'prop-types';
import React from 'react';
import { useRef } from 'react';

export interface IShinedProperties {
    size?: number;
    background?: string;
    children: (options: IShinedInjectOptions) => JSX.Element;
}
export interface IShinedInjectOptions {
    onMouseMove: (event_: React.MouseEvent) => void;
    onMouseEnter: (event_: React.MouseEvent) => void;
    onMouseLeave: (event_: React.MouseEvent) => void;
    shine: JSX.Element;
}

export const Shined: React.VFC<IShinedProperties> = (properties) => {
    const reference = useRef<HTMLDivElement>();
    const onMouseEnter = React.useCallback(() => {
        reference.current.style.removeProperty('display');
    }, []);

    const onMouseLeave = React.useCallback(() => {
        reference.current.style.setProperty('display', 'none');
    }, []);

    const shine = React.useMemo(() => {
        return (
            <div
                style={{
                    position: 'fixed',
                    pointerEvents: 'none',
                    borderRadius: '50%',
                    width: `${properties.size}px`,
                    height: `${properties.size}px`,
                    overflow: 'clip',
                    filter: 'blur(5px)',
                    transform: 'translate(-50%, -50%)',
                    background: properties.background,
                }}
                ref={reference}
                className="shine"
            ></div>
        );
    }, [properties.size, properties.background]);

    const onMouseMove = React.useCallback(
        (event_: React.MouseEvent) => {
            if (reference) {
                const halfWidth = properties.size / 2;
                reference.current.style.setProperty('top', `${event_.clientY}px`);
                reference.current.style.setProperty('left', `${event_.clientX}px`);
                const parentClient = event_.currentTarget.getBoundingClientRect();
                const shineClient = {
                    clientX: event_.clientX,
                    clientY: event_.clientY,
                };
                let bottomOverflow = parentClient.bottom - shineClient.clientY;
                bottomOverflow = bottomOverflow < halfWidth ? halfWidth - bottomOverflow : 0;
                let topOverflow = parentClient.top - shineClient.clientY;
                topOverflow = topOverflow < -halfWidth ? 0 : halfWidth + topOverflow;
                let leftOverflow = parentClient.left - shineClient.clientX;
                leftOverflow = leftOverflow < -halfWidth ? 0 : halfWidth + leftOverflow;
                let rightOverflow = parentClient.right - shineClient.clientX;
                rightOverflow = rightOverflow < halfWidth ? halfWidth - rightOverflow : 0;
                reference.current.style.setProperty(
                    'clip-path',
                    `inset(${topOverflow}px ${rightOverflow}px  ${bottomOverflow}px ${leftOverflow}px)`,
                );
            }
        },
        [properties.size],
    );

    return properties.children({ onMouseMove, onMouseLeave, onMouseEnter, shine });
};

Shined.propTypes = {
    background: PropTypes.string,
    children: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired,
};

Shined.defaultProps = {
    size: 72,
    background: 'radial-gradient(circle, rgba(255,255,0,0.25) 0%,  rgba(255,255,0,0) 70%)',
};
