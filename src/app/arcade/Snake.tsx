'use client';

import { useEffect, useRef, useState } from "react";


export function Snake() {
  const canvasRef = useRef<null | HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const CELL = 20;
    const W = 400;
    const H = 400;
    
    const snake = [{x: 10, y: 10}];
    let food = {x: 15, y: 15};
    let dx = 1, dy = 0;
    let currentScore = 0;
    let isGameOver = false;
    
    const keys = {};
    window.addEventListener('keydown', e => {
        if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -1; }
        if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = 1; }
        if (e.key === 'ArrowLeft' && dx === 0) { dx = -1; dy = 0; }
        if (e.key === 'ArrowRight' && dx === 0) { dx = 1; dy = 0; }
    });
    
    function gameLoop() {
            if (isGameOver) return;
            
            const head = {x: snake[0].x + dx, y: snake[0].y + dy};
            
            if (head.x < 0 || head.x >= W/CELL || head.y < 0 || head.y >= H/CELL || 
                snake.some(s => s.x === head.x && s.y === head.y)) {
                isGameOver = true;
                setGameOver(true);
                return;
            }
            
            snake.unshift(head);
            
            if (head.x === food.x && head.y === food.y) {
                currentScore += 10;
                setScore(currentScore);
                food = {x: Math.floor(Math.random() * W/CELL), y: Math.floor(Math.random() * H/CELL)};
            } else {
                snake.pop();
            }
            
            if(!ctx) return;
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, W, H);
            
            ctx.fillStyle = '#00ff00';
            snake.forEach(s => ctx.fillRect(s.x * CELL, s.y * CELL, CELL - 2, CELL - 2));
            
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(food.x * CELL, food.y * CELL, CELL - 2, CELL - 2);
            
            setTimeout(gameLoop, 150);
        }
        
        gameLoop();
        return () => {};
    }, []);

    return (
        <div style={{ color: 'white', textAlign: 'center' }}>
        <h1 style={{ color: '#00ff00', marginBottom: '20px' }}>🐍 SNAKE</h1>
        <canvas ref={canvasRef} width={400} height={400} style={{ border: '3px solid #00ff00', background: '#000' }} />
        <div style={{ marginTop: '20px', fontSize: '18px' }}>
            <p><strong>Controls:</strong> Arrow keys</p>
            <p style={{ color: '#ffa500', fontSize: '24px' }}>Score: {score}</p>
            {gameOver && <h2 style={{ color: '#ff0000' }}>GAME OVER!</h2>}
        </div>
        </div>
    );
}