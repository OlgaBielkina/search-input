import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Suggestions, SuggestionsProps } from '../Suggestions';

export default {
    title: 'Components/Suggestions',
    component: Suggestions,
    argTypes: {
        onSuggestionSelect: { action: 'onSuggestionSelect' },
        suggestions: {
            description: 'Array of objects containing suggestion text and number of results',
        },
        searchTerm: {
            description: 'Word to search for and highlight in suggestions',
            control: {
                type: 'text',
            },
        },
    },
} as Meta<SuggestionsProps>;

const Template: Story<SuggestionsProps> = (args: SuggestionsProps) => <Suggestions {...args} />;

export const SuggestionsList = Template.bind({});

SuggestionsList.args = {
    suggestions: [
        {
            searchterm: 'Test, test, test',
            nrResults: 100,
        },
        {
            searchterm: 'Hello world',
            nrResults: 5,
        },
        {
            searchterm: 'Hello test world',
            nrResults: 14,
        },
        {
            searchterm: 'Very long test test test test test test test test test test test test test test test test ',
            nrResults: 14,
        },
    ],
    searchTerm: 'test',
};
