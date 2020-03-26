import * as THREE from 'three';

function flipCoin() {
    let flip = Math.floor(Math.random()*2);

    if (flip === 1) {
        return Math.ceil(Math.random() * -700) -400;
    } else {
        return Math.ceil(Math.random() * 500) + 200;
    }
}

export default class DistantStars {
    constructor() {
        let particleCount = 10000,
            geom = new THREE.Geometry(),
            mat = new THREE.PointsMaterial({
                color: 0xffffff,
                size: 1
            });
        for (let p = 0; p < particleCount; p++){
            let pX = Math.random() * 3000 - 1500,
                pY = Math.random() * 3000 - 1500,
                pZ = flipCoin(),
                particle = new THREE.Vector3(pX, pY, pZ);

            geom.vertices.push(particle);
        }
        this.mesh = new THREE.Points(geom, mat);
    }
}