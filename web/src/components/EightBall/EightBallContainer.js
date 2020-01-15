import React, { useState, useEffect, useRef } from 'react'
import EightBall from './EightBall'
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { StyledParentContainer, StyledContainer } from './EightBallContainerStyles'

import LoadingScreen from '../LoadingScreen/LoadingScreen'


const EightBallContainer = props => {
    const [showLoading, setShowLoading] = useState(false)
    const containerEl = useRef(null);

    if (typeof window === 'undefined') {
        global.window = {}
      }

    let scene;;
    
    let renderer;
    let camera;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let hlight;

    let geometry = new THREE.SphereGeometry( 5, 32, 32 );
    let material = new THREE.MeshBasicMaterial( {color: 0x2C2C2C} );

    let whiteSectionGeometry,
    whiteSectionMaterial,
    whiteSection;
    


    let mergeGeometry;
    

    let mesh;

    // Position variables
    var x1 = 0, y1 = 0, z1 = 0, x2 = 0, y2 = 0, z2 = 0;
    // Shake sensitivity (a lower number is more)
    var sensitivity = 25;

    useEffect(() => {
        scene = new THREE.Scene()
        renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        camera = new THREE.PerspectiveCamera(75, containerEl.current.clientWidth / containerEl.current.clientHeight,0.1,1000);
        
        renderer.setSize( containerEl.current.clientWidth, containerEl.current.clientHeight);
        renderer.setClearColor('#000000')
        containerEl.current.appendChild(renderer.domElement)
        
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 12;

        hlight = new THREE.AmbientLight (0x404040,100);
        scene.add(hlight);

        whiteSectionGeometry = new THREE.SphereGeometry( 2.5, 32, 32, 0, 3, 0, 3.1 );
        whiteSectionMaterial = new THREE.MeshBasicMaterial( {color: 0xFFFFFF} );
        whiteSection = new THREE.Mesh( whiteSectionGeometry, whiteSectionMaterial )

        whiteSectionGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 3));
        
        whiteSection.position.set(0, 0, 3)

        mergeGeometry = new THREE.Geometry();
        mergeGeometry.merge(geometry, geometry.matrix);
        mergeGeometry.merge(whiteSectionGeometry, whiteSectionGeometry.matrix, 1);

        mesh = new THREE.Mesh(mergeGeometry, [material, whiteSectionMaterial]);
        scene.add(mesh);

        animate();
        
        console.log("TEST")
        console.log('ondevicemotion' in window)
        console.log(typeof window.DeviceMotionEvent != 'undefined')
        // if ('ondevicemotion' in window || (typeof window.DeviceMotionEvent != 'undefined')) {
        //     // window.addEventListener('devicemotion', this.shakeEventDidOccur, false);
        //     this.shakeEventDidOccur();
        //   }
        shakeEventDidOccur();
        
        return function cleanup() {
            cancelAnimationFrame(animate)
            clearInterval(shakeIntervalFunc)
            window.removeEventListener('devicemotion', shakeHelper, false)
        }
    }, [])

    useEffect(() => {
        if (showLoading) {
            setTimeout(() => {
                window.location.href = '/art'
            }, 2000)
        }
    }, [showLoading])

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
      
        

        


        // Listen to motion events and update the position
        window.addEventListener('devicemotion', shakeHelper, false);

        // Periodically check the position and fire
        // if the change is greater than the sensitivity
        setInterval(shakeIntervalFunc, 150);
    }

    const shakeHelper = (e) => { 
        x1 = e.accelerationIncludingGravity.x;
        y1 = e.accelerationIncludingGravity.y;
        z1 = e.accelerationIncludingGravity.z; 
    }  

    const shakeIntervalFunc = () => {
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
    }
    

    return (
        <StyledParentContainer minHeight={props.minHeight ? props.minHeight : '500'}>
            <StyledContainer id="#eight-ball-container" /*onMouseOver={e => this.onMouseMove(e, [this.mesh])}*/ onClick={e => onMouseClick(e, [mesh])} ref={containerEl} >
                {
                    showLoading ?
                    <LoadingScreen /> :
                    <EightBall />
                }
                
            </StyledContainer>
        </StyledParentContainer>
    );
  }

export default EightBallContainer