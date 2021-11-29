import { sanitize } from 'dompurify';
import PropTypes from 'prop-types';
import React, { HTMLAttributes } from 'react';

import './index.css.ts';

import { BaseComponentProperties } from '../types';
import { useBaseClassName } from '../utils/useBaseClassName';

import { svgIconContainer } from './index.css';

export interface SVGIconProperties extends BaseComponentProperties {
    /**
     * Will be passed in `src` attribute of nested `img`
     */
    src: string;
    tooltip?: string;
}

/**
 * Parse raw svg data with sanitizer and change some attributes.
 * @param props
 * @returns Return div container with nested SVG element.
 */
export const SvgIcon: React.VFC<
    React.DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & SVGIconProperties
> = (properties) => {
    const [ell] = React.useState(
        replaceFill(new DOMParser().parseFromString(sanitize(properties.src), 'image/svg+xml').firstElementChild),
    );
    const baseClassName = useBaseClassName(properties, svgIconContainer);

    const standartProperties = { ...properties, src: undefined, tooltip: undefined };

    return (
        <div
            {...standartProperties}
            data-title={properties.tooltip}
            className={baseClassName}
            dangerouslySetInnerHTML={{ __html: ell.outerHTML }}
        />
    );
};

function replaceFill(document_: SVGSVGElement | Element) {
    if (document_.nodeName === 'svg') {
        document_.setAttribute('preserveAspectRatio', 'none');
        document_.setAttribute('width', '100%');
        document_.setAttribute('height', '100%');
        document_.removeAttribute('id');
    } else if (document_.nodeName === 'path') {
        document_.setAttribute('fill', 'currentColor');
    }
    for (const ch in document_.children) {
        replaceFill(document_.children[ch]);
    }
    return document_ as SVGSVGElement;
}

SvgIcon.propTypes = {
    className: PropTypes.string,
    src: PropTypes.string.isRequired,
    tooltip: PropTypes.string,
};
