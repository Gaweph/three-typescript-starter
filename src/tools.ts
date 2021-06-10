import Stats from 'three/examples/jsm/libs/stats.module';
import { GUI } from 'dat.gui';
import * as THREE from 'three'
export const nameof = <T>(name: keyof T) => name;

export function addDatGuiForObject(gui: GUI, model: THREE.Object3D, label: string) {

    var folder = gui.addFolder(label);
    folder.open();
    addVector3(folder, model.position, `position`);
    addEuler(folder, model.rotation, `rotation`);
    folder.add(model, 'visible').listen();
}

function addVector3(gui:GUI, value: THREE.Vector3, label: string, min: number = -100, max:number = 100) {
    gui.add(value, nameof<THREE.Vector3>("x"), min, max).name(`${label} x`).listen();
    gui.add(value, nameof<THREE.Vector3>("y"), min, max).name(`${label} y`).listen();
    gui.add(value, nameof<THREE.Vector3>("z"), min, max).name(`${label} z`).listen();
}

function addEuler(gui:GUI, value: THREE.Euler, label: string, min: number = -Math.PI*2, max: number = Math.PI*2) {
    gui.add(value, nameof<THREE.Euler>("x"), min, max).name(`${label} x`).listen();
    gui.add(value, nameof<THREE.Euler>("y"), min, max).name(`${label} y`).listen();
    gui.add(value, nameof<THREE.Euler>("z"), min, max).name(`${label} z`).listen();
}