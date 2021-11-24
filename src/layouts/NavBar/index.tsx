import React from 'react';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { NavLink } from '../../components/NavLink';
import { useDictionary } from '../../contexts/DictionaryContext';
import { nav } from './index.css';
import { navlink } from '../../components/NavLink/index.css';

export interface NavBarProps {
    onClick: (path: string) => void;
    section: string | undefined;

    links: { id: string; label: string; path: string }[];
}

export const NavBar: React.VFC<NavBarProps> = (props) => {
    const { d } = useDictionary();
    const [selected, setSelected] = React.useState(props.section);
    const focusLink = useRef(0);
    const ref = useRef<HTMLElement>();
    React.useEffect(() => {
        setSelected(props.section);
    }, [props.section]);

    return (
        <nav
            className={nav}
            ref={ref}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.code === 'ArrowRight') {
                    e.preventDefault();
                    focusLink.current =
                        focusLink.current + 1 >= ref.current.children.length ? 0 : focusLink.current + 1;
                    (ref.current.children[focusLink.current] as HTMLElement).focus();
                } else if (e.code === 'ArrowLeft') {
                    e.preventDefault();
                    focusLink.current =
                        focusLink.current - 1 < 0 ? ref.current.children.length - 1 : focusLink.current - 1;
                    (ref.current.children[focusLink.current] as HTMLElement).focus();
                }
            }}
            onFocus={(ev) => {
                if (ev.target === ref.current) {
                    ev.preventDefault();
                    const indexOfSelected = props.links.findIndex((x) => x.path === selected);
                    focusLink.current = indexOfSelected;
                    (ref.current.children[indexOfSelected] as HTMLElement).focus();
                }
            }}
        >
            {props.links.map((link) => (
                <NavLinkMemo
                    tabIndex={-1}
                    key={link.path}
                    className={navlink}
                    path={link.path}
                    selected={selected === link.path}
                    onNavigate={(path) => {
                        props.onClick(path);
                    }}
                >
                    {d(link.label)}
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
