import React from 'react';
import { Suggestion } from '../../hooks/useSearch';
import { HighlightedTerm } from '../highlightedText/HighlightedText';
import styles from './Suggestions.module.css';

export interface SuggestionsProps {
    suggestions: Suggestion[];
    searchTerm: string;
    onSuggestionSelect: (suggestion: string) => void;
}

export const Suggestions: React.FC<SuggestionsProps> = ({ suggestions, onSuggestionSelect, searchTerm }) => {
    const handleSelectOption = (suggestion: string) => (event: React.KeyboardEvent<HTMLLIElement>) => {
        if (event.charCode === 13) {
            onSuggestionSelect(suggestion);
        }
    };

    const handleClick = (suggestion: string) => () => onSuggestionSelect(suggestion);

    return (
        <ul className={styles.suggestions}>
            {!suggestions.length && (
                <li className={styles.suggestion}>
                    <span>
                        <HighlightedTerm
                            text={`Sorry, no results for the search ${searchTerm}`}
                            searchTerm={searchTerm}
                        />
                    </span>
                </li>
            )}
            {!!suggestions.length &&
                suggestions.map(({ searchterm: suggestionTerm, nrResults }) => {
                    return (
                        <li
                            data-testid={suggestionTerm}
                            tabIndex={0}
                            role="button"
                            key={suggestionTerm}
                            className={styles.suggestion}
                            onClick={handleClick(suggestionTerm)}
                            onKeyPress={handleSelectOption(suggestionTerm)}
                        >
                            <span>
                                <HighlightedTerm text={suggestionTerm} searchTerm={searchTerm} />
                            </span>
                            <span className={styles.nrResuts}>({nrResults})</span>
                        </li>
                    );
                })}
        </ul>
    );
};
