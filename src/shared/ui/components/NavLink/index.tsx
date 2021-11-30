import PropTypes from 'prop-types';
import React, { HTMLAttributes } from 'react';

import { navlink } from './index.css';

type NavLinkProperties = React.PropsWithChildren<
    React.DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> & {
        /**
         * Path to navigate page
         */
        path: string;
        /**
         * Action when page should be navigated
         */
        onNavigate?: (path: string) => void;
        /**
         * This is current site location
         */
        selected?: boolean;
        /**
         * Nav is not available
         */
        disabled?: boolean;
    }
>;

export const NavLink: React.VFC<NavLinkProperties> = (properties) => {
    const { onNavigate, path, disabled, selected, onClick, children } = properties;
    const reactAttributes = { ...properties };
    delete reactAttributes.onNavigate;
    delete reactAttributes.ref;
    return (
        <span
            {...reactAttributes}
            role="link"
            tabIndex={0}
            className={className({ selected, disabled, className: properties.className })}
            onKeyPress={(event) => {
                !disabled && event.code === 'Enter' && properties.onNavigate(path);
            }}
            onClick={(event) => {
                if (disabled) {
                    return;
                }
                if (onNavigate) {
                    onNavigate(path);
                } else {
                    onClick && onClick(event);
                }
            }}
        >
            {children}
        </span>
    );
};

NavLink.propTypes = {
    onNavigate: PropTypes.func,
    path: PropTypes.string,
    disabled: PropTypes.bool,
    selected: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
};

function className(properties: { selected?: boolean; disabled?: boolean; className?: string }) {
    const main = [navlink];
    properties.className && main.push(properties.className);
    properties.selected && main.push('selected');
    properties.disabled && main.push('disabled');
    return main.join(' ');
}
