import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import gsap from 'gsap'
import './style.css'
// import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
/**
 * Debug
 */
const gui = new dat.GUI()

/**
 * Texture
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/assets/matcap2.png')
/**
 * Font
 */
const fontLoader = new FontLoader()
fontLoader.load('/fonts/helvetiker_regular.typeface.json', font => {
  const textGeometry = new TextGeometry('Tin Nguyen', {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4
  })
  const textMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture
    // wireframe: true
  })
  // textGeometry.computeBoundingBox()
  // console.log('textGeometry: ', textGeometry.boundingBox)
  // textGeometry.translate(
  //   -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
  //   -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
  //   -(textGeometry.boundingBox.max.z - 0.03) * 0.5
  // )
  textGeometry.center()
  const text = new THREE.Mesh(textGeometry, textMaterial)
  scene.add(text)
  console.time('donuts')
  const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 24)
  const donutMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture
  })
  for (let index = 0; index < 100; index++) {
    const donut = new THREE.Mesh(donutGeometry, donutMaterial)

    donut.position.set(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    )

    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y = Math.random() * Math.PI

    const scale = Math.random()
    donut.scale.set(scale, scale, scale)

    scene.add(donut)
  }
  console.timeEnd('donuts')
})

const canvas = document.querySelector('canvas.webgl')

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  // Limit the pixel ratio
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => {
  const fullScreenElement =
    document.fullscreenElement || document.webkitFullscreenElement
  if (!fullScreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }
})

// Scene
const scene = new THREE.Scene()

// AXES HELPER
const axesHelper = new THREE.AxesHelper(5)
// scene.add(axesHelper)

// Red Cube Box
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  1000
)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
})
renderer.setSize(sizes.width, sizes.height)

// Clock
const clock = new THREE.Clock()

// Animations
const tick = () => {
  // Clock
  const elapsedTime = clock.getElapsedTime()
  // Update objects
  // mesh.rotation.y = elapsedTime * Math.PI * 2

  // Update camera
  // camera.position.x = cursor.x * 3
  // camera.position.y = cursor.y * 3
  // camera.lookAt(mesh.position)

  // Update controls
  controls.update()

  // Renderer
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()
