import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import { sanitize } from 'dompurify';
import '../index.scss';
import { BaseComponentProps } from '../types';
import { useBaseClassName } from '../utils/useBaseClassName';

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
export const SvgIcon: React.VFC<SVGIconProps> = (props) => {
    const [ell] = React.useState(
        replaceFill(new DOMParser().parseFromString(sanitize(props.src), 'image/svg+xml').firstElementChild),
    );

    return (
        <div
            data-title={props.tooltip}
            className={useClassName(props)}
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

SvgIcon.defaultProps = {
    size: 'normal',
};

SvgIcon.propTypes = {
    className: PropTypes.string,
    src: PropTypes.string.isRequired,
    tooltip: PropTypes.string,
    rounded: PropTypes.bool,
};

function useClassName(props: SVGIconProps) {
    const baseClassName = useBaseClassName(props, 'svg-icon-container');
    return baseClassName;
}
