import React from 'react';

export default function ModeSelection({ onSelect, onBack }) {
    return (
        <div className="selection-container">
            <h2 className="selection-title">Choose Game Mode</h2>
            <div className="selection-buttons">
                <button className="selection-btn ai-mode" onClick={() => onSelect(false)}>
                    <span className="icon">🤖</span> AI vs Human
                </button>
                <button className="selection-btn pvp-mode" onClick={() => onSelect(true)}>
                    <span className="icon">👥</span> Human vs Human
                </button>
            </div>
            <button className="back-btn" onClick={onBack}>
                ⬅ Back to Menu
            </button>
        </div>
    );
}
