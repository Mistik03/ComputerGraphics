import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(10,10,10);
//const geometry = new THREE.SphereGeometry(5, 64, 64);
//const geometry = new THREE>THREE.TorusGeometry(5, 2, 16, 100);

//const geometry = new THREE.BoxGeometry(10,10,10);
//const material = new THREE.MeshStandardMaterial({color: 0x00ff88, wireframe: true});
// const material = new THREE.MeshLambertMaterial({color: 0x00ff88, wireframe: false});

// const material = new THREE.MeshStandardMaterial({
  // color: 0x00ff88,
  // roughness: 0.6,
  // metalness: 0.9,
  // wireframe: false
// });

const material = new THREE.MeshPhongMaterial({
  color: 0x00ff88,
  shininess: 100,
  specular: 0x009900,
  flatShading: false,
  wireframe: false
});

const cubeMesh = new THREE.Mesh(geometry, material);
scene.add(cubeMesh);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2,2,5);
scene.add(light);
// const light = new THREE.AmbientLight(0xffffff, 1);
// scene.add(light);

function animate(){
  requestAnimationFrame(animate);
  cubeMesh.rotation.x += 0.0010;
  cubeMesh.rotation.y += 0.0010;
  cubeMesh.rotation.z += 0.01;
  renderer.render(scene, camera);
}

animate();
