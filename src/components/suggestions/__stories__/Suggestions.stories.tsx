import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Suggestions, SuggestionsProps } from '../Suggestions';

export default {
    title: 'Components/Sugggestions',
    component: Suggestions,
    argTypes: {
        onSuggestionSelect: { action: 'onClick' },
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
    args: {
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
        ],
        searchTerm: 'test',
    },
} as Meta<SuggestionsProps>;

const Template: Story<SuggestionsProps> = (args) => <Sugggestions {...args} />;

export const Sugggestions = Template.bind({});
