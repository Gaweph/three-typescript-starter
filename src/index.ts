import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { loadTree } from './models';
import Lights from './lights';
import { tools } from './devTools';

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;

// SHOW GRID, STATS ETC...
const showDevTools = true;

async function setup() {
    
  let w = window.innerWidth;
  let h = window.innerHeight;

  let aspectRatio = w/ h;  let fieldOfView = 75;  let near = 1;  let far = 5000;

  // SCENE  
  scene = new THREE.Scene();
  scene.background = new THREE.Color().setHSL( 0.6, 0, 1 );
  scene.fog = new THREE.Fog( scene.background, near, far );

  // CAMERA
  camera = new THREE.PerspectiveCamera( fieldOfView, aspectRatio, near, far );
  camera.position.set(-6, 5.5, 10);

  // RENDERER
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(w, h);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;

  // ORBITALCAMERA - ALLOWS USER TO NAVIGATE SCENE WITH MOUSE
  new OrbitControls (camera, renderer.domElement);   
  camera.lookAt(0, 0, 0);

  // CANVAS
  let container = document.getElementById("canvas");
  container.appendChild(renderer.domElement);
  window.addEventListener("resize", winowResized, false);
  
  // LIGHTS
  await Lights.addLightsToScene(scene);

  // GROUND
  const groundGeo = new THREE.PlaneGeometry( 500, 500 );
  const groundMat = new THREE.MeshLambertMaterial( { color: 0xc2b280 } );
  const ground = new THREE.Mesh( groundGeo, groundMat );
  ground.rotation.x = -Math.PI/2;
  ground.receiveShadow = true;
  scene.add( ground );

  // MODELS
  let tree = await loadTree();
  scene.add(tree);

};

function winowResized() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

let clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  let deltaTime = clock.getDelta();

  // LOGIC HERE
  // ...

  renderer.render(scene, camera);
}
setup();
animate();

// DEV TOOLS
if(showDevTools) {
  tools
    .addGrid(scene)
    .addStats();
}