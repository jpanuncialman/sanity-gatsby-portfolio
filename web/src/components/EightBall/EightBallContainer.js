import React, { useState, useEffect, useRef } from 'react'
import EightBall from './EightBall'
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { StyledContainer } from './EightBallContainerStyles'

import LoadingScreen from '../LoadingScreen/LoadingScreen'

// import THREEx from '../../../static/js/threex.domevents.js'

// import initializeDomEvents from 'threex.domevents';
// import GLTFLoader from 'three-gltf-loader';
// import model from '../../assets/archive/8ball.gltf';


const EightBallContainer = props => {
    const [showLoading, setShowLoading] = useState(false)

    useEffect(() => {
        document.getElementById("#eight-ball-container").appendChild( renderer.domElement );
        if (showLoading) {
            setTimeout(() => {
                window.location.href = '/art'
            }, 2000)
        }
        return function cleanup() {
            cancelAnimationFrame(animate)
            window.removeEventListener('devicemotion', shakeEventDidOccur, false)
        }
    })

    const containerEl = useRef();
    //   threeEntryPoint(this.threeRootElement);
    const scene = new THREE.Scene();
    // this.scene.background = new THREE.Color(0xdddddd);
    // var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize( window.innerWidth, window.innerHeight);
    renderer.setClearColor('#000000')
    // renderer.setSize( this.mount.clientWidth, this.mount.clientHeight );
    
    // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // var cube = new THREE.Mesh( geometry, material );
    // scene.add( cube );
    // camera.position.z = 5;
    // this.camera = new THREE.PerspectiveCamera(75,this.mount.clientWidth/this.mount.clientHeight,0.1,1000);
    const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
    // camera.rotation.y = 45/180*Math.PI;
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 10;

    // window.addEventListener('resize', () => {
    //     renderer.setSize(this.mount.clientWidth, this.mount.clientHeight)
    //     camera.aspect = this.mount.clientWidth / this.mount.clientHeight;
    //     camera.updateProjectionMatrix()
    // })

    let hlight = new THREE.AmbientLight (0x404040,100);
    scene.add(hlight);

//     const geometry = new THREE.BoxGeometry(10, 10, 10)
// const material = new THREE.MeshBasicMaterial({ color: '#433F81'    })
// this.cube = new THREE.Mesh(geometry, material)
// this.scene.add(this.cube)

    let geometry = new THREE.SphereGeometry( 5, 32, 32 );
    let material = new THREE.MeshBasicMaterial( {color: 0x2C2C2C} );
    let sphere = new THREE.Mesh( geometry, material );
    // this.scene.add(sphere);

    let whiteSectionGeometry = new THREE.SphereGeometry( 2.5, 32, 32, 0, 3, 0, 3.1 );
    let whiteSectionMaterial = new THREE.MeshBasicMaterial( {color: 0xFFFFFF} );
    let whiteSection = new THREE.Mesh( whiteSectionGeometry, whiteSectionMaterial )
    whiteSectionGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 3));
    // this.scene.add(whiteSection)
    whiteSection.position.set(0, 0, 3)

    // let textGeometry = new THREE.TextBufferGeometry('8', {})
    // let textMaterial = new THREE>MeshBasicMaterial( {color: 0x000000} )
    // let text = new THREE.Mesh( textGeometry, textMaterial )
    // this.scene.add(text)

    var mergeGeometry = new THREE.Geometry();
    mergeGeometry.merge(geometry, geometry.matrix);
    mergeGeometry.merge(whiteSectionGeometry, whiteSectionGeometry.matrix, 1);
    // this.scene.add(mergeGeometry)

    const mesh = new THREE.Mesh(mergeGeometry, [material, whiteSectionMaterial]);
    scene.add(mesh);

    // this.controls = new OrbitControls( this.camera, this.renderer.domElement );


    

    
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    


    const animate = () => {
        requestAnimationFrame(animate)
        // this.controls.update()
        mesh.rotation.x += 0.01;
        mesh.rotation.y +=0.01;
        renderer.render(scene, camera)
    }

    const onMouseClick = ( event, mesh ) => {
        event.preventDefault();
        const windowArea = event.target.getBoundingClientRect();
        
        // this.mouse.x = ( event.clientX / this.renderer.domElement.width ) * 2 - 1;
        // this.mouse.y = - ( event.clientY / this.renderer.domElement.height ) * 2 + 1;
        mouse.x = ( (event.clientX - renderer.domElement.offsetLeft) / renderer.domElement.width ) * 2 - 1;
        mouse.y = -( (event.clientY - renderer.domElement.offsetTop) / renderer.domElement.height ) * 2 + 1;
        
        raycaster.setFromCamera( mouse, camera );
        let intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
            setShowLoading(true);
        }
    }

    const onMouseMove = (event) => {
        event.preventDefault();
        const windowArea = event.target.getBoundingClientRect();
        mouse.x = ( (event.clientX - renderer.domElement.offsetLeft) / renderer.domElement.width ) * 2 - 1;
        mouse.y = -( (event.clientY - renderer.domElement.offsetTop) / renderer.domElement.height ) * 2 + 1;

        let intersects = raycaster.intersectObjects(scene.children, true);
        if (intersects.length > 0) {
            alert("Mouseover")
        }
    }

    const shakeEventDidOccur = () => {

        //put your own code here etc.
        // alert('shake!');
      
        // Shake sensitivity (a lower number is more)
        var sensitivity = 10;

        // Position variables
        var x1 = 0, y1 = 0, z1 = 0, x2 = 0, y2 = 0, z2 = 0;

        // this.shakeFunc = function (e) {
        //     x1 = e.accelerationIncludingGravity.x;
        //     y1 = e.accelerationIncludingGravity.y;
        //     z1 = e.accelerationIncludingGravity.z;
        // }

        // Listen to motion events and update the position
        window.addEventListener('devicemotion', function(e) { 
            x1 = e.accelerationIncludingGravity.x;
            y1 = e.accelerationIncludingGravity.y;
            z1 = e.accelerationIncludingGravity.z; 
        }, false);

        // Periodically check the position and fire
        // if the change is greater than the sensitivity
        setInterval(function () {
            var change = Math.abs(x1-x2+y1-y2+z1-z2);

            if (change > sensitivity) {
                // if (!this.state.showLoading) {
                    setShowLoading(true);
                // }
            }

            // Update new position
            x2 = x1;
            y2 = y1;
            z2 = z1;
        }, 150);
      }
      
    //   shakeEventHelper = (e) => {
    //     this.x1 = e.accelerationIncludingGravity.x;
    //     this.y1 = e.accelerationIncludingGravity.y;
    //     this.z1 = e.accelerationIncludingGravity.z;
    //   }

    animate();
    console.log("TEST")
    console.log('ondevicemotion' in window)
    console.log(typeof window.DeviceMotionEvent != 'undefined')
    // if ('ondevicemotion' in window || (typeof window.DeviceMotionEvent != 'undefined')) {
    //     // window.addEventListener('devicemotion', this.shakeEventDidOccur, false);
    //     this.shakeEventDidOccur();
    //   }
    shakeEventDidOccur();

    return (
        <StyledContainer id="#eight-ball-container" /*onMouseOver={e => this.onMouseMove(e, [this.mesh])}*/ onClick={e => onMouseClick(e, [mesh])} ref={containerEl} >
            {
                showLoading ?
                <LoadingScreen /> :
                null
            }
            <EightBall />
        </StyledContainer>
    );
  }

export default EightBallContainer