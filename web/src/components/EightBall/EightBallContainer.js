import React, {useState, useEffect, useRef} from 'react'
import EightBall from './EightBall'
import * as THREE from 'three'
import {StaticQuery, graphql} from 'gatsby'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import fontThing from './helvetiker_regular.typeface.json'

import {StyledParentContainer, StyledContainer} from './EightBallContainerStyles'

import LoadingScreen from '../LoadingScreen/LoadingScreen'

// export const query = graphql`
//   query categoryQuery {
//     allSanityCategory {
//       edges {
//         node {
//           id
//           slug {
//             current
//           }
//         }
//       }
//     }
//   }
// `

const EightBallContainerWithQuery = props => {
  return (
    <StaticQuery
      query={graphql`
        query categoryQuery {
          allSanityCategory {
            edges {
              node {
                id
                slug {
                  current
                }
              }
            }
          }
        }
      `}
      render={data => <EightBallContainer data={data} {...props} />}
    />
  )
}

const EightBallContainer = props => {
  const [showLoading, setShowLoading] = useState(false)
  const containerEl = useRef(null)

  if (typeof window === 'undefined') {
    global.window = {}
  }

  let scene

  let renderer
  let camera

  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()

  let hlight

  // BLACK SECTION
  let geometry = new THREE.SphereGeometry(5, 32, 32)
  let material = new THREE.MeshBasicMaterial({color: 0x2c2c2c})
  let whiteSectionGeometry, whiteSectionMaterial, whiteSection
  let mergeGeometry
  let mesh

  // Position variables
  var x1 = 0
  var y1 = 0
  var z1 = 0
  var x2 = 0
  var y2 = 0
  var z2 = 0
  // Shake sensitivity (a lower number is more sensitive)
  var sensitivity = 25

  useEffect(() => {
    scene = new THREE.Scene()
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
    camera = new THREE.PerspectiveCamera(
      75,
      containerEl.current.clientWidth / containerEl.current.clientHeight,
      0.1,
      1000
    )

    renderer.setSize(containerEl.current.clientWidth, containerEl.current.clientHeight)
    renderer.setClearColor('#000000')
    containerEl.current.appendChild(renderer.domElement)

    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 12

    hlight = new THREE.AmbientLight(0x404040, 100)
    scene.add(hlight)

    // TEXT
    // let textGeometry
    let textGeometry, textMaterial
    const fontLoader = new THREE.FontLoader()
    // let font = fontLoader.parse(fontJSON)
    // console.log(JSON.parse(JSON.stringify(fontThing)))
    fontLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_regular.typeface.json',
      function (font) {
        textGeometry = new THREE.TextGeometry('Hello!', {
          font: font,
          size: 3, // font size
          height: 0 // how much extrusion (how thick / deep are the letters)
        })
        textMaterial = new THREE.MeshBasicMaterial({color: 0x808080})
        // let textTranslation = new THREE.Matrix4().makeTranslation(0, 3, 0)
        // let textRotation = new THREE.Matrix4().makeRotationX(Math.PI / 2)
        // console.log(textGeometry)
        // textGeometry.applyMatrix(textTranslation)
        const textMesh = new THREE.Mesh(textGeometry, textMaterial)
        // scene.add(textMesh)
        // WHITE SECTION
        whiteSectionGeometry = new THREE.SphereGeometry(5, 32, 32, 0, 6.3, 0, 0.5)
        whiteSectionMaterial = new THREE.MeshBasicMaterial({color: 0xffffff})
        whiteSection = new THREE.Mesh(whiteSectionGeometry, whiteSectionMaterial)

        // Add translation and rotation to white section
        let translation = new THREE.Matrix4().makeTranslation(0, 0.07, 0)
        let rotation = new THREE.Matrix4().makeRotationX(Math.PI / 2)
        whiteSectionGeometry.applyMatrix(rotation.multiply(translation))

        // whiteSection.position.set(7, 7, 7)

        mergeGeometry = new THREE.Geometry()
        mergeGeometry.merge(geometry, geometry.matrix)
        mergeGeometry.merge(whiteSectionGeometry, whiteSectionGeometry.matrix, 1)

        mesh = new THREE.Mesh(mergeGeometry, [material, whiteSectionMaterial, textMaterial])

        // const add meshWithText = new THREE.mesh()
        scene.add(mesh)

        animate()
        // renderer.render(scene, camera)

        // console.log('TEST')
        // console.log('ondevicemotion' in window)
        // console.log(typeof window.DeviceMotionEvent !== 'undefined')
        // if ('ondevicemotion' in window || (typeof window.DeviceMotionEvent != 'undefined')) {
        //     // window.addEventListener('devicemotion', this.shakeEventDidOccur, false);
        //     this.shakeEventDidOccur();
        //   }
      }
    )
    // console.log(textGeometry)
    // console.log(textMaterial)
    // // let textForEightBall = new THREE.Mesh(textGeometry, textMaterial)

    shakeEventDidOccur()

    return function cleanup () {
      cancelAnimationFrame(animate)
      clearInterval(shakeIntervalFunc)
      window.removeEventListener('devicemotion', shakeHelper, false)
    }
  }, [])

  useEffect(() => {
    const categories = props.data.allSanityCategory.edges
      .filter(item => item.node.slug)
      .map(item => item.node.slug.current)
    if (showLoading) {
      setTimeout(() => {
        const chosenCategory = categories[Math.floor(Math.random() * categories.length)]
        window.location.href = `/${chosenCategory}`
      }, 2000)
    }
  }, [showLoading])

  const animate = () => {
    requestAnimationFrame(animate)
    // this.controls.update()
    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.01
    renderer.render(scene, camera)
  }

  const onMouseClick = (event, mesh) => {
    event.preventDefault()
    const windowArea = event.target.getBoundingClientRect()

    mouse.x = ((event.clientX - renderer.domElement.offsetLeft) / renderer.domElement.width) * 2 - 1
    mouse.y =
      -((event.clientY - renderer.domElement.offsetTop) / renderer.domElement.height) * 2 + 1

    raycaster.setFromCamera(mouse, camera)
    let intersects = raycaster.intersectObjects(scene.children, true)

    if (intersects.length > 0) {
      setShowLoading(true)
    }
  }

  const onMouseMove = event => {
    event.preventDefault()
    const windowArea = event.target.getBoundingClientRect()
    mouse.x = ((event.clientX - renderer.domElement.offsetLeft) / renderer.domElement.width) * 2 - 1
    mouse.y =
      -((event.clientY - renderer.domElement.offsetTop) / renderer.domElement.height) * 2 + 1

    let intersects = raycaster.intersectObjects(scene.children, true)
    if (intersects.length > 0) {
      alert('Mouseover')
    }
  }

  const shakeEventDidOccur = () => {
    // put your own code here etc.
    // alert('shake!');

    // Listen to motion events and update the position
    window.addEventListener('devicemotion', shakeHelper, false)

    // Periodically check the position and fire
    // if the change is greater than the sensitivity
    setInterval(shakeIntervalFunc, 150)
  }

  const shakeHelper = e => {
    x1 = e.accelerationIncludingGravity.x
    y1 = e.accelerationIncludingGravity.y
    z1 = e.accelerationIncludingGravity.z
  }

  const shakeIntervalFunc = () => {
    var change = Math.abs(x1 - x2 + y1 - y2 + z1 - z2)

    if (change > sensitivity) {
      // if (!this.state.showLoading) {
      setShowLoading(true)
      // }
    }

    // Update new position
    x2 = x1
    y2 = y1
    z2 = z1
  }

  return (
    <StyledParentContainer minHeight={props.minHeight ? props.minHeight : '500'}>
      <StyledContainer
        id='#eight-ball-container'
        /* onMouseOver={e => this.onMouseMove(e, [this.mesh])} */ onClick={e =>
          onMouseClick(e, [mesh])
        }
        ref={containerEl}
      >
        {showLoading ? <LoadingScreen /> : <EightBall />}
      </StyledContainer>
    </StyledParentContainer>
  )
}

export default EightBallContainerWithQuery
