import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import * as THREE from 'three'

// https://assetstore.unity.com/packages/3d/environments/landscapes/low-poly-simple-nature-pack-162153
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

export function getTree() {

    const group = new THREE.Group();

    // LOAD MODELS ASYNCRONOUSLY AND ADD TO GROUP ONCE LOADED
    loadNatureModel(NatureModel.TREE3).then((tree) => {
        tree.position.set(0, 0, 0);
        group.add(tree);
    });
    
    loadNatureModel(NatureModel.ROCK4).then((rock) => {
        rock.position.set(-1, 0, -1);
        group.add(rock);
    });
    
    loadNatureModel(NatureModel.ROCK1).then((rock) => {
        rock.position.set(-2, 0.2, -2);
        group.add(rock);
    });
    
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
            mesh.material.map = texture;      
            mesh.castShadow = true; mesh.receiveShadow = true; mesh.material.needsUpdate = true;    
        }
    });            
}
