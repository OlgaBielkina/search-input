import { useQuery, UseQueryOptions, QueryKey } from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';

export interface Suggestion {
    searchterm: string;
    nrResults: number;
}

export interface SearchData {
    search: string;
    suggestions: Suggestion[];
}

const search = async (term: string): Promise<SearchData> => {
    const response: AxiosResponse<SearchData> = await axios.get(`http://localhost:3000/search?q=${term}`);
    return response.data;
};

export function useSearch(
    term: string,
    options: UseQueryOptions<SearchData, AxiosError<string>, SearchData, QueryKey>,
) {
    return useQuery<SearchData, AxiosError<string>>(['search', term], () => search(term), options);
}
