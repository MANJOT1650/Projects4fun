import React, { useState, useEffect } from 'react';
import { useSnakeGame } from './hooks/useSnakeGame';
import Menu from './components/Menu';
import Options from './components/Options';
import History from './components/History';
import GameCanvas from './components/GameCanvas';
import Button from './components/Button';
import { COLORS } from './constants';
import './index.css';

function App() {
  const [view, setView] = useState('MENU'); // MENU, OPTIONS, HISTORY, GAME
  const [highScore, setHighScore] = useState(0);

  const game = useSnakeGame();
  const {
    gameState,
    score,
    startGame,
    setGameState,
    difficulty,
    setDifficulty,
    selectedMap,
    setSelectedMap
  } = game;

  // Load High Score for Menu
  useEffect(() => {
    if (view === 'MENU') {
      const hist = JSON.parse(localStorage.getItem('snake_history') || '[]');
      if (hist.length > 0) {
        const max = Math.max(...hist.map(h => parseInt(h.score) || 0));
        setHighScore(max);
      } else {
        setHighScore(0);
      }
    }
  }, [view]);

  // Handle Game Over -> Menu transition if needed, or just staying in Game view with overlay
  // Here we keep view='GAME' but show overlay if gameState='GAME_OVER'

  const handleStart = () => {
    startGame();
    setView('GAME');
  };

  const handleGoMenu = () => {
    setGameState('MENU');
    setView('MENU');
  };

  return (
    <div className="app-container" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      {view === 'MENU' && (
        <Menu
          onStart={handleStart}
          onShowOptions={() => setView('OPTIONS')}
          onShowHistory={() => setView('HISTORY')}
          highScore={highScore}
        />
      )}

      {view === 'OPTIONS' && (
        <Options
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          selectedMap={selectedMap}
          setSelectedMap={setSelectedMap}
          onBack={() => setView('MENU')}
        />
      )}

      {view === 'HISTORY' && (
        <History onBack={() => setView('MENU')} />
      )}

      {view === 'GAME' && (
        <div style={{ position: 'relative' }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            maxWidth: '600px',
            marginBottom: '10px'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Score: {score}</div>
            <Button onClick={handleGoMenu} style={{ width: 'auto', padding: '10px 20px', fontSize: '1rem', margin: 0 }}>🏠 Menu</Button>
          </div>

          {/* Game Canvas */}
          <GameCanvas
            snake={game.snake}
            food={game.food}
            walls={game.walls}
            mapSize={game.currentMapSize}
          />

          {/* Game Over Overlay */}
          {gameState === 'GAME_OVER' && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              padding: '40px',
              borderRadius: '20px',
              textAlign: 'center',
              border: `2px solid ${COLORS.ACCENT}`,
              backdropFilter: 'blur(5px)'
            }}>
              <h1 style={{ color: '#ef4444', fontSize: '3rem', marginBottom: '10px' }}>GAME OVER</h1>
              <p style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Final Score: {score}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '250px' }}>
                <Button onClick={startGame}>🔄 Play Again</Button>
                <Button onClick={handleGoMenu}>🏠 Main Menu</Button>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export default App;
