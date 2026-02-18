import * as THREE from "three";

export function toVec3(value, fallback = 0) {
  if (Array.isArray(value)) {
    return [value[0] ?? fallback, value[1] ?? fallback, value[2] ?? fallback];
  }

  return [value ?? fallback, value ?? fallback, value ?? fallback];
}

export function applyTransform(
  object,
  { position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1] } = {}
) {
  const [px, py, pz] = toVec3(position, 0);
  const [rx, ry, rz] = toVec3(rotation, 0);
  const [sx, sy, sz] = toVec3(scale, 1);

  object.position.set(px, py, pz);
  object.rotation.set(rx, ry, rz);
  object.scale.set(sx, sy, sz);
}

export function enableShadows(root, receiveShadow = false) {
  root.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = receiveShadow;
    }
  });
}

export function loadTexture(textureLoader, path, options = {}) {
  const { repeat, clamp = false } = options;
  const texture = textureLoader.load(path);

  if (repeat) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeat[0], repeat[1]);
  }

  if (clamp) {
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.minFilter = THREE.LinearFilter;
  }

  return texture;
}

export function loadGltf(gltfLoader, path, onLoad, label = path) {
  gltfLoader.load(
    path,
    (gltf) => onLoad(gltf.scene),
    undefined,
    (error) => console.error(`Failed to load ${label}`, error)
  );
}

export function addModel({
  scene,
  gltfLoader,
  path,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  receiveShadow = false,
  onReady,
}) {
  loadGltf(gltfLoader, path, (model) => {
    applyTransform(model, { scale, position, rotation });
    enableShadows(model, receiveShadow);
    scene.add(model);
    onReady?.(model);
  });
}

export function addWindowHole(shape, x, y, width, height) {
  const hole = new THREE.Path();
  hole.moveTo(x - width / 2, y);
  hole.lineTo(x - width / 2, y + height);
  hole.lineTo(x + width / 2, y + height);
  hole.lineTo(x + width / 2, y);
  hole.lineTo(x - width / 2, y);
  shape.holes.push(hole);
}

export function normalizeShapeUVs(geometry) {
  geometry.computeBoundingBox();
  const min = geometry.boundingBox.min;
  const max = geometry.boundingBox.max;
  const uv = geometry.attributes.uv;

  for (let i = 0; i < uv.count; i++) {
    uv.setXY(
      i,
      (uv.getX(i) - min.x) / (max.x - min.x),
      (uv.getY(i) - min.y) / (max.y - min.y)
    );
  }
}
