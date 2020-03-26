import * as THREE from 'three';

export default class Cloud {
    constructor() {
        this.mesh = new THREE.Object3D();
        let geom = new THREE.DodecahedronGeometry(4);
        let mat = new THREE.MeshPhongMaterial({
            color: 0xD0E3EE,
            shininess: 10,
            flatShading: THREE.FlatShading
        });
        let nBlocs = 5+Math.floor(Math.random()*7);
        for (let i = 0; i < nBlocs; i++) {
            let m = new THREE.Mesh(geom, mat);

            m.position.x = Math.sin(i)*4;
            m.position.y = Math.random()*1.3;
            m.position.z = Math.random()*0.9;
            m.rotation.y = Math.random()*Math.PI*1.5;
            m.rotation.z = Math.random()*Math.PI*1.5;

            let s = .3 + Math.random() * .2;
            m.scale.set(s,s,s);

            this.mesh.add(m);
        }
    }
}