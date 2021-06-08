// import { DirectionalLight, HemisphereLight, PointLight, Scene } from "three";
import * as THREE from 'three'
import { tools } from './devTools';

class Lights {
    public static addLightsToScene(scene: THREE.Scene) {
        const ambientLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
        ambientLight.color.setHSL( 0.6, 1, 0.6 );
        ambientLight.groundColor.setHSL( 0.095, 1, 0.75 );
        const directionalLight = new THREE.DirectionalLight(0xdfebff, 0.5);
        directionalLight.position.set(-300, 0, 600);
        const pointLight = new THREE.PointLight(0x84c011, 2, 500, 1.2);
        pointLight.position.set(200, -100, 50);
        
        scene.add(ambientLight);
        scene.add(directionalLight);
        scene.add(pointLight);
      }
}
export default Lights;