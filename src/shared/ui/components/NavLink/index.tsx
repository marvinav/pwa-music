import React, { HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import { navlink } from './index.css';

type NavLinkProps = React.PropsWithChildren<
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

export const NavLink: React.VFC<NavLinkProps> = (props) => {
    const { onNavigate, path, disabled, selected } = props;
    const reactAttributes = { ...props };
    delete reactAttributes.onNavigate;
    delete reactAttributes.ref;
    return (
        <span
            {...reactAttributes}
            role="link"
            tabIndex={0}
            className={className({ selected, disabled, className: props.className })}
            onKeyPress={(e) => {
                !disabled && e.code === 'Enter' && props.onNavigate(path);
            }}
            onClick={(e) => {
                if (disabled) {
                    return;
                }
                if (onNavigate) {
                    onNavigate(path);
                } else {
                    props.onClick && props.onClick(e);
                }
            }}
        >
            {props.children}
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

function className(props: { selected?: boolean; disabled?: boolean; className?: string }) {
    const main = [navlink];
    props.className && main.push(props.className);
    props.selected && main.push('selected');
    props.disabled && main.push('disabled');
    return main.join(' ');
}
