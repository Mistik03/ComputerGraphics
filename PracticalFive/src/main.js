import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const sizes = {
    width: 800,
    height: 600
}

// Cursor (for manual camera movement later if desired)
const cursor = { x: 0, y: 0 }

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -(event.clientY / sizes.height - 0.5)
})

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x202020)

const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
)
scene.add(mesh)

/**
 * 
 * Try switching between Perspective and Orthographic cameras
 */

// --- Perspective Camera ---
// const camera = new THREE.PerspectiveCamera(
    // 75,                         // FOV (degrees)
    // sizes.width / sizes.height, // Aspect ratio
    // 0.1,                        // Near clipping plane
    // 100                         // Far clipping plane
// )
// scene.add(camera)
// camera.position.z = 3

// --- Alternative: Orthographic Camera (uncomment to test) ---
const aspectRatio = sizes.width / sizes.height
const camera = new THREE.OrthographicCamera(
    -1 * aspectRatio,  // left
    1 * aspectRatio,   // right
    1,                 // top
    -1,                // bottom
    0.1,               // near
    100                // far
)
camera.position.z = 3
scene.add(camera)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true // smooth motion

const animate = () => {

    // Optional: move camera manually with cursor
    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    camera.lookAt(mesh.position)

    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
}

animate()

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})