import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//SCENE, CAMERA, RENDERER
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // sky blue

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(30, 30, 50);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

//ORBIT CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.update();

//LIGHTS
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(20, 40, 20);
dirLight.castShadow = true;
scene.add(dirLight);



//ROAD TEXTURE
const roadTexture = new THREE.TextureLoader().load('/assets/textures/road.png');
roadTexture.encoding = THREE.sRGBEncoding;
roadTexture.wrapS = roadTexture.wrapT = THREE.RepeatWrapping;
roadTexture.repeat.set(5, 10);

//ROAD 1
const roadGeometry = new THREE.PlaneGeometry(14, 80);
const roadMaterial = new THREE.MeshStandardMaterial({ map: roadTexture });
const road = new THREE.Mesh(roadGeometry, roadMaterial);

road.rotation.x = -Math.PI / 2;
road.position.set(-12, 0.02, 25);
road.receiveShadow = true;
scene.add(road);

//ROAD 2
const road2Geometry = new THREE.PlaneGeometry(14, 80);
const road2Material = new THREE.MeshStandardMaterial({ map: roadTexture });
const road2 = new THREE.Mesh(road2Geometry, road2Material);

road2.rotation.x = -Math.PI / 2;
road2.position.set(36, 0.02, 25);
road2.receiveShadow = true;
scene.add(road2);






// ---------- GRASS OVERLAY ----------
const grassTexture = new THREE.TextureLoader().load('/assets/textures/grass.png');
grassTexture.encoding = THREE.sRGBEncoding;
grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
grassTexture.repeat.set(20, 20);

const grass = new THREE.Mesh(
  new THREE.PlaneGeometry(400, 400),
  new THREE.MeshStandardMaterial({ map: grassTexture, transparent: false, opacity: 1})
);
grass.rotation.x = -Math.PI / 2;
grass.position.y = 0.01;
grass.receiveShadow = true;
scene.add(grass);

// ---------- LOAD CAMPUS GLB ----------
const loader = new GLTFLoader();
loader.load(
  '/models/campus.glb',
  (gltf) => {
    const campus = gltf.scene;

    campus.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        // Fix colors for textures
        if (child.material.map) {
          child.material.map.encoding = THREE.sRGBEncoding;
          child.material.needsUpdate = true;
        }
      }
    });

    campus.position.set(0, 0, 0);
    scene.add(campus);
  },
  undefined,
  (error) => {
    console.error('Error loading GLB:', error);
  }
);

// ---------- ANIMATION LOOP ----------
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // required for damping
  renderer.render(scene, camera);
}
animate();

// ---------- HANDLE WINDOW RESIZE ----------
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
