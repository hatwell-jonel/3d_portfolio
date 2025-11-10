'use client';

import { useState } from "react";


export function Sudoku() {
    const [board, setBoard] = useState(() => {
        const puzzle = [
        [5,3,0,0,7,0,0,0,0],
        [6,0,0,1,9,5,0,0,0],
        [0,9,8,0,0,0,0,6,0],
        [8,0,0,0,6,0,0,0,3],
        [4,0,0,8,0,3,0,0,1],
        [7,0,0,0,2,0,0,0,6],
        [0,6,0,0,0,0,2,8,0],
        [0,0,0,4,1,9,0,0,5],
        [0,0,0,0,8,0,0,7,9]
        ];
        return puzzle;
    });
    
    const [selected, setSelected] = useState<{ row: number; col: number; } | null>(null);
    
    const handleClick = (row: number, col: number) => {
        setSelected({row, col});
    };
    
    const handleNumber = (num: number) => {
        if (!selected) return;
        const newBoard = board.map(r => [...r]);
        newBoard[selected.row][selected.col] = num;
        setBoard(newBoard);
    };
    
    return (
        <div style={{ color: 'white', textAlign: 'center' }}>
        <h1 style={{ color: '#00ffff', marginBottom: '20px' }}>🔢 SUDOKU</h1>
        <div style={{ display: 'inline-block', background: '#000', padding: '10px', borderRadius: '10px' }}>
            {board.map((row, i) => (
            <div key={i} style={{ display: 'flex' }}>
                {row.map((cell, j) => (
                <div
                    key={j}
                    onClick={() => handleClick(i, j)}
                    style={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid #444',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    background: selected?.row === i && selected?.col === j ? '#00ffff' : '#1a1a1a',
                    color: cell === 0 ? '#666' : '#fff',
                    fontSize: '20px',
                    fontWeight: 'bold'
                    }}
                >
                    {cell || ''}
                </div>
                ))}
            </div>
            ))}
        </div>
        <div style={{ marginTop: '20px' }}>
            {[1,2,3,4,5,6,7,8,9].map(num => (
            <button
                key={num}
                onClick={() => handleNumber(num)}
                style={{
                margin: '5px',
                padding: '10px 15px',
                fontSize: '18px',
                background: '#00ffff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                color: '#000'
                }}
            >
                {num}
            </button>
            ))}
            <button
            onClick={() => handleNumber(0)}
            style={{
                margin: '5px',
                padding: '10px 15px',
                fontSize: '18px',
                background: '#ff0000',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                color: '#fff'
            }}
            >
            Clear
            </button>
        </div>
        </div>
    );
}