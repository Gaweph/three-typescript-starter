import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { loadNatureModel, NatureModel } from './models';
import Lights from './lights';
import { tools } from './devTools';
import { PlaneGeometry } from 'three';

const scene = new THREE.Scene();
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;

let params = { showDevTools: true};

async function setup() {
    
  let w = window.innerWidth;
  let h = window.innerHeight;

  // SCENE  
  scene.background = new THREE.Color().setHSL( 0.6, 0, 1 );
  scene.fog = new THREE.Fog( scene.background, 1, 5000 );

  // CAMERA SETUP
  let aspectRatio = w/ h;  let fieldOfView = 60;  let near = 0.1;  let far = 1000;
  camera = new THREE.PerspectiveCamera( fieldOfView, aspectRatio, near, far );
  camera.position.set(-5, 5, 10);

  // RENDERER SETUP
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.shadowMap.enabled = true;  
  renderer.setSize(w, h);
  renderer.render(scene, camera);
  
  // ADDD TO CANVAS
  let container = document.getElementById("canvas");
  container.appendChild(renderer.domElement);
  window.addEventListener("resize", winowResized, false);
  
  // LIGHTS
  Lights.addLightsToScene(scene);
  
  // ORBITALCAMERA - ALLOWS USER TO NAVIGATE SCENE WITH MOUSE
  new OrbitControls (camera, renderer.domElement);   

  let tree = await loadNatureModel(NatureModel.TREE3);
  let rock1 = await loadNatureModel(NatureModel.ROCK4);
  let rock2 = await loadNatureModel(NatureModel.ROCK1);
  
  tree.position.set(3, 0,-4);
  rock1.position.set(2, 0, -5);
  rock2.position.set(1, 0.2, -6);

  scene.add(tree);
  scene.add(rock1);
  scene.add(rock2);

  // GROUND
  const floorWidth = 1000;
  const texture = await new THREE.TextureLoader().loadAsync('./models/prototype_texture.png');
  texture.wrapT = THREE.RepeatWrapping;  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.set( floorWidth, floorWidth);
  
  var ground = new THREE.Mesh(
    new THREE.PlaneGeometry(floorWidth, floorWidth, 8,8), 
    new THREE.MeshBasicMaterial( { map: texture, } )
  );
  
  ground.rotation.set(-Math.PI/2,0,0);
  scene.add(ground);

};

function winowResized() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

let clock = new THREE.Clock();
function update() {
  requestAnimationFrame(update);
  let deltaTime = clock.getDelta();

  renderer.render(scene, camera);

}

setup();
update();

// DEV TOOLS
if(params.showDevTools) {
  tools
    // .addGrid(scene)
    .addStats();
}