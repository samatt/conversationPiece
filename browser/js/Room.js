Room = function()
{
        THREE.Object3D.call(this);
}
Room.prototype = Object.create(THREE.Object3D.prototype);

Room.prototype.init = function()
{
        // right wall
        var geo = new THREE.PlaneGeometry( 1000, 600, 150, 150);
        var mesh = new THREE.Mesh(geo, resMgr.materials.plaster);
        
        mesh.position.x = 500;
        mesh.position.y = 250;
        mesh.rotation.y = -Math.PI/2;
        mesh.receiveShadow = true;
        mesh.castShadow = false;
        this.add(mesh);

        // left wall
        geo = new THREE.PlaneGeometry( 1000, 600, 30, 30);
        mesh = new THREE.Mesh(geo, resMgr.materials.plaster);
        mesh.position.x = -500;
        mesh.position.y = 250;
        mesh.receiveShadow = true;
        mesh.castShadow = false;
        mesh.rotation.y = Math.PI/2;
        this.add(mesh);

        // front wall
        geo = new THREE.PlaneGeometry( 1000, 600, 150, 150);
        mesh = new THREE.Mesh(geo, resMgr.materials.plaster);
        // mesh.receiveShadow = false      ;
        mesh.castShadow = false      ;
        mesh.position.z = -500;
        mesh.position.y = 250;
        mesh.receiveShadow = true;
        mesh.castShadow = false;
        this.add(mesh);

        // left wall
        geo = new THREE.PlaneGeometry( 1000, 600, 150, 150);
        mesh = new THREE.Mesh(geo, resMgr.materials.plaster);
        mesh.receiveShadow = true      ;
        mesh.castShadow = false      ;
        mesh.position.z = 500;
        mesh.position.y = 250;
        mesh.rotation.y = -Math.PI;
        this.add(mesh);

        // right wall
        

        // stool
        geo = new THREE.CubeGeometry( 200, 30, 200, 1, 1, 1);
        mesh = new THREE.Mesh(geo, resMgr.materials.black);
        mesh.position.set(0, -50, 0);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.add(mesh);


        //floor
        geo = new THREE.PlaneGeometry(1000, 1000, 1, 1);
        mesh = new THREE.Mesh(geo, resMgr.materials.wood);
        mesh.receiveShadow = true;
        mesh.rotation.x = -Math.PI/2;
        mesh.position.y = -50;
        mesh.receiveShadow = true;
        this.add(mesh);


        //ceiling
        geo = new THREE.PlaneGeometry(1000, 1000, 1, 1);
        mesh = new THREE.Mesh(geo, resMgr.materials.plaster);
        mesh.receiveShadow = true;
        mesh.rotation.x = Math.PI/2;
        mesh.rotation.x = Math.PI/2;
        mesh.position.y = 550;
        mesh.receiveShadow = true;
        this.add(mesh);



}
