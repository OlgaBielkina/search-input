import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { IconButton } from '../IconButton';

describe('IconButton', () => {
    const props = {
        onClick: jest.fn(),
        name: 'cancel',
    };

    it('should render button', () => {
        const { getByText } = render(<IconButton {...props} />);

        getByText('cancel');
    });

    it('should handle button click', () => {
        const { getByText } = render(<IconButton {...props} />);

        fireEvent.click(getByText('cancel'));

        expect(props.onClick).toBeCalledTimes(1);
    });

    it('should handle enter pressed', () => {
        const { getByText } = render(<IconButton {...props} />);

        fireEvent.keyPress(getByText('cancel'), { key: 'Enter', code: 13, charCode: 13 });

        expect(props.onClick).toBeCalledWith();
    });
});
