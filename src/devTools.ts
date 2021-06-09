import Stats from 'three/examples/jsm/libs/stats.module';
import { GUI } from 'dat.gui';
import * as THREE from 'three'
export const nameof = <T>(name: keyof T) => name;

class DevTools {

    public gui: GUI;
    private _grid: THREE.GridHelper;
    private _stats: Stats;
    constructor() {
        this.gui = new GUI();
    }

    public hideDevTools(scene: THREE.Scene) {
        (<HTMLElement>document.getElementsByClassName("dg main a")[0]).style.visibility = "hidden";
        this._stats.dom.style.visibility = "hidden";
        scene.remove(this._grid);
    }

    
    public showDevTools(scene: THREE.Scene) {

        if(this._grid == null)
        {
            this.addGrid(scene);
        }
        if(this._stats == null)
        {
            this.addStats();
        }
        (<HTMLElement>document.getElementsByClassName("dg main a")[0]).style.visibility = "visible";
        this._stats.dom.style.visibility = "visible";
        scene.add(this._grid);
    }

    public addGrid(scene: THREE.Scene) {
        // DRAW THE GRID
        this._grid = new THREE.GridHelper(1000, 1000, new THREE.Color(0xff0000), new THREE.Color(0xffffff));
        scene.add(this._grid);          
        return this;
    }

    public addStats() {
        // ADD STATS - FPS, MEMORY USAGE ETC...
        this._stats = Stats();
        document.body.appendChild(this._stats.dom);
        const updateStats = () => { this._stats.update(); requestAnimationFrame(updateStats); };
        requestAnimationFrame(updateStats);
        return this;
    }

    public AddControlsForObject(model: THREE.Object3D, label: string, min: number, max:number) {
        this.gui.add(model.position, nameof<THREE.Vector3>("x"), min, max).name(`${label} - pos - x`).listen();
        this.gui.add(model.position, nameof<THREE.Vector3>("y"), min, max).name(`${label} - pos - y`).listen();
        this.gui.add(model.position, nameof<THREE.Vector3>("z"), min, max).name(`${label} - pos - z`).listen();
        this.gui.add(model.rotation, nameof<THREE.Vector3>("x"), min, max).name(`${label} - rot - x`).listen();
        this.gui.add(model.rotation, nameof<THREE.Vector3>("y"), min, max).name(`${label} - rot - y`).listen();
        this.gui.add(model.rotation, nameof<THREE.Vector3>("z"), min, max).name(`${label} - rot - z`).listen();
    }
}
export const tools = new DevTools();