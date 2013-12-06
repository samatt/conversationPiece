User = function(){
	THREE.Object3D.call(this);

}
screenPos = [{ 'x': 490, 'y': 90},{'x': -490,'y': 90}];

User.prototype = Object.create(THREE.Object3D.prototype);

User.prototype.build = function(video, pos,index ){


    var userGeo = new THREE.PlaneGeometry(320, 240, 1, 1);
    this.videoTexture = new THREE.Texture( video );
    //var videoMaterial = new THREE.MeshLambertMaterial( {emissive: 0xffffff, map : this.videoTexture} );
   
    this.material   = new THREE.MeshLambertMaterial({ emissive: 0xffffff, map : this.videoTexture });    

    this.mesh = new THREE.Mesh(userGeo, this.material);
    
    this.mesh.name  = index;
    this.mesh.position.x = pos.x;
    this.mesh.position.y = pos.y;
    // userMesh.rotation.z = -Math.PI/2;

    if(index === 0){
        this.mesh.rotation.y = -Math.PI/2;
        this.mesh.receiveShadow = false;
    }
    if(index ===1){
     this.mesh.rotation.y = Math.PI/2;
        this.mesh.receiveShadow = false;   
    }

    this.add(this.mesh);
}

User.prototype.remove = function(){
    console.log("removing user  " );
    this.remove(this.mesh);
}