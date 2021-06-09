import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import * as THREE from 'three'

const natureModelsTexture = './models/NaturePackLite_Texture.png';
enum NatureModel {
    TREE1 = 'Tree_01.fbx',
    TREE2 = 'Tree_02.fbx',
    TREE3 = 'Tree_03.fbx',
    ROCK1 = 'Rock_01.fbx',
    ROCK2 = 'Rock_02.fbx',
    ROCK3 = 'Rock_03.fbx',
    ROCK4 = 'Rock_04.fbx'
}

export async function loadTree() {

    const group = new THREE.Group();
    const tree = await loadNatureModel(NatureModel.TREE3); 
    tree.position.set(0, 0, 0);
    group.add(tree);

    const rock1 = await loadNatureModel(NatureModel.ROCK4);
    rock1.position.set(-1, 0, -1);
    group.add(rock1);

    const rock2 = await loadNatureModel(NatureModel.ROCK1);
    rock2.position.set(-2, 0.2, -2);
    group.add(rock2);    
    
    return group;
}

async function loadNatureModel(model: NatureModel) {
    const fileName = `./models/${model}`;
    const res = (await new FBXLoader().loadAsync(fileName)); 
    const texture = await (new THREE.TextureLoader().loadAsync(natureModelsTexture))
    applyTexture(res, texture);
    return res;
}

function applyTexture(model: THREE.Group, texture: THREE.Texture) {
    model.traverse(function (mesh) {
        if (mesh instanceof THREE.Mesh) {
            // apply texture
            mesh.material.map = texture;      
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.material.needsUpdate = true;    
        }
    });            
}

export async function loadRocket() {
    const model = (await new GLTFLoader().loadAsync("https://www.stivaliserna.com/assets/rocket/rocket.gltf")).scene;
    return model;
}
