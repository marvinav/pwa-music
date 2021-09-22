import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import '../../index.scss';
import { NavLink } from './index';

export default {
    component: NavLink,
    title: 'Components/NavLink',
    args: {
        path: 'https://google.com',
        children: 'google',
        onNavigate: (path) => {
            window.open(path, '_blank');
        },
    },
} as ComponentMeta<typeof NavLink>;

const Template: ComponentStory<typeof NavLink> = (args) => <NavLink {...args} />;

export const Primary = Template.bind({});

export const Focusable = Template.bind({});
Focusable.args = { className: 'special-font focusable' };

export const FocusabeleInFocus = Template.bind({});
FocusabeleInFocus.args = { className: 'special-font focusable' };
FocusabeleInFocus.parameters = { pseudo: { focus: true } };
