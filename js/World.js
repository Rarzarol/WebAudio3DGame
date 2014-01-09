/*
* Game World Class
*/
function World(worldSize){

	this.worldSize = worldSize;
	this.localPlayer;
	this.playerNodes = new Array();
	this.audioNodes  = new Array();

	this.addAudioNode = function(audioNode){
		this.audioNodes.push(audioNode);
	}

	this.createLocalPlayer = function(x,y,z){
		this.localPlayer = new PlayerNode(x,y,z);
		this.playerNodes.push(this.localPlayer);
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
}

