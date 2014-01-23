//Gets array of points, this describes curve. 4 Vectors are expected.
function Mover(audioNode,bezierPoints,speed){

	this.audioNode = audioNode;
	this.bezierPoints = bezierPoints;
	this.speed = speed;
	this.t = 0;

	this.animate = function(){
		//berechne punkt an stelle t

		//aktualisiere panner etc.

		//mach was mit t
		this.t = this.t*1/this.speed;
	}

	this.getPathPosition = function(t){
		var u = 1 – t;
  		var tt = t*t;
  		var uu = u*u;
  		var uuu = uu * u;
  		var ttt = tt * t;

  		var p = bezierPoints[0].scale(uuu);
		//Vector p = uuu * p0; //first term

		p.addVectorToVector(bezierPoints[1].scale(3 * uu * t));
		// p += (3 * uu * t) * p1; //second term

		p.addVectorToVector(bezierPoints[2].scale(3 * u * tt));
		//p += (3 * u * tt) * p2; //third term
		
		p.addVectorToVector(bezierPoints[3].scale(ttt));
		//p += ttt * p3; //fourth term

		return new Point(p.getX(),p.getY(),p.getZ());

	}
}