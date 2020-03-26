import * as THREE from 'three';

export default class SpaceStation {
    constructor() {
        this.mesh = new THREE.Object3D();
        this.pivot = new THREE.Object3D();

        let bodyGeom = new THREE.CylinderGeometry(1, 1, 5, 8);
        let bodyMat = new THREE.MeshPhongMaterial({
            shininess: 100,
            color: 0xB2B8AF,
            shading: THREE.FlatShading
        });
        let body = new THREE.Mesh(bodyGeom, bodyMat);

        let panelGeom = new THREE.BoxGeometry(5,1,.1,11,1,1);
        let panelMat = new THREE.MeshPhongMaterial({
            shininess: 100,
            color: 0x222222,
            shading: THREE.FlatShading
        });

        let panel = new THREE.Mesh( panelGeom, panelMat );
        let panel2 = panel.clone();
        let panel3 = panel.clone();
        let panel4 = panel.clone();
        let panel5 = panel.clone();
        let panel6 = panel.clone();
        let panel7 = panel.clone();
        let panel8 = panel.clone();
        panel.position.set(4.5,4.5,0);
        panel2.position.set(4.5,2.5,0);
        panel3.position.set(4.5,-2.5,0);
        panel4.position.set(4.5,-4.5,0);
        panel5.position.set(-4.5,4.5,0);
        panel6.position.set(-4.5,2.5,0);
        panel7.position.set(-4.5,-2.5,0);
        panel8.position.set(-4.5,-4.5,0);

        panel2.rotation.x = 20;
        panel6.rotation.x = 20;

        panel3.rotation.x = 45;
        panel7.rotation.x = 45;

        let smallBodyGeom = new THREE.CylinderGeometry(.4, .4, 10, 8);

        let smallBody = new THREE.Mesh(smallBodyGeom, bodyMat);

        let cockpitGeom = new THREE.DodecahedronGeometry(1, 0);

        let cockpit = new THREE.Mesh(cockpitGeom, panelMat);
        cockpit.position.set(0,0,1);

        this.mesh.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI/3));
        this.mesh.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI/3));
        // this.mesh.applyMatrix(new THREE.Matrix4().makeRotationZ(Math.PI/3));

        this.mesh.add(body, panel, panel2, panel3, panel4, panel5, panel6, panel7, panel8, smallBody, cockpit);

        this.pivot.add(this.mesh);
    }
}