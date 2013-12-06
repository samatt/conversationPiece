Room = function()
{
        THREE.Object3D.call(this);
}
Room.prototype = Object.create(THREE.Object3D.prototype);

Room.prototype.init = function()
{
        // floor
        var geo = new THREE.PlaneGeometry( 1500, 2000, 150, 150);
        var mesh = new THREE.Mesh(geo, resMgr.materials.floor);
        mesh.rotation.x = -Math.PI/2;
        mesh.position.z += 400;
        mesh.receiveShadow = true;
        mesh.castShadow = false;
        this.add(mesh);

        // front wall
        geo = new THREE.PlaneGeometry( 1500, 600, 30, 30);
        mesh = new THREE.Mesh(geo, resMgr.materials.walls);
        mesh.receiveShadow = true;
        mesh.position.y += 300;
        mesh.position.z -= 300;
        this.add(mesh);

        // back wall
        geo = new THREE.PlaneGeometry( 1500, 600, 150, 150);
        mesh = new THREE.Mesh(geo, resMgr.materials.walls);
        mesh.receiveShadow = true;
        mesh.position.y += 300;
        mesh.position.z += 1400;
        mesh.rotation.y = Math.PI;
        this.add(mesh);

        // left wall
        geo = new THREE.PlaneGeometry( 1400, 600, 20, 20);
        mesh = new THREE.Mesh(geo, resMgr.materials.walls);
        mesh.rotation.y = Math.PI/2;
        mesh.position.set(-400, 300, 400);
        this.add(mesh);

        // right wall
        geo = new THREE.PlaneGeometry( 1400, 600, 10, 10);
        mesh = new THREE.Mesh(geo, resMgr.materials.walls);
        mesh.rotation.y = -Math.PI/2;
        mesh.position.set(400, 300, 400);
        this.add(mesh);

        // stool
        geo = new THREE.CubeGeometry( 200, 30, 200, 1, 1, 1);
        mesh = new THREE.Mesh(geo, resMgr.materials.floor);
        mesh.position.set(0, 8, 500);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.add(mesh);


}
