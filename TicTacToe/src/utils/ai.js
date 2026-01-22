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
            return squares[a];
        }
    }
    return null;
}

function minimax(squares, depth, isMaximizing) {
    const winner = calculateWinner(squares);
    if (winner === 'O') return 10 - depth;
    if (winner === 'X') return depth - 10;
    if (squares.every(Boolean)) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (!squares[i]) {
                squares[i] = 'O';
                const score = minimax(squares, depth + 1, false);
                squares[i] = null;
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (!squares[i]) {
                squares[i] = 'X';
                const score = minimax(squares, depth + 1, true);
                squares[i] = null;
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

export function getBestMove(squares) {
    let bestScore = -Infinity;
    let move = -1;

    // If first move, take center or random corner to save computation/make it feel natural
    if (squares.filter(Boolean).length === 0) return 4;

    for (let i = 0; i < 9; i++) {
        if (!squares[i]) {
            squares[i] = 'O';
            const score = minimax(squares, 0, false);
            squares[i] = null;
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}
