import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
export interface AvatarProps {
    /**
     * Will be passed in `src` attribute of nested `img`
     */
    src: string;
    className?: string;
    onErrorSrc?: string;
    size?: 'xs' | 's' | 'normal' | 'l' | 'xl';
}

export const Avatar: React.VFC<AvatarProps> = (props) => {
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
};

Avatar.defaultProps = {
    size: 'normal',
};

Avatar.propTypes = {
    className: PropTypes.string,
    onErrorSrc: PropTypes.string,
    size: PropTypes.oneOf(['xs', 's', 'normal', 'l', 'xl']),
    src: PropTypes.string.isRequired,
};

function useClassName(props: { className: string; size?: string }) {
    const { className, size } = props;

    const classes: string[] = ['avatar-container'];

    if (className) {
        classes.push(className);
    }

    classes.push(size ?? 'normal');
    return classes.join(' ');
}
