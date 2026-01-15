import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// Camera setup
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  3000
);
camera.position.set(40, 40, 70);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

// Controls setup
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 10, 0);
controls.enableDamping = true;
controls.update();

// Lighting setup
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const sunLight = new THREE.DirectionalLight(0xffffff, 1);
sunLight.position.set(50, 80, 50);
sunLight.castShadow = true;
sunLight.shadow.mapSize.set(2048, 2048);
scene.add(sunLight);

// Loader
const loader = new GLTFLoader();

// Campus models
loader.load(
  "/models/campus.glb",
  (gltf) => {
    const campus = gltf.scene;

    campus.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material.map) {
          child.material.map.colorSpace = THREE.SRGBColorSpace;
          child.material.needsUpdate = true;
        }
      }
    });

    campus.position.set(0, 0, 0);
    scene.add(campus);
  },
  undefined,
  (err) => console.error("Campus load error:", err)
);

// Trees
let treeModel = null;
const trees = []; // array to store all cloned trees

loader.load(
  "/models/tree_small_02_1k.gltf/tree_small_02_1k.gltf",
  (gltf) => {
    treeModel = gltf.scene;

    treeModel.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material.map) {
          child.material.map.colorSpace = THREE.SRGBColorSpace;
        }
      }
    });

    // Adding multiple trees at different positions
    addTree(0, 0, -15);
    addTree(24, 0, -15);
    addTree(10, 0, 30);
  },
  undefined,
  (err) => console.error("Tree load error:", err)
);

// Clone and place tree function
function addTree(x, y, z) {
  if (!treeModel) return;

  const tree = treeModel.clone(true);
  tree.scale.setScalar(4); // Tree size
  tree.position.set(x, y, z);
  scene.add(tree);

  trees.push(tree);
}

// Road texture
const roadTexture = new THREE.TextureLoader().load("/assets/textures/road.png");
roadTexture.colorSpace = THREE.SRGBColorSpace;
roadTexture.wrapS = roadTexture.wrapT = THREE.RepeatWrapping;
roadTexture.repeat.set(5, 10);

// Roads
const roadMaterial = new THREE.MeshStandardMaterial({ map: roadTexture });

const road1 = new THREE.Mesh(new THREE.PlaneGeometry(14, 80), roadMaterial);
road1.rotation.x = -Math.PI / 2;
road1.position.set(-12, 0.02, 25);
road1.receiveShadow = true;
scene.add(road1);

const road2 = new THREE.Mesh(new THREE.PlaneGeometry(14, 80), roadMaterial);
road2.rotation.x = -Math.PI / 2;
road2.position.set(36, 0.02, 25);
road2.receiveShadow = true;
scene.add(road2);

// Grass texture
const grassTexture = new THREE.TextureLoader().load("/assets/textures/grass.png");
grassTexture.colorSpace = THREE.SRGBColorSpace;
grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
grassTexture.repeat.set(25, 25);

const grass = new THREE.Mesh(
  new THREE.PlaneGeometry(500, 500),
  new THREE.MeshStandardMaterial({ map: grassTexture })
);
grass.rotation.x = -Math.PI / 2;
grass.position.y = 0.01;
grass.receiveShadow = true;
scene.add(grass);

// Animation Loop
let swayTime = 0; // time counter for tree sway

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  // Animate tree sway
  swayTime += 0.10;
  const swayAmplitude = 0.05; // radians
  trees.forEach((tree, i) => {
    tree.rotation.z = Math.sin(swayTime + i) * swayAmplitude; // phase offset per tree
  });

  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
