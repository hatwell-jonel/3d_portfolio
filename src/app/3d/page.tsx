'use client';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArcadeMachine, BedModel, RecordSetup, AirConditioner, Spiderman } from './models';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import ArcadeGame from '@/components/features/ArcadeGames';
import AboutMe from '@/components/features/AboutMe';

function floorScene(scene: THREE.Scene) {
    const textureLoader = new THREE.TextureLoader();
    const woodFloorTexture = textureLoader.load('/assets/image/textured-floor.jpg');
    woodFloorTexture.wrapS = THREE.RepeatWrapping;
    woodFloorTexture.wrapT = THREE.RepeatWrapping;
    woodFloorTexture.repeat.set(4, 4);

    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(12, 12),
        new THREE.MeshStandardMaterial({ 
            map: woodFloorTexture,
            roughness: 0.9,
            metalness: 0.05
        })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true; 
    scene.add(floor);
}

function wallScene(scene: THREE.Scene) {
    const textureLoader = new THREE.TextureLoader();

    const concreteTexture = textureLoader.load('/assets/image/textured-wall.jpg');
      concreteTexture.wrapS = THREE.RepeatWrapping;
      concreteTexture.wrapT = THREE.RepeatWrapping;
      concreteTexture.repeat.set(1, 1);
      
      const wallMaterial = new THREE.MeshStandardMaterial({ 
        map: concreteTexture,
        roughness: 0.9,
        metalness: 0.05
      });
      
      const aboutWall = new THREE.Mesh(new THREE.BoxGeometry(12, 4, 0.2), wallMaterial);
      aboutWall.position.set(0, 2, -6);
      aboutWall.receiveShadow = true; 
      scene.add(aboutWall);

      const portfolioWall = new THREE.Mesh(new THREE.BoxGeometry(0.2, 4, 12), wallMaterial);
      portfolioWall.position.set(-6, 2, 0);
      portfolioWall.receiveShadow = true; 
      scene.add(portfolioWall);

      const skillsWall = new THREE.Mesh(new THREE.BoxGeometry(0.2, 4, 12), wallMaterial);
      skillsWall.position.set(6, 2, 0);
      skillsWall.receiveShadow = true; 
      scene.add(skillsWall);
      
      const contactWall = new THREE.Mesh(new THREE.BoxGeometry(12, 4, 0.2), wallMaterial);
      contactWall.position.set(0, 2, 6);
      contactWall.receiveShadow = true; 
      scene.add(contactWall);
}




function ceilingScene(scene: THREE.Scene) {
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
}

// NEON STRIPS
function createNeonStrip(
  width: number,
  height: number,
  depth: number,
  position: THREE.Vector3,
  rotation?: THREE.Euler
) {

  function createNeonMaterial(color = 0xff6b6b, intensity = 2.5) {
    return new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: intensity,
      roughness: 0.5,
      metalness: 0.0,
      toneMapped: false, 
    });
  }

  const geometry = new THREE.BoxGeometry(width, height, depth);
  const material = createNeonMaterial();
  const strip = new THREE.Mesh(geometry, material);

  strip.position.copy(position);
  if (rotation) strip.rotation.copy(rotation);

  return strip;
}

function neonWallStrips(scene: THREE.Scene) {
  const strips: THREE.Mesh[] = [];

  const upwardPosition = 3.8;
  const length = 12; 
  const thickness = 0.02;

  // BACK WALL (behind Spiderman / About)
  strips.push(
    createNeonStrip(
      length, thickness, thickness,
      new THREE.Vector3(0, upwardPosition, -5.9)
    )
  );

  // FRONT WALL
  strips.push(
    createNeonStrip(
      length, thickness, thickness,
      new THREE.Vector3(0, upwardPosition, 5.9)
    )
  );

  // LEFT WALL
  strips.push(
    createNeonStrip(
      thickness, thickness, length,
      new THREE.Vector3(-5.9, upwardPosition, 0)
    )
  );

  // RIGHT WALL
  strips.push(
    createNeonStrip(
      thickness, thickness, length,
      new THREE.Vector3(5.9, upwardPosition, 0)
    )
  );

  strips.forEach(strip => {
    strip.castShadow = false;
    strip.receiveShadow = false;
    scene.add(strip);
  });
}

