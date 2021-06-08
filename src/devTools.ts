import Stats from 'three/examples/jsm/libs/stats.module';
import { GUI } from 'dat.gui';
import * as THREE from 'three'
export const nameof = <T>(name: keyof T) => name;

class DevTools {
    public gui: GUI;

    constructor() {
        // ADD INTERACTIVE DAT.GUI
        this.gui = new GUI();        
    }

    public addGrid(scene: THREE.Scene) {
        // DRAW THE GRID
        var grid = new THREE.GridHelper(1000, 1000, new THREE.Color(0xff0000), new THREE.Color(0xffffff));
        scene.add(grid);  
        
        return this;
    }

    public addStats() {
        // ADD STATS - FPS, MEMORY USAGE ETC...
        let stats = Stats();
        document.body.appendChild(stats.dom);
        const updateStats = () => { stats.update(); requestAnimationFrame(updateStats); };
        requestAnimationFrame(updateStats);

        return this;
    }

    public AddModelControls(model: THREE.Group, label: string, min: number, max:number) {
        this.gui.add(model.position, nameof<THREE.Vector3>("x"), min, max).name(`${label} - x`);
        this.gui.add(model.position, nameof<THREE.Vector3>("y"), min, max).name(`${label} - y`);
        this.gui.add(model.position, nameof<THREE.Vector3>("z"), min, max).name(`${label} - z`);
    }
}
export const tools = new DevTools();