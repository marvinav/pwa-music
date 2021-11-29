import React from 'react';
import PropTypes from 'prop-types';
import { BaseComponentProps } from '../types';
import { useBaseClassName } from '../utils/useBaseClassName';
import { iconContainer } from './index.css';

export interface IconProps
    extends BaseComponentProps,
        React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    /**
     * Will be passed in `src` attribute of nested `img`
     */
    src: string;
    onErrorSrc?: string;
}

export const Icon: React.VFC<IconProps> = (props) => {
    const ref = React.useRef<HTMLImageElement>();

    const baseClassName = useBaseClassName(props, iconContainer);

    return (
        <img
            onError={() => {
                if (props.onErrorSrc && ref.current.src !== props.onErrorSrc) {
                    ref.current.src = props.onErrorSrc;
                }
            }}
            ref={ref}
            className={baseClassName}
            src={props.src}
            alt={props.alt}
        ></img>
    );
};

Icon.propTypes = {
    className: PropTypes.string,
    onErrorSrc: PropTypes.string,
    src: PropTypes.string.isRequired,
};
