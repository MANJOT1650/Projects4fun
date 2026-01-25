import React from 'react';

export default function Square({ value, onSquareClick, isWinningSquare }) {
    return (
        <button
            className={`square ${value ? 'filled' : ''} ${isWinningSquare ? 'winning' : ''}`}
            onClick={onSquareClick}
            data-value={value}
        >
            {value}
        </button>
    );
}
