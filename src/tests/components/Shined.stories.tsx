import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Shined } from '../../shared/ui/components/Shined';

export default {
    component: Shined,
    title: 'Components/Shined',
    args: {
        children: (props) => {
            return (
                <div
                    onMouseEnter={props.onMouseEnter}
                    onMouseLeave={props.onMouseLeave}
                    onMouseMove={props.onMouseMove}
                    style={{
                        width: '150px',
                        height: '150px',
                    }}
                >
                    {props.shine}
                </div>
            );
        },
    },
} as ComponentMeta<typeof Shined>;

const Template: ComponentStory<typeof Shined> = (args) => <Shined {...args} />;

export const Primary = Template.bind({});
