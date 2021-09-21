import React from 'react';
import { HighlightedText } from './Highlight';
import styles from './HighlightedText.module.css';

export interface HighlightedTermProps {
    searchTerm: string;
    text: string;
    className?: string;
    hightLightedClassName?: string;
    renderHighlight?: (value: string, isSearchTerm: boolean) => JSX.Element;
}

interface Term {
    substr: string;
    isSearchTerm: boolean;
}

export const getHightlights = (str: string, searchStr: string): Term[] => {
    const res: Term[] = [];

    if (!str) return res;
    if (!searchStr) return [{ substr: str, isSearchTerm: false }];

    const regex = new RegExp(searchStr, 'gi');

    let lastOffset = 0;

    str.replace(regex, (val, offset) => {
        if (lastOffset !== offset - lastOffset) {
            res.push({
                substr: str.substr(lastOffset, offset - lastOffset),
                isSearchTerm: false,
            });
        }
        res.push({
            substr: val,
            isSearchTerm: true,
        });
        lastOffset = offset + val.length;

        return val;
    });

    if (lastOffset !== str.length) {
        res.push({
            substr: str.substr(lastOffset),
            isSearchTerm: false,
        });
    }

    return res;
};

export const HighlightedTerm: React.FC<HighlightedTermProps> = ({
    text,
    searchTerm,
    className = '',
    hightLightedClassName = '',
    renderHighlight,
}) => {
    return (
        <>
            {getHightlights(text, searchTerm).map((term, index) =>
                renderHighlight ? (
                    renderHighlight(term.substr, term.isSearchTerm)
                ) : (
                    <HighlightedText
                        key={`${term.substr}${index}`}
                        text={term.substr}
                        className={term.isSearchTerm ? `${styles.bold} ${hightLightedClassName}` : className}
                    />
                ),
            )}
        </>
    );
};
