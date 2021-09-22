import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { gitHubAvatar } from '../../constants';

import { Avatar } from './index';

export default {
    component: Avatar,
    title: 'Components/Avatar',
    args: {
        src: gitHubAvatar,
    },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});
