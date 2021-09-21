import React from 'react';
import { Meta, Story } from '@storybook/react';
import { IconButton, IconButtonProps } from '../IconButton';

export default {
    title: 'Components/IconButton',
    description: 'Button that contains only icon from google material UI',
    component: IconButton,
    argTypes: {
        onClick: { description: 'Callback function for handling button clicks', action: 'onClick' },
        name: {
            description: 'Name of the icon from google material UI',
            control: {
                type: 'select',
                options: ['clear', 'search'],
            },
        },
        style: {
            description: 'Css class to override default styling of the button',
        },
    },
    args: {
        name: 'search',
    },
} as Meta<IconButtonProps>;

const Template: Story<IconButtonProps> = (args) => <IconButton {...args} />;

export const Button = Template.bind({});
