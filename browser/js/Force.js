Attract = function(){

var location = new Object();
	location.x = 0;
	location.y = 0;
var mass = 20;
	
}


PVector attract(Mover m) {
 
  PVector force = PVector.sub(location,m.location);
  float distance = force.mag();
  force.normalize();
What’s the force’s magnitude?
  float strength = (G * mass * m.mass) / (distance * distance);
  force.mult(strength);
 
Return the force so that it can be applied!
  return force;
}