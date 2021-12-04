import { ComponentStory, ComponentMeta } from '@storybook/react';
import React, { useState } from 'react';

import { NavBar } from '@/shared/ui';

import { DictionaryProvider } from '../../__mocks__/dictionaryMock';

export default {
    component: NavBar,
    title: 'Layouts/Navbar',
    decorators: [(story) => <DictionaryProvider>{story()}</DictionaryProvider>],
    args: {
        section: '/about',
        links: [
            { id: 'home', label: 'Home', path: '/home' },
            { id: 'about', label: 'About', path: '/about' },
            { id: 'blog', label: 'Blog', path: '/blog' },
        ],
    },
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = (arguments_) => {
    const [section, setSection] = useState(arguments_.section);

    return (
        <NavBar
            {...arguments_}
            section={section}
            onClick={(path) => {
                setSection(path);
            }}
        />
    );
};

export const Primary = Template.bind({});
