'use client';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Tetris, Snake, Sudoku, SpaceDodger } from './arcade';

function ArcadeGame() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  
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

function createPoster(text: string, color: number) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, 512, 512);
    
    ctx.strokeStyle = `#${color.toString(16).padStart(6, '0')}`;
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, 472, 472);
    
    ctx.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    const lines = text.split('\n');
    lines.forEach((line: string, i: number) => {
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

export default function RoomPortfolio() {
    const mountRef = useRef<HTMLDivElement | null>(null);
    const keysRef = useRef<Record<string, boolean>>({});
    const [section, setSection] = useState('');
    const [showModal, setShowModal] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detect mobile
        const checkMobile = () => {
        setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    

    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x606060);
        
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 1.6, 0);
        
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current!.appendChild(renderer.domElement);
        
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
        
        
        const keys: { [key: string]: boolean } = {};
        const speed = 0.05;
        
        window.addEventListener('keydown', (e) => keys[e.key.toLowerCase()] = true);
        window.addEventListener('keyup', (e) => keys[e.key.toLowerCase()] = false);
        
        let yaw = 0;
        let pitch = 0;
        let isDragging = false;
        let dragStarted = false;
        let touchStartX = 0;
        let touchStartY = 0;

        const handleClick = (clientX : number, clientY : number) => {
            const rect = renderer.domElement.getBoundingClientRect();
            const x = ((clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((clientY - rect.top) / rect.height) * 2 + 1;
            
            raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
            const intersects = raycaster.intersectObjects(scene.children);
            
            for (const intersect of intersects) {
                if (intersect.object.userData.section) {
                setShowModal(intersect.object.userData.section);
                break;
                }
            }
        };
        
        const onMouseDown = () => {
            isDragging = true;
            dragStarted = false;
            renderer.domElement.style.cursor = 'grabbing';
        };

        const onMouseUp = (e : MouseEvent) => {
            if (isDragging && !dragStarted) {
                handleClick(e.clientX, e.clientY);
            }
            
            isDragging = false;
            dragStarted = false;
            renderer.domElement.style.cursor = 'grab';
        };
        
        const onMouseMove = (e: { movementX: number; movementY: number; }) => {
            if (isDragging) {
                if (Math.abs(e.movementX) > 2 || Math.abs(e.movementY) > 2) {
                dragStarted = true;
                }
                yaw -= e.movementX * 0.003;
                pitch -= e.movementY * 0.003;
                pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));
            }
        };

        // Touch controls
        const onTouchStart = (e : TouchEvent) => {
            if (e.touches.length === 1) {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
                isDragging = true;
                dragStarted = false;
            }
        };

        const onTouchMove = (e : TouchEvent) => {
            if (e.touches.length === 1 && isDragging) {
                const deltaX = e.touches[0].clientX - touchStartX;
                const deltaY = e.touches[0].clientY - touchStartY;
                
                if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
                dragStarted = true;
                yaw -= deltaX * 0.005;
                pitch -= deltaY * 0.005;
                pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));
                }
                
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }
        };

        const onTouchEnd = (e : TouchEvent) => {
            if (!dragStarted && e.changedTouches.length > 0) {
                handleClick(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
            }
            isDragging = false;
            dragStarted = false;
        };
        
        renderer.domElement.style.cursor = 'grab';
        renderer.domElement.addEventListener('mousedown', onMouseDown);
        renderer.domElement.addEventListener('touchstart', onTouchStart, { passive: true });
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('touchend', onTouchEnd);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('touchmove', onTouchMove, { passive: true });
        
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
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('touchend', onTouchEnd);
            renderer.domElement.removeEventListener('mousedown', onMouseDown);
            renderer.domElement.removeEventListener('touchstart', onTouchStart);
            if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    const handleTouchButton = (key : string, isPressed : boolean) => {
        keysRef.current[key] = isPressed;
    };
  
    return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <div ref={mountRef} />
      
      <div style={{
        position: 'absolute',
        top: isMobile ? 10 : 20,
        left: isMobile ? 10 : 20,
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        background: isMobile ? 'rgba(255, 107, 53, 0.95)' : 'rgba(0,0,0,0.8)',
        padding: isMobile ? '12px' : '15px',
        borderRadius: '10px',
        border: isMobile ? '3px solid #ffaa00' : '2px solid #3498db',
        fontSize: isMobile ? '12px' : '14px',
        maxWidth: isMobile ? '160px' : 'auto',
        boxShadow: isMobile ? '0 4px 15px rgba(255,107,53,0.5)' : 'none'
      }}>
        <div style={{ marginBottom: '10px' }}>
          <strong>{isMobile ? '📱 MOBILE MODE' : '🎮 Controls:'}</strong><br/>
          {isMobile ? '👆 Swipe - Look' : 'W/A/S/D - Move'}<br/>
          {isMobile ? '⬆️ Arrows - Move' : 'Drag Mouse - Look'}<br/>
          {isMobile ? '👇 Tap poster' : 'Click Poster'}
        </div>
        {section && (
          <div style={{ 
            fontSize: isMobile ? '14px' : '18px', 
            color: isMobile ? '#fff' : '#3498db',
            marginTop: '10px',
            fontWeight: 'bold',
            textShadow: isMobile ? '0 2px 4px rgba(0,0,0,0.5)' : 'none'
          }}>
            📍 {section.toUpperCase()}
          </div>
        )}
      </div>
      
      {/* Mobile movement controls */}
      {isMobile && (
        <>
          {/* Mobile indicator banner */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(180deg, rgba(255,107,53,0.9) 0%, rgba(255,107,53,0) 100%)',
            padding: '8px',
            textAlign: 'center',
            color: 'white',
            fontSize: '11px',
            fontWeight: 'bold',
            pointerEvents: 'none',
            zIndex: 5
          }}>
            📱 MOBILE VERSION - Swipe to Look Around
          </div>
          
          {/* Movement controls */}
          <div style={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 70px)',
            gridTemplateRows: 'repeat(2, 70px)',
            gap: '12px',
            filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))'
          }}>
            <div></div>
            <button
              onTouchStart={() => handleTouchButton('w', true)}
              onTouchEnd={() => handleTouchButton('w', false)}
              style={{
                background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.9), rgba(41, 128, 185, 0.9))',
                border: '3px solid #3498db',
                borderRadius: '15px',
                color: 'white',
                fontSize: '28px',
                fontWeight: 'bold',
                cursor: 'pointer',
                touchAction: 'none',
                boxShadow: '0 4px 12px rgba(52, 152, 219, 0.5)',
                transition: 'transform 0.1s'
              }}
            >
              ↑
            </button>
            <div></div>
            <button
              onTouchStart={() => handleTouchButton('a', true)}
              onTouchEnd={() => handleTouchButton('a', false)}
              style={{
                background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.9), rgba(41, 128, 185, 0.9))',
                border: '3px solid #3498db',
                borderRadius: '15px',
                color: 'white',
                fontSize: '28px',
                fontWeight: 'bold',
                cursor: 'pointer',
                touchAction: 'none',
                boxShadow: '0 4px 12px rgba(52, 152, 219, 0.5)',
                transition: 'transform 0.1s'
              }}
            >
              ←
            </button>
            <button
              onTouchStart={() => handleTouchButton('s', true)}
              onTouchEnd={() => handleTouchButton('s', false)}
              style={{
                background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.9), rgba(41, 128, 185, 0.9))',
                border: '3px solid #3498db',
                borderRadius: '15px',
                color: 'white',
                fontSize: '28px',
                fontWeight: 'bold',
                cursor: 'pointer',
                touchAction: 'none',
                boxShadow: '0 4px 12px rgba(52, 152, 219, 0.5)',
                transition: 'transform 0.1s'
              }}
            >
              ↓
            </button>
            <button
              onTouchStart={() => handleTouchButton('d', true)}
              onTouchEnd={() => handleTouchButton('d', false)}
              style={{
                background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.9), rgba(41, 128, 185, 0.9))',
                border: '3px solid #3498db',
                borderRadius: '15px',
                color: 'white',
                fontSize: '28px',
                fontWeight: 'bold',
                cursor: 'pointer',
                touchAction: 'none',
                boxShadow: '0 4px 12px rgba(52, 152, 219, 0.5)',
                transition: 'transform 0.1s'
              }}
            >
              →
            </button>
          </div>
        </>
      )}
      
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
            padding: isMobile ? '25px' : '40px',
            borderRadius: '20px',
            maxWidth: isMobile ? '95%' : '600px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto',
            border: isMobile ? '4px solid #ff6b35' : '3px solid #ff6b35',
            boxShadow: isMobile ? '0 8px 32px rgba(255,107,53,0.6)' : '0 20px 60px rgba(255,107,53,0.3)',
            position: 'relative'
          }}>
            {isMobile && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                background: '#ff6b35',
                color: 'white',
                padding: '8px',
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                borderRadius: '17px 17px 0 0'
              }}>
                📱 MOBILE VIEW
              </div>
            )}
            <button 
              onClick={() => setShowModal(null)}
              style={{
                position: 'absolute',
                top: isMobile ? '50px' : '20px',
                right: '20px',
                background: '#ff6b35',
                border: 'none',
                color: 'white',
                fontSize: isMobile ? '28px' : '24px',
                width: isMobile ? '45px' : '40px',
                height: isMobile ? '45px' : '40px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontWeight: 'bold',
                boxShadow: isMobile ? '0 4px 12px rgba(0,0,0,0.4)' : 'none'
              }}
            >
              ×
            </button>
            
            {showModal === 'about' && (
              <div style={{ color: 'white', marginTop: isMobile ? '35px' : '0' }}>
                <h1 style={{ color: '#ff6b35', marginBottom: '20px', fontSize: isMobile ? '24px' : '32px' }}>About Me</h1>
                <p style={{ fontSize: isMobile ? '16px' : '18px', lineHeight: '1.8' }}>
                  Hi! I&apos;m a passionate developer and designer with a love for creating 
                  interactive experiences. I specialize in web development, 3D graphics, 
                  and building cool stuff with code.
                </p>
                <p style={{ fontSize: isMobile ? '16px' : '18px', lineHeight: '1.8', marginTop: '20px' }}>
                  When I&apos;m not coding, you can find me gaming, exploring new technologies, 
                  or working on personal projects that push the boundaries of what&apos;s possible 
                  on the web.
                </p>
              </div>
            )}
            
            {showModal === 'portfolio' && (
              <div style={{ color: 'white', marginTop: isMobile ? '35px' : '0' }}>
                <h1 style={{ color: '#d62828', marginBottom: '20px', fontSize: isMobile ? '24px' : '32px' }}>My Projects</h1>
                <div style={{ fontSize: isMobile ? '14px' : '16px', lineHeight: '1.8' }}>
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
              <div style={{ color: 'white', marginTop: isMobile ? '35px' : '0' }}>
                <h1 style={{ color: '#00ff41', marginBottom: '20px', fontSize: isMobile ? '24px' : '32px' }}>Skills & Tech</h1>
                <div style={{ fontSize: isMobile ? '14px' : '16px', lineHeight: '1.8' }}>
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
              <div style={{ color: 'white', marginTop: isMobile ? '35px' : '0' }}>
                <h1 style={{ color: '#ffa500', marginBottom: '20px', fontSize: isMobile ? '24px' : '32px' }}>Contact Me</h1>
                <div style={{ fontSize: isMobile ? '16px' : '18px', lineHeight: '2' }}>
                  <p><strong>📧 Email:</strong> your.email@example.com</p>
                  <p><strong>💼 LinkedIn:</strong> linkedin.com/in/yourname</p>
                  <p><strong>🐙 GitHub:</strong> github.com/yourusername</p>
                  <p><strong>🐦 Twitter:</strong> @yourhandle</p>
                  <p style={{ marginTop: '30px', fontSize: isMobile ? '14px' : '16px', color: '#aaa' }}>
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