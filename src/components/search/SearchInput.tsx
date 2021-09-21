import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useSearch } from '../../hooks/useSearch';
import { Suggestions } from '../suggestions/Suggestions';
import { IconButton } from '../buttons/IconButton';
import styles from './SearchInput.module.css';

export interface SearchInputProps {
    onChange?: (value: string) => void;
    onSelect?: (value: string) => void;
    placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onChange, onSelect, placeholder = 'Zoeken' }) => {
    const ref = useRef<HTMLInputElement | null>(null);
    const [value, setValue] = useState<string>('');
    const { data, refetch, isError, isFetched, isLoading } = useSearch(value, {
        enabled: false,
    });
    const debouncedRefetch = useDebouncedCallback(refetch, 300, { leading: true });

    // filtering should be done on a server side. This part of code is for demo purpose only
    let suggestions = data ? data.suggestions : [];
    if (data && isFetched) {
        suggestions = suggestions.filter((suggestion) => suggestion.searchterm.indexOf(value) !== -1);
    }

    if (isError) {
        console.error('API failed to fetch data. Report error.');
    }

    const selectSuggetion = useCallback((suggestion: string) => {
        console.log('chosen element - ', suggestion);
        setValue('');
        if (suggestion.trim() && onSelect) {
            onSelect(suggestion);
        }
    }, []);

    const handleSelect = () => selectSuggetion(value);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = event.target.value;
            setValue(newValue);
            if (onChange) {
                onChange(newValue);
            }
        },
        [onChange],
    );

    const handleKeyPressSelect = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.charCode === 13) {
                selectSuggetion(value);
            }
        },
        [selectSuggetion, value],
    );

    const handleClear = useCallback(() => {
        setValue('');
        ref.current && ref.current.focus();
        if (onChange) {
            onChange('');
        }
    }, [onChange]);

    useEffect(() => {
        if (value.length >= 3) {
            debouncedRefetch();
        }
    }, [value, debouncedRefetch]);

    return (
        <div className={styles.container}>
            <span className={styles.search}>
                <input
                    ref={ref}
                    data-testid="search-input"
                    tabIndex={0}
                    className={styles.input}
                    type="search"
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    onKeyPress={handleKeyPressSelect}
                />
                <div className={styles.icons}>
                    <IconButton
                        name="close"
                        style={`${styles.clearIcon} ${value ? '' : styles.hidden}`}
                        onClick={handleClear}
                    />
                    <IconButton name="search" style={styles.searchIcon} onClick={handleSelect} />
                </div>
            </span>
            {!isError && isFetched && (
                <Suggestions suggestions={suggestions} searchTerm={value} onSuggestionSelect={selectSuggetion} />
            )}
        </div>
    );
};
