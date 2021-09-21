import React from 'react';
import { Meta, Story } from '@storybook/react';
import { HighlightedTerm, HighlightedTermProps } from '../HighlightedText';
import styles from './HighlightedText.module.css';

export default {
    title: 'Components/HighlightedTerm',
    component: HighlightedTerm,
    argTypes: {
        onClick: { action: 'onClick' },
        text: {
            description: 'Text to find a serch term in',
            control: {
                type: 'text',
            },
        },
        searchTerm: {
            description: 'Word that will be hghlighted in text',
            control: {
                type: 'text',
            },
        },
        className: {
            description: 'Style override for text',
            control: {
                type: 'radio',
                options: [styles.normal, ''],
            },
        },
        hightLightedClassName: {
            description: 'Style override for highligted words',
            control: {
                type: 'radio',
                options: [styles.bold, ''],
            },
        },
        renderHighlight: {
            description: 'Custom renderer function to display/highlight parts of the text',
        },
    },
    args: {
        text: 'Test. This is test text. TEST',
        searchTerm: 'test',
    },
} as Meta<HighlightedTermProps>;

const Template: Story<HighlightedTermProps> = (args: HighlightedTermProps) => <HighlightedTerm {...args} />;

export const HighlightedText = Template.bind({});

export const HighlightedTextCustomeStyle = Template.bind({});

HighlightedTextCustomeStyle.args = {
    text: 'Test. This is test text. TEST',
    searchTerm: 'test',
    className: styles.normal,
    hightLightedClassName: styles.bold,
};

export const HighlightedLink = Template.bind({});

HighlightedLink.args = {
    text: 'Please visit our site: http://google.com/test and https://google.com/test2',
    searchTerm: 'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*(),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+',
    renderHighlight: (value: string, isSearchTerm: boolean) =>
        isSearchTerm ? <a href={value}>{value}</a> : <span>{value}</span>,
};
