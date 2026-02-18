import { scene, camera, renderer, controls, textureLoader, gltfLoader, gui, updaters } from "./scene/context.js";
import { initEnvironment } from "./scene/environment.js";
import { createTextures } from "./scene/textures.js";
import { createNeighborhood, createFeaturedHouse } from "./scene/structures.js";
import { createSnowUpdater } from "./scene/effects.js";
import { loadSceneModels } from "./scene/models.js";
import { addModel, applyTransform, enableShadows, loadGltf } from "./scene/utils.js";

const textures = createTextures(textureLoader);

const runtime = {
  scene,
  camera,
  renderer,
  controls,
  gui,
  textures,
  updaters,
  loadGltf: (path, onLoad, label) => loadGltf(gltfLoader, path, onLoad, label),
  addModel: (options) => addModel({ scene, gltfLoader, ...options }),
  enableShadows,
  applyTransform,
};

initEnvironment(runtime);
createNeighborhood(runtime);
scene.add(createFeaturedHouse(textures));
updaters.push(createSnowUpdater(scene, 5000));
loadSceneModels(runtime);

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

function animate() {
  requestAnimationFrame(animate);
  updaters.forEach((update) => update());
  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener("resize", onResize);
animate();