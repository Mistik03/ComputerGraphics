# 3D Interactive Neighborhood

A modular Three.js scene featuring a neighborhood with roads, houses, imported GLB assets, snowfall, lighting controls, and a moving car.

## Features
- Interactive camera controls with `OrbitControls`
- Toggleable grid and ambient light intensity via GUI
- HDR environment map for sky and reflections
- Repeating neighborhood houses + one custom procedural house
- Imported models (cars, trees, houses, football field, lunapark, characters)
- Snow particle system
- Moving car animation

## Project Structure
```text
.
|- main.js
|- scene/
|  |- context.js
|  |- utils.js
|  |- textures.js
|  |- environment.js
|  |- structures.js
|  |- effects.js
|  |- models.js
|- public/
|  |- hdri/
|  |- models/
|  |- textures/
```

### What Each Module Does
- `main.js`: Bootstraps app, wires modules, resize handler, and main animation loop.
- `scene/context.js`: Shared runtime singletons (`scene`, `camera`, `renderer`, `controls`, loaders, GUI, `updaters`).
- `scene/utils.js`: Reusable helpers for transforms, shadows, textures, and GLTF loading.
- `scene/textures.js`: Centralized texture loading and configuration.
- `scene/environment.js`: Lights, HDR map, ground, roads, and platform setup.
- `scene/structures.js`: Neighborhood houses and featured custom house geometry.
- `scene/effects.js`: Snow particle system updater.
- `scene/models.js`: GLB model placement and moving car behavior.

## Getting Started

### Prerequisites
- Node.js 18+ (recommended)

### Install
```bash
npm install
```

### Run Development Server
```bash
npx vite
```

## Controls
- Left mouse drag: orbit
- Right mouse drag: pan
- Mouse wheel: zoom
- dat.GUI panel:
  - Grid visibility
  - Ambient light intensity

## Customization Guide
- Add or move imported models: edit the config list in `scene/models.js`.
- Change snow density/speed: edit `createSnowUpdater` in `scene/effects.js`.
- Adjust lights/environment: edit `scene/environment.js`.
- Change neighborhood/custom house geometry/materials: edit `scene/structures.js`.
- Swap textures: edit `scene/textures.js`.