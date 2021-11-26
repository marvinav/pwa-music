import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Icon } from 'shared/ui/components/Icon';

export default {
    component: Icon,
    title: 'Components/Icon',
    args: {
        src: 'https://avatars.githubusercontent.com/u/44019557',
    },
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Primary = Template.bind({});
