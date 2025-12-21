'use client';
import { useEffect, useRef, useState } from "react";

export function Tetris() {
    const canvasRef = useRef<null | HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        const BLOCK_SIZE = 30;
        const COLS = 10;
        const ROWS = 20;
        
        const board = Array(ROWS).fill(null).map(() => Array(COLS).fill(0));
        let currentPiece = { x: 3, y: 0, shape: [[1,1],[1,1]], color: '#ff00ff' };
        let dropCounter = 0;
        let lastTime = 0;
        let currentScore = 0;
        let isGameOver = false;
        
        const pieces = [
            { shape: [[1,1,1,1]], color: '#00ffff' },
            { shape: [[1,1],[1,1]], color: '#ffff00' },
            { shape: [[1,1,1],[0,1,0]], color: '#ff00ff' },
            { shape: [[1,1,1],[1,0,0]], color: '#ff8800' },
            { shape: [[1,1,1],[0,0,1]], color: '#0088ff' }
        ];
        
        const keys: Record<string, boolean> = {};
        window.addEventListener('keydown', e => {
            keys[e.key] = true;
            if (e.key === 'ArrowLeft') move(-1);
            if (e.key === 'ArrowRight') move(1);
            if (e.key === 'ArrowDown') drop();
            if (e.key === 'ArrowUp') rotate();
        });
        
        function newPiece() {
            const piece = pieces[Math.floor(Math.random() * pieces.length)];
            currentPiece = { x: 3, y: 0, ...piece };
        }
        
        function collide() {
            for (let y = 0; y < currentPiece.shape.length; y++) {
                for (let x = 0; x < currentPiece.shape[y].length; x++) {
                if (currentPiece.shape[y][x]) {
                    const newX = currentPiece.x + x;
                    const newY = currentPiece.y + y;
                    if (newX < 0 || newX >= COLS || newY >= ROWS || (newY >= 0 && board[newY][newX])) {
                    return true;
                    }
                }
                }
            }
            return false;
        }
        
        function merge() {
            currentPiece.shape.forEach((row, y) => {
                row.forEach((value, x) => {
                if (value) {
                    const newY = currentPiece.y + y;
                    if (newY >= 0) board[newY][currentPiece.x + x] = currentPiece.color;
                }
                });
            });
        }
        
        function clearLines() {
            outer: for (let y = ROWS - 1; y >= 0; y--) {
                for (let x = 0; x < COLS; x++) {
                if (!board[y][x]) continue outer;
                }
                board.splice(y, 1);
                board.unshift(Array(COLS).fill(0));
                currentScore += 100;
                setScore(currentScore);
            }
        }
        
        function move(dir: number) {
            currentPiece.x += dir;
            if (collide()) currentPiece.x -= dir;
        }
        
        function drop() {
            currentPiece.y++;
            if (collide()) {
                currentPiece.y--;
                merge();
                clearLines();
                newPiece();
                if (collide()) {
                isGameOver = true;
                setGameOver(true);
                }
            }
        }
        
        function rotate() {
            const rotated = currentPiece.shape[0].map((_, i) => 
                currentPiece.shape.map(row => row[i]).reverse()
            );
            const prev = currentPiece.shape;
            currentPiece.shape = rotated;
            if (collide()) currentPiece.shape = prev;
        }
        
        function draw(time = 0) {
            if (isGameOver) return;
            
            const deltaTime = time - lastTime;
            lastTime = time;
            dropCounter += deltaTime;
            if (dropCounter > 1000) {
                drop();
                dropCounter = 0;
            }
            
            ctx.fillStyle = '#000';
            if (!canvas) return;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw board
            board.forEach((row, y) => {
                row.forEach((color, x) => {
                if (color) {
                    ctx.fillStyle = color;
                    ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
                }
                });
            });
            
            // Draw current piece
            currentPiece.shape.forEach((row, y) => {
                row.forEach((value, x) => {
                if (value) {
                    ctx.fillStyle = currentPiece.color;
                    ctx.fillRect((currentPiece.x + x) * BLOCK_SIZE, (currentPiece.y + y) * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
                }
                });
            });
            
            requestAnimationFrame(draw);
        }
        
        draw();
        return () => {};
    }, []);

    return (
        <div style={{ color: 'white', textAlign: 'center' }}>
        <h1 style={{ color: '#ff00ff', marginBottom: '20px' }}>🟦 TETRIS</h1>
        <canvas ref={canvasRef} width={300} height={600} style={{ border: '3px solid #ff00ff', background: '#000' }} />
        <div style={{ marginTop: '20px', fontSize: '18px' }}>
            <p><strong>Controls:</strong> Arrows to move/rotate</p>
            <p style={{ color: '#ffa500', fontSize: '24px' }}>Score: {score}</p>
            {gameOver && <h2 style={{ color: '#ff0000' }}>GAME OVER!</h2>}
        </div>
        </div>
    );
}