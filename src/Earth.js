import * as THREE from 'three';

export default class Earth {
    constructor() {
        this.mesh = new THREE.Object3D();

        let geom = new THREE.IcosahedronGeometry(55, 2);
        let mat = new THREE.MeshPhongMaterial({
            shininess: 15,
            color: 0x135787,
            flatShading: THREE.FlatShading
        });
        let earthSphere = new THREE.Mesh(geom, mat);
        earthSphere.receiveShadow = true;

        let northPoleGeom = new THREE.SphereGeometry(35,5,5);
        northPoleGeom.vertices[0].y -= 2;
        northPoleGeom.vertices[7].y += 5;
        northPoleGeom.vertices[8].y += 5;
        northPoleGeom.vertices[9].y += 5;
        northPoleGeom.vertices[10].y += 5;
        northPoleGeom.vertices[11].y += 5;
        let poleMat = new THREE.MeshPhongMaterial({
            shininess: 15,
            color: 0xF7F7F3,
            flatShading: THREE.FlatShading
        });
        let northPole = new THREE.Mesh(northPoleGeom, poleMat);
        northPole.position.set(0, 24, 0);

        let southPoleGeom = new THREE.SphereGeometry(35,5,5);
        southPoleGeom.vertices[0].y -= 2;
        southPoleGeom.vertices[7].y += 5;
        southPoleGeom.vertices[8].y += 5;
        southPoleGeom.vertices[9].y += 5;
        southPoleGeom.vertices[10].y += 5;
        southPoleGeom.vertices[11].y += 5;
        southPoleGeom.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI));
        let southPole = new THREE.Mesh(southPoleGeom, poleMat)
        southPole.position.set(0, -24, 0);

        let contiGeom = new THREE.DodecahedronGeometry(25,1);
        contiGeom.mergeVertices();
        let l = contiGeom.vertices.length;
        for(let i = 0; i<l; i++) {
            let v = contiGeom.vertices[i];
            if( i < l/2 ) {
                v.y -= 5;
                v.z += Math.random()*5;
                v.x += Math.random()*5;
            } else {
                v.y += 7;
                v.z -= Math.random()*5;
                v.x -= Math.random()*5;
            }
        }
        contiGeom.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI));
        let contiMat = new THREE.MeshPhongMaterial({
            shininess: 15,
            color: 0x36663d,
            flatShading: THREE.FlatShading
        });

        let continent1 = new THREE.Mesh(contiGeom, contiMat);
        continent1.position.set(0,10,33);

        let continent2 = new THREE.Mesh(contiGeom, contiMat);
        continent2.position.set(0, -3, -33);
        continent2.rotation.x = (Math.PI/180)*6;

        let continent3 = new THREE.Mesh(contiGeom, contiMat);
        continent3.position.set(30, 15, 0);
        continent3.rotation.x = (Math.PI/180)*180;

        let continent4 = new THREE.Mesh(contiGeom, contiMat);
        continent4.position.set(28, -15, 0);
        continent4.rotation.x = (Math.PI/180)*270;
        continent4.rotation.y = (Math.PI/180)*50;

        let continent5 = new THREE.Mesh(contiGeom, contiMat);
        continent5.position.set(28, 0, 20);
        continent5.rotation.x = (Math.PI/180)*270;

        let continent6 = new THREE.Mesh(contiGeom, contiMat);
        continent6.position.set(-28, 20, 0);
        continent6.rotation.x = (Math.PI/180)*30;

        // let atmosphereSphere = new THREE.SphereGeometry(75,20,20);
        // let atmosphereMaterial = new THREE.MeshPhongMaterial({
        //     shininess: 100,
        //     flatShading: THREE.SmoothShading,
        //     color: 0x109EB4,
        //     transparent: true,
        //     opacity: .12
        // });

        // let atmosphere = new THREE.Mesh(atmosphereSphere, atmosphereMaterial);

        northPole.receiveShadow = true;
        southPole.receiveShadow = true;
        continent1.receiveShadow = true;
        continent2.receiveShadow = true;
        continent3.receiveShadow = true;
        continent4.receiveShadow = true;
        continent5.receiveShadow = true;
        continent6.receiveShadow = true;

        this.mesh.add( earthSphere, northPole, southPole, continent1, continent2, continent3, continent4, continent5, continent6);
    }
}