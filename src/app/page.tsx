'use client';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function ArcadeGame() {
  const [selectedGame, setSelectedGame] = useState('');
  
  if (!selectedGame) {
    return (
      <div style={{ color: 'white', textAlign: 'center' }}>
        <h1 style={{ color: '#00ff00', marginBottom: '30px' }}>🕹️ ARCADE GAMES</h1>
        <p style={{ fontSize: '18px', marginBottom: '30px' }}>Select a game to play:</p>
        <div style={{ display: 'grid', gap: '15px', maxWidth: '400px', margin: '0 auto' }}>
          <button
            onClick={() => setSelectedGame('spaceDodger')}
            style={{
              padding: '20px',
              fontSize: '20px',
              background: 'linear-gradient(135deg, #00ff00, #00aa00)',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
              color: '#000'
            }}
          >
            🚀 SPACE DODGER
          </button>
          <button
            onClick={() => setSelectedGame('tetris')}
            style={{
              padding: '20px',
              fontSize: '20px',
              background: 'linear-gradient(135deg, #ff00ff, #aa00aa)',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
              color: '#fff'
            }}
          >
            🟦 TETRIS
          </button>
          <button
            onClick={() => setSelectedGame('snake')}
            style={{
              padding: '20px',
              fontSize: '20px',
              background: 'linear-gradient(135deg, #ffff00, #aaaa00)',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
              color: '#000'
            }}
          >
            🐍 SNAKE
          </button>
          <button
            onClick={() => setSelectedGame('sudoku')}
            style={{
              padding: '20px',
              fontSize: '20px',
              background: 'linear-gradient(135deg, #00ffff, #0088aa)',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
              color: '#000'
            }}
          >
            🔢 SUDOKU
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <button
        onClick={() => setSelectedGame(null)}
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          padding: '10px 20px',
          background: '#ff6b35',
          border: 'none',
          borderRadius: '5px',
          color: 'white',
          cursor: 'pointer',
          fontWeight: 'bold',
          zIndex: 10
        }}
      >
        ← BACK
      </button>
      {selectedGame === 'spaceDodger' && <SpaceDodger />}
      {selectedGame === 'tetris' && <Tetris />}
      {selectedGame === 'snake' && <Snake />}
      {selectedGame === 'sudoku' && <Sudoku />}
    </div>
  );
}

