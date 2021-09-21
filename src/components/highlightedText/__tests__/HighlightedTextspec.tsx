import React from 'react';
import { render } from '@testing-library/react';

import { HighlightedTerm, HighlightedTermProps, getHightlights } from '../HighlightedText';
import styles from '../HighlightedTerm.module.css';

describe('HighlightedTerm', () => {
    const props: HighlightedTermProps = {
        text: 'dames truien',
        searchTerm: 'tru',
        className: 'normalStyle',
        hightLightedClassName: 'boldStyle',
    };

    it('should highlight only search term', () => {
        const { getByText } = render(<HighlightedTerm {...props} />);

        expect(getByText('dames')).not.toHaveClass(styles.bold);
        expect(getByText('tru')).toHaveClass(styles.bold);
        expect(getByText('ien')).not.toHaveClass(styles.bold);
    });

    it('should apply custom styling', () => {
        const { getByText } = render(<HighlightedTerm {...props} />);

        expect(getByText('dames')).toHaveClass(props.className!);
        expect(getByText('tru')).toHaveClass(props.hightLightedClassName!);
        expect(getByText('ien')).toHaveClass(props.className!);
    });

    it('should render item as a link', () => {
        const renderHighlight = (value: string): JSX.Element => (
            <a href={value} key={value}>
                {value}
            </a>
        );

        const { getByText } = render(<HighlightedTerm {...props} renderHighlight={renderHighlight} />);

        getByText('dames');
        expect(getByText('tru')).toHaveAttribute('href', 'tru');
        getByText('ien');
    });

    describe('getHightlights', () => {
        it('should return empty array if term is empty string', () => {
            expect(getHightlights('', 'search')).toEqual([]);
        });

        it('should return whole term if seacrh string is not found', () => {
            expect(getHightlights('test string', 'search term')).toEqual([
                {
                    substr: 'test string',
                    isSearchTerm: false,
                },
            ]);
        });

        it('should find search term in the middle of the sentence', () => {
            expect(getHightlights('this is test string', 'test')).toEqual([
                {
                    substr: 'this is ',
                    isSearchTerm: false,
                },
                {
                    substr: 'test',
                    isSearchTerm: true,
                },
                {
                    substr: ' string',
                    isSearchTerm: false,
                },
            ]);
        });

        it('should find search term in the beginning of the sentence', () => {
            expect(getHightlights('test. this is string', 'test')).toEqual([
                {
                    substr: 'test',
                    isSearchTerm: true,
                },
                {
                    substr: '. this is string',
                    isSearchTerm: false,
                },
            ]);
        });

        it('should find search term in the end of the sentence', () => {
            expect(getHightlights('this is string to test', 'test')).toEqual([
                {
                    substr: 'this is string to ',
                    isSearchTerm: false,
                },
                {
                    substr: 'test',
                    isSearchTerm: true,
                },
            ]);
        });

        it('should find multiple occurances of the search term', () => {
            expect(getHightlights('test. this is test string to test', 'test')).toEqual([
                {
                    substr: 'test',
                    isSearchTerm: true,
                },
                {
                    substr: '. this is ',
                    isSearchTerm: false,
                },
                {
                    substr: 'test',
                    isSearchTerm: true,
                },
                {
                    substr: ' string to ',
                    isSearchTerm: false,
                },
                {
                    substr: 'test',
                    isSearchTerm: true,
                },
            ]);
        });

        it('should find term case insensitive', () => {
            expect(getHightlights('Test. this is teSt string to TEst', 'tesT')).toEqual([
                {
                    substr: 'Test',
                    isSearchTerm: true,
                },
                {
                    substr: '. this is ',
                    isSearchTerm: false,
                },
                {
                    substr: 'teSt',
                    isSearchTerm: true,
                },
                {
                    substr: ' string to ',
                    isSearchTerm: false,
                },
                {
                    substr: 'TEst',
                    isSearchTerm: true,
                },
            ]);
        });

        it('should find term based on regexp string', () => {
            expect(
                getHightlights(
                    'Test. http://test.com',
                    'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*(),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+',
                ),
            ).toEqual([
                {
                    substr: 'Test. ',
                    isSearchTerm: false,
                },
                {
                    substr: 'http://test.com',
                    isSearchTerm: true,
                },
            ]);
        });
    });
});
