import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';

export interface IconProps {
    /**
     * Will be passed in `src` attribute of nested `img`
     */
    src: string;
    className?: string;
    onErrorSrc?: string;
    size?: 'xs' | 's' | 'normal' | 'l' | 'xl';
}

export const Icon: React.VFC<IconProps> = (props) => {
    const ref = React.useRef<HTMLImageElement>();

    return (
        <img
            onError={() => {
                if (props.onErrorSrc && ref.current.src !== props.onErrorSrc) {
                    ref.current.src = props.onErrorSrc;
                }
            }}
            ref={ref}
            className={useClassName(props)}
            src={props.src}
        ></img>
    );
};

Icon.defaultProps = {
    size: 'normal',
};

Icon.propTypes = {
    className: PropTypes.string,
    onErrorSrc: PropTypes.string,
    size: PropTypes.oneOf(['xs', 's', 'normal', 'l', 'xl']),
    src: PropTypes.string.isRequired,
};

function useClassName(props: IconProps) {
    const classes: string[] = ['icon-container'];

    props.className && classes.push(props.className);
    classes.push(props.size ?? 'normal');

    return classes.join(' ');
}
