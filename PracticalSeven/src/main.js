import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setPixelRatio(window.devicePixelRatio);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/textures/Stylized_Wood_Floor_001_basecolor.png');
texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(4, 4);

const material = new THREE.MeshBasicMaterial({ 
  map: texture
});

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 10),
  material
);
scene.add(cube);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.y += 0.005;
  renderer.render(scene, camera);
}
animate();