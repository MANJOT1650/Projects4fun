import React from 'react';
import Square from './Square';

export default function Board({ xIsNext, squares, onPlay, result }) {
    const winner = result?.winner;
    const winningLine = result?.line || [];

    function handleClick(i) {
        if (squares[i] || winner) {
            return;
        }
        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? 'X' : 'O';
        onPlay(nextSquares);
    }

    const status = winner
        ? 'Winner: ' + winner
        : squares.every(Boolean)
            ? 'Draw!'
            : 'Next player: ' + (xIsNext ? 'X' : 'O');

    return (
        <div className="game-board-container">
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} isWinningSquare={winningLine.includes(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} isWinningSquare={winningLine.includes(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} isWinningSquare={winningLine.includes(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} isWinningSquare={winningLine.includes(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} isWinningSquare={winningLine.includes(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} isWinningSquare={winningLine.includes(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} isWinningSquare={winningLine.includes(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} isWinningSquare={winningLine.includes(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} isWinningSquare={winningLine.includes(8)} />
            </div>
        </div>
    );
}
