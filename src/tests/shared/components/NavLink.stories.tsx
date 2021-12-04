import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { NavLink } from '@/shared/ui';

const story: ComponentMeta<typeof NavLink> = {
    component: NavLink,
    title: 'Components/NavLink',
    args: {
        path: 'https://google.com',
        children: 'google',
        onNavigate: (path) => {
            window.open(path, '_blank');
        },
    },
};

export default story;

const Template: ComponentStory<typeof NavLink> = (arguments_) => <NavLink {...arguments_} />;

export const NewWindow = Template.bind({});

export const NavigateLink = Template.bind({});

NavigateLink.args = {
    path: '#header',
    children: 'Header',
    onNavigate: (path) => {
        window.open(path);
    },
};
