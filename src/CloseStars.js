import * as THREE from 'three';

export default class CloseStars {
    constructor() {
        this.mesh = new THREE.Object3D();
        this.geom = new THREE.SphereGeometry(2,6,6);
        this.mat = new THREE.MeshPhongMaterial({
            shininess: 100,
            specular: 0xffffff,
            transparent: true
        });

        let star;
        let starCount = 155;

        for (let i = 0; i < starCount; i++) {
            star = new THREE.Mesh(this.geom, this.mat);
            star.position.x = Math.random() * (window.innerWidth + 1) - window.innerWidth/2;
            star.position.y = Math.random() * (window.innerHeight + 1) - window.innerHeight/2;
            star.position.z = Math.floor(Math.random() * (1200 - 1)) - 1500;
            star.scale.set(.5,.5,.5);
            this.mesh.add(star);
        }
    }
}