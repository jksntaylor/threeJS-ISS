import * as THREE from 'three';
import Cloud from './Cloud.js';

export default class Sky {
    constructor() {
        this.mesh = new THREE.Object3D();

        class Pivot {
            constructor() {
            this.mesh = new THREE.Object3D();
            this.mesh.position.set(0,0,0);
            }
        };

        this.mesh.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI/2));

        this.nClouds = 38;

        var stepAngle = Math.PI*2 / this.nClouds;

        for(var i = 0; i<this.nClouds; i++) {
            var p = new Pivot();
            var c = new Cloud();
            var a = stepAngle*i;
            var h = 62 + Math.random()*5;

            c.mesh.position.y = Math.sin(a)*h;
            c.mesh.position.x = Math.cos(a)*h;

            // rotate the clouds facing the surface of planet
            c.mesh.rotation.z = a + Math.PI/2;

            var s = Math.random() * 2;
            c.mesh.scale.set(s,s,s);

            p.mesh.add( c.mesh );

            p.mesh.rotation.x = (Math.PI/180)*(Math.random()*360);
            p.mesh.rotation.y = -(Math.PI/180)*(Math.random()*360);
            p.mesh.rotation.z = (Math.PI/180)*(Math.random()*360);

            this.mesh.add (p.mesh);
        }
    }
}