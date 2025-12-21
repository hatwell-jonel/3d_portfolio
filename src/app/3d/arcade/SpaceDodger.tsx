'use client';
import { SpaceDodger as PlaySpaceDodger } from "@jonelhatwell/arcade-games";


export function SpaceDodger() {
    return <PlaySpaceDodger />;
}

// export function SpaceDodgerOld() {
//     const canvasRef = useRef<null | HTMLCanvasElement>(null);
//     const [score, setScore] = useState(0);
//     const [gameOver, setGameOver] = useState(false);
//     const gameLoopRef = useRef(0);
    
//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;
//         const ctx = canvas.getContext('2d');
        
//         let playerY = 250;
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         let obstacles: any[] = [];
//         let frameCount = 0;
//         let currentScore = 0;
//         let isGameOver = false;
        
//         const keys: Record<string, boolean> = {};
//         const handleKeyDown = (e: { key: string | number; }) => {
//         keys[e.key] = true;
//         };
        
//         const handleKeyUp = (e: { key: string | number; }) => {
//         keys[e.key] = false;
//         };
        
//         window.addEventListener('keydown', handleKeyDown);
//         window.addEventListener('keyup', handleKeyUp);
        
//         function gameLoop() {
//         if (isGameOver) return;
//         if(!ctx) return;
//         ctx.fillStyle = '#000';
//         ctx.fillRect(0, 0, 600, 400);
        
//         if (keys['ArrowUp'] && playerY > 20) playerY -= 5;
//         if (keys['ArrowDown'] && playerY < 380) playerY += 5;
        
//         ctx.fillStyle = '#00ff00';
//         ctx.beginPath();
//         ctx.moveTo(100, playerY);
//         ctx.lineTo(80, playerY - 15);
//         ctx.lineTo(80, playerY + 15);
//         ctx.closePath();
//         ctx.fill();
        
//         if (frameCount % 60 === 0) {
//             obstacles.push({
//             x: 600,
//             y: Math.random() * 350 + 25,
//             width: 30,
//             height: 30
//             });
//         }
        
//         obstacles = obstacles.filter(obs => {
//             obs.x -= 5;
//             ctx.fillStyle = '#ff0000';
//             ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
            
//             if (obs.x < 100 && obs.x + obs.width > 80 &&
//                 obs.y < playerY + 15 && obs.y + obs.height > playerY - 15) {
//             isGameOver = true;
//             setGameOver(true);
//             }
            
//             return obs.x > -30;
//         });
        
//         frameCount++;
//         if (frameCount % 10 === 0) {
//             currentScore++;
//             setScore(currentScore);
//         }
        
//         ctx.fillStyle = '#fff';
//         ctx.font = '24px monospace';
//         ctx.fillText(`Score: ${currentScore}`, 20, 40);
        
//         gameLoopRef.current = requestAnimationFrame(gameLoop);
//         }
        
//         gameLoop();
        
//         return () => {
//         window.removeEventListener('keydown', handleKeyDown);
//         window.removeEventListener('keyup', handleKeyUp);
//         if (gameLoopRef.current) {
//             cancelAnimationFrame(gameLoopRef.current);
//         }
//         };
//     }, []);
    
//     const restartGame = () => {
//         setScore(0);
//         setGameOver(false);
//         window.location.reload();
//     };
    
//     return (
//         <div style={{ color: 'white', textAlign: 'center' }}>
//         <h1 style={{ color: '#00ff00', marginBottom: '20px' }}>🕹️ SPACE DODGER</h1>
//         <canvas 
//             ref={canvasRef} 
//             width={600} 
//             height={400}
//             style={{ 
//             border: '3px solid #00ff00',
//             borderRadius: '10px',
//             background: '#000'
//             }}
//         />
//         <div style={{ marginTop: '20px', fontSize: '18px' }}>
//             <p><strong>Controls:</strong> Arrow Up/Down to move</p>
//             <p style={{ color: '#ffa500', fontSize: '24px', marginTop: '10px' }}>
//             Score: {score}
//             </p>
//             {gameOver && (
//             <div>
//                 <h2 style={{ color: '#ff0000', marginTop: '20px' }}>GAME OVER!</h2>
//                 <button
//                 onClick={restartGame}
//                 style={{
//                     marginTop: '20px',
//                     padding: '10px 30px',
//                     fontSize: '18px',
//                     background: '#00ff00',
//                     border: 'none',
//                     borderRadius: '5px',
//                     cursor: 'pointer',
//                     fontWeight: 'bold'
//                 }}
//                 >
//                 RESTART
//                 </button>
//             </div>
//             )}
//         </div>
//         </div>
//     );
// }