
import * as THREE from 'three';
export default function wallScene(scene: THREE.Scene) {
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
