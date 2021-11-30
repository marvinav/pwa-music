import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { Icon } from 'shared/ui/components';

export default {
    component: Icon,
    title: 'Components/Icon',
    args: {
        src: 'https://avatars.githubusercontent.com/u/44019557',
    },
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (arguments_) => <Icon {...arguments_} />;

export const Primary = Template.bind({});
