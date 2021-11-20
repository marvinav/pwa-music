import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import { BaseComponentProps } from '../types';
import { useBaseClassName } from '../utils/useBaseClassName';

export interface IconProps extends BaseComponentProps {
    /**
     * Will be passed in `src` attribute of nested `img`
     */
    src: string;
    onErrorSrc?: string;
}

export const Icon: React.VFC<IconProps> = (props) => {
    const ref = React.useRef<HTMLImageElement>();

    const baseClassName = useBaseClassName(props, 'icon-container');

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
        ></img>
    );
};

Icon.propTypes = {
    className: PropTypes.string,
    onErrorSrc: PropTypes.string,
    src: PropTypes.string.isRequired,
};
