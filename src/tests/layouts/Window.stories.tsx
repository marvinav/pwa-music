import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Window } from 'shared/ui/layouts/Window';
import { DictionaryProvider } from '../__mocks__/dictionaryMock';

export default {
    component: Window,
    title: 'Layouts/Window',
    decorators: [(story) => <DictionaryProvider>{story()}</DictionaryProvider>],
    parameters: { layout: 'none' },
    args: {
        title: 'Setting Window',
        children: <div>Test</div>,
        fullSize: true,
    },
} as ComponentMeta<typeof Window>;

const Template: ComponentStory<typeof Window> = (args) => {
    return <Window {...args} />;
};

export const Primary = Template.bind({});
