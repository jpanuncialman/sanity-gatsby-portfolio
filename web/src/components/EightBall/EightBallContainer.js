import React, { Component } from 'react'
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


export default class EightBallContainer extends Component {
    constructor() {
        super();

        this.state = {
            showLoading: false
        }

        // this.x1 = 0
        // this.y1 = 0
        // this.z1 = 0
        // this.x2 = 0
        // this.y2 = 0
        // this.z2 = 0
    }

    componentDidMount() {
    //   threeEntryPoint(this.threeRootElement);
        this.scene = new THREE.Scene();
        // this.scene.background = new THREE.Color(0xdddddd);
        // var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize( window.innerWidth, window.innerHeight);
        this.renderer.setClearColor('#000000')
        // renderer.setSize( this.mount.clientWidth, this.mount.clientHeight );
        this.mount.appendChild( this.renderer.domElement );
        // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        // var cube = new THREE.Mesh( geometry, material );
        // scene.add( cube );
        // camera.position.z = 5;
        // this.camera = new THREE.PerspectiveCamera(75,this.mount.clientWidth/this.mount.clientHeight,0.1,1000);
        this.camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
        // camera.rotation.y = 45/180*Math.PI;
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 10;

        // window.addEventListener('resize', () => {
        //     renderer.setSize(this.mount.clientWidth, this.mount.clientHeight)
        //     camera.aspect = this.mount.clientWidth / this.mount.clientHeight;
        //     camera.updateProjectionMatrix()
        // })

        let hlight = new THREE.AmbientLight (0x404040,100);
        this.scene.add(hlight);

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

        this.mesh = new THREE.Mesh(mergeGeometry, [material, whiteSectionMaterial]);
        this.scene.add(this.mesh);

        // let loader = new THREE.FontLoader();
        // loader.load( '../../../assets/fonts/helvetiker_regular.typeface.json', function ( font ) {

        //     var geometry = new THREE.TextBufferGeometry( 'Hello three.js!', {
        //         font: font,
        //         size: 80,
        //         height: 5,
        //         curveSegments: 12,
        //         bevelEnabled: true,
        //         bevelThickness: 10,
        //         bevelSize: 8,
        //         bevelOffset: 0,
        //         bevelSegments: 5
        //     } );
        // } );
        // text.position.set(0, 0, 4)

        // const domEvents	= new THREEx.DomEvents(camera, renderer.domElement)
        // let directionalLight = new THREE.DirectionalLight(0xffffff,100);
        // directionalLight.position.set(0,1,0);
        // directionalLight.castShadow = true;
        // scene.add(directionalLight);
        // let light = new THREE.PointLight(0xc4c4c4,10);
        // light.position.set(0,300,500);
        // scene.add(light);
        // let light2 = new THREE.PointLight(0xFFFFFF,1, 500);
        // light2.position.set(500,100,0);
        // this.scene.add(light2);
        // let light3 = new THREE.PointLight(0xc4c4c4,10);
        // light3.position.set(0,100,-500);
        // scene.add(light3);
        // let light4 = new THREE.PointLight(0xc4c4c4,10);
        // light4.position.set(-500,300,500);
        // scene.add(light4);

        // this.controls = new OrbitControls( this.camera, this.renderer.domElement );


        

        // const loader = new GLTFLoader();
        // loader.load('../../../assets/archive/8ball.gltf', (gltf) => {
        //     console.log(gltf.scene);
        //     let ball = gltf.scene.children[0];
        //     console.log(ball);
        //     ball.scale.set(20,20,20);
        //     // ball.rotation.x = Math.PI / 3
        //     // ball.rotation.y = Math.PI / 2
        //     // ball.rotation.z = Math.PI / 4
        //     // ball.position.set({x: 50, y: 50, z: 0})
        //     // ball.addEventListener("onclick", onMouseClick)
        //     this.scene.add(gltf.scene);
        //     this.animate()
        //     // this.renderer.render(this.scene, this.camera);
        // }, (xhr) => {

        // }, (error) => {
        //     console.log(error);
        // });
        
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        console.log("Scene")
        console.log(this.scene);
        // document.body.addEventListener("onclick", onMouseClick, false)

        // const renderer = this.renderer;
        // let animate = () => {
        //     console.log("ANIMATE!!!")
        //     requestAnimationFrame( animate );
        //     // cube.rotation.x += 0.01;
        //     // cube.rotation.y += 0.01;
            
        //     renderer.render( this.scene, this.camera );
        // };
        // console.log(this.renderer);
        // this.renderer.render( this.scene, this.camera );
        this.animate();
        console.log("TEST")
        console.log('ondevicemotion' in window)
        console.log(typeof window.DeviceMotionEvent != 'undefined')
        // if ('ondevicemotion' in window || (typeof window.DeviceMotionEvent != 'undefined')) {
        //     // window.addEventListener('devicemotion', this.shakeEventDidOccur, false);
        //     this.shakeEventDidOccur();
        //   }
        this.shakeEventDidOccur();
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.animate)
        window.removeEventListener('devicemotion', this.shakeFunc, false)
    }

    animate = () => {
        requestAnimationFrame(this.animate)
        // this.controls.update()
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y +=0.01;
        this.renderer.render(this.scene, this.camera)
    }

    onMouseClick = ( event, mesh ) => {
        event.preventDefault();
        const windowArea = event.target.getBoundingClientRect();
        
        // this.mouse.x = ( event.clientX / this.renderer.domElement.width ) * 2 - 1;
        // this.mouse.y = - ( event.clientY / this.renderer.domElement.height ) * 2 + 1;
        this.mouse.x = ( (event.clientX - this.renderer.domElement.offsetLeft) / this.renderer.domElement.width ) * 2 - 1;
        this.mouse.y = -( (event.clientY - this.renderer.domElement.offsetTop) / this.renderer.domElement.height ) * 2 + 1;
        console.log(this.raycaster)
        this.raycaster.setFromCamera( this.mouse, this.camera );
        let intersects = this.raycaster.intersectObjects(this.scene.children, true);
        console.log(intersects);
        if (intersects.length > 0) {
            this.setState({ showLoading: true }, () => {
                setTimeout(() => {
                    window.location.href = '/art'
                }, 2000)
            });
        }
    }

    onMouseMove = (event) => {
        event.preventDefault();
        const windowArea = event.target.getBoundingClientRect();
        this.mouse.x = ( (event.clientX - this.renderer.domElement.offsetLeft) / this.renderer.domElement.width ) * 2 - 1;
        this.mouse.y = -( (event.clientY - this.renderer.domElement.offsetTop) / this.renderer.domElement.height ) * 2 + 1;

        let intersects = this.raycaster.intersectObjects(this.scene.children, true);
        if (intersects.length > 0) {
            alert("Mouseover")
        }
    }

    shakeEventDidOccur = () => {

        //put your own code here etc.
        // alert('shake!');
      
        // Shake sensitivity (a lower number is more)
        var sensitivity = 10;

        // Position variables
        var x1 = 0, y1 = 0, z1 = 0, x2 = 0, y2 = 0, z2 = 0;

        this.shakeFunc = function (e) {
            x1 = e.accelerationIncludingGravity.x;
            y1 = e.accelerationIncludingGravity.y;
            z1 = e.accelerationIncludingGravity.z;
        }

        // Listen to motion events and update the position
        window.addEventListener('devicemotion', function(e) { x1 = e.accelerationIncludingGravity.x;
            y1 = e.accelerationIncludingGravity.y;
            z1 = e.accelerationIncludingGravity.z; }, false);

        // Periodically check the position and fire
        // if the change is greater than the sensitivity
        setInterval(function () {
            var change = Math.abs(x1-x2+y1-y2+z1-z2);

            if (change > sensitivity) {
                // if (!this.state.showLoading) {
                    this.setState({ showLoading: true }, () => {
                        setTimeout(() => {
                            window.location.href = '/art'
                        }, 2000)
                    });
                // }
            }

            // Update new position
            x2 = x1;
            y2 = y1;
            z2 = z1;
        }, 150);
      }
      
      shakeEventHelper = (e) => {
        this.x1 = e.accelerationIncludingGravity.x;
        this.y1 = e.accelerationIncludingGravity.y;
        this.z1 = e.accelerationIncludingGravity.z;
      }

    render () {
        return (
          <StyledContainer /*onMouseOver={e => this.onMouseMove(e, [this.mesh])}*/ onClick={e => this.onMouseClick(e, [this.mesh])} ref={element => this.mount = element} >
            {
                this.state.showLoading ?
                <LoadingScreen /> :
                null
            }
            <EightBall />
          </StyledContainer>
        );
    }
  }