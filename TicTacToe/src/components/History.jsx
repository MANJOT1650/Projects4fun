import React from 'react';

export default function History({ history, onBack }) {
    const aiGames = history.filter(game => game.mode === 'AI');
    const pvpGames = history.filter(game => game.mode === 'PvP');

    const renderGameList = (games, title) => (
        <div className="history-section">
            <h3>{title}</h3>
            {games.length === 0 ? (
                <p className="no-history">No games played yet.</p>
            ) : (
                <ul className="history-list">
                    {games.map((game, index) => (
                        <li key={index} className="history-item">
                            <span className="game-result">
                                {game.winner === 'Draw' ? '🤝 Draw' : `🏆 ${game.winner} Won`}
                            </span>
                            <span className="game-time">{game.timestamp}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

    return (
        <div className="history-container">
            <h2 className="history-title">Game History</h2>
            <div className="history-content">
                {renderGameList(aiGames, "🤖 AI vs Human")}
                {renderGameList(pvpGames, "👥 Human vs Human")}
            </div>
            <button className="back-btn" onClick={onBack}>
                ⬅ Back to Menu
            </button>
        </div>
    );
}
