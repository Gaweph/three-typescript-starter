// import { DirectionalLight, HemisphereLight, PointLight, Scene } from "three";
import * as THREE from 'three'
import { tools } from './devTools';

class Lights {
    public static  addLightsToScene(scene: THREE.Scene) {
        // const ambientLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
        // ambientLight.color.setHSL( 0.6, 1, 0.6 );
        // ambientLight.groundColor.setHSL( 0.095, 1, 0.75 );
        // const directionalLight = new THREE.DirectionalLight(0xdfebff, 0.5);
        // directionalLight.position.set(-300, 0, 600);
        // const pointLight = new THREE.PointLight(0x84c011, 2, 500, 1.2);
        // pointLight.position.set(200, -100, 50);
        
        // scene.add(ambientLight);
        // scene.add(directionalLight);
        // scene.add(pointLight);

      // LIGHTS

      const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
      hemiLight.color.setHSL( 0.6, 1, 0.6 );
      hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
      hemiLight.position.set( 0, 50, 0 );
      scene.add( hemiLight );

      const hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10 );
      scene.add( hemiLightHelper );

      //

      const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
      dirLight.color.setHSL( 0.1, 1, 0.95 );
      dirLight.position.set( - 1, 1.75, 1 );
      dirLight.position.multiplyScalar( 30 );
      scene.add( dirLight );

      dirLight.castShadow = true;

      dirLight.shadow.mapSize.width = 2048;
      dirLight.shadow.mapSize.height = 2048;

      const d = 50;

      dirLight.shadow.camera.left = - d;
      dirLight.shadow.camera.right = d;
      dirLight.shadow.camera.top = d;
      dirLight.shadow.camera.bottom = - d;

      dirLight.shadow.camera.far = 3500;
      dirLight.shadow.bias = - 0.0001;

      const dirLightHelper = new THREE.DirectionalLightHelper( dirLight, 10 );
      scene.add( dirLightHelper );
        
        
      // SKYDOME
      const vertexShader = document.getElementById( 'vertexShader' ).textContent;
      const fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
      const uniforms = {
        "topColor": { value: new THREE.Color( 0x0077ff ) },
        "bottomColor": { value: new THREE.Color( 0xffffff ) },
        "offset": { value: 33 },
        "exponent": { value: 0.6 }
      };
      uniforms[ "topColor" ].value.copy( hemiLight.color );

      scene.fog.color.copy( uniforms[ "bottomColor" ].value );

      const skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
      const skyMat = new THREE.ShaderMaterial( {
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.BackSide
      } );

      const sky = new THREE.Mesh( skyGeo, skyMat );
      scene.add( sky );

      }
}
export default Lights;