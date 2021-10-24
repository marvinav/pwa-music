import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import { sanitize } from 'dompurify';
import { nanoid } from 'nanoid';
import '../index.scss';

export interface SVGIconProps {
    /**
     * Will be passed in `src` attribute of nested `img`
     */
    src: string;
    className?: string;
    tooltip?: string;
    size?: 'xs' | 's' | 'normal' | 'l' | 'xl';
}

/**
 * Parse raw svg data with sanitizer and change some attributes.
 * @param props
 * @returns Return div container with nested SVG element.
 */
export const SvgIcon: React.VFC<SVGIconProps> = (props) => {
    const [id] = React.useState(nanoid());
    const [ell] = React.useState(
        replaceFill(new DOMParser().parseFromString(sanitize(props.src), 'image/svg+xml').firstElementChild, true, id),
    );

    return (
        <div
            data-title={props.tooltip}
            className={useClassName(props)}
            dangerouslySetInnerHTML={{ __html: ell.outerHTML }}
        />
    );
};

function replaceFill(doc: SVGSVGElement | Element, root?: boolean, id?: string) {
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
    if (root) {
        doc.setAttribute('id', id);
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
};

function useClassName(props: SVGIconProps) {
    const classes: string[] = ['svg-icon-container'];

    props.className && classes.push(props.className);
    classes.push(props.size ?? 'normal');

    return classes.join(' ');
}
