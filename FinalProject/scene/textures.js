import { loadTexture } from "./utils.js";

export function createTextures(textureLoader) {
  const textures = {
    doorColor: loadTexture(textureLoader, "/textures/door/color.jpg"),
    doorAlpha: loadTexture(textureLoader, "/textures/door/alpha.jpg"),
    doorNormal: loadTexture(textureLoader, "/textures/door/normal.jpg"),
    bricks: loadTexture(textureLoader, "/textures/bricks/yellow.webp"),
    bricksNormal: loadTexture(textureLoader, "/textures/bricks/yellow.webp"),
    roof: loadTexture(textureLoader, "/textures/bricks/roof.jpg"),
    roofNormal: loadTexture(textureLoader, "/textures/bricks/roof.jpg"),
    floor: loadTexture(textureLoader, "/textures/floor/snow.jpg", { repeat: [4, 4] }),
    floorNormal: loadTexture(textureLoader, "/textures/floor/snow.jpg", {
      repeat: [4, 4],
    }),
    asphalt: loadTexture(textureLoader, "/textures/floor/asphalt.jpg", { repeat: [1, 1] }),
    highway: loadTexture(textureLoader, "/textures/floor/highway.jpg", { repeat: [2, 5] }),
    tiles: loadTexture(textureLoader, "/textures/bricks/tiles.jpg", { repeat: [4, 4] }),
    customWall: loadTexture(textureLoader, "/textures/bricks/yellow.webp", {
      clamp: true,
    }),
  };

  textures.highway.rotation = Math.PI / 2;
  return textures;
}
