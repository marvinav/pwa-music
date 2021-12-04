import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { Window, Content } from '@/shared/ui';

import { DictionaryProvider } from '../../__mocks__/dictionaryMock';

export default {
    component: Window,
    title: 'Layouts/Window',
    decorators: [(story) => <DictionaryProvider>{story()}</DictionaryProvider>],
    parameters: { layout: 'none' },
    args: {
        title: 'Setting Window',
        children: <Content>Test</Content>,
        fullSize: true,
    },
} as ComponentMeta<typeof Window>;

const Template: ComponentStory<typeof Window> = (arguments_) => {
    return <Window {...arguments_} />;
};

export const Primary = Template.bind({});
