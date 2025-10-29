import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

const gui = new GUI()
const scene = new THREE.Scene()

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
gui.add(ambientLight, 'intensity').min(0).max(3).step(0.001)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
directionalLight.castShadow = true
directionalLight.position.set(2, 2, -1)
gui.add(directionalLight, 'intensity').min(0).max(3).step(0.001)
scene.add(directionalLight)

const spotLight = new THREE.SpotLight(0xffffff, 2, 10, Math.PI * 0.3)
spotLight.castShadow = true
spotLight.position.set(0, 2, 2)
scene.add(spotLight)
scene.add(spotLight.target)

const pointLight = new THREE.PointLight(0xffffff, 2)
pointLight.castShadow = true
pointLight.position.set(-1, 1, 0)
scene.add(pointLight)


// Material
const material = new THREE.MeshStandardMaterial({ roughness: 0.7 })
gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material)
sphere.castShadow = true

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material)
plane.receiveShadow = true
plane.rotation.x = -Math.PI * 0.5
plane.position.y = -0.5

scene.add(sphere, plane)

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(1, 1, 5)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.appendChild(renderer.domElement)

// Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

// Animation
const clock = new THREE.Clock()

function tick() {
  const elapsedTime = clock.getElapsedTime()

  sphere.position.x = Math.cos(elapsedTime) * 1.5
  sphere.position.z = Math.sin(elapsedTime) * 1.5
  sphere.position.y = Math.abs(Math.sin(elapsedTime * 3))

  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}

tick()