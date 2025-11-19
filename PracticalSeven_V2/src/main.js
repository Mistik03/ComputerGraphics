import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const dirLight = new THREE.DirectionalLight(0xffffff, 3);
dirLight.position.set(5, 10, 5);
dirLight.castShadow = true;
scene.add(dirLight);

scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const loader = new THREE.TextureLoader();

const colorMap = loader.load('/textures/rock_wall_15_diff_2k.png');
const normalMap = loader.load('/textures/rock_wall_15_nor_gl_2k.png');
const roughnessMap = loader.load('/textures/rock_wall_15_rough_2k.png');
const aoMap = loader.load('/textures/rock_wall_15_ao_2k.png');
const displacementMap = loader.load('/textures/rock_wall_15_disp_2k.png');

colorMap.anisotropy = renderer.capabilities.getMaxAnisotropy();
normalMap.anisotropy = renderer.capabilities.getMaxAnisotropy();
roughnessMap.anisotropy = renderer.capabilities.getMaxAnisotropy();


const sphereGeometry = new THREE.SphereGeometry(2, 256, 256);
sphereGeometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(sphereGeometry.attributes.uv.array, 2)
);

const sphereMaterial = new THREE.MeshStandardMaterial({
  map: colorMap,
  normalMap: normalMap,
  roughnessMap: roughnessMap,
  displacementMap: displacementMap,
  displacementScale: 0.05,
  aoMap: aoMap,
  roughness: 1.0,
});

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true;
sphere.receiveShadow = true;
scene.add(sphere);

function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.y += 0.003;
  renderer.render(scene, camera);
}
animate();