import React, { HTMLAttributes } from 'react';
import './index.css.ts';
import PropTypes from 'prop-types';
import { sanitize } from 'dompurify';
import { BaseComponentProps } from '../types';
import { useBaseClassName } from '../utils/useBaseClassName';
import { svgIconContainer } from './index.css';

export interface SVGIconProps extends BaseComponentProps {
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
    React.DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & SVGIconProps
> = (props) => {
    const [ell] = React.useState(
        replaceFill(new DOMParser().parseFromString(sanitize(props.src), 'image/svg+xml').firstElementChild),
    );
    const baseClassName = useBaseClassName(props, svgIconContainer);

    const standartProps = { ...props, src: undefined, tooltip: undefined };

    return (
        <div
            {...standartProps}
            data-title={props.tooltip}
            className={baseClassName}
            dangerouslySetInnerHTML={{ __html: ell.outerHTML }}
        />
    );
};

function replaceFill(doc: SVGSVGElement | Element) {
    if (doc.nodeName === 'svg') {
        doc.setAttribute('preserveAspectRatio', 'none');
        doc.setAttribute('width', '100%');
        doc.setAttribute('height', '100%');
        doc.removeAttribute('id');
    } else if (doc.nodeName === 'path') {
        doc.setAttribute('fill', 'currentColor');
    }
    for (const ch in doc.children) {
        replaceFill(doc.children[ch]);
    }
    return doc as SVGSVGElement;
}

SvgIcon.propTypes = {
    className: PropTypes.string,
    src: PropTypes.string.isRequired,
    tooltip: PropTypes.string,
};
