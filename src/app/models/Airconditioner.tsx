'use client';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function AirConditioner(scene: THREE.Scene) {
    const loader = new GLTFLoader();
    const acGroup = new THREE.Group();

    // Position the air conditioner on the wall
    acGroup.position.set(0, 3.3, -5.83); // Adjust X, Y, Z as needed
    acGroup.rotation.y = 0; // Adjust rotation if needed
    acGroup.scale.set(.03, .03, .005);
    scene.add(acGroup);

    // Load the GLB model
    loader.load(
        '/assets/3d/airconditioner.glb',
        (gltf) => {
        const model = gltf.scene;
        model.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            }
        });
        acGroup.add(model);
        },
        undefined,
        (error) => console.error('Error loading air conditioner:', error)
    );
}
