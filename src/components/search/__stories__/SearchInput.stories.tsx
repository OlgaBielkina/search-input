import React from 'react';
import { Meta, Story } from '@storybook/react';
import { SearchInput, SearchInputProps } from '../SearchInput';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

export default {
    title: 'Components/SearchInput',
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

// Search.loaders = [
//     async () => ({
//         suggestions: Promise.resolve({
//             search: 'default',
//             suggestions: [
//                 {
//                     searchterm: 'heren truien en dames truien',
//                     nrResults: 1100,
//                 },
//                 {
//                     searchterm: 'truien dames truien',
//                     nrResults: 1501,
//                 },
//                 {
//                     searchterm: 'kenzo trui',
//                     nrResults: 62,
//                 },
//                 {
//                     searchterm: 'kenzo trui dames',
//                     nrResults: 21,
//                 },
//                 {
//                     searchterm: 'kenzo trui heren tru',
//                     nrResults: 12,
//                 },
//             ],
//         }),
//     }),
// ];
