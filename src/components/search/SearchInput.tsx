import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useSearch } from '../../hooks/useSearch';
import { Suggestions } from '../suggestions/Suggestions';
import { IconButton } from '../buttons/IconButton';
import styles from './SearchInput.module.css';
import { transformFile } from '@babel/core';

export interface SearchInputProps {
    onChange?: (value: string) => void;
    onSelect?: (value: string) => void;
    placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onChange, onSelect, placeholder = 'Zoeken' }) => {
    const ref = useRef<HTMLInputElement | null>(null);
    const [value, setValue] = useState<string>('');
    const { data, refetch } = useSearch(value, {
        enabled: false,
    });

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
            refetch();
        }
    }, [value, refetch]);

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
            {data && data.suggestions && (
                <Suggestions suggestions={data.suggestions} searchTerm={value} onSuggestionSelect={selectSuggetion} />
            )}
        </div>
    );
};
