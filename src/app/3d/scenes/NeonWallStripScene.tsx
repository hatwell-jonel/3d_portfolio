'use client';
import * as THREE from 'three';

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

export default function neonWallStripsScene(scene: THREE.Scene) {
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