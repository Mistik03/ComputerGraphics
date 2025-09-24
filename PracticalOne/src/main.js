import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;

const rederer = new THREE.WebGLRenderer({antialias: true});
rederer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(rederer.domElement);

const geometry = new THREE.BoxGeometry(10,10,10);
const material = new THREE.MeshBasicMaterial({color: 0x00ff88});
const cubeMesh = new THREE.Mesh(geometry, material);
scene.add(cubeMesh);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2,2,5);
scene.add(light);

function animate(){
  requestAnimationFrame(animate);
  cubeMesh.rotation.x += 0.01;
  rederer.render(scene, camera);
}

animate();
