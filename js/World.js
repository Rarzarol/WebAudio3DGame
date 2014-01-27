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
	
	this.createRectangle = function(x,y,w,h){
		this.rectangles.push(new Rectangle(x,y,w,h));
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
	
	this.willCollide = function(point){
		var collisionCounter = 0;
		for (var i = this.rectangles.length - 1; i >= 0; i--) {
			if(this.rectangles[i].isContainingPoint(point)){
				console.log("rectangle found that intersects with player");
				collisionCounter++;
			}
		};
		if(collisionCounter > 0) { return true; }
		else{ return false; };
	}
}