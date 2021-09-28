import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { gitHubAvatar } from '../../constants';

import { Icon } from '../../components/Icon';

export default {
    component: Icon,
    title: 'Components/Icon',
    args: {
        src: gitHubAvatar,
    },
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Primary = Template.bind({});
