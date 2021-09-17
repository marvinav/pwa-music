import React from 'react';
import { useRef } from 'react';
import { NavLink } from '../../components/NavLink';
import { useDictionary } from '../../contexts/DictionaryContext';

import './index.scss';

const items = [undefined, 'blog', 'about'];

export function NavBar(props: { onClick: (path: string) => void; section: string | undefined }) {
    const { d } = useDictionary();
    const [selected, setSelected] = React.useState(props.section);
    const focusLink = useRef(0);
    const ref = useRef<HTMLElement>();
    React.useEffect(() => {
        setSelected(props.section);
    }, [props.section]);

    return (
        <nav
            ref={ref}
            id="nav-bar"
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
                    const indexOfSelected = items.findIndex((x) => x === selected);
                    focusLink.current = indexOfSelected;
                    (ref.current.children[indexOfSelected] as HTMLElement).focus();
                }
            }}
        >
            <NavLinkMemo
                tabIndex={-1}
                key="/"
                className="special-font focusable"
                path="/"
                selected={selected === undefined}
                onNavigate={(path) => {
                    props.onClick(path);
                }}
            >
                {d('Home')}
            </NavLinkMemo>
            <NavLinkMemo
                tabIndex={-1}
                key="/blog"
                className="special-font focusable"
                path="/blog"
                selected={selected === 'blog'}
                onNavigate={(path) => {
                    props.onClick(path);
                }}
            >
                {d('Blog')}
            </NavLinkMemo>
            <NavLinkMemo
                tabIndex={-1}
                key="/about"
                className="special-font focusable"
                path="/about"
                selected={selected === 'about'}
                onNavigate={(path) => {
                    props.onClick(path);
                }}
            >
                {d('About')}
            </NavLinkMemo>
        </nav>
    );
}

const NavLinkMemo = React.memo(NavLink, (p, n) => {
    return p.selected === n.selected && p.disabled === n.disabled && p.path === n.path && p.children === n.children;
});
