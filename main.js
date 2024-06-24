import * as THREE from 'three';
import { Sky } from 'three/addons/objects/Sky.js';
import { MathUtils, Vector3 } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const sky = new Sky();
sky.scale.setScalar( 450000 );
scene.add( sky ); // Add sky to the scene

const phi = MathUtils.degToRad( 90 );
const theta = MathUtils.degToRad( 180 );
const sunPosition = new Vector3().setFromSphericalCoords( 1, phi, theta );

sky.material.uniforms.sunPosition.value = sunPosition;

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Add OrbitControls for camera rotation
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true; // Enable damping (inertia)
controls.dampingFactor = 0.05; // Damping inertia factor
controls.update(); // Update controls

function animate() {
    controls.update(); // Only required if controls.enableDamping = true, or if controls.autoRotate = true

    renderer.render( scene, camera );
}

renderer.setAnimationLoop( animate ); // Start the rendering loop

window.addEventListener( 'resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}, false );