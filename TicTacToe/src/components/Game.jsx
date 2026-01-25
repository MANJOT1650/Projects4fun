import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Board from './Board';
import { getBestMove } from '../utils/ai';

export default function Game({ isPvP, onGameEnd, onBack }) {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    function resetGame() {
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
    }

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return { winner: squares[a], line: lines[i] };
            }
        }
        return null;
    }

    const result = calculateWinner(currentSquares);
    const isDraw = !result && currentSquares.every(sq => sq !== null);

    // Confetti effect on win and report result
    useEffect(() => {
        if (result?.winner || isDraw) {
            if (result?.winner) {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#646cff', '#ff0055', '#ffffff']
                });
            }

            onGameEnd({
                mode: isPvP ? 'PvP' : 'AI',
                winner: result ? result.winner : 'Draw',
                timestamp: new Date().toLocaleString(),
            });
        }
    }, [result?.winner, isDraw]);

    // AI Move logic
    useEffect(() => {
        if (!isPvP && !xIsNext && !result && !isDraw) {
            // AI is always 'O'
            const timeOutId = setTimeout(() => {
                const bestMoveIndex = getBestMove(currentSquares);
                if (bestMoveIndex !== -1) {
                    const nextSquares = currentSquares.slice();
                    nextSquares[bestMoveIndex] = 'O';
                    handlePlay(nextSquares);
                }
            }, 500); // 500ms delay for realism
            return () => clearTimeout(timeOutId);
        }
    }, [xIsNext, isPvP, result, currentSquares, isDraw]);


    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={move}>
                <button className="game-history-btn" onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-controls" style={{ flexDirection: 'column', gap: '1rem', padding: '1.5rem', width: '100%', maxWidth: '500px' }}>
                <div className="game-mode-display" style={{ fontSize: '1.2rem', color: '#fff' }}>
                    {isPvP ? '👥 Human vs Human' : '🤖 AI vs Human'}
                </div>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', width: '100%' }}>
                    <button className="back-btn" onClick={onBack} style={{ width: 'auto' }}>
                        ⬅ Menu
                    </button>
                    <button className="reset-btn" onClick={resetGame} style={{ width: 'auto' }}>
                        🔄 Reset
                    </button>
                </div>
            </div>
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} result={result} />
            </div>
            <div className="game-info">
                <h3>Move History</h3>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

