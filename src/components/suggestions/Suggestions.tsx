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
        <>
            {suggestions.length && (
                <ul className={styles.suggestions}>
                    {suggestions.map(({ searchterm: suggestionTerm, nrResults }) => {
                        return (
                            <li
                                data-testid={suggestionTerm}
                                tabIndex={0}
                                key={suggestionTerm}
                                className={styles.suggestion}
                                onClick={handleClick(suggestionTerm)}
                                onKeyPress={handleSelectOption(suggestionTerm)}
                            >
                                <HighlightedTerm text={suggestionTerm} searchTerm={searchTerm} />
                                <span className={styles.nrResuts}>({nrResults})</span>
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
};
