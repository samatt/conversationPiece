Room = function()
{
        THREE.Object3D.call(this);
}
Room.prototype = Object.create(THREE.Object3D.prototype);

Room.prototype.init = function()
{
        // right wall
        var geo = new THREE.PlaneGeometry( 1000, 600, 150, 150);
        var mesh = new THREE.Mesh(geo, resMgr.materials.walls);
        
        mesh.position.x = 500;
        mesh.position.y = 250;
        mesh.rotation.y = -Math.PI/2;
        mesh.receiveShadow = false;
        mesh.castShadow = false;
        this.add(mesh);

        // left wall
        geo = new THREE.PlaneGeometry( 1000, 600, 30, 30);
        mesh = new THREE.Mesh(geo, resMgr.materials.walls);
        mesh.position.x = -500;
        mesh.position.y = 250;
        mesh.receiveShadow = false;
        mesh.castShadow = false;
        mesh.rotation.y = Math.PI/2;
        this.add(mesh);

        // front wall
        geo = new THREE.PlaneGeometry( 1000, 600, 150, 150);
        mesh = new THREE.Mesh(geo, resMgr.materials.walls);
        // mesh.receiveShadow = false      ;
        mesh.castShadow = false      ;
        mesh.position.z = -500;
        mesh.position.y = 250;
        mesh.receiveShadow = false;
        mesh.castShadow = false;
        this.add(mesh);

        // left wall
        geo = new THREE.PlaneGeometry( 1000, 600, 150, 150);
        mesh = new THREE.Mesh(geo, resMgr.materials.walls);
        mesh.receiveShadow = false      ;
        mesh.castShadow = false      ;
        mesh.position.z = 500;
        mesh.position.y = 250;
        mesh.rotation.y = -Math.PI;
        this.add(mesh);

        // right wall
        // geo = new THREE.PlaneGeometry( 1400, 600, 10, 10);
        // mesh = new THREE.Mesh(geo, resMgr.materials.walls);
        // mesh.rotation.y = -Math.PI/2;
        // mesh.position.set(400, 300, 400);
        // this.add(mesh);

        // stool
        geo = new THREE.CubeGeometry( 200, 30, 200, 1, 1, 1);
        mesh = new THREE.Mesh(geo, resMgr.materials.floor);
        mesh.position.set(0, -50, 0);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.add(mesh);


}
