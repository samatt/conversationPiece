
ResourceManager = function()
{
	this.materials = {};
}

ResourceManager.prototype.initMaterials = function()
{
	this.materials.white = new THREE.MeshLambertMaterial( { color: 0x888888, ambient: 0x444444 } );
	this.materials.gray = new THREE.MeshLambertMaterial( { color: 0x444444, ambient: 0x222222 } );
	this.materials.black = new THREE.MeshLambertMaterial( { color: 0x222222, ambient: 0x111111 } );
	 // this.materials.floor = new THREE.MeshLambertMaterial( { color: 0xC49756, ambient: 0xC49756 } );
        this.materials.floor = new THREE.MeshLambertMaterial( { color: 0xC6B263, ambient: 0xC6B263 } );
        this.materials.walls = new THREE.MeshLambertMaterial( { color: 0xddd8d8, ambient: 0xddd8d8 } );

        // this.materials.object = new THREE.MeshPhongMaterial( { ambient: 0x030303, specular: 0xc0c0c0, shininess: 25 } );
        this.materials.object = new THREE.MeshLambertMaterial( { ambient: 0x050505, specular: 0xc0c0c0, shading: THREE.SmoothShading } );
        // this.materials.object.shading = THREE.FlatShading;
	this.materials.colors = [];
	for (var i=0; i<16; i++)
	{
		var c = new THREE.Color();
		var ca = new THREE.Color();

		c.setHSL(map(i, 0, 16, 0.1, 1.0), 0.3, 1.0);
		ca.setHSL(map(i, 0, 16, 0.1, 0.5), 0.1, 0.5);

		this.materials.colors[i] = new THREE.MeshLambertMaterial( { color: c, ambient: ca } );
		//this.materials.colors[i] = new THREE.MeshBasicMaterial( { color: c } );
	}

	this.materials.basic = new THREE.MeshBasicMaterial( {color:0xdddddd });
}

ResourceManager.prototype.constructor = ResourceManager;
