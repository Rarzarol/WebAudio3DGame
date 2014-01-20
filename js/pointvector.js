/*
 *	Point and Vector Classes for 3D Sound Engine
 */


/*	linear operations: 
 *	matrix*vector multiplication, 
 *	generation of rotation matrices,
 *	conversion deg<>rad.
*/
function MathHelper(){
}
	MathHelper.vectorLength = function(vector){
	return Math.sqrt( Math.pow(vector.getCoords(0),2)+
			  		  Math.pow(vector.getCoords(1),2)+
					  Math.pow(vector.getCoords(2),2) );
	}

	MathHelper.dotProduct = function(vector1,vector2){
		return 	vector1.getCoords(0) * vector2.getCoords(0) + 
				vector1.getCoords(1) * vector2.getCoords(1) +
				vector1.getCoords(2) * vector2.getCoords(2);
	}

	MathHelper.radToDeg = function(rad){
		return rad*(180/Math.PI);
	}

	MathHelper.degToRad = function(deg){
		return deg*(Math.PI/180);
	}

	//Generiert Rotationsmatrix Anhand von String planes e.g. "xy" "xz"
	//Nimmt deg als radian an.
	//Beachten: [Zeile][Spalte]
	MathHelper.generateRotMatrix = function(planes,deg){

		var rotMatrix = [];

		if (planes === "xy"){
			rotMatrix[0] = 	[ Math.cos(MathHelper.degToRad(deg)),
							  Math.sin(MathHelper.degToRad(deg))*-1,
							  0.0 ];

			rotMatrix[1] = [ Math.sin(MathHelper.degToRad(deg)),
							 Math.cos(MathHelper.degToRad(deg)),
							 0.0 ];

			rotMatrix[2] = [ 0.0, 0.0, 1.0 ];
		}
		else if (planes === "xz"){

			rotMatrix[0] = [ Math.cos(MathHelper.degToRad(deg)),
							 0.0,
	  			 			 Math.sin(MathHelper.degToRad(deg)) ];

	  		rotMatrix[1] = [ 0.0, 1.0, 0.0 ];

			rotMatrix[2] = [ Math.sin(MathHelper.degToRad(deg))*-1, 
							 0.0,
							 Math.cos(MathHelper.degToRad(deg)) ];
		}
		else if (planes === "yz"){

			rotMatrix[0] = [ 1.0, 0.0, 0.0 ];

			rotMatrix[1] = [ 0.0,
							 Math.cos(MathHelper.degToRad(deg)),
							 Math.sin(MathHelper.degToRad(deg))*-1 ];

			rotMatrix[2] = [ 0.0, 
							 Math.sin(MathHelper.degToRad(deg)), 
							 Math.cos(MathHelper.degToRad(deg)) ];
		};

		return rotMatrix;
	}
	
	MathHelper.matVecMul = function(matrix,vector){
		
		var solution = [0,0,0];
		//Loop über Zeile
		for(i=0; i<matrix.length; i++) {
			//Loop Spalte
			for(j=0; j<matrix.length; j++) {
				solution[i] += matrix[i][j] * vector.getCoords(j);

			};
		};
		return new Vector(solution[0],solution[1],solution[2]);
	};

//Point in space
function Point(x,y,z){

	this.tuple = new Array(x,y,z);

	this.addVectorToPoint = function(vector) {
		return new Point(
			this.tuple[0] + vector.getCoords(0),
			this.tuple[1] + vector.getCoords(1),
			this.tuple[2] + vector.getCoords(2));
	};

	this.subtractVectorFromPoint = function(vector) {
		return new Point(
			this.tuple[0] - vector.getCoords(0),
			this.tuple[1] - vector.getCoords(1),
			this.tuple[2] - vector.getCoords(2));
	};

	this.subtractPointFromPoint = function(point) {
		return new Vector(
			this.tuple[0] - point.getCoords(0),
			this.tuple[1] - point.getCoords(1),
			this.tuple[2] - point.getCoords(2));
	};

	this.drawPoint = function() {
		console.log(this.tuple.toString());
	};

	this.getCoords = function(xyz) {
		return this.tuple[xyz];
	};

	this.getX = function(){
		return this.tuple[0];
	};

	this.getY = function(){
		return this.tuple[1];
	};

	this.getZ = function(){
		return this.tuple[2];
	};

}

//Vector - Distance between 2 Points.
//Contains copies of MathHelper functions dotProduct and vectorLength
//pertaining to this vector instance.
function Vector(x,y,z){

	this.tuple = new Array(x,y,z);

	this.crossProduct = function(vector){
		var cx = ( this.getY()*vector.getZ() ) - ( this.getZ()*vector.getY() )
		var cy = ( this.getZ()*vector.getX() ) - ( this.getX()*vector.getZ() )
		var cz = ( this.getX()*vector.getY() ) - ( this.getY()*vector.getX() )
		return new Vector(cx,cy,cz);
	}

	this.dotProduct = function(vector){
 		return (this.tuple[0] * vector.getCoords(0)) + 
			(this.tuple[1] * vector.getCoords(1)) +
			(this.tuple[2] * vector.getCoords(2));
	}

	this.normalize = function(){
		var result = [];
		var divisor = this.vectorLength();
		result[0] = this.getX() / divisor;
		result[1] = this.getY() / divisor;
		result[2] = this.getZ() / divisor;
		return new Vector(result[0],result[1],result[2]);
		
	}

	//Returns angle in radians
	this.getAngle = function(vector){
		var dividend = this.dotProduct(vector);
		var divisor  = this.vectorLength()*vector.vectorLength();
		var quotient = dividend/divisor;

/*		console.log("Dividend: "+dividend);
		console.log("Divisor: " +divisor);
		console.log("Quotient: "+quotient);*/

		return Math.acos(quotient);
	}

	this.vectorLength = function(){
		return Math.sqrt( Math.pow(this.tuple[0],2)+
				  		  Math.pow(this.tuple[1],2)+
						  Math.pow(this.tuple[2],2) );
	}

	this.addVectorToVector = function(vector) {
		return new Vector(
			this.tuple[0] + vector.getCoords(0),
			this.tuple[1] + vector.getCoords(1),
			this.tuple[2] + vector.getCoords(2));
	};

	this.subtractVectorFromVector = function(vector) {
		return new Vector(
			this.tuple[0] - vector.getCoords(0),
			this.tuple[1] - vector.getCoords(1),
			this.tuple[2] - vector.getCoords(2));
	};

	this.drawVector = function() {
		console.log(this.tuple.toString());
	};

	this.getCoords = function(pos) {
		return this.tuple[pos];
	};

	this.getX = function(){
		return this.tuple[0];
	};

	this.getY = function(){
		return this.tuple[1];
	};

	this.getZ = function(){
		return this.tuple[2];
	};

	this.rotateXY = function(deg){
		return this.rotate(deg,"xy");
	};

	this.rotateYZ = function(deg){
		return this.rotate(deg,"yz");
	};

	this.rotateXZ = function(deg){
		return this.rotate(deg,"xz");
	};

	this.rotate = function(deg,plane){
		if(deg === 0) {
			return this;
		}
		else {
			return MathHelper.matVecMul(MathHelper.generateRotMatrix(plane,deg),this);
		}
	};

	this.scale = function(value){
			return new Vector(this.getX()*value,this.getY()*value,this.getZ()*value);
	};
}