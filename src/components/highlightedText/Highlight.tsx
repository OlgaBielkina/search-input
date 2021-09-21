import React from 'react';

export interface HighlightedTextProps {
    text: string;
    className?: string;
}

export const HighlightedText: React.FC<HighlightedTextProps> = ({ text, className = '' }) => (
    <span className={className}>{text}</span>
);
