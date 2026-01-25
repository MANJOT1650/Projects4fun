import React, { useState, useEffect } from 'react';
import Game from './components/Game';
import Menu from './components/Menu';
import ModeSelection from './components/ModeSelection';
import History from './components/History';
import './App.css';

function App() {
  const [view, setView] = useState('MENU');
  const [isPvP, setIsPvP] = useState(false);
  const [gameHistory, setGameHistory] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('ttt-history');
    if (savedHistory) {
      setGameHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleGameEnd = (result) => {
    const newHistory = [result, ...gameHistory];
    setGameHistory(newHistory);
    localStorage.setItem('ttt-history', JSON.stringify(newHistory));
  };

  const handleExit = () => {
    // Exit logic: in a web app, we can just reset to menu or show a splash
    // For now, let's just show an alert and reset (since we can't literally close the tab easily/safely)
    if (window.confirm("Are you sure you want to exit?")) {
      setView('MENU');
    }
  };

  return (
    <div className="App">
      <h1 className="game-title">Tic Tac Toe</h1>
      <main className="content">
        {view === 'MENU' && (
          <Menu
            onStart={() => setView('SELECTION')}
            onHistory={() => setView('HISTORY')}
            onExit={handleExit}
          />
        )}
        {view === 'SELECTION' && (
          <ModeSelection
            onSelect={(pvp) => {
              setIsPvP(pvp);
              setView('GAME');
            }}
            onBack={() => setView('MENU')}
          />
        )}
        {view === 'GAME' && (
          <Game
            isPvP={isPvP}
            onGameEnd={handleGameEnd}
            onBack={() => setView('MENU')}
          />
        )}
        {view === 'HISTORY' && (
          <History
            history={gameHistory}
            onBack={() => setView('MENU')}
          />
        )}
      </main>
    </div>
  );
}

export default App;

