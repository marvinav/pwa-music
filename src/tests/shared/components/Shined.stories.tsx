import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { Shined } from '@/shared/ui';

export default {
    component: Shined,
    title: 'Components/Shined',
    args: {
        children: (properties) => {
            return (
                <div
                    onMouseEnter={properties.onMouseEnter}
                    onMouseLeave={properties.onMouseLeave}
                    onMouseMove={properties.onMouseMove}
                    style={{
                        width: '150px',
                        height: '150px',
                    }}
                >
                    {properties.shine}
                </div>
            );
        },
    },
} as ComponentMeta<typeof Shined>;

const Template: ComponentStory<typeof Shined> = (arguments_) => <Shined {...arguments_} />;

export const Primary = Template.bind({});
