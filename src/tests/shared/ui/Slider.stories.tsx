import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Slider } from '@/shared/ui';

export default {
    component: Slider,
    title: 'Components/Slider',
    args: {},
} as ComponentMeta<typeof Slider>;

const Template: ComponentStory<typeof Slider> = (arguments_) => {
    return <Slider {...arguments_} />;
};

export const Primary = Template.bind({});
