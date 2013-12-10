TestObject = function()
{
	THREE.Object3D.call(this);
	this.shapeParticles = [];
}

TestObject.prototype = Object.create(THREE.Object3D.prototype);

TestObject.prototype.build = function(shaper){
	this.shaper = shaper;
	this.geo = new THREE.CylinderGeometry( this.shaper.radiusTop, this.shaper.radiusBottom, this.shaper.height, this.shaper.segmentsRadius, this.shaper.segmentsHeight);
	this.geo.computeTangents();
	// geo.dynaminc = true;
	this.mesh = new THREE.Mesh(this.geo, resMgr.materials.object);
	this.mesh.position.set(0, 15, 0);
	this.mesh.receiveShadow = false;
	this.mesh.castShadow = true;
	this.add(this.mesh);
		
	this.distFromObject = 800;
	this.maxCentroidDistance = 10;
	this.mass = 15000;
/////
	var faces = this.geo.faces;
	var vertices = this.geo.vertices;

	var index=0;
    for (var i=0; i<vertices.length; i++){
    	var vert = vertices[i];
	 	var added = false;
	    for (var j=0; j<this.shapeParticles.length; j++) {
	        if (equals(vert, this.shapeParticles[j].restPos)) {
	                this.shapeParticles[j].addVertex(vert);
	                added = true;
	        }
	    }
	    if (!added) {
	        var par = new ShapeParticle(vert, vert.clone().normalize(), index++);        // (restPos, direction, mapping index)
	        par.addVertex(vert);
	        this.shapeParticles.push(par);
	    }
	}
/////
}

TestObject.prototype.updatedShaper = function(shaper){
	// console.log(shaper);
	this.remove(this.mesh);
	this.build(shaper); 
}

TestObject.prototype.update = function(){
	        // update shape
        for (var i=0; i<this.shapeParticles.length; i++)
        {
                this.shapeParticles[i].update();                
        }

        

        this.geo.computeFaceNormals();
        this.geo.computeVertexNormals();
        this.geo.verticesNeedUpdate = true;
        this.geo.normalsNeedUpdate = true;

}

function addShapeParticles(){


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

TestObject.prototype.getVertices = function(index, mousePoint){

	var geo = this.children[0].geometry;
	var faces = geo.faces;
	var vertices = geo.vertices;

	var face = faces[index];

	var targetVertices = new Array();

	targetVertices.push((vertices[face.a]));
	targetVertices.push((vertices[face.b]));
	targetVertices.push((vertices[face.c]));


	for (var j=0; j<this.shapeParticles.length; j++) {	
		for(var i =0; i< targetVertices.length; i++){

			if(equals(targetVertices[i],this.shapeParticles[j])){
				targetVertices[i].push(this.shapeParticles[j].vertices);
			}
		}
	}
	for(var i =0; i< targetVertices.length; i++){
		var result = this.calculateRepulsionForce(targetVertices[i],mousePoint);
		if(result !== 0 ){
			var v = targetVertices[i].clone().normalize();
				v.y = 0;
				v.multiplyScalar(result);

				targetVertices[i].sub(v);


			
	}
	// else{
	// 		targetVertices[i].add(result);
			
	// }

	geo.verticesNeedUpdate = true;	

	}
}

TestObject.prototype.updateDisplacementMap = function(vec){

}

TestObject.prototype.calculateRepulsionForce = function(vec1, vec2){
	var diff = new THREE.Vector3();

	diff.subVectors(vec1, vec2);
	
	var d = diff.length();
	if(d < 10){
		console.log(d);
		d = 10;
	}

	var power = this.mass/(d*d);
	// console.log(power)
	diff.normalize();
	diff.multiplyScalar( -power);
	// console.log(this.distFromObject);	
	
	if(d > this.distFromObject){
		console.log("Too Far! ");
		return 0;
	}
	else{

		return power;
	}
}

function equals(v1, v2)
{
        if (Math.abs(v1.x - v2.x) < 0.01 &&
                Math.abs(v1.y - v2.y) < 0.01 &&
                Math.abs(v1.z - v2.z) < 0.01) {
                return true;
        }
        else {
                return false;
        }
}



