import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { List } from 'shared/ui/components';

function filler() {
    return Math.random();
}

export default {
    component: List,
    title: 'components/List',
    args: {
        children: Array.from({ length: 100 })
            .fill(filler)
            .map(function (x, ind) {
                return (
                    <div className="depth-1" key={filler()}>
                        {ind}
                    </div>
                );
            }),
    },
} as ComponentMeta<typeof List>;

const Template: ComponentStory<typeof List> = (arguments_) => <List {...arguments_} />;

export const Primary = Template.bind({});
