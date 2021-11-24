import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NavLink } from '../../components/NavLink/index';

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

const Template: ComponentStory<typeof NavLink> = (args) => <NavLink {...args} />;

export const NewWindow = Template.bind({});

export const NavigateLink = Template.bind({});

NavigateLink.args = {
    path: '#header',
    children: 'Header',
    onNavigate: (path) => {
        window.open(path);
    },
};
