/*
* Game World Class
*/
function World(worldSize){

	this.worldSize = worldSize;
	this.localPlayer;
	this.playerNodes = new Array();
	this.audioNodes  = new Array();
	this.rectangles = new Array();
	
	this.addAudioNode = function(audioNode){
		this.audioNodes.push(audioNode);
	}

	this.createLocalPlayer = function(x,y,z){
		this.localPlayer = new PlayerNode(x,y,z);
		this.playerNodes.push(this.localPlayer);
	}
	
	this.createRectangle = function(x,y, w,h){
		this.rectangles.push(new Rectangle(x,y, w,h));
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
		for (var i = this.rectangles.length - 1; i >= 0; i--) {
			if(this.rectangles[i].isContainingPoint(point)){
				console.log("rectangle found that intersects with player");
				return true;
			}
			else{
				return false;
			}
		};
	}	
	
}