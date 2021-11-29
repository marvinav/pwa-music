import PropTypes from 'prop-types';
import React from 'react';
import { useRef } from 'react';

import { NavLink } from '../../components/NavLink';
import { navlink } from '../../components/NavLink/index.css';

import { nav } from './index.css';

export interface NavBarProperties {
    onClick: (path: string) => void;
    section: string | undefined;

    links: { id: string; label: string; path: string }[];
}

export const NavBar: React.VFC<NavBarProperties> = (properties) => {
    const [selected, setSelected] = React.useState(properties.section);
    const focusLink = useRef(0);
    const reference = useRef<HTMLElement>();
    React.useEffect(() => {
        setSelected(properties.section);
    }, [properties.section]);

    return (
        <nav
            className={nav}
            ref={reference}
            role="presentation"
            onKeyDown={(event) => {
                if (event.code === 'ArrowRight') {
                    event.preventDefault();
                    focusLink.current =
                        focusLink.current + 1 >= reference.current.children.length ? 0 : focusLink.current + 1;
                    (reference.current.children[focusLink.current] as HTMLElement).focus();
                } else if (event.code === 'ArrowLeft') {
                    event.preventDefault();
                    focusLink.current =
                        focusLink.current - 1 < 0 ? reference.current.children.length - 1 : focusLink.current - 1;
                    (reference.current.children[focusLink.current] as HTMLElement).focus();
                }
            }}
            onFocus={(event_) => {
                if (event_.target === reference.current) {
                    event_.preventDefault();
                    const indexOfSelected = properties.links.findIndex((x) => x.path === selected);
                    focusLink.current = indexOfSelected;
                    (reference.current.children[indexOfSelected] as HTMLElement).focus();
                }
            }}
        >
            {properties.links.map((link) => (
                <NavLinkMemo
                    tabIndex={-1}
                    key={link.path}
                    className={navlink}
                    path={link.path}
                    selected={selected === link.path}
                    onNavigate={(path) => {
                        properties.onClick(path);
                    }}
                >
                    {link.label}
                </NavLinkMemo>
            ))}
        </nav>
    );
};

NavBar.propTypes = {
    onClick: PropTypes.func,
    section: PropTypes.string,
    links: PropTypes.array.isRequired,
};

const NavLinkMemo = React.memo(NavLink, (p, n) => {
    return p.selected === n.selected && p.disabled === n.disabled && p.path === n.path && p.children === n.children;
});
