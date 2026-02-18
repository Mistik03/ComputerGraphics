import * as THREE from "three";
import { addWindowHole, normalizeShapeUVs } from "./utils.js";

export function createNeighborhood({ scene, textures, loadGltf, enableShadows }) {
  const wallWidth = 20;
  const wallHeight = 12;
  const houses = [];

  const wallGeometry = new THREE.BoxGeometry(wallWidth, wallHeight, wallWidth);
  const roofGeometry = new THREE.ConeGeometry(wallWidth * 1.2, wallHeight * 0.5, 4);
  const doorGeometry = new THREE.PlaneGeometry(5, 8);

  const wallMaterial = new THREE.MeshStandardMaterial({
    map: textures.bricks,
    normalMap: textures.bricksNormal,
  });
  const roofMaterial = new THREE.MeshStandardMaterial({
    map: textures.roof,
    normalMap: textures.roofNormal,
  });
  const doorMaterial = new THREE.MeshStandardMaterial({
    map: textures.doorColor,
    normalMap: textures.doorNormal,
    alphaMap: textures.doorAlpha,
    transparent: true,
  });

  for (let i = -5; i <= 5; i++) {
    const house = new THREE.Group();

    const walls = new THREE.Mesh(wallGeometry, wallMaterial);
    walls.position.y = wallHeight / 2;
    walls.castShadow = true;
    house.add(walls);

    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = wallHeight + wallHeight * 0.25;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    house.add(roof);

    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, 4, wallWidth / 2 + 0.01);
    door.castShadow = true;
    house.add(door);

    house.position.set(i * 50, 0, 0);
    houses.push(house);
    scene.add(house);
  }

  loadGltf(
    "/models/window.glb",
    (windowTemplate) => {
      windowTemplate.scale.set(0.1, 0.1, 0.1);
      enableShadows(windowTemplate);

      houses.forEach((house) => {
        [-wallWidth / 4, wallWidth / 4].forEach((x) => {
          const windowModel = windowTemplate.clone(true);
          windowModel.position.set(x, wallHeight / 2, wallWidth / 2 + 0.5);
          house.add(windowModel);
        });
      });
    },
    "window model"
  );
}

export function createFeaturedHouse(textures) {
  const house = new THREE.Group();
  const wallWidth = 19;
  const wallHeight = 12;
  const wallDepth = 7.5;
  const sideWallLength = 15;

  const wallMaterial = new THREE.MeshStandardMaterial({
    map: textures.customWall,
    side: THREE.DoubleSide,
  });

  const frontWall = new THREE.Mesh(new THREE.PlaneGeometry(wallWidth, wallHeight), wallMaterial);
  frontWall.position.set(0, wallHeight / 2, -wallDepth - 0.01);
  frontWall.castShadow = true;
  house.add(frontWall);

  const wallShape = new THREE.Shape()
    .moveTo(-wallWidth / 2, 0)
    .lineTo(-wallWidth / 2, wallHeight)
    .lineTo(wallWidth / 2, wallHeight)
    .lineTo(wallWidth / 2, 0)
    .lineTo(-wallWidth / 2, 0);

  addWindowHole(wallShape, -6, 7, 3, 2.8);
  addWindowHole(wallShape, 5, 7, 3, 2.8);

  const backWallGeometry = new THREE.ShapeGeometry(wallShape);
  normalizeShapeUVs(backWallGeometry);

  const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
  backWall.position.set(0, 0, wallDepth);
  backWall.castShadow = true;
  house.add(backWall);

  [-1, 1].forEach((dir) => {
    const sideWall = new THREE.Mesh(new THREE.PlaneGeometry(sideWallLength, wallHeight), wallMaterial);
    sideWall.position.set(dir * (wallWidth / 2 + 0.01), wallHeight / 2, 0);
    sideWall.rotation.y = dir * Math.PI / 2;
    sideWall.castShadow = true;
    house.add(sideWall);
  });

  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(wallWidth * 0.85, wallHeight * 0.4, 4),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.45,
      map: textures.roof,
      normalMap: textures.roofNormal,
    })
  );
  roof.position.y = wallHeight + (wallHeight * 0.4) / 2;
  roof.rotation.y = Math.PI / 4;
  roof.castShadow = true;
  house.add(roof);

  const door = new THREE.Mesh(
    new THREE.PlaneGeometry(6, 6, 10, 10),
    new THREE.MeshStandardMaterial({
      roughness: 0.1,
      map: textures.doorColor,
      alphaMap: textures.doorAlpha,
      transparent: true,
      normalMap: textures.doorNormal,
    })
  );
  door.position.set(0, 2.9, wallWidth / 2 - 1.8);
  door.castShadow = true;
  house.add(door);

  return house;
}