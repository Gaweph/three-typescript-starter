import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { loadNatureModel, NatureModel } from './models';
import Lights from './lights';
import { tools } from './devTools';
import { PlaneGeometry } from 'three';

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;

let params = { showDevTools: true};

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
  tools.AddModelControls(camera, "camera", -50, 50);

  // RENDERER
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  // renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(w, h);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;

  // ORBITALCAMERA - ALLOWS USER TO NAVIGATE SCENE WITH MOUSE
  new OrbitControls (camera, renderer.domElement);   
  // ADDD TO CANVAS
  let container = document.getElementById("canvas");
  container.appendChild(renderer.domElement);
  window.addEventListener("resize", winowResized, false);
  
  // LIGHTS
  await Lights.addLightsToScene(scene);
  

				// GROUND

				const groundGeo = new THREE.PlaneGeometry( 500, 500 );
				const groundMat = new THREE.MeshLambertMaterial( { color: 0xffffff } );
				groundMat.color.setHSL( 0.095, 1, 0.75 );

				const ground = new THREE.Mesh( groundGeo, groundMat );
				//ground.position.y = - 33;
				ground.rotation.set(-Math.PI/2,0,0);
				ground.receiveShadow = true;
				scene.add( ground );
  // GROUND
  // const floorWidth = 1000;
  // const texture = await new THREE.TextureLoader().loadAsync('./models/prototype_texture.png');
  // texture.wrapT = THREE.RepeatWrapping;  texture.wrapS = THREE.RepeatWrapping;
  // texture.repeat.set( floorWidth, floorWidth);  
  // var ground = new THREE.Mesh(
  //   new THREE.PlaneGeometry(floorWidth, floorWidth, 8,8), 
  //   new THREE.MeshBasicMaterial( { map: texture, } )
  // );  
  // ground.rotation.set(-Math.PI/2,0,0);
  // scene.add(ground);


  // MODELS
  let tree = await loadNatureModel(NatureModel.TREE3);
  let rock1 = await loadNatureModel(NatureModel.ROCK4);
  let rock2 = await loadNatureModel(NatureModel.ROCK1);
  
  tree.position.set(0, 0, 0);
  rock1.position.set(-1, 0, -1);
  rock2.position.set(-2, 0.2, -2);

  scene.add(tree);
  scene.add(rock1);
  scene.add(rock2);


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