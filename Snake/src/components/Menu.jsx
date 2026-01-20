import React from 'react';
import Button from './Button';
import { COLORS } from '../constants';

const Menu = ({ onStart, onShowOptions, onShowHistory, highScore }) => {
    return (
        <div className="card" style={{
            backgroundColor: COLORS.PANEL_BG,
            border: `2px solid ${COLORS.PANEL_BORDER}`,
            padding: '40px',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '15px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
            <h1 style={{
                fontSize: '3.5rem',
                marginBottom: '10px',
                color: COLORS.ACCENT
            }}>
                🐍 Snake Game
            </h1>

            <h2 style={{
                fontSize: '1.8rem',
                color: COLORS.TEXT_MAIN,
                marginBottom: '20px'
            }}>
                🏆 High Score: {highScore}
            </h2>

            <Button onClick={onStart}>▶ Start New Game</Button>
            <Button onClick={onShowOptions}>⚙ Options</Button>
            <Button onClick={onShowHistory}>📜 Score History</Button>
            <Button onClick={() => window.close()}>❌ Exit</Button>
        </div>
    );
};

export default Menu;
