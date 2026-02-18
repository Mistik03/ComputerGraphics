import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

function createRoad(scene, width, depth, texture, z) {
  const road = new THREE.Mesh(
    new THREE.PlaneGeometry(width, depth),
    new THREE.MeshStandardMaterial({ map: texture, side: THREE.DoubleSide })
  );

  road.rotation.x = -Math.PI / 2;
  road.position.set(0, 0.1, z);
  scene.add(road);
}

export function initEnvironment({ scene, camera, renderer, controls, gui, textures }) {
  camera.position.set(120, 40, 0);
  controls.enableDamping = true;

  document.body.style.margin = "0";
  document.body.appendChild(renderer.domElement);

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  gui.width = 300;

  const gridHelper = new THREE.GridHelper(30, 50, 50);
  gridHelper.visible = false;
  scene.add(gridHelper);
  gui.add(gridHelper, "visible").name("Grid Helper");

  const ambientLight = new THREE.AmbientLight(0xb9d5ff, 0.2);
  scene.add(ambientLight);
  gui.add(ambientLight, "intensity").min(0).max(1).step(0.01).name("Ambient Light");

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(-10, 20, 10);
  directionalLight.castShadow = true;

  directionalLight.target.position.set(0, 0, 0);
  directionalLight.shadow.camera.left = -30;
  directionalLight.shadow.camera.right = 30;
  directionalLight.shadow.camera.top = 30;
  directionalLight.shadow.camera.bottom = -30;
  directionalLight.shadow.camera.near = 0.1;
  directionalLight.shadow.camera.far = 100;
  directionalLight.shadow.mapSize.set(2048, 2048);
  directionalLight.shadow.camera.updateProjectionMatrix();

  scene.add(directionalLight);
  scene.add(directionalLight.target);

  new RGBELoader().load("/hdri/puresky_4k.hdr", (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
  });

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(400, 400),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: textures.floor,
      normalMap: textures.floorNormal,
      side: THREE.DoubleSide,
    })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  createRoad(scene, 200, 20, textures.asphalt, 40);
  createRoad(scene, 200, 40, textures.highway, -50);

  const platform = new THREE.Mesh(
    new THREE.BoxGeometry(47, 1, 37),
    new THREE.MeshStandardMaterial({ map: textures.tiles, roughness: 1 })
  );
  platform.position.set(-0.5, -0.25, 0);
  platform.receiveShadow = true;
  scene.add(platform);
}
