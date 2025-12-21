'use client';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


export function RecordSetup(scene: THREE.Scene, camera: THREE.Camera) {
	const loader = new GLTFLoader();
	const recordSetup = new THREE.Group();

	// Place this to the right side of the bed
	recordSetup.position.set(-2.5, 0, 5.7);
	recordSetup.rotation.y = Math.PI;
	recordSetup.scale.set(1, 1, 1);
	scene.add(recordSetup);

	let table: THREE.Object3D | null = null;

	// --- Audio setup ---
	const listener = new THREE.AudioListener();
	camera.add(listener);

	const sound = new THREE.Audio(listener);
	const audioLoader = new THREE.AudioLoader();
	audioLoader.load('/assets/music/relaxing_sound.mp3', (buffer) => {
		sound.setBuffer(buffer);
		sound.setLoop(true);
		sound.setVolume(0.5);
		sound.play();
	});

	let isMuted = false;

	// --- Music text label ---
	const createTextCanvas = (text: string) => {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d')!;
		canvas.width = 1024;
		canvas.height = 256;
		ctx.font = 'bold 18px Arial';
		ctx.fillStyle = '#000000';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.shadowColor = '#7E7922';
		ctx.shadowBlur = 10;
		ctx.fillText(text, canvas.width / 2, canvas.height / 2);
		return canvas;
	};

	const spriteMaterial = new THREE.SpriteMaterial({
		map: new THREE.CanvasTexture(createTextCanvas('🎵 Music Playing')),
		transparent: true,
	});

	const musicLabel = new THREE.Sprite(spriteMaterial);
	musicLabel.scale.set(3, 1.2, 1);
	musicLabel.position.set(0, 1.3, 0); // floating above the record setup
	recordSetup.add(musicLabel);

	const updateLabel = () => {
		const text = isMuted ? '🔇 Unmute Music' : '🎵 Music Playing';
		const canvas = createTextCanvas(text);
		(musicLabel.material as THREE.SpriteMaterial).map!.dispose();
		(musicLabel.material as THREE.SpriteMaterial).map = new THREE.CanvasTexture(canvas);
	};

	// --- Click to toggle music (text)---
	recordSetup.userData.interactive = true;
	recordSetup.userData.toggleMusic = () => {
		isMuted = !isMuted;
		if (isMuted) {
			sound.pause();
		} else {
			sound.play();
		}
		updateLabel();
	};

	// --- Click to toggle music (model)---
	const makeInteractive = (obj: THREE.Object3D) => {
		obj.userData.interactive = true;
		obj.userData.toggleMusic = () => {
			isMuted = !isMuted;
			if (isMuted) {
			sound.pause();
			} else {
			sound.play();
			}
			updateLabel();
		};

		// propagate to children
		obj.children.forEach(makeInteractive);
	};


	// --- Load the record table ---
	loader.load(
		'/assets/3d/record_table.glb',
		(gltf) => {
			table = gltf.scene;
			table.traverse((child) => {
				if ((child as THREE.Mesh).isMesh) {
					child.castShadow = true;
					child.receiveShadow = true;
				}
			});

			recordSetup.add(table);
			makeInteractive(table);
		},
		undefined,
		(error) => console.error('Error loading record table:', error)
	);

	// --- Load the record player ---
	loader.load(
		'/assets/3d/record_player_for_vinyls.glb',
		(gltf) => {
		const player = gltf.scene;
		player.scale.set(0.06, 0.06, 0.06);

		const tryAlign = () => {
			if (!table) {
				requestAnimationFrame(tryAlign);
				return;
			}

			// Ensure transforms are up-to-date
			table.updateWorldMatrix(true, true);
			player.updateWorldMatrix(true, true);

			// Compute bounding boxes in world space
			const tableBox = new THREE.Box3().setFromObject(table);
			const playerBox = new THREE.Box3().setFromObject(player);

			const tableTopY = tableBox.max.y;
			const playerBottomY = playerBox.min.y;

			const yOffset = tableTopY - playerBottomY + 0.05;
			player.position.set(-0.2, yOffset, 0.3);

			player.traverse((child) => {
			if ((child as THREE.Mesh).isMesh) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
			});

			recordSetup.add(player);
			makeInteractive(player);
		};

		tryAlign();
		},
		undefined,
		(error) => console.error('Error loading record player:', error)
	);

	// --- Optional: animate music label up/down ---
	const clock = new THREE.Clock();
	const baseY = musicLabel.position.y;
	function animateLabel() {
		requestAnimationFrame(animateLabel);
		const elapsed = clock.getElapsedTime();
		musicLabel.position.y = baseY + Math.sin(elapsed * 1.5) * 0.1;
	}
	animateLabel();

	// Collision helper
	const bbox = new THREE.Box3().setFromObject(recordSetup);
	bbox.expandByScalar(0.2);

	return {
		getBoundingBox: () => bbox,
		checkCollision: (pos: THREE.Vector3) => bbox.containsPoint(pos),
	};
}
