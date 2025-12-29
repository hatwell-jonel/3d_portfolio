'use client';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArcadeMachine, BedModel, RecordSetup, AirConditioner, Spiderman, ComputerSet } from './models';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import ArcadeGame from '@/components/features/ArcadeGames';
import AboutMe from '@/components/features/AboutMe';
import MyWorks from '@/components/features/MyWorks';
import BackButton from '@/components/ui/back-button';
import { ceilingScene, floorScene, neonWallStripsScene, wallScene } from './scenes';

export default function RoomPortfolio() {
    const mountRef = useRef<HTMLDivElement | null>(null);
    const keysRef = useRef<Record<string, boolean>>({});
    const [section, setSection] = useState('');
    const [showModal, setShowModal] = useState<string | null>(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#0a0a0a');
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 1.6, 2);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        WebGLRenderer(renderer, mountRef);
        renderer.toneMappingExposure = .75;
        RoomLightings(scene);

        floorScene(scene);
        ceilingScene(scene);
        wallScene(scene);
        neonWallStripsScene(scene);
              
        BedModel(scene);
        RecordSetup(scene, camera);
        AirConditioner(scene);
        ArcadeMachine(scene, 'arcade');
        Spiderman(scene, 'aboutme');
        ComputerSet(scene, 'myworks');
        
        const keys = keysRef.current;
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
    }, []);

    return (
    <div className="w-screen h-screen overflow-hidden relative">
      <div ref={mountRef} />
      
      <div 
        className='
          absolute
          top-5
          right-5
          text-white
          font-sans
          bg-black/80
          p-1.75
          rounded-[10px]
          border-2
          border-[#ff6b6b]
          text-[14px]
          shadow-none
        '
      >
        <div className='mb-2'>
          <strong>🎮 Controls:</strong><br/>
          W / A / S / D - Move<br/>
          Drag Mouse - Look<br/>
        </div>
        {section && (
          <div className="text-[18px] text-[#ff6b6b] mt-2.5 font-bold text-shadow-none">
            📍 {section.toUpperCase()}
          </div>
        )}
      </div>

      <BackButton/>

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
          {showModal === 'myworks' && <MyWorks />}
        </DialogContent>
      </Dialog>
        
    </div>
  );
}

function WebGLRenderer(renderer: THREE.WebGLRenderer, ref : React.RefObject<HTMLDivElement | null>) {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    ref.current!.appendChild(renderer.domElement);
}

function RoomLightings(scene: THREE.Scene) {
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
}