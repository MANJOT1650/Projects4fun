import { useState, useEffect, useRef, useCallback } from 'react';
import { CELL_SIZE, DIFFICULTIES, MAPS } from '../constants';

const DEFAULT_WIDTH = 500;
const DEFAULT_HEIGHT = 500;

export function useSnakeGame() {
    const [gameState, setGameState] = useState('MENU'); // MENU, PLAYING, GAME_OVER
    const [score, setScore] = useState(0);
    const [difficulty, setDifficulty] = useState('Medium');
    const [selectedMap, setSelectedMap] = useState('Classic');

    // Game Objects
    const [snake, setSnake] = useState([]);
    const [food, setFood] = useState(null);
    const [walls, setWalls] = useState([]);

    // Refs for mutable state completely handled in loop
    const directionStr = useRef('RIGHT');
    const nextDirectionStr = useRef('RIGHT');
    const frameId = useRef(0);
    const lastTime = useRef(0);

    // Computed Map Size based on difficulty (matching Python logic)
    const getMapSize = (diff) => {
        if (diff === 'Easy') return { w: 420, h: 420 };
        if (diff === 'Medium') return { w: 500, h: 500 };
        return { w: 620, h: 620 };
    };

    const currentMapSize = getMapSize(difficulty);

    const spawnFood = useCallback((currentSnake, currentWalls, w, h) => {
        let valid = false;
        let newFood = { x: 0, y: 0 };
        while (!valid) {
            const x = Math.floor(Math.random() * (w / CELL_SIZE)) * CELL_SIZE;
            const y = Math.floor(Math.random() * (h / CELL_SIZE)) * CELL_SIZE;
            newFood = { x, y };

            const inSnake = currentSnake.some(s => s.x === x && s.y === y);
            const inWall = currentWalls.some(w => w.x === x && w.y === y);

            if (!inSnake && !inWall) valid = true;
        }
        return newFood;
    }, []);

    const spawnSnake = (w, h, currentWalls) => {
        // Try to spawn in a clear area
        while (true) {
            const x = Math.floor(Math.random() * ((w / CELL_SIZE) - 10)) + 5;
            const y = Math.floor(Math.random() * ((h / CELL_SIZE) - 10)) + 5;
            const head = { x: x * CELL_SIZE, y: y * CELL_SIZE };
            const body1 = { x: (x - 1) * CELL_SIZE, y: y * CELL_SIZE };
            const body2 = { x: (x - 2) * CELL_SIZE, y: y * CELL_SIZE };

            const snakeTry = [head, body1, body2];
            const hitWall = snakeTry.some(p => currentWalls.some(wall => wall.x === p.x && wall.y === p.y));

            if (!hitWall) return snakeTry;
        }
    };

    const generateWalls = (mapType, diff, w, h) => {
        const newWalls = [];
        const cols = w / CELL_SIZE;
        const rows = h / CELL_SIZE;

        // Base Map Walls
        if (mapType === MAPS.Cross) {
            const midX = Math.floor(cols / 2);
            const midY = Math.floor(rows / 2);
            for (let x = 4; x < cols - 4; x++) newWalls.push({ x: x * CELL_SIZE, y: midY * CELL_SIZE });
            for (let y = 4; y < rows - 4; y++) newWalls.push({ x: midX * CELL_SIZE, y: y * CELL_SIZE });
        } else if (mapType === MAPS.Box) {
            const left = 4, right = cols - 5, top = 4, bottom = rows - 5;
            const gateX = Math.floor((left + right) / 2);
            const gateY = Math.floor((top + bottom) / 2);

            for (let x = left; x <= right; x++) {
                if (x !== gateX) {
                    newWalls.push({ x: x * CELL_SIZE, y: top * CELL_SIZE });
                    newWalls.push({ x: x * CELL_SIZE, y: bottom * CELL_SIZE });
                }
            }
            for (let y = top; y <= bottom; y++) {
                if (y !== gateY) {
                    newWalls.push({ x: left * CELL_SIZE, y: y * CELL_SIZE });
                    newWalls.push({ x: right * CELL_SIZE, y: y * CELL_SIZE });
                }
            }
        }

        // Difficulty Obstacles
        const info = DIFFICULTIES[diff];
        if (info && info.chunks > 0) {
            let placed = 0;
            let tries = 0;
            const forbidden = new Set(newWalls.map(p => `${p.x},${p.y}`));

            while (placed < info.chunks && tries < 500) {
                tries++;
                const cx = Math.floor(Math.random() * (cols - 16)) + 8;
                const cy = Math.floor(Math.random() * (rows - 16)) + 8;
                const horizontal = Math.random() < 0.5;

                const chunk = [];
                let ok = true;
                for (let i = 0; i < info.length; i++) {
                    const px = (cx + (horizontal ? i : 0)) * CELL_SIZE;
                    const py = (cy + (horizontal ? 0 : i)) * CELL_SIZE;
                    if (forbidden.has(`${px},${py}`)) { ok = false; break; }
                    chunk.push({ x: px, y: py });
                }

                if (ok) {
                    chunk.forEach(p => {
                        newWalls.push(p);
                        forbidden.add(`${p.x},${p.y}`);
                    });
                    placed++;
                }
            }
        }
        return newWalls;
    };

    const startGame = () => {
        directionStr.current = 'RIGHT';
        nextDirectionStr.current = 'RIGHT';
        setScore(0);

        const { w, h } = getMapSize(difficulty);
        const newWalls = generateWalls(selectedMap, difficulty, w, h);
        setWalls(newWalls);

        const newSnake = spawnSnake(w, h, newWalls);
        setSnake(newSnake);
        setFood(spawnFood(newSnake, newWalls, w, h));

        setGameState('PLAYING');
    };

    const handleGameOver = () => {
        setGameState('GAME_OVER');
        try {
            const history = JSON.parse(localStorage.getItem('snake_history') || '[]');
            const newEntry = {
                date: new Date().toLocaleString(),
                score: score,
                map: selectedMap,
                difficulty: difficulty
            };
            history.unshift(newEntry);
            if (history.length > 50) history.pop(); // Keep last 50
            localStorage.setItem('snake_history', JSON.stringify(history));
        } catch (e) {
            console.error(e);
        }
    };

    const tick = () => {
        if (gameState !== 'PLAYING') return;

        directionStr.current = nextDirectionStr.current;

        // Move Head
        const head = snake[0];
        let newHead = { ...head };

        switch (directionStr.current) {
            case 'UP': newHead.y -= CELL_SIZE; break;
            case 'DOWN': newHead.y += CELL_SIZE; break;
            case 'LEFT': newHead.x -= CELL_SIZE; break;
            case 'RIGHT': newHead.x += CELL_SIZE; break;
        }

        const { w, h } = currentMapSize;

        // Wrap World
        if (selectedMap === MAPS.WrapWorld) {
            newHead.x = (newHead.x + w) % w;
            newHead.y = (newHead.y + h) % h;
        } else {
            // Wall bounds check
            if (newHead.x < 0 || newHead.x >= w || newHead.y < 0 || newHead.y >= h) {
                handleGameOver();
                return;
            }
        }

        // Collision Check
        const hitWall = walls.some(wall => wall.x === newHead.x && wall.y === newHead.y);
        const hitSelf = snake.some(part => part.x === newHead.x && part.y === newHead.y);

        if (hitWall || hitSelf) {
            handleGameOver();
            return;
        }

        // Eat Food
        const newSnake = [newHead, ...snake];
        if (newHead.x === food.x && newHead.y === food.y) {
            setScore(s => s + 10);
            setFood(spawnFood(newSnake, walls, w, h));
        } else {
            newSnake.pop();
        }

        setSnake(newSnake);
    };

    // Game Loop
    useEffect(() => {
        if (gameState !== 'PLAYING') return;

        const speed = DIFFICULTIES[difficulty].speed;
        const interval = setInterval(tick, speed);
        return () => clearInterval(interval);
    }, [gameState, snake, food, directionStr, walls, difficulty, selectedMap]);
    // Note: snake/food dependencies make this run every tick, which works but isn't optimized for re-renders. 
    // However, for React State updates, the interval will be recreated, ensuring fresh state closure.
    // Given the low speed (100ms+), this is fine. For 60fps, we'd use requestAnimationFrame and a ref for snake.

    // Keyboard Controls
    useEffect(() => {
        const handleKey = (e) => {
            const key = e.key;
            const current = directionStr.current;
            if (key === 'ArrowUp' && current !== 'DOWN') nextDirectionStr.current = 'UP';
            if (key === 'ArrowDown' && current !== 'UP') nextDirectionStr.current = 'DOWN';
            if (key === 'ArrowLeft' && current !== 'RIGHT') nextDirectionStr.current = 'LEFT';
            if (key === 'ArrowRight' && current !== 'LEFT') nextDirectionStr.current = 'RIGHT';
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    return {
        gameState,
        score,
        difficulty,
        setDifficulty,
        selectedMap,
        setSelectedMap,
        snake,
        food,
        walls,
        currentMapSize,
        startGame,
        setGameState,
    };
}
