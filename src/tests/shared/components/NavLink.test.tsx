import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import '@testing-library/jest-dom/extend-expect';

import { navlink } from '@/shared/ui/components/NavLink/index.css';

import story, { NewWindow, NavigateLink } from './NavLink.stories';
it('Open link in new window', () => {
    window.open = jest.fn();
    const arguments_ = { ...story.args, ...NewWindow.args };
    render(<NewWindow {...arguments_}></NewWindow>);
    const navLink = screen.getByText(arguments_.children);
    userEvent.click(navLink);
    expect(navLink.className).toBe(navlink);
    expect(navLink.textContent).toBe(arguments_.children);
    expect(window.open).toBeCalledWith(arguments_.path, '_blank');
});

it('Navigate link in current window', () => {
    window.open = jest.fn();
    const arguments_ = { ...story.args, ...NavigateLink.args };
    render(<NavigateLink {...arguments_}></NavigateLink>);
    const navLink = screen.getByText(arguments_.children);
    userEvent.click(navLink);
    expect(navLink.className).toBe(navlink);
    expect(navLink.textContent).toBe(arguments_.children);
    expect(window.open).toBeCalledWith(arguments_.path);
});
