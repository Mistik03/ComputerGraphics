function loadTrees({ scene, loadGltf, enableShadows, applyTransform }) {
  const treeData = [
    { position: [22, 0, -22], scale: 6 },
    { position: [-22, 0, -22], scale: 6 },
    { position: [30, 0, 0], scale: 5 },
    { position: [-30, 0, 10], scale: 5 },
  ];

  loadGltf(
    "/models/tree.glb",
    (treeTemplate) => {
      enableShadows(treeTemplate);

      treeData.forEach(({ position, scale }, index) => {
        const tree = index === 0 ? treeTemplate : treeTemplate.clone(true);
        applyTransform(tree, { position, scale });
        scene.add(tree);
      });
    },
    "tree model"
  );
}

export function loadSceneModels({
  scene,
  updaters,
  addModel,
  loadGltf,
  enableShadows,
  applyTransform,
}) {
  [
    { path: "/models/porsche.glb", scale: 3.5, position: [-15, 2.5, 0] },
    {
      path: "/models/house1.glb",
      scale: 3,
      position: [70, 10.5, 55],
      rotation: [0, -Math.PI / 2, 0],
    },
    { path: "/models/house2.glb", scale: 40, position: [-80, 0, 60], rotation: [0, Math.PI, 0] },
    { path: "/models/house3.glb", scale: 3, position: [10, 2, 80], rotation: [0, Math.PI * 2, 0] },
    {
      path: "/models/house5.glb",
      scale: 4,
      position: [-30, 0.1, 80],
      rotation: [0, -7.9, 0],
      receiveShadow: true,
    },
    { path: "/models/lunapark.glb", scale: 0.7, position: [80, 0, -100], rotation: [0, Math.PI * 2, 0] },
    {
      path: "/models/football_field.glb",
      scale: 1.5,
      position: [-30, 0, -150],
      rotation: [0, Math.PI * 2, 0],
    },
    { path: "/models/player1.glb", scale: 0.1, position: [-30, 3, -120], rotation: [0, Math.PI * 2, 0] },
    { path: "/models/player2.glb", scale: 0.1, position: [10, 3, -120], rotation: [0, Math.PI * 2, 0] },
    { path: "/models/person.glb", scale: 0.1, position: [50, 0, 50] },
  ].forEach(addModel);

  addModel({
    path: "/models/untitled.glb",
    scale: 3.5,
    position: [-70, 0.2, 40],
    rotation: [0, Math.PI / 2, 0],
    onReady: (movingCar) => {
      const speed = 1;
      const minX = -70;
      const maxX = 70;

      updaters.push(() => {
        movingCar.position.x += speed;
        if (movingCar.position.x >= maxX) {
          movingCar.position.x = minX;
        }
      });
    },
  });

  loadTrees({ scene, loadGltf, enableShadows, applyTransform });
}
