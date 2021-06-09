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
        (<HTMLElement>document.getElementsByClassName("dg main a")[0]).style.visibility = "hidden";
    }

    public showGrid(scene: THREE.Scene) {
        if(this._grid == null)
        {
            this._grid = new THREE.GridHelper(1000, 1000, new THREE.Color(0xff0000), new THREE.Color(0xffffff));    
        }
        scene.add(this._grid); 
    }
    public hideGrid(scene: THREE.Scene) {
        scene.remove(this._grid);
    }
    
    public showStats() {
        if(this._stats == null)
        {
            this._stats = Stats();
            document.body.appendChild(this._stats.dom);
            const updateStats = () => { this._stats.update(); requestAnimationFrame(updateStats); };
            requestAnimationFrame(updateStats);
        }
        this._stats.dom.style.visibility = "visible";
    }    
    public hideStats() {
        if(this._stats != null)
        {
            this._stats.dom.style.visibility = "hidden";
        }
    }
    public showDatGui() {
        const elements = document.getElementsByClassName("dg main a");
        if(elements.length > 0) {
            (<HTMLElement>elements[0]).style.visibility = "visible";
        }
    }    
    public hideDatGui() {
        const elements = document.getElementsByClassName("dg main a");
        if(elements.length > 0) {
            (<HTMLElement>elements[0]).style.visibility = "hidden";
        }
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