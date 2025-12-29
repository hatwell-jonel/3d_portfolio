'use client';
import * as THREE from 'three';

export default function floorScene(scene: THREE.Scene) {
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