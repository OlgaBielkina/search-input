import React, { useCallback } from 'react';
import styles from './IconButton.module.css';

export interface IconButtonProps {
    style?: string;
    name: string;
    onClick: () => void;
}

export const IconButton: React.FC<IconButtonProps> = ({ style, name, onClick }) => {
    const handleKeyPress = useCallback(
        (event: React.KeyboardEvent<HTMLSpanElement>) => {
            if (event.charCode === 13) {
                onClick();
            }
        },
        [onClick],
    );

    return (
        <button
            type="button"
            tabIndex={0}
            className={`${styles.button} ${style}`}
            onClick={onClick}
            onKeyPress={handleKeyPress}
        >
            <span className={`material-icons-outlined ${styles.icon}`}>{name}</span>
        </button>
    );
};
