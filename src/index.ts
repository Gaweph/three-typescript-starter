import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module';
import { getTree } from './modelHelpers';
import { addLightsAndSkyBox, addSkyBox } from './lightsHelper';
import { GUI } from 'dat.gui';
import { addDatGuiForObject } from './tools';

const w = window.innerWidth;
const h = window.innerHeight;
const aspectRatio = w / h;  const fieldOfView = 75;
const container = document.getElementById("canvas");

// DEV
const gui = new GUI();
const stats = Stats(); document.body.appendChild(stats.dom);
const grid = new THREE.GridHelper(1000, 1000, new THREE.Color(0xff0000), new THREE.Color(0x4C704C));   

// SCENE  
const scene = new THREE.Scene();
scene.add(grid); 

// RENDERER
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(w, h);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;

// CAMERA
const camera = new THREE.PerspectiveCamera( fieldOfView, aspectRatio, 1, 5000 );
camera.position.set(-6, 5.5, 10);  
const controls = new OrbitControls (camera, renderer.domElement);   
camera.lookAt(0, 0, 0);

// CANVAS
container.appendChild(renderer.domElement);
window.addEventListener("resize", windowResized, false);

// LIGHTS & SKYBOX
addLightsAndSkyBox(scene);
addSkyBox(scene);

// GROUND
const ground = new THREE.Mesh( new THREE.PlaneGeometry( 500, 500 ), new THREE.MeshLambertMaterial( { color: 0xc2b280 } ) );
ground.rotation.x = -Math.PI/2;
ground.receiveShadow = true;
scene.add( ground );

// MODELS
let tree = getTree();
scene.add(tree);
addDatGuiForObject(gui, tree, "Tree");

function windowResized() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  let deltaTime = clock.getDelta();

  // ...

  renderer.render(scene, camera);  
  stats.update()
}

animate();

// DEV CHECKBOXES
document.getElementById("toggleGrid").addEventListener( 'change', function () {
  (<HTMLInputElement>this).checked ? scene.add(grid) : scene.remove(grid);
});

document.getElementById("toggleStats").addEventListener( 'change', function () {
  stats.dom.style.visibility = (<HTMLInputElement>this).checked ? "visible" : "hidden";
});