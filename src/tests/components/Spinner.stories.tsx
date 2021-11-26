import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Spinner } from '../../shared/ui/components/Spinner';

export default {
    component: Spinner,
    title: 'Components/Spinner',
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args) => <Spinner {...args} />;

export const Primary = Template.bind({});
