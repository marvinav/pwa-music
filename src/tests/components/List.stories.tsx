import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { List } from 'shared/ui/components';

function filler() {
    return Math.random();
}

export default {
    component: List,
    title: 'components/List',
    args: {
        children: new Array(100).fill(filler).map(function (x, ind) {
            return (
                <div className="depth-1" key={filler()}>
                    {ind}
                </div>
            );
        }),
    },
} as ComponentMeta<typeof List>;

const Template: ComponentStory<typeof List> = (args) => <List {...args} />;

export const Primary = Template.bind({});
