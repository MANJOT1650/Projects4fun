import React from 'react';

export default function Menu({ onStart, onHistory, onExit }) {
    return (
        <div className="menu-container">
            <h1 className="menu-title">Ultimate Tic Tac Toe</h1>
            <div className="menu-buttons">
                <button className="menu-btn start-btn" onClick={onStart}>
                    <span className="icon">🎮</span> Start Game
                </button>
                <button className="menu-btn history-btn" onClick={onHistory}>
                    <span className="icon">📜</span> History
                </button>
                <button className="menu-btn exit-btn" onClick={onExit}>
                    <span className="icon">🚪</span> Exit
                </button>
            </div>
        </div>
    );
}
