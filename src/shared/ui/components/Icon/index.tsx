import PropTypes from 'prop-types';
import React from 'react';

import { BaseComponentProps as BaseComponentProperties } from '../types';
import { useBaseClassName } from '../utils/useBaseClassName';

import { iconContainer } from './index.css';

export interface IconProperties
    extends BaseComponentProperties,
        React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    /**
     * Will be passed in `src` attribute of nested `img`
     */
    src: string;
    onErrorSrc?: string;
}

export const Icon: React.VFC<IconProperties> = (properties) => {
    const reference = React.useRef<HTMLImageElement>();

    const baseClassName = useBaseClassName(properties, iconContainer);

    return (
        <img
            onError={() => {
                if (properties.onErrorSrc && reference.current.src !== properties.onErrorSrc) {
                    reference.current.src = properties.onErrorSrc;
                }
            }}
            ref={reference}
            className={baseClassName}
            src={properties.src}
            alt={properties.alt}
        ></img>
    );
};

Icon.propTypes = {
    className: PropTypes.string,
    onErrorSrc: PropTypes.string,
    src: PropTypes.string.isRequired,
};
