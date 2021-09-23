import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom/extend-expect';

import story, { NewWindow, NavigateLink } from './NavLink.stories';

it('Open link in new window', () => {
    window.open = jest.fn();
    const args = { ...story.args, ...NewWindow.args };
    render(<NewWindow {...args}></NewWindow>);
    const navLink = screen.getByText(args.children);
    userEvent.click(navLink);
    expect(navLink.className).toBe('navlink');
    expect(navLink.textContent).toBe(args.children);
    expect(window.open).toBeCalledWith(args.path, '_blank');
});

it('Navigate link in current window', () => {
    window.open = jest.fn();
    const args = { ...story.args, ...NavigateLink.args };
    render(<NavigateLink {...args}></NavigateLink>);
    const navLink = screen.getByText(args.children);
    userEvent.click(navLink);
    expect(navLink.className).toBe('navlink');
    expect(navLink.textContent).toBe(args.children);
    expect(window.open).toBeCalledWith(args.path);
});
