import React from 'react';
import { Meta, Story } from '@storybook/react';
import { SearchInput, SearchInputProps } from '../SearchInput';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

export default {
    title: 'Components/SearchInput',
    description:
        'Component designed for the user to enter search queries into. It will fetch suggestions from API ebdpoint and show them in dropdown.',
    component: SearchInput,
    decorators: [
        (Story) => (
            <QueryClientProvider client={queryClient}>
                <Story />
            </QueryClientProvider>
        ),
    ],
    argTypes: {
        onChange: { action: 'onChange' },
        onSelect: { action: 'onSelect' },
        placeholder: {
            description: 'Text Input placeholder',
            control: {
                type: 'text',
            },
        },
    },
} as Meta<SearchInputProps>;

const Template: Story<SearchInputProps> = (args: SearchInputProps) => <SearchInput {...args} />;

export const Search = Template.bind({});
