import * as THREE from 'three';
import { Sky } from 'three/addons/objects/Sky.js';
import { MathUtils, Vector3 } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const sky = new Sky();
sky.scale.setScalar(450000);
scene.add(sky); // Add sky to the scene

const sun = new THREE.Vector3();

const effectController = {
    turbidity: 10,
    rayleigh: 2,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.5, // Adjust this value to reduce the sun glare
    elevation: 2,
    azimuth: 180,
    exposure: 0.5
};

function guiChanged() {
    const uniforms = sky.material.uniforms;
    uniforms['turbidity'].value = effectController.turbidity;
    uniforms['rayleigh'].value = effectController.rayleigh;
    uniforms['mieCoefficient'].value = effectController.mieCoefficient;
    uniforms['mieDirectionalG'].value = effectController.mieDirectionalG;

    const phi = MathUtils.degToRad(90 - effectController.elevation);
    const theta = MathUtils.degToRad(effectController.azimuth);

    sun.setFromSphericalCoords(1, phi, theta);

    uniforms['sunPosition'].value.copy(sun);

    renderer.toneMappingExposure = effectController.exposure;
    renderer.render(scene, camera);
}

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add OrbitControls for camera rotation
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable damping (inertia)
controls.dampingFactor = 0.05; // Damping inertia factor
controls.update(); // Update controls

// Create a simple ground plane for the landscape
const groundGeometry = new THREE.PlaneGeometry(10000, 10000);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x008800 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // Rotate the plane to be horizontal
scene.add(ground);

// Adjust the light source to reduce glare
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Lower the intensity
directionalLight.position.set(10, 10, 10); // Adjust the position
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x404040); // Add some ambient light
scene.add(ambientLight);

guiChanged(); // Call guiChanged to initialize the sky settings

function animate() {
    controls.update(); // Only required if controls.enableDamping = true, or if controls.autoRotate = true

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate); // Start the rendering loop

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);