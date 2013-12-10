
ResourceManager = function()
{
	this.materials = {};
}

ResourceManager.prototype.initMaterials = function()
{
	this.materials.white = new THREE.MeshLambertMaterial( { color: 0xFFFFFF, ambient: 0x444444 } );
	this.materials.gray = new THREE.MeshLambertMaterial( { color: 0x444444, ambient: 0x222222 } );
	this.materials.black = new THREE.MeshLambertMaterial( { color: 0x222222, ambient: 0x111111 } );
	this.materials.floor = new THREE.MeshLambertMaterial( { color: 0xC6B263, ambient: 0xC6B263 } );
	this.materials.walls = new THREE.MeshLambertMaterial( { color: 0xddd8d8, ambient: 0xddd8d8 } );

	//Object depth texture
	var myTexture = new THREE.ImageUtils.loadTexture("js/Textures/texture3.png");//,THREE.UVMapping
	myTexture.wrapS = myTexture.wrapT = THREE.ClampToEdgeWrapping;
	var shader = THREE.ShaderLib[ "normalmap" ];
	var uniforms = THREE.UniformsUtils.clone( shader.uniforms );

	uniforms[ "enableDisplacement" ].value = true;
	uniforms[ "enableDiffuse" ].value = true;
	uniforms[ "tDisplacement" ].value = myTexture;
	uniforms[ "tDiffuse" ].value = myTexture;
	uniforms[ "uDisplacementScale" ].value = 20;

	var parameters = { fragmentShader: shader.fragmentShader, vertexShader: shader.vertexShader, uniforms: uniforms, lights: true, wireframe: false };
	this.materials.displacement = new THREE.ShaderMaterial( parameters );
	// var depthMap = THREE.ImageUtils.loadTexture( "js/Textures/depthMap.png" );
	// this.materials.objectDepth = new THREE.MeshDepthMaterial({side:THREE.DoubleSide, overdraw : true});//z

	//Object noise texture
	var noiseMap = THREE.ImageUtils.loadTexture( "js/Textures/noiseMap.png" );
	this.materials.object = new THREE.MeshPhongMaterial( { map: noiseMap,  specular: 0xc0c0c0 ,color: 0xFFFFFF} );
	

	//FLoor Wood 
	var texture = THREE.ImageUtils.loadTexture( "js/Textures/WoodFine.jpg" );
	var normalMap = THREE.ImageUtils.loadTexture( "js/Textures/WoodFloorNormals.png" );
    var specMap = THREE.ImageUtils.loadTexture( "js/Textures/SpecularMap.png" );
    this.materials.wood   = new THREE.MeshPhongMaterial({ normalMap: normalMap, map : texture, specularMap: specMap });
    texture.wrapT	= THREE.RepeatWrapping;    

    //Wall Plaster
	var plasterTexture = THREE.ImageUtils.loadTexture( "js/Textures/PlasterWhite.jpg" );
    var plasterNormalMap = THREE.ImageUtils.loadTexture( "js/Textures/PlasterWhiteNormals.png" );
    var plasterSpecMap = THREE.ImageUtils.loadTexture( "js/Textures/PlasterWhiteSpecular.png" );
    this.materials.plaster   = new THREE.MeshPhongMaterial({ normalMap: plasterNormalMap, map : plasterTexture, specularMap: plasterSpecMap });    
     
    //Extras    
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
