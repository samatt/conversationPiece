TestObject = function()
{
	THREE.Object3D.call(this);
	this.shaper = [];
}

TestObject.prototype = Object.create(THREE.Object3D.prototype);

TestObject.prototype.build = function(shaper){
	this.shaper = shaper;
	var geo = new THREE.CylinderGeometry( this.shaper.radiusTop, this.shaper.radiusBottom, this.shaper.height, this.shaper.segmentsRadius, this.shaper.segmentsHeight);
	this.mesh = new THREE.Mesh(geo, resMgr.materials.object);
	
	this.mesh.receiveShadow = false;
	this.mesh.castShadow = true;
	this.mesh.position.set(0, 15, 0);
	this.add(this.mesh);
		
	this.distFromObject = 800;
	this.maxCentroidDistance = 10;
	this.mass = 10;
}

TestObject.prototype.updatedShaper = function(shaper){
	// console.log(shaper);
	this.remove(this.mesh);
	this.build(shaper); 
}


TestObject.prototype.extrudeTriangles = function()
{
	var geo = this.children[0].geometry;
	var faces = geo.faces;
	var vertices = geo.vertices;
	console.log(geo);

	for (var i=0; i<vertices.length; i++)
	{
		vertices[i].z  +=   Math.floor((Math.random()*10)+1);;
	}
	geo.verticesNeedUpdate = true;
}

TestObject.prototype.extrudeFace = function()
{

	var geo = this.children[0].geometry;
	var faces = geo.faces;
	var vertices = geo.vertices;


	for(var i =0; i<faces.length; i++){
	var v1 = vertices[faces[i].a];
	var v2 = vertices[faces[i].b];
	var v3 = vertices[faces[i].c];
	

		v1.x += 1;
		v1.x += 1;
		v2.x += 1;
		v3.x += 1;		

		v1.z += 1;
		v1.z += 1;
		v2.z += 1;
		v3.z += 1;		
	}


	geo.verticesNeedUpdate = true;	

}

TestObject.prototype.getVertices = function(index, mousePoint){

	var geo = this.children[0].geometry;
	var faces = geo.faces;
	var vertices = geo.vertices;

	var face = faces[index];

	var targetVertices = new Array();

	targetVertices.push((vertices[face.a]));
	targetVertices.push((vertices[face.b]));
	targetVertices.push((vertices[face.c]));

	for(var i =0; i< targetVertices.length; i++){

		 var result = this.calculateRepulsionForce(targetVertices[i],mousePoint);
		
		if(result.length() !== 0){
			targetVertices[i].add(result);
		}
	}

	geo.verticesNeedUpdate = true;	

}

TestObject.prototype.calculateRepulsionForce = function(vec1, vec2){
	var diff = new THREE.Vector3();

	diff.subVectors(vec1, vec2);
	
	var d = diff.length();

	var power = this.mass/(d*d);
	console.log(power)
	diff.normalize();
	diff.multiplyScalar( power);
	// console.log(this.distFromObject);	
	
	if(d > this.distFromObject){
		console.log("Too Far! ");
		return 0;
	}
	else{

		return diff;
	}
}


