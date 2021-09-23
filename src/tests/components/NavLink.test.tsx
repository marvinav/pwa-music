import React from 'react';

import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import story, { Primary, Focusable } from './NavLink.stories';

it('renders the button in the primary state', () => {
    const { container } = render(<Primary {...story.args} />);
    expect(container.tagName).toBe('DIV');
});

it('renders the button in the Focusable state', () => {
    const args = { ...story.args, ...Focusable.args };
    const { asFragment } = render(<Focusable {...args} />);
    expect(asFragment().firstChild).toBe('DIV');
    expect(screen.getByLabelText('t')).toBeEmptyDOMElement();
});
