import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSearch, SearchData } from '../../../hooks/useSearch';
import { SearchInput } from '../SearchInput';
import { UseQueryResult } from 'react-query';

jest.mock('../../../hooks/useSearch');

describe('SearchInput', () => {
    const props = {
        onChange: jest.fn(),
        onSelect: jest.fn(),
        placeholder: 'Search test',
    };
    const searchData = {
        data: undefined,
        refetch: jest.fn(),
        isLoading: false,
    };

    const mockUseSearch = useSearch as jest.Mock<Partial<UseQueryResult<SearchData>>, unknown[]>;

    it('should render search input', () => {
        mockUseSearch.mockReturnValue(searchData);
        const { getByPlaceholderText } = render(<SearchInput {...props} />);

        getByPlaceholderText('Search test');
    });

    it('should start search only after the third character was entered', () => {
        mockUseSearch.mockReturnValue(searchData);
        const { getByTestId } = render(<SearchInput {...props} />);

        const inputEl = getByTestId('search-input');
        expect(inputEl).toBeInTheDocument();
        userEvent.type(inputEl, 't');

        expect(inputEl).toHaveValue('t');
        expect(searchData.refetch).not.toHaveBeenCalled();

        userEvent.type(inputEl, 'e');

        expect(inputEl).toHaveValue('te');
        expect(searchData.refetch).not.toHaveBeenCalled();

        userEvent.type(inputEl, 's');

        expect(inputEl).toHaveValue('tes');
        expect(searchData.refetch).toHaveBeenCalled();
        expect(mockUseSearch).toHaveBeenCalledWith('tes', { enabled: false });

        userEvent.type(inputEl, 't');

        expect(inputEl).toHaveValue('test');
        expect(searchData.refetch).toHaveBeenCalled();
        expect(mockUseSearch).toHaveBeenCalledWith('test', { enabled: false });
    });

    describe('when search button pressed', () => {
        it('should clear input', () => {
            mockUseSearch.mockReturnValue(searchData);
            const { getByText, getByTestId } = render(<SearchInput {...props} />);

            const inputEl = getByTestId('search-input');
            userEvent.type(inputEl, 't');
            expect(inputEl).toHaveValue('t');

            fireEvent.click(getByText('close'));

            expect(inputEl).toHaveValue('');
        });

        it('should call onChange callback', () => {
            mockUseSearch.mockReturnValue(searchData);
            const { getByText, getByTestId } = render(<SearchInput {...props} />);

            const inputEl = getByTestId('search-input');
            userEvent.type(inputEl, 't');
            expect(inputEl).toHaveValue('t');

            fireEvent.click(getByText('close'));

            expect(props.onChange).toHaveBeenCalledWith('');
        });

        it('should handle keyboard enter', () => {
            mockUseSearch.mockReturnValue(searchData);
            const { getByText, getByTestId } = render(<SearchInput {...props} />);

            const inputEl = getByTestId('search-input');
            userEvent.type(inputEl, 't');
            expect(inputEl).toHaveValue('t');

            fireEvent.keyPress(getByText('close'), { key: 'Enter', code: 13, charCode: 13 });

            expect(inputEl).toHaveValue('');
            expect(props.onChange).toHaveBeenCalledWith('');
        });
    });

    describe('when search button pressed', () => {
        it('should clear input', () => {
            mockUseSearch.mockReturnValue(searchData);
            const { getByText, getByTestId } = render(<SearchInput {...props} />);

            const inputEl = getByTestId('search-input');
            userEvent.type(inputEl, 't');
            expect(inputEl).toHaveValue('t');

            fireEvent.click(getByText('search'));

            expect(inputEl).toHaveValue('');
        });

        it('should call onSelect callback', () => {
            mockUseSearch.mockReturnValue(searchData);
            const { getByText, getByTestId } = render(<SearchInput {...props} />);

            const inputEl = getByTestId('search-input');
            userEvent.type(inputEl, 't');
            expect(inputEl).toHaveValue('t');

            fireEvent.click(getByText('search'));

            expect(props.onSelect).toHaveBeenCalledWith('t');
        });

        it('should handle keyboard enter', () => {
            mockUseSearch.mockReturnValue(searchData);
            const { getByText, getByTestId } = render(<SearchInput {...props} />);

            const inputEl = getByTestId('search-input');
            userEvent.type(inputEl, 't');
            expect(inputEl).toHaveValue('t');

            fireEvent.keyPress(getByText('search'), { key: 'Enter', code: 13, charCode: 13 });

            expect(inputEl).toHaveValue('');
            expect(props.onSelect).toHaveBeenCalledWith('t');
        });
    });
});
