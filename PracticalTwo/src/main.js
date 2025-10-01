import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(5,5,5);
const material = new THREE.MeshStandardMaterial({color: 0xff0000});
const cubeMesh = new THREE.Mesh(geometry, material);
// scene.add(cubeMesh);

// Change object position
cubeMesh.position.x = 0.7;
cubeMesh.position.y = -1;
cubeMesh.position.z = 1;
// (other option)
// cubeMesh.position.set(0.7, -1, 1);

console.log("Distance of cube from camera:",cubeMesh.position.distanceTo(camera.position));

//Axes helper
const axes = new THREE.AxesHelper(20);
scene.add(axes);

//Scale object
//cubeMesh.scale.x = 2;
//cubeMesh.scale.y = 2;
//cubeMesh.scale.z = 2;
// (other option)
// cubeMesh.scale.set(2,2,2);

//Rotate object
//cubeMesh.rotation.x = Math.PI * 0.25;
//cubeMesh.rotation.y = Math.PI * 0.25;
// (other option)
// cubeMesh.rotation.set(Math.PI*0.25, Math.PI*0.25, 0);

//Applying all transformations at once
//cubeMesh.position.set(0.7, -0.6, 1);
//cubeMesh.scale.set(2, 0.25, 0.5);
// cubeMesh.rotation.set(Math.PI*0.25, Math.PI*0.25, 0);

//Scene graph
const group = new THREE.Group();
group.position.set(2.2, 1.2, 2);
group.scale.y = 2;
group.rotation.y = 0.2;
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshStandardMaterial({color: 0xFF0000})
)
cube1.position.x = -1.5;
group.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshStandardMaterial({color: 0x00ff00})
);
cube2.position.x = 1.5;
group.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshStandardMaterial({color: 0xFFFF00})
)
cube1.position.x = -1.5;
group.add(cube3);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2,2,5);
scene.add(light);



function animate(){
  requestAnimationFrame(animate);
  // cubeMesh.rotation.x += 0.01;
  renderer.render(scene, camera);
}

animate();
