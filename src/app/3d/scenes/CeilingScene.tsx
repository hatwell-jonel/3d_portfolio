import * as THREE from 'three';

export default function ceilingScene(scene: THREE.Scene) {
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
