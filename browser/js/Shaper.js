Shaper = function()
{
        // G E O M E T R Y

        // Cylinder Geometry
        this.radiusTop  =10;
        this.radiusBottom = 10;
        this.height = 100;
        this.segmentsRadius = 22;
        this.segmentsHeight = 22;

}
/*
TODO: Implement this properly
TestObject.prototype.superShape = function(){
        var geometry = new THREE.Geometry();
        var points = new Array();
        var step = 0;
        var numSlices = 0;
    
    this.iRadius = 50;
    for(var theta = 0; theta <(2*Math.PI)+0.001; theta+=0.005)
    {
    
        var raux  = Math.pow(Math.abs(1/this.a)*Math.abs(Math.cos((this.m*theta/4))),this.n2) + Math.pow(Math.abs(1/this.b)*Math.abs(Math.sin(this.m*theta/4)),this.n3);
        var r = this.iRadius*Math.pow(Math.abs(raux),(-1/this.n1));
            
        
        var x=this.width*.5+r*Math.cos(theta);
        var y=this.height*.5+r*Math.sin(theta);
        geometry.vertices.push(new THREE.Vector3( x,  y, 0 ));

    }
    numSlices++;
        this.m = 19;
        this.iRadius = 100;
    for(var theta = 0; theta <(2*Math.PI)+0.001; theta+=0.005)
    {
        
        var raux  = Math.pow(Math.abs(1/this.a)*Math.abs(Math.cos((this.m*theta/4))),this.n2) + Math.pow(Math.abs(1/this.b)*Math.abs(Math.sin(this.m*theta/4)),this.n3);
        var r = this.iRadius*Math.pow(Math.abs(raux),(-1/this.n1));
            
            // var index = ofMap(theta, 0, TWO_PI+0.001f, 0, fftData.size());
            // var hue = ofMap(index, 0, fftData.size(), 0, 255);
            // float radVariance =ofMap(fftData[index], 0, fftMax, 0, 1);
            // r+=  radVariance*100;
        
        var x=this.width*.5+r*Math.cos(theta);
        var y=this.height*.5+r*Math.sin(theta);
        var point = new Object();
        point.x = x;
        point.y = y;
        points.push(point);
        geometry.vertices.push(new THREE.Vector3( x,  y, 50 ));
        step++;
    }

        numSlices++

    geometry.verticesNeedUpdate =true;

        console.log("points: " +points.length);
        console.log("vertices :" +geometry.vertices.length);


    for (var y = 0; y<numSlices -1; y++){
                for (var x=0; x<points.length-1; x++){
                
                        var a = x+y*points.length;
                        var b = (x)+(y+1)*points.length;
                        var c = (x+1)+(y*points.length);
                        // console.log(a + ','+b+','+c);
                        geometry.faces.push( new THREE.Face3( c, b, a ) );
                        
                        var d = x+(y+1)*points.length;
                        var e = (x+1)+(y+1)*points.length;
                        var f = (x+1)+y*points.length;

                        geometry.faces.push( new THREE.Face3( f, e, d ) );
                        
                }
        }
                geometry.elementsNeedUpdate = true;
                geometry.computeCentroids();
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();

        console.log("step: " +step);
        console.log("vertices :" +geometry.vertices.length);
        console.log("faces :" +geometry.faces.length);
        
        

        var mesh = new THREE.Mesh(geometry, resMgr.materials.colors[0]);
        this.add(mesh);
}
*/

/*
 
    this.iRadius =100;
    this.a = 0.24;
    this.b = 0.34;
    this.m = 11.92;
    this.n1 =12.81;
    this.n2 = -2.71;
    this.n3 = 2.46;
 */