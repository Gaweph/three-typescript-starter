import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { loadTree } from './models';
import Lights from './lights';
import { tools } from './devTools';

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;

const showDevTools = true;
let clock = new THREE.Clock();

async function setup() {
    
  let w = window.innerWidth;
  let h = window.innerHeight;

  let aspectRatio = w / h;  let fieldOfView = 75;

  // CAMERA
  camera = new THREE.PerspectiveCamera( fieldOfView, aspectRatio, 1, 5000 );
  camera.position.set(-6, 5.5, 10);  

  tools.AddControlsForObject(camera, "camera", -10,10);

  // SCENE  
  scene = new THREE.Scene();
  
  // RENDERER
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(w, h);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;

  // ORBITALCAMERA
  new OrbitControls (camera, renderer.domElement);   
  camera.lookAt(0, 0, 0);

  // CANVAS
  let container = document.getElementById("canvas");
  container.appendChild(renderer.domElement);
  window.addEventListener("resize", winowResized, false);
  
  // LIGHTS
  Lights.addLightsToScene(scene);

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

  
  // DEV TOOLS BUTTONS
  document.getElementById("btnShowTools").addEventListener( 'click', function () {
    tools.showGrid(scene); tools.showStats(); tools.showDatGui();
  });

  document.getElementById("btnHideTools").addEventListener( 'click', function () {
    tools.hideGrid(scene); tools.hideStats(); tools.hideDatGui();
  });

};

function winowResized() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);
  let deltaTime = clock.getDelta();

  // LOGIC HERE
  // ...

  renderer.render(scene, camera);
}
setup();
animate();