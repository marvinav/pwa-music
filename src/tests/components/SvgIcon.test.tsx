import React from 'react';

import { render } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import story, { SvgIconSave } from './SvgIcon.stories';

it('SVG Icon', () => {
    window.open = jest.fn();
    const args = { ...story.args, ...SvgIconSave.args };
    const { container } = render(<SvgIconSave {...args}></SvgIconSave>);
    const paths = container.querySelectorAll('path');
    const svg = container.querySelector('svg');
    expect(svg.getAttribute('id')).toBeNull();
    expect(svg.getAttribute('preserveAspectRatio')).toBe('none');
    paths.forEach((x) => {
        expect(x.getAttribute('fill')).toBe('currentColor');
    });
});
