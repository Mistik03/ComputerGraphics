import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(800, 600);
document.getElementById("scene").appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  75,
  renderer.domElement.width / renderer.domElement.height,
  0.1,
  100
);
camera.position.set(1, 2, 7);
scene.add(camera);


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();


const cubes = [];
let lastSelectedCube = null;
let lastSelectedCubeColor = null;

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);


for (let i = 0; i < 30; i++) {
  const size = randBetween(0.3, 1.2);
  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = new THREE.MeshStandardMaterial({
    color: getRandomColor(),
  });

  const cube = new THREE.Mesh(geometry, material);

  cube.position.set(
    randBetween(-4, 4),
    randBetween(-4, 4),
    randBetween(-6, 0)
  );

  scene.add(cube);
  cubes.push(cube);
}


const cubeInfo = document.getElementById("cubeInfo");


window.addEventListener("click", (event) => {

  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(cubes);

 
  if (lastSelectedCube) {
    lastSelectedCube.material.color.set(lastSelectedCubeColor);
    lastSelectedCube.scale.set(1, 1, 1);
  }

 
  if (intersects.length > 0) {
    const selectedCube = intersects[0].object;

    lastSelectedCube = selectedCube;
    lastSelectedCubeColor = selectedCube.material.color.getHex();


    selectedCube.material.color.set(0xffffff);

 
    selectedCube.scale.set(1.3, 1.3, 1.3);

   
    const pos = selectedCube.position;
    const size = selectedCube.geometry.parameters;

    cubeInfo.innerHTML = `
      <b>Position:</b><br>
      x: ${pos.x.toFixed(2)}<br>
      y: ${pos.y.toFixed(2)}<br>
      z: ${pos.z.toFixed(2)}<br><br>

      <b>Size:</b><br>
      width: ${size.width.toFixed(2)}<br>
      height: ${size.height.toFixed(2)}<br>
      depth: ${size.depth.toFixed(2)}
    `;
  } 
 
  else {
    cubeInfo.innerText = "No object selected.";
    lastSelectedCube = null;
  }
});


window.addEventListener('resize', () => {
  const width = renderer.domElement.clientWidth;
  const height = renderer.domElement.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});


function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();


function randBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomColor() {
  return Math.random() * 0xffffff;
}