import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { Spinner } from '@/shared/ui';

export default {
    component: Spinner,
    title: 'Components/Spinner',
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (arguments_) => <Spinner {...arguments_} />;

export const Primary = Template.bind({});
