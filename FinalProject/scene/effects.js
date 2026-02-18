import * as THREE from "three";

export function createSnowUpdater(scene, count = 5000) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = Math.random() * 400 - 200;
    positions[i * 3 + 1] = Math.random() * 500 - 250;
    positions[i * 3 + 2] = Math.random() * 400 - 200;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const snow = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.2,
      transparent: true,
      opacity: 0.8,
    })
  );

  scene.add(snow);

  return () => {
    const array = geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      array[idx + 1] -= 0.2;

      if (array[idx + 1] < -250) {
        array[idx + 1] = 250;
      }

      array[idx] += Math.random() * 0.2 - 0.1;
      array[idx + 2] += Math.random() * 0.2 - 0.1;
    }

    geometry.attributes.position.needsUpdate = true;
  };
}