function Tetris() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const BLOCK_SIZE = 30;
    const COLS = 10;
    const ROWS = 20;
    
    let board = Array(ROWS).fill().map(() => Array(COLS).fill(0));
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
    
    const keys = {};
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
    
    function move(dir) {
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

function Snake() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const CELL = 20;
    const W = 400;
    const H = 400;
    
    let snake = [{x: 10, y: 10}];
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

function Sudoku() {
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
  
  const [selected, setSelected] = useState(null);
  
  const handleClick = (row, col) => {
    setSelected({row, col});
  };
  
  const handleNumber = (num) => {
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

function SpaceDodger() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameLoopRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let playerY = 250;
    let obstacles = [];
    let frameCount = 0;
    let currentScore = 0;
    let isGameOver = false;
    
    const keys = {};
    
    const handleKeyDown = (e) => {
      keys[e.key] = true;
    };
    
    const handleKeyUp = (e) => {
      keys[e.key] = false;
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    function gameLoop() {
      if (isGameOver) return;
      
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, 600, 400);
      
      if (keys['ArrowUp'] && playerY > 20) playerY -= 5;
      if (keys['ArrowDown'] && playerY < 380) playerY += 5;
      
      ctx.fillStyle = '#00ff00';
      ctx.beginPath();
      ctx.moveTo(100, playerY);
      ctx.lineTo(80, playerY - 15);
      ctx.lineTo(80, playerY + 15);
      ctx.closePath();
      ctx.fill();
      
      if (frameCount % 60 === 0) {
        obstacles.push({
          x: 600,
          y: Math.random() * 350 + 25,
          width: 30,
          height: 30
        });
      }
      
      obstacles = obstacles.filter(obs => {
        obs.x -= 5;
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        
        if (obs.x < 100 && obs.x + obs.width > 80 &&
            obs.y < playerY + 15 && obs.y + obs.height > playerY - 15) {
          isGameOver = true;
          setGameOver(true);
        }
        
        return obs.x > -30;
      });
      
      frameCount++;
      if (frameCount % 10 === 0) {
        currentScore++;
        setScore(currentScore);
      }
      
      ctx.fillStyle = '#fff';
      ctx.font = '24px monospace';
      ctx.fillText(`Score: ${currentScore}`, 20, 40);
      
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
    
    gameLoop();
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, []);
  
  const restartGame = () => {
    setScore(0);
    setGameOver(false);
    window.location.reload();
  };
  
  return (
    <div style={{ color: 'white', textAlign: 'center' }}>
      <h1 style={{ color: '#00ff00', marginBottom: '20px' }}>🕹️ SPACE DODGER</h1>
      <canvas 
        ref={canvasRef} 
        width={600} 
        height={400}
        style={{ 
          border: '3px solid #00ff00',
          borderRadius: '10px',
          background: '#000'
        }}
      />
      <div style={{ marginTop: '20px', fontSize: '18px' }}>
        <p><strong>Controls:</strong> Arrow Up/Down to move</p>
        <p style={{ color: '#ffa500', fontSize: '24px', marginTop: '10px' }}>
          Score: {score}
        </p>
        {gameOver && (
          <div>
            <h2 style={{ color: '#ff0000', marginTop: '20px' }}>GAME OVER!</h2>
            <button
              onClick={restartGame}
              style={{
                marginTop: '20px',
                padding: '10px 30px',
                fontSize: '18px',
                background: '#00ff00',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              RESTART
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BoyRoomPortfolio() {
  const mountRef = useRef(null);
  const [section, setSection] = useState('');
  const [showModal, setShowModal] = useState(null);
  
  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x606060);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.6, 0);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);
    
    const ambient = new THREE.AmbientLight(0xffffff, 1.5 );
    scene.add(ambient);
    const light = new THREE.PointLight(0xffbb77, 1.2, 100);
    light.position.set(0, 3, 0);
    scene.add(light);
    
    const accentLight = new THREE.PointLight(0xffaa66, 1.5, 50);
    accentLight.position.set(3, 2, 0);
    scene.add(accentLight);
    
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 12),
      new THREE.MeshStandardMaterial({ 
        color: 0x505050, 
        roughness: 0.9,
        metalness: 0.05
      })
    );
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);
    
    const ceiling = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 12),
      new THREE.MeshStandardMaterial({ 
        color: 0x606060, 
        roughness: 0.85,
        metalness: 0.05
      })
    );
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 4;
    scene.add(ceiling);
    
    const wallMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x808080,
      roughness: 0.85,
      metalness: 0.05
    });
    
    const aboutWall = new THREE.Mesh(new THREE.BoxGeometry(12, 4, 0.2), wallMaterial);
    aboutWall.position.set(0, 2, -6);
    scene.add(aboutWall);
    
    const aboutPoster = createPoster('ABOUT ME\n\nDeveloper & Designer\nPassionate about coding\nLove gaming & tech', 0xff6b35);
    aboutPoster.position.set(0, 2.5, -5.9);
    aboutPoster.userData = { section: 'about' };
    scene.add(aboutPoster);
    
    const portfolioWall = new THREE.Mesh(new THREE.BoxGeometry(0.2, 4, 12), wallMaterial);
    portfolioWall.position.set(-6, 2, 0);
    scene.add(portfolioWall);
    
    const portfolioPoster = createPoster('MY PROJECTS\n\n• Cool Game\n• Website Design\n• Mobile App', 0xd62828);
    portfolioPoster.position.set(-5.9, 2.5, 0);
    portfolioPoster.rotation.y = Math.PI / 2;
    portfolioPoster.userData = { section: 'portfolio' };
    scene.add(portfolioPoster);
    
    const skillsWall = new THREE.Mesh(new THREE.BoxGeometry(0.2, 4, 12), wallMaterial);
    skillsWall.position.set(6, 2, 0);
    scene.add(skillsWall);
    
    const skillsPoster = createPoster('SKILLS\n\nJavaScript\nReact & Three.js\nHTML/CSS\nGame Dev', 0x00ff41);
    skillsPoster.position.set(5.9, 2.5, 0);
    skillsPoster.rotation.y = -Math.PI / 2;
    skillsPoster.userData = { section: 'skills' };
    scene.add(skillsPoster);
    
    const contactWall = new THREE.Mesh(new THREE.BoxGeometry(12, 4, 0.2), wallMaterial);
    contactWall.position.set(0, 2, 6);
    scene.add(contactWall);
    
    const bed = new THREE.Mesh(
      new THREE.BoxGeometry(2.5, 0.4, 2),
      new THREE.MeshStandardMaterial({ color: 0x2d2d2d })
    );
    bed.position.set(-3, 0.4, 5);
    scene.add(bed);
    
    const pillow = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.2, 0.4),
      new THREE.MeshStandardMaterial({ color: 0x1a1a1a })
    );
    pillow.position.set(-3, 0.7, 4.3);
    scene.add(pillow);
    
    const contactPoster = createPoster('CONTACT\n\nemail@example.com\nGitHub: username\nLinkedIn: yourname', 0xffa500);
    contactPoster.position.set(2, 2.5, 5.9);
    contactPoster.rotation.y = Math.PI;
    contactPoster.userData = { section: 'contact' };
    scene.add(contactPoster);
    
    const dumbbell1 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.4, 8),
      new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.8 })
    );
    dumbbell1.rotation.z = Math.PI / 2;
    dumbbell1.position.set(-5, 0.08, -5);
    scene.add(dumbbell1);
    
    const bookshelf = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1.5, 0.3),
      new THREE.MeshStandardMaterial({ color: 0x2b1f1a })
    );
    bookshelf.position.set(5, 0.75, -5);
    scene.add(bookshelf);
    
    const arcadeBase = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 1.2, 0.5),
      new THREE.MeshStandardMaterial({ color: 0x1a1a1a })
    );
    arcadeBase.position.set(-5, 0.6, 3);
    scene.add(arcadeBase);
    
    const arcadeScreen = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.4, 0.05),
      new THREE.MeshStandardMaterial({ color: 0x0000ff, emissive: 0x0033ff, emissiveIntensity: 0.5 })
    );
    arcadeScreen.position.set(-5, 0.9, 2.75);
    arcadeScreen.userData = { section: 'arcade' };
    scene.add(arcadeScreen);
    
    const arcadeTop = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.3, 0.4),
      new THREE.MeshStandardMaterial({ color: 0xff0000 })
    );
    arcadeTop.position.set(-5, 1.35, 2.8);
    scene.add(arcadeTop);
    
    function createPoster(text, color) {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, 512, 512);
      
      ctx.strokeStyle = `#${color.toString(16).padStart(6, '0')}`;
      ctx.lineWidth = 8;
      ctx.strokeRect(20, 20, 472, 472);
      
      ctx.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
      ctx.font = 'bold 36px Arial';
      ctx.textAlign = 'center';
      const lines = text.split('\n');
      lines.forEach((line, i) => {
        if (i === 0) {
          ctx.font = 'bold 42px Arial';
          ctx.fillText(line, 256, 100);
        } else {
          ctx.font = 'bold 28px Arial';
          ctx.fillText(line, 256, 180 + i * 45);
        }
      });
      
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      return new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.5), material);
    }
    
    const keys = {};
    const speed = 0.05;
    
    window.addEventListener('keydown', (e) => keys[e.key.toLowerCase()] = true);
    window.addEventListener('keyup', (e) => keys[e.key.toLowerCase()] = false);
    
    let yaw = 0;
    let pitch = 0;
    let isDragging = false;
    let dragStarted = false;
    
    const onMouseDown = (e) => {
      isDragging = true;
      dragStarted = false;
      renderer.domElement.style.cursor = 'grabbing';
    };
    
    const onMouseUp = (e) => {
      if (isDragging && !dragStarted) {
        const rect = renderer.domElement.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        
        raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
        const intersects = raycaster.intersectObjects(scene.children);
        
        for (const intersect of intersects) {
          if (intersect.object.userData.section) {
            setShowModal(intersect.object.userData.section);
            break;
          }
        }
      }
      
      isDragging = false;
      dragStarted = false;
      renderer.domElement.style.cursor = 'grab';
    };
    
    const onMouseMove = (e) => {
      if (isDragging) {
        if (Math.abs(e.movementX) > 2 || Math.abs(e.movementY) > 2) {
          dragStarted = true;
        }
        yaw -= e.movementX * 0.003;
        pitch -= e.movementY * 0.003;
        pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));
      }
    };
    
    renderer.domElement.style.cursor = 'grab';
    renderer.domElement.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
    
    const raycaster = new THREE.Raycaster();
    
    function animate() {
      requestAnimationFrame(animate);
      
      const forward = new THREE.Vector3(0, 0, -1);
      forward.applyQuaternion(camera.quaternion);
      forward.y = 0;
      forward.normalize();
      
      const right = new THREE.Vector3(1, 0, 0);
      right.applyQuaternion(camera.quaternion);
      right.y = 0;
      right.normalize();
      
      if (keys['w']) camera.position.addScaledVector(forward, speed);
      if (keys['s']) camera.position.addScaledVector(forward, -speed);
      if (keys['a']) camera.position.addScaledVector(right, -speed);
      if (keys['d']) camera.position.addScaledVector(right, speed);
      
      camera.position.x = Math.max(-5.5, Math.min(5.5, camera.position.x));
      camera.position.z = Math.max(-5.5, Math.min(5.5, camera.position.z));
      
      camera.rotation.set(pitch, yaw, 0, 'YXZ');
      
      raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
      const intersects = raycaster.intersectObjects(scene.children);
      
      let currentSection = '';
      for (const intersect of intersects) {
        if (intersect.object.userData.section) {
          currentSection = intersect.object.userData.section;
          break;
        }
      }
      setSection(currentSection);
      
      renderer.render(scene, camera);
    }
    
    animate();
    
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);
  
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <div ref={mountRef} />
      
      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        background: 'rgba(0,0,0,0.8)',
        padding: '15px',
        borderRadius: '10px',
        border: '2px solid #3498db'
      }}>
        <div style={{ fontSize: '14px', marginBottom: '10px' }}>
          <strong>🎮 Controls:</strong><br/>
          W/A/S/D - Move<br/>
          Drag Mouse - Look around<br/>
          Click Poster - View details
        </div>
        {section && (
          <div style={{ 
            fontSize: '18px', 
            color: '#3498db',
            marginTop: '10px',
            fontWeight: 'bold' 
          }}>
            📍 {section.toUpperCase()}
          </div>
        )}
      </div>
      
      {showModal && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
            padding: '40px',
            borderRadius: '20px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto',
            border: '3px solid #ff6b35',
            boxShadow: '0 20px 60px rgba(255,107,53,0.3)',
            position: 'relative'
          }}>
            <button 
              onClick={() => setShowModal(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#ff6b35',
                border: 'none',
                color: 'white',
                fontSize: '24px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              ×
            </button>
            
            {showModal === 'about' && (
              <div style={{ color: 'white' }}>
                <h1 style={{ color: '#ff6b35', marginBottom: '20px' }}>About Me</h1>
                <p style={{ fontSize: '18px', lineHeight: '1.8' }}>
                  Hi! I'm a passionate developer and designer with a love for creating 
                  interactive experiences. I specialize in web development, 3D graphics, 
                  and building cool stuff with code.
                </p>
                <p style={{ fontSize: '18px', lineHeight: '1.8', marginTop: '20px' }}>
                  When I'm not coding, you can find me gaming, exploring new technologies, 
                  or working on personal projects that push the boundaries of what's possible 
                  on the web.
                </p>
              </div>
            )}
            
            {showModal === 'portfolio' && (
              <div style={{ color: 'white' }}>
                <h1 style={{ color: '#d62828', marginBottom: '20px' }}>My Projects</h1>
                <div style={{ fontSize: '16px', lineHeight: '1.8' }}>
                  <h3 style={{ color: '#ff6b35' }}>🎮 Cool Game</h3>
                  <p>An interactive 3D game built with Three.js and React. Features real-time physics and multiplayer support.</p>
                  
                  <h3 style={{ color: '#ff6b35', marginTop: '20px' }}>🌐 Website Design</h3>
                  <p>Modern, responsive websites with stunning animations and user experiences.</p>
                  
                  <h3 style={{ color: '#ff6b35', marginTop: '20px' }}>📱 Mobile App</h3>
                  <p>Cross-platform mobile application with seamless performance and intuitive design.</p>
                </div>
              </div>
            )}
            
            {showModal === 'skills' && (
              <div style={{ color: 'white' }}>
                <h1 style={{ color: '#00ff41', marginBottom: '20px' }}>Skills & Tech</h1>
                <div style={{ fontSize: '16px', lineHeight: '1.8' }}>
                  <h3 style={{ color: '#ff6b35' }}>💻 Languages</h3>
                  <p>JavaScript, TypeScript, Python, HTML, CSS</p>
                  
                  <h3 style={{ color: '#ff6b35', marginTop: '20px' }}>⚛️ Frameworks</h3>
                  <p>React, Three.js, Node.js, Next.js</p>
                  
                  <h3 style={{ color: '#ff6b35', marginTop: '20px' }}>🎨 Design</h3>
                  <p>UI/UX, 3D Modeling, Animation, Graphic Design</p>
                  
                  <h3 style={{ color: '#ff6b35', marginTop: '20px' }}>🔧 Tools</h3>
                  <p>Git, VS Code, Figma, Blender</p>
                </div>
              </div>
            )}
            
            {showModal === 'contact' && (
              <div style={{ color: 'white' }}>
                <h1 style={{ color: '#ffa500', marginBottom: '20px' }}>Contact Me</h1>
                <div style={{ fontSize: '18px', lineHeight: '2' }}>
                  <p><strong>📧 Email:</strong> your.email@example.com</p>
                  <p><strong>💼 LinkedIn:</strong> linkedin.com/in/yourname</p>
                  <p><strong>🐙 GitHub:</strong> github.com/yourusername</p>
                  <p><strong>🐦 Twitter:</strong> @yourhandle</p>
                  <p style={{ marginTop: '30px', fontSize: '16px', color: '#aaa' }}>
                    Feel free to reach out for collaborations, job opportunities, 
                    or just to chat about tech!
                  </p>
                </div>
              </div>
            )}
            
            {showModal === 'arcade' && <ArcadeGame />}
          </div>
        </div>
      )}
    </div>
  );
}