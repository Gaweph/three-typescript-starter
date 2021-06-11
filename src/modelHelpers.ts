import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import * as THREE from 'three'
import { Vector3 } from 'three';

// https://assetstore.unity.com/packages/3d/environments/landscapes/low-poly-simple-nature-pack-162153
const natureModelsTexture = './models/NaturePackLite_Texture.png';

enum NatureModel {
    TREE3 = 'Tree_03.fbx',
    ROCK1 = 'Rock_01.fbx',
    ROCK4 = 'Rock_04.fbx',
    GRASS1 = 'Grass_01.fbx',
    GRASS2 = 'Grass_02.fbx'
}

export function getGrassPlane(x: number, z: number) {
    const group = new THREE.Group();

    Promise.all([
            loadNatureModel(NatureModel.GRASS1, 0.6, 0, -3.2),
            loadNatureModel(NatureModel.GRASS2, 0.3, 0, -3.25)
        ]).then((value) => {
        const grass = [value[0], value[1]];

        // var boxGeometry = new THREE.BoxBufferGeometry(2,2,2,1,1,1);
        // var material = new THREE.MeshPhongMaterial();
        // //the instance group
        //     var cluster = new THREE.InstancedMesh( 
        //         boxGeometry,                 //this is the same 
        //         material, 
        //         10000
        //     );
            
        //     var _v3 = new THREE.Vector3();
        //     var _q = new THREE.Quaternion();
            
        //     for ( var i = 0 ; i < 10000 ; i ++ ) {
                
        //         cluster.setMatrixAt(i, new THREE.Matrix4) .position.setQuaternionAt( i , _q );
        //         cluster.setPositionAt( i , _v3.set( Math.random() , Math.random(), Math.random() ) );
        //         cluster.setScaleAt( i , _v3.set(1,1,1) );
            
        //     }


        const numberOf = 200;//Math.floor(Math.random() * (x * z * 100));
        for(var i = 0; i < numberOf; i++) {
            // pick random grass
            let index = Math.floor(Math.random() * grass.length);
            var item = grass[index].clone();
            
            // console.log(Math.random() * x, Math.random() * z);
            item.position.x = (Math.random() * x) - (x/2);
            item.position.z = (Math.random() * z) - (z/2);
            item.rotation.y += Math.random() * Math.PI;
            const scale = Math.random() * 3;
            item.scale.set(scale,scale,scale);
            group.add(item);
        }       
    });

    // const ground = new THREE.Mesh( new THREE.PlaneGeometry( x, z ), new THREE.MeshLambertMaterial( { color: 0x000000 } ) );
    // ground.rotation.x = -Math.PI/2;
    // ground.position.y += 0.1;
    // group.add(ground);

    return group;
}

export function getTree() {

    const group = new THREE.Group();

    // LOAD MODELS ASYNCRONOUSLY AND ADD TO GROUP ONCE LOADED
    Promise.all([
        loadNatureModel(NatureModel.TREE3,0, 0, 0),
        loadNatureModel(NatureModel.ROCK4, -1, 0, -1),
        loadNatureModel(NatureModel.ROCK1,-2, 0.2, -2)
      ]).then((models) => {
        const tree = models[0]; group.add(tree);
        const rock1 = models[1]; group.add(rock1);
        const rock2 = models[2]; group.add(rock2);
    });
    return group;
}

async function loadNatureModel(model: NatureModel, xoffset: number = 0, yoffset: number = 0, zoffset: number = 0) {
    const fileName = `./models/${model}`;
    const group = new THREE.Group();
    const res = (await new FBXLoader().loadAsync(fileName)); 
    res.position.x = xoffset;
    res.position.y = yoffset;
    res.position.z = zoffset;
    group.add(res);
    const texture = await (new THREE.TextureLoader().loadAsync(natureModelsTexture))
    applyGroupTexture(res, texture);
    return group;
}

function applyGroupTexture(model: THREE.Group, texture: THREE.Texture) {
    model.traverse(function (mesh) {
        if (mesh instanceof THREE.Mesh) {
            applyMeshTexture(mesh, texture);
        }
    });            
}


function applyMeshTexture(mesh: THREE.Mesh, texture: THREE.Texture) {
    mesh.traverse(function (mesh) {
        if (mesh instanceof THREE.Mesh) {
            mesh.material.map = texture;      
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.material.needsUpdate = true;    
        }
    });            
}
