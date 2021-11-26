import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SvgIcon } from 'shared/ui/components';

const svg = `
<svg id="should-be-removed" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" fill="#212121"/>
<path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM3.5 12C3.5 7.30558 7.30558 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C7.30558 20.5 3.5 16.6944 3.5 12Z" fill="#212121"/>
</svg>
`;

const story: ComponentMeta<typeof SvgIcon> = {
    component: SvgIcon,
    title: 'Components/SvgIcon',
    args: {
        src: svg,
    },
};

export default story;

const Template: ComponentStory<typeof SvgIcon> = (args) => <SvgIcon {...args} />;

export const SvgIconSave = Template.bind({});
