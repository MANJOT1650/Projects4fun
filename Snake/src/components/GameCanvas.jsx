import React, { useRef, useEffect } from 'react';
import { CELL_SIZE, COLORS } from '../constants';

const GameCanvas = ({ snake, food, walls, mapSize }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Clear
        ctx.fillStyle = COLORS.APP_BG;
        ctx.fillRect(0, 0, mapSize.w, mapSize.h);

        // Draw Grid
        ctx.strokeStyle = COLORS.GRID_COLOR;
        ctx.lineWidth = 1;
        for (let x = 0; x <= mapSize.w; x += CELL_SIZE) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, mapSize.h);
            ctx.stroke();
        }
        for (let y = 0; y <= mapSize.h; y += CELL_SIZE) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(mapSize.w, y);
            ctx.stroke();
        }

        // Draw Walls
        ctx.fillStyle = COLORS.WALL_COLOR;
        ctx.strokeStyle = COLORS.WALL_OUTLINE;
        walls.forEach(w => {
            ctx.fillRect(w.x, w.y, CELL_SIZE, CELL_SIZE);
            ctx.strokeRect(w.x, w.y, CELL_SIZE, CELL_SIZE);
        });

        // Draw Food
        if (food) {
            const cx = food.x + CELL_SIZE / 2;
            const cy = food.y + CELL_SIZE / 2;
            const r = 7;

            // Glow
            ctx.fillStyle = COLORS.FOOD_GLOW;
            ctx.beginPath();
            ctx.arc(cx, cy, r + 4, 0, Math.PI * 2);
            ctx.fill();

            // Core
            ctx.fillStyle = COLORS.FOOD_MAIN;
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.fill();
        }

        // Draw Snake
        snake.forEach((part, index) => {
            const sx = part.x + CELL_SIZE / 2;
            const sy = part.y + CELL_SIZE / 2;
            const isHead = index === 0;

            ctx.strokeStyle = COLORS.SNAKE_OUTLINE;
            ctx.lineWidth = 2;

            if (isHead) {
                const size = CELL_SIZE + 6; // slightly bigger head
                const r = size / 2;
                ctx.fillStyle = COLORS.SNAKE_HEAD;
                ctx.beginPath();
                ctx.arc(sx, sy, r, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
            } else {
                const size = CELL_SIZE + 2;
                const r = size / 2;
                ctx.fillStyle = index % 2 === 0 ? COLORS.SNAKE_BODY_1 : COLORS.SNAKE_BODY_2;
                ctx.beginPath();
                ctx.arc(sx, sy, r, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
            }
        });

    }, [snake, food, walls, mapSize]);

    return (
        <canvas
            ref={canvasRef}
            width={mapSize.w}
            height={mapSize.h}
            style={{
                border: `2px solid ${COLORS.PANEL_BORDER}`,
                backgroundColor: COLORS.APP_BG,
                boxShadow: '0 0 20px rgba(0,0,0,0.5)'
            }}
        />
    );
};

export default GameCanvas;