export default function RoomPortfolio() {
    const mountRef = useRef<HTMLDivElement | null>(null);
    const keysRef = useRef<Record<string, boolean>>({});
    const [section, setSection] = useState('');
    const [showModal, setShowModal] = useState<string | null>(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        // scene.background = new THREE.Color(0x606060);
        scene.background = new THREE.Color('#0a0a0a');
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 1.6, 2);
      
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        mountRef.current!.appendChild(renderer.domElement);

        // const ambient = new THREE.AmbientLight(0xffffff, .3);
        const ambient = new THREE.AmbientLight(0xff6b6b, 0.08);
        scene.add(ambient);

        const mainLight = new THREE.DirectionalLight(0xffe6cc, 1.2);
        mainLight.position.set(6, 8, 4);
        mainLight.target.position.set(0, 0, 0);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.set(2048, 2048);
        mainLight.shadow.camera.near = 0.5;
        mainLight.shadow.camera.far = 20;
        mainLight.shadow.camera.left = -10;
        mainLight.shadow.camera.right = 10;
        mainLight.shadow.camera.top = 10;
        mainLight.shadow.camera.bottom = -10;
        mainLight.shadow.bias = -0.0001;
        scene.add(mainLight);
        scene.add(mainLight.target);

        const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x663300,  0.5);
        scene.add(hemiLight);
        renderer.toneMappingExposure = .9;

        floorScene(scene);
        ceilingScene(scene);
        wallScene(scene);
        neonWallStrips(scene);
              
        // bed
        BedModel(scene);

        // arcade
        ArcadeMachine(scene, 'arcade');

        // music
        RecordSetup(scene, camera);

        // air conditioner
        AirConditioner(scene);

        // about me
        Spiderman(scene, 'aboutme');
        
        const keys: { [key: string]: boolean } = {};
        const speed = 0.05;
        
        window.addEventListener('keydown', (e) => keys[e.key.toLowerCase()] = true);
        window.addEventListener('keyup', (e) => keys[e.key.toLowerCase()] = false);

        let yaw = 0;
        let pitch = 0;
        let isDragging = false;
        let dragStarted = false;

        const handleClick = (clientX : number, clientY : number) => {
            const rect = renderer.domElement.getBoundingClientRect();
            const x = ((clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((clientY - rect.top) / rect.height) * 2 + 1;
            
            raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
            const intersects = raycaster.intersectObjects(scene.children, true);
            
            for (const intersect of intersects) {

                const obj = intersect.object;
                if (obj.parent?.userData?.interactive && obj.parent.userData.toggleMusic) {
                  obj.parent.userData.toggleMusic();
                  break;
                }

                if (obj.userData.section) {
                  setShowModal(obj.userData.section);
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
        border: '2px solid #3498db',
        fontSize: '14px',
        maxWidth: 'auto',
        boxShadow:'none'
      }}>
        <div style={{ marginBottom: '10px'}}>
          <strong>🎮 Controls:</strong><br/>
          W / A / S / D - Move<br/>
          Drag Mouse - Look<br/>
        </div>
        {section && (
          <div style={{ 
            fontSize: '18px', 
            color: '#3498db',
            marginTop: '10px',
            fontWeight: 'bold',
            textShadow:'none'
          }}>
            📍 {section.toUpperCase()}
          </div>
        )}
      </div>

      <Dialog
        open={!!showModal}
        onOpenChange={(open) => {
          if (!open) setShowModal(null);
        }}
      >
        <DialogContent 
          className="max-w-3xl bg-gray-900 border-[#ff6b6b] shadow-[0_0_40px_rgba(255,107,107,0.98)]"
          showCloseButton={false}
        >

          <DialogHeader className='sr-only'>
            <DialogTitle className="text-3xl font-bold text-center">
              TITLE
            </DialogTitle>
          </DialogHeader> 

          {showModal === 'arcade' && <ArcadeGame />}
          {showModal === 'aboutme' && <AboutMe />}
        </DialogContent>
      </Dialog>
        
    </div>
  );
}