var renderer = null;
var scene = null;

var controls = null;
var camera = null;

var octopus = null;
var genome = null;

var clock = null;

var animating = true;

var resMgr = null;

var keyPressed = [];

var exporter = null;

var videos=[];
// var video =null;


//***************************************************************************//
// initialize the renderer, scene, camera, and lights                        //
//***************************************************************************//
function onLoad()
{
    // Grab our container div
    var container = document.getElementById("container");

    // Create the Three.js renderer, add it to our div
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0);
    container.appendChild( renderer.domElement );
    projector = new THREE.Projector();
    // Create a new Three.js scene
    scene = new THREE.Scene();

    // Put in a camera
    camera = new THREE.PerspectiveCamera( 60, 
        window.innerWidth / window.innerHeight, 1, 4000 );
        
    camera.position.set( 150, 580, 580);
    camera.lookAt(0, 0, 0);
    controls = new THREE.OrbitControls(camera);
    controls.addEventListener( 'change', render );

    // add lights
    initSceneLights();

    // scene specific stuff (add objects)
    populateScene();

    // Add a mouse up handler to toggle the animation
    addInputHandler();
    window.addEventListener( 'resize', onWindowResize, false );

    // add gui
    addGui();

    clock = new THREE.Clock();

    // Run our render loop
	run();
}

//***************************************************************************//
// Populate the scene with lights                                            //
//***************************************************************************//
function initSceneLights()
{
    // Create an ambient and a directional light to show off the object
    var dirLight = [];
    var ambLight = new THREE.AmbientLight( 0xaaaaaa ); // soft white light
    dirLight[0] = new THREE.DirectionalLight( 0xffffff, 1);
    dirLight[0].position.set(0, 1, 1);
    dirLight[1] = new THREE.DirectionalLight( 0xbbbbbb, 1);
    // dirLight[1].position.set(0, -1, -1);

    var spotLight = new THREE.SpotLight( 0xaabbcc );
    spotLight.position.set( 100, 100, 100 );

    spotLight.castShadow = true;

    spotLight.shadowMapWidth = 1024;
    spotLight.shadowMapHeight = 1024;

    spotLight.shadowCameraNear = 500;
    spotLight.shadowCameraFar = 4000;
    spotLight.shadowCameraFov = 30;

    scene.add( spotLight );

    scene.add( ambLight );
    scene.add( dirLight[0] );
    scene.add( dirLight[1] );
}

//***************************************************************************//
// Populate the scene object with our objects                                //
//***************************************************************************//
function populateScene()
{
    resMgr = new ResourceManager();

    // load resources
    resMgr.initMaterials();
    object = new TestObject();
    shaper = new Shaper();
    console.log(shaper);
    object.build(shaper);
    // object.setWidthHeight(200,200);
    
    planeGeo = new THREE.PlaneGeometry(1000, 1000, 1, 1);
    planeMesh = new THREE.Mesh(planeGeo, resMgr.materials.basic);
    planeMesh.rotation.x = -Math.PI/2;

    planeMesh.position.y = -50;

    scene.add(planeMesh);
    scene.add(object);

}
function newUser(video){
    userGeo = new THREE.PlaneGeometry(320, 240, 1, 1);
     this.videoMaterial = new THREE.MeshLambertMaterial( {emissive: 0xffffff, map : this.videoTexture} );
    var videoTexture = new THREE.Texture( video );
    
    var material   = new THREE.MeshLambertMaterial({
        emissive: 0xffffff,
      map : videoTexture
    });    

    userMesh = new THREE.Mesh(userGeo, material);
    
    var planeVertices = scene.children[7].geometry.vertices;
    
    userMesh.position.z = -500;
    userMesh.position.y = 90;
    // userMesh.rotation.z = -Math.PI/2;
    // userMesh.rotation.y = -Math.PI/4;
    
    videos.push(videoTexture);
    scene.add(userMesh);



}

function addGui()
{

    var gui = new dat.GUI();
  
    var f1 = gui.addFolder('OBJECT GEOMETERY');
    f1.add(shaper ,'radiusTop', 5, 35).onChange(onGeometryChanged);
    f1.add(shaper ,'radiusBottom', 5, 35).onChange(onGeometryChanged);
    f1.add(shaper ,'height', 10, 300).onChange(onGeometryChanged);
    f1.add(shaper ,'segmentsRadius', 8, 100).onChange(onGeometryChanged);
    f1.add(shaper ,'segmentsHeight', 10, 300).onChange(onGeometryChanged);


    var f2 = gui.addFolder('FORCE PARAMS');
    f2.add(object,"mass",10,1000);
    f2.add(object,"distFromObject",10,1000);
    f2.add(object,'maxCentroidDistance',10,500);
    // f2.add(object,'multiplie',1,100);
    
    var f3 = gui.addFolder('CAMERA STUFF');
    f3.add(this,'radius',10,1000);
    // f3.add(this,'speed',0.1,1.0);
    f3.add(this,'speed',0.001,0.01);
}


function onGeometryChanged(){
    object.updatedShaper(shaper);
    
}

//***************************************************************************//
// render loop                                                               //
//***************************************************************************//
function run()
{
    var deltaMS = clock.getDelta()*1000;

    render();

    if (animating)
    {
     // /   checkForIntersection(mousePos);  
    }

    // Ask for another frame
    if(videos.length > 0){
        for(var i = 0; i<videos.length; i++){
            if( videos[i].readyState === videos[i].HAVE_ENOUGH_DATA ){
                videos[i].needsUpdate = true;
                console.log("here");
            }    
        }
            
    }
    requestAnimationFrame(run);
    controls.update();
    
    
}
    var radius = 100;
    var theta = 0;
    var speed = 0.05;
// Render the scene
function render()
{

    theta += speed;

    object.rotation.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
    // object.rotation.x = radius *( Math.cos( THREE.Math.degToRad( theta )));
    // camera.position.z = radius *( Math.cos( THREE.Math.degToRad( theta )) );
    // camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
    camera.lookAt( scene.position );
    renderer.render(scene, camera);    
}

//***************************************************************************//
// User interaction                                                          //
//***************************************************************************//
function addInputHandler()
{
    var dom = renderer.domElement;
    dom.addEventListener('mouseup', onMouseUp, false);
    dom.addEventListener('mousedown', onMouseDown, false)
    dom.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('keydown', onKeyDown, false);
    window.addEventListener('keyup', onKeyUp, false);
}

function onKeyDown(evt)
{
    var keyCode = getKeyCode(evt);
    keyPressed[keyCode] = true;

    console.log(keyCode);

    if (keyCode == 32) {
        animating = !animating;        
    }
    else if (keyCode == 83) // 's'
    {
        object.extrudeFace();
        if (!keyPressed[keyCode]) {
            keyPressed[keyCode] = true;
        }
    }
    else if (keyCode == 66) // 'b'
    {
        if (!keyPressed[keyCode]) {
            keyPressed[keyCode] = true;
            octopus.shutEyes(0.2);
        }
    }
    else if (keyCode == 69) // 'e'
    {
        if (!keyPressed[keyCode]) {
            keyPressed[keyCode] = true;
            // export to STL
            octopus.updateMatrixWorld(true);
            exporter = new THREE.STLExporter();
            exporter.exportScene(scene);
            exporter.sendToServer();
        }
    }
}

function onKeyUp(evt)
{
    var keyCode = getKeyCode(evt);

    keyPressed[keyCode] = false;
}

function onMouseDown(event)
{
    event.preventDefault();
    // mousePos.x = event.x;    
    // mousePos.y = event.y; 
}

function checkForIntersection(event){
        // console.log(event.x + " , "+ event.y);
    var vector = new THREE.Vector3( ( event.x / window.innerWidth ) * 2 - 1, - ( event.y / window.innerHeight ) * 2 + 1, 0.5 );
    
   projector.unprojectVector( vector, camera );

    var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
    // console.log(raycaster);
    var intersects = raycaster.intersectObject(object,true);
        
    if(intersects[0]!== undefined){
        var data = {'faceIndex': intersects[0].faceIndex, 'mousePoint':raycaster.ray.origin}
        socket.emit('othermouse',data);
        sculpt(data);
        
     
    }
    else{
        console.log("Not intersecting")
    }
}


function sculpt(data){
    console.log(data);
    object.getVertices(data.faceIndex,data.mousePoint);
}
function onMouseUp(event)
{
    event.preventDefault();
}

function onMouseMove(event)
{

   event.preventDefault();
   checkForIntersection(event)

}


function onWindowResize() 
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}


function getKeyCode(evt)
{
    if (window.event != null) 
        return window.event.keyCode;
    else
        return evt.which;
}

function map(i, sStart, sEnd, tStart, tEnd)
{
    var v = i-sStart;
    if (v>=0) {
        if (i < sStart) {
            return tStart;
        } else if (i > sEnd) {
            return tEnd;
        }
    } else {
        if (i > sStart) {
            return tStart;
        } else if (i < sEnd){
            return tEnd;
        }
    }
    var sRange = sEnd - sStart;
    if (sRange == 0) {
        return tStart;
    }

    var tMax = tEnd - tStart;
    return tStart + v / sRange * tMax;
}
