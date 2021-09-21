import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { Suggestions, SuggestionsProps } from '../Suggestions';

describe('Suggestions', () => {
    const props: SuggestionsProps = {
        onSuggestionSelect: jest.fn(),
        suggestions: [
            {
                searchterm: 'test item1',
                nrResults: 1000,
            },
            {
                searchterm: 'test item 2',
                nrResults: 1000,
            },
        ],
        searchTerm: 'item',
    };

    it('should render all suggestions', () => {
        const { getByTestId } = render(<Suggestions {...props} />);

        getByTestId(props.suggestions[0].searchterm);
        getByTestId(props.suggestions[1].searchterm);
    });

    it('should select clicked item', () => {
        const { getByTestId } = render(<Suggestions {...props} />);

        fireEvent.click(getByTestId(props.suggestions[0].searchterm));

        expect(props.onSuggestionSelect).toBeCalledWith(props.suggestions[0].searchterm);
    });

    it('should select item when enter is pressed', () => {
        const { getByTestId } = render(<Suggestions {...props} />);

        fireEvent.keyPress(getByTestId(props.suggestions[0].searchterm), { key: 'Enter', code: 13, charCode: 13 });

        expect(props.onSuggestionSelect).toBeCalledWith(props.suggestions[0].searchterm);
    });
});
