//Spieler/Betrachter der Szene.
function PlayerNode(x,y,z){
	this.position    = new Point(x,y,z);
	var or  		 = new Vector(1,0,0); //hier abgreifen
	this.orientation = or.normalize();
	this.degrees 	 = 0;

	//Gainnode for Footsteps
	this.gainnode    = context.createGainNode();
	this.id 		 = IdManager.getId();

	this.topLocked    = false;
	this.bottomLocked = false;

	this.yAngle = 90;
	var YLOCK   = 20;

	//Position des Hoerers wird festgelegt
	this.changePosition = function(point){
		context.listener.setPosition(point.getX(),point.getY(),point.getZ());
		this.position = point;
	}

	//Moves Player on the XZ plane only
	this.moveInDirection = function(incr){
		if(!world.isCollided(this)){
			var newPosition = this.position.addVectorToPoint(this.orientation.scale(incr));
			var newPositionXZ = new Point(newPosition.getX(),0,newPosition.getZ());
			this.changePosition(newPositionXZ);
		}
		else{
		alert("collision detected");
		}
	}

	this.moveByVector = function(vector){
		this.position = this.position.addVectorToPoint(vector);
		context.listener.setPosition(this.position.getX(),
									 this.position.getY(),
								     this.position.getZ());								 							 
	}

	//CCW rotation with positive degree value
	//Charakter looking up or down, rotation on an arbitrary axis defined by current orientation vector
	this.lookUpDown = function(degree){
		console.log("____begin look up/down experimental");
		if ((!this.topLocked && !this.bottomLocked) || (this.topLocked && degree < 0) || (this.bottomLocked && degree > 0)) {
				//Look if input degrees would reduce angle between orientation Vector and Y Axis to less/more than desired amount
				console.log("Current y Axis Angle: "+this.yAngle);
				if (degree > 0) { // Try to look up
					console.log("wanna look up? let's check if you can do that.");
					if (this.yAngle - degree < YLOCK){
						console.log("nuh-uh. Reached the top!");
						degree = degree - YLOCK;
						this.topLocked = true;
					}
					else { this.bottomLocked = false; }
				}
				else{ //Try to look down
					console.log("wanna look down? let's check if you can do that.");
					if (this.yAngle + degree > 180-YLOCK) {
						console.log("nuh-uh. Reached the bottom!");
						degree = degree + YLOCK;
						this.bottomLocked = true;
					}
					else { this.topLocked = false; }
				}
				//First, generate the rotation Axis by creating a 2D XZ vector from current orientation vector...
				//and calculating a perpendicular 2D vector to it - this will be the arbitrary rotation Axis (0 = x, 1 = y)
				var aPerp = new Vector(this.orientation.getZ()*-1,0,this.orientation.getX());

				//Next, rotate orientation on XZ plane so that the arbitrary rotation axis lines up with X Axis.
				//First, find out angle between X Axis and rotation axis
				var xAxis = new Vector(1,0,0);
				var angle = MathHelper.radToDeg(aPerp.getAngle(xAxis));
				//If orientation vector is in 3rd or 4th quadrant, inverse the angle in which rotation Axis is rotated to align with X-Axis.
				if(this.orientation.getX() < 0){
					angle = angle*-1;
				}
				//now rotate orientation by this angle!
				var rotatedOrientation = this.orientation.rotateXZ(angle);
				var aPerpAligned = aPerp.rotateXZ(angle);

				//now rotate rotatedOrientation around X Axis
				rotatedOrientation = rotatedOrientation.rotateYZ(degree);
				//and rotate it back!
				var newOrientation = rotatedOrientation.rotateXZ(angle*-1);
				this.changeOrientation(newOrientation);

				//Angle to y Axis is being updated
				var yAxis = new Vector(0,1,0);
				this.yAngle = Math.round(MathHelper.radToDeg(this.orientation.getAngle(yAxis)));
		}
		else if(this.topLocked){
			console.log("reached upper limit");
		}
		else if(this.bottomLocked){
			console.log("reached lower limit");
		}
	}

	this.rotate = function(degrees){
		var vector = this.orientation.rotateXZ(degrees);
		this.setOrientationVectors(vector);
		this.updateDegrees(degrees);
	}

	this.updateDegrees = function(degree){
		if(this.degrees + degree >= 360){
			var diff = (this.degrees + degree) % 360;
			this.degrees = diff;
			//console.log("Einmal rum! Plus neuer Wert" + this.degrees);
		}
		else {
			this.degrees += degree;
			//console.log("Akt. Drehung:"+this.degrees);
		};
	}

	//Uebergebener Vektor ist Sichtrichtung. Daraus wird der "Kopf"-Vektor ausgerechnet.
	//Wenn es kein Unit Vector ist, wird er klein gestutzt.
    this.changeOrientation = function(vector){
    	this.setOrientationVectors(vector);
	}

	this.setOrientationVectors = function(vector){
		var normalizedFrontVector = vector.normalize();
		//console.log(normalizedFrontVector.tuple + "ist aktueller Drehvektor");
		// crossproduct of viewvector and other vector
		var turnedFrontVector 	  = vector.rotateXZ(45);
		var upVector 			  = normalizedFrontVector.crossProduct(turnedFrontVector);
    	var normalizedUpVector 	  = upVector.normalize();
		this.orientation 		  = normalizedFrontVector;
		GlobalAudio.setOrientation(normalizedFrontVector, normalizedUpVector);
	}

}