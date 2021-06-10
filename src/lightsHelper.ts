import * as THREE from 'three'

const uniforms = {
  "topColor": { value: new THREE.Color( 0x0077ff ) },
  "bottomColor": { value: new THREE.Color( 0xffffff ) },
  "offset": { value: 33 },
  "exponent": { value: 0.6 }
};

// https://threejs.org/examples/?q=light#webgl_lights_hemisphere
export function addSkyBox(scene: THREE.Scene) {
    
  // SKYDOME
  const vertexShader = document.getElementById( 'vertexShader' ).textContent;
  const fragmentShader = document.getElementById( 'fragmentShader' ).textContent;

  const skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
  const skyMat = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.BackSide
  });
  const sky = new THREE.Mesh( skyGeo, skyMat );
  scene.add( sky );
  
  uniforms[ "topColor" ].value.copy( new THREE.Color().setHSL( 0.6, 1, 0.6 ) );
  scene.fog = new THREE.Fog( new THREE.Color().setHSL( 0.6, 0, 1 ), 1, 5000 );
  scene.fog.color.copy( uniforms[ "bottomColor" ].value );
}

// https://threejs.org/examples/?q=light#webgl_lights_hemisphere
export function addLightsAndSkyBox(scene: THREE.Scene) {
  // AMBIENT LIGHT
  const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
  hemiLight.color.setHSL( 0.6, 1, 0.6 );
  hemiLight.groundColor.setHSL( 0.095, 1, 0.75 ); 
  hemiLight.position.set( 0, 50, 0 );
  scene.add( hemiLight );

  // THE SUN
  const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
  dirLight.color.setHSL( 0.1, 1, 0.95 );
  dirLight.position.set( - 1, 1.75, 1 );
  dirLight.position.multiplyScalar( 30 );
  dirLight.castShadow = true; dirLight.shadow.mapSize.width = 2048; dirLight.shadow.mapSize.height = 2048;
  const d = 50; dirLight.shadow.camera.left = -d; dirLight.shadow.camera.right = d; dirLight.shadow.camera.top = d; dirLight.shadow.camera.bottom = - d;
  dirLight.shadow.camera.far = 3500; dirLight.shadow.bias = - 0.0001;
  scene.add( dirLight );
            
}
