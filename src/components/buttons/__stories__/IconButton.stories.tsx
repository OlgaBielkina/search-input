import React from 'react';
import { Meta, Story } from '@storybook/react';
import { IconButton, IconButtonProps } from '../IconButton';

export default {
    title: 'Components/IconButton',
    component: IconButton,
    argTypes: {
        onClick: { action: 'onClick' },
        name: {
            description: 'Name of the icon from google material UI',
            control: {
                type: 'select',
                options: ['clear', 'search'],
            },
        },
    },
    args: {
        name: 'search',
    },
} as Meta<IconButtonProps>;

const Template: Story<IconButtonProps> = (args) => <IconButton {...args} />;

export const Button = Template.bind({});
