import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import './App.css';
import DistantStars from './DistantStars';
import CloseStars from './CloseStars';
import Earth from './Earth';
import SpaceStation from './SpaceStation';
import Sky from './Sky';

let HEIGHT, WIDTH, scene, renderer, camera, ambientLight, hemisphereLight, shadowLight, shadowLight2, distantStars, closeStars, sky, earth, spaceStation;

class App extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     issCoordinates: [0,0],
  //     issCoordinateHistory: []
  //   }
  // }
  componentDidMount() {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;

    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(55, WIDTH / HEIGHT, 1, 10000);
    
    renderer = new THREE.WebGLRenderer({alpha: true, antialias: true})
    renderer.shadowMap.enabled = true;
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WIDTH, HEIGHT);

    this.mount.appendChild(renderer.domElement);

    window.addEventListener('resize', this.handleWindowResize, false)

    camera.position.set(0, 0, 130);
    // camera.rotation.x -= (Math.PI/180) * 7;
    
    this.createLights();
    this.createCosmos();
    this.createEarth();
    this.createSky();
    this.createSpaceStation();
    this.loop();
  }

  handleWindowResize = () => {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
  }

  createLights = () => {
    ambientLight = new THREE.AmbientLight(0xe5d5d5, 0.5);
    hemisphereLight = new THREE.HemisphereLight(0x2f586d, 0x0e4a6d, 0.7);
    
    shadowLight = new THREE.DirectionalLight(0xf7d919, 1);
    shadowLight.position.set(200,-350,0);
    shadowLight.castShadow = true;

    shadowLight.shadow.camera.left = -1400;
    shadowLight.shadow.camera.right = 1400;
    shadowLight.shadow.camera.top = 1400;
    shadowLight.shadow.camera.bottom = -1400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;

    shadowLight2 = new THREE.DirectionalLight(0x7dd4cf, .4);
    shadowLight2.position.set(-200,500,10);
    shadowLight2.castShadow = true;

    scene.add(ambientLight, hemisphereLight, shadowLight, shadowLight2);
  }

  createCosmos = () => {
    distantStars = new DistantStars();
    closeStars = new CloseStars();
    closeStars.mesh.position.set(0,0,0);
    distantStars.mesh.position.set(0,0,0);
    scene.add(distantStars.mesh, closeStars.mesh);
  }

  createSky = () => {
    sky = new Sky();
    sky.mesh.position.set(0,0,0);
    earth.mesh.add(sky.mesh);
  }

  createEarth = () => {
    earth = new Earth();
    earth.mesh.position.set(0, 0, -150);
    scene.add(earth.mesh);
  }

  createSpaceStation = () => {
    spaceStation = new SpaceStation();
    spaceStation.mesh.position.set(-100,0,-100);
    earth.mesh.add(spaceStation.pivot);
  }

  loop = () => {
    closeStars.mesh.rotation.y += 0.00003;
    closeStars.mat.opacity = (Math.sin(Date.now() * 0.001))/2 + 0.5;
    
    distantStars.mesh.rotation.y += 0.00002;
    distantStars.mesh.rotation.x += 0.00003;
    distantStars.mesh.rotation.z += 0.00003;
    
    earth.mesh.rotation.y += 0.001;
    
    sky.mesh.rotation.y -= 0.0003;
    sky.mesh.rotation.z += 0.0003;

    spaceStation.pivot.rotation.y += 0.004;
    spaceStation.pivot.rotation.x += 0.0004;

    renderer.render(scene, camera);
    requestAnimationFrame(this.loop);
  }

  render() {
    return (
      <div ref={ref => (this.mount = ref)} />
    );
  }
}

export default App;

const root = document.getElementById('root');
ReactDOM.render(<App/>, root);