/*
* Game World Class
*/
function World(worldSize){

	this.worldSize = worldSize;
	this.localPlayer;
	this.audioNodes  = new Array();
	this.rectangles = new Array();
	this.movers = new Array();
	
	this.createMover = function(audioNode,bezierPoints,speed){
		this.movers.push(new Mover(audioNode,bezierPoints,speed));
	}

	this.animateMovers = function(){
		this.movers.forEach(function(mover){
			mover.animate();
		});
	}

	this.createAudioNode = function(x,y,z,orx,ory,orz,filename){
		this.audioNodes.push(new AudioNode(x,y,z,orx,ory,orz,filename));
	}

	this.createLocalPlayer = function(x,y,z){
		this.localPlayer = new PlayerNode(x,y,z);
	}
	
	this.createRectangle = function(x,y,w,h,solid,func){
		this.rectangles.push(new Rectangle(x,y,w,h,solid,func));
	}

	this.drawState = function(){
		MyCanvas.drawWorld(this);
	}

	this.getPlayerNodes = function(){
		return this.playerNodes;
	}

	this.getAudioNodes = function(){
		return this.audioNodes;
	}

    //Still a bit confusing, maybe separate the function into more logical pieces
    //returns if the player will collide, and also handles the firing of an event
    //inside a traversable event rectangle...
	this.willCollide = function(point){
		var collisionCounter = 0;
		for (var i = this.rectangles.length - 1; i >= 0; i--) {
			if(this.rectangles[i].isContainingPoint(point)){

                //What happens if player steps into event rect
                if(this.rectangles[i].playerInside == false){
                    //function is started
                    this.rectangles[i].startAssociatedFunction();
                    console.log("event fired!");

                    //afterwards locked
                    this.rectangles[i].playerInside = true;
                }
                //if solid, collision counter increase
                if(this.rectangles[i].solid){
                    collisionCounter++;
                }
			}
            else{
                if(this.rectangles[i].playerInside == true){
                    console.log("player outside of rectangle "+this.rectangles[i].id+". Possible to fire its function again.");
                    this.rectangles[i].playerInside = false;
                }
            }
		}
		return collisionCounter > 0;
	}
}