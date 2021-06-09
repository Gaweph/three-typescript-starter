import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { loadTree } from './models';
import Lights from './lights';
import { tools } from './devTools';

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let clock = new THREE.Clock();

function setup() {
    
  const w = window.innerWidth; const h = window.innerHeight;

  // SCENE  
  scene = new THREE.Scene();
  
  // RENDERER
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(w, h);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;

  // CAMERA
  const aspectRatio = w / h;  const fieldOfView = 75;
  camera = new THREE.PerspectiveCamera( fieldOfView, aspectRatio, 1, 5000 );
  camera.position.set(-6, 5.5, 10);  
  new OrbitControls (camera, renderer.domElement);   
  camera.lookAt(0, 0, 0);

  // CANVAS
  let container = document.getElementById("canvas");
  container.appendChild(renderer.domElement);
  window.addEventListener("resize", winowResized, false);
  
  // LIGHTS
  Lights.addLightsAndSkyBox(scene);

  // GROUND
  const ground = new THREE.Mesh( new THREE.PlaneGeometry( 500, 500 ), new THREE.MeshLambertMaterial( { color: 0xc2b280 } ) );
  ground.rotation.x = -Math.PI/2; ground.receiveShadow = true;
  scene.add( ground );
};

function winowResized() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

async function init() {
  let tree = await loadTree();
  scene.add(tree);
  tools.AddControlsForObject(tree, "tree", -10,10);
}

function animate() {
  requestAnimationFrame(animate);
  let deltaTime = clock.getDelta();
  renderer.render(scene, camera);
}

setup();
init();
animate();


// DEV TOOLS TOGGLES
document.getElementById("btnShowTools").addEventListener( 'click', function () {
  tools.showGrid(scene);
  tools.showStats();
  tools.showDatGui();
});

document.getElementById("btnHideTools").addEventListener( 'click', function () {
  tools.hideGrid(scene);
  tools.hideStats();
  tools.hideDatGui();
});