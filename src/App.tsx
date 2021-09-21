import React, { Component } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SearchInput } from './components/search/SearchInput';

const queryClient = new QueryClient();

class App extends Component {
    render() {
        return (
            <QueryClientProvider client={queryClient}>
                <SearchInput />
            </QueryClientProvider>
        );
    }
}

export default App;
