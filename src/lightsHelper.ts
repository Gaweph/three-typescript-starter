import * as THREE from 'three'

const uniforms = {
  "topColor": { value: new THREE.Color( 0x0077ff ) },
  "bottomColor": { value: new THREE.Color( 0xffffff ) },
  "offset": { value: 33 },
  "exponent": { value: 0.6 }
};

// https://threejs.org/examples/?q=light#webgl_lights_hemisphere
export function getSkyBox() {
    
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
  
  return sky;
}

// https://threejs.org/examples/?q=light#webgl_lights_hemisphere
export function getLights() {

  const group = new THREE.Group();

  // AMBIENT LIGHT
  const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
  hemiLight.position.set( 0, 50, 0 );
  group.add( hemiLight );

  // THE SUN
  const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
  dirLight.position.set( - 1, 1.75, 1 );
  dirLight.position.multiplyScalar( 30 );
  dirLight.castShadow = true;
  group.add( dirLight );
            
  return group;
}
