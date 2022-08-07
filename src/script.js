import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'



/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')

// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ ✧✧✧✧ FONT LOADER ✧✧✧✧ ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
const fontLoader = new FontLoader()
fontLoader.load('/fonts/helvetiker_regular.typeface.json',
    (font) => {
        
        const textGeometry = new TextGeometry(
            'COLIN THOMPSON',
            {
                font: font,
                size: 0.5,
                height: 0.1,
                curveSegments: 6,
                bevelEnabled: true,
                bevelSize:0.03,
                bevelThickness: 0.01,
                bevelOffset: 0,
                bevelSegments:4,
                

            }
        )
        // textGeometry.computeBoundingBox()
        // textGeometry.translate(
        //     -(textGeometry.boundingBox.max.x -0.02 ) / 2,
        //     -(textGeometry.boundingBox.max.y - 0.02 ) / 2,
        //     -(textGeometry.boundingBox.max.z - 0.03 ) / 2 
        // )

        textGeometry.center()
        const material = new THREE.MeshMatcapMaterial({matcap: matcapTexture})

        material.wireframe = false
        const text = new THREE.Mesh(textGeometry, material)
        scene.add(text)

        const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45)

        const boxGeometry = new THREE.BoxBufferGeometry(1,1,1)

        const sphereGeometry = new THREE.SphereBufferGeometry(.5,32,32)
        const sphereGeometry2 = new THREE.SphereBufferGeometry(1,2,3)
        
        console.time('donuts')
        for(let i = 0; i < 100; i++){
           
            // const donut = new THREE.Mesh(donutGeometry, material)
            const box = new THREE.Mesh(boxGeometry, material)
            const sphere = new THREE.Mesh(sphereGeometry, material)
            const sphere2 = new THREE.Mesh(sphereGeometry2, material)

            // donut.position.x = (Math.random() - 0.5)* 25
            // donut.position.y = (Math.random() - 0.5)* 25
            // donut.position.z = (Math.random() - 0.5)* 25

            sphere.position.x = (Math.random() - 0.5)* 20
            sphere.position.y = (Math.random() - 0.5)* 20
            sphere.position.z = (Math.random() - 0.5)* 40

            sphere2.position.x = (Math.random() - 0.5)* 30
            sphere2.position.y = (Math.random() - 0.5)* 30
            sphere2.position.z = (Math.random() - 0.5)* 40

            box.position.x = (Math.random() - 0.5)* 35
            box.position.y = (Math.random() - 0.5)* 35
            box.position.z = (Math.random() - 0.5)* 40


            sphere2.rotation.x = (Math.random() * Math.PI)
            sphere2.rotation.y = (Math.random() * Math.PI)
            
            // donut.rotation.x = (Math.random() * Math.PI)
            // donut.rotation.y = (Math.random() * Math.PI)

            box.rotation.x = (Math.random() * Math.PI)
            box.rotation.y = (Math.random() * Math.PI)

            const scale = Math.random()
            sphere2.scale.set(scale, scale, scale)
            box.scale.set(scale, scale, scale)
            sphere.scale.set(scale, scale, scale)

            scene.add(box)
            // scene.add(donut)
            scene.add(sphere)
            scene.add(sphere2)
        }
        console.timeEnd('donuts')

    }
)

/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )

// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
    
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 12
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

    camera.position.x = Math.sin(elapsedTime)
    camera.position.y = Math.sin(elapsedTime)

}

tick()