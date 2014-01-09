var canvas = document.getElementById('myCanvas');
var canctx = canvas.getContext('2d');
var allRects = new Array();
var textpos  = 20;

function MyCanvas(){
}

MyCanvas.writeMessage = function(message) {
	//canctx.clearRect(0, 0, canvas.width, canvas.height);
	canctx.font = '18pt Calibri';
	canctx.fillStyle = 'black';
	canctx.fillText(message, 10, textpos);
	textpos += 25;
}

MyCanvas.resetText = function(){
	textpos = 20;
}

MyCanvas.getMousePos = function(evt) {
	var rect = canvas.getBoundingClientRect();
	return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
	};
}

MyCanvas.destroyControlSet = function(){
	var controlSection    = document.getElementById('controls');
	while (controlSection.firstChild) {
    controlSection.removeChild(controlSection.firstChild);
}

}

MyCanvas.createControlSet = function(node){
	var controlSection    = document.getElementById('controls');
	//New sub div of control Section - here be all sliders
	var newdiv			  = document.createElement('div');
	newdiv.id = 'controlrow';
	//Creating sliders for manipulating params
	var nodeVolumeSlider      = document.createElement('input');
	var nodeOrientationInput  = document.createElement('input');
	var nodeOrientationButton = document.createElement('button');
	var nodeVolumeText        = document.createTextNode('Node '+node.id+' Volume');
	var nodeOrientationText   = document.createTextNode('Degrees:');
	var nodeSampleTextInput   = document.createElement('input');
	var nodeSampleButton	  = document.createElement('button');

	//Setting VolumeSlider attributes
	nodeVolumeSlider.type  = 'range';
	nodeVolumeSlider.id	   = node.id;
	nodeVolumeSlider.value = node.gainnode.gain.value;
	nodeVolumeSlider.max   = 20;
	nodeVolumeSlider.step  = 1;
	//Setting up VolumeSLider onchange
    nodeVolumeSlider.onchange = function changeHandler() {
    	node.setVolume(parseInt(this.value));
    };

    //Setting OrientationSLider attributes
    nodeOrientationInput.type  = 'number';
	nodeOrientationInput.id	   = node.id;
	nodeOrientationInput.value = node.degrees;
	nodeOrientationInput.min   = 0;
	nodeOrientationInput.max   = 360;
	nodeOrientationInput.step  = 1;

	//Setting Orientation Button
	nodeOrientationButton.innerHTML = 'Add Degrees';
	//Setting OrientationSlider onchange
    nodeOrientationButton.onclick = function changeHandler() {
		node.rotate(parseInt(nodeOrientationInput.value));
    };

    //Setting sample Button
    nodeSampleTextInput.type   = 'text';
    nodeSampleButton.innerHTML = 'load Sample';

    //Sample Button Change handler
    nodeSampleButton.onclick = function changeHandler() {
    	var filename = nodeSampleTextInput.value;
    	node.stopSound();
    	node.startAsSample(filename);

    }

    //Inserting into DOM
	newdiv.appendChild(nodeVolumeText);
	newdiv.appendChild(nodeVolumeSlider);
	newdiv.appendChild(nodeOrientationText);
	newdiv.appendChild(nodeOrientationInput);
	newdiv.appendChild(nodeOrientationButton);
	newdiv.appendChild(nodeSampleTextInput);
	newdiv.appendChild(nodeSampleButton);

	controlSection.appendChild(newdiv);
}

MyCanvas.refreshNodes = function(){
    var allPlayerNodes = world.getPlayerNodes();
    var allAudioNodes  = world.getAudioNodes();

    allPlayerNodes.forEach(function(entry){
    	recta = new MyRect(entry);
        allRects.push(recta);
    })
    allAudioNodes.forEach(function(entry){
        recta = new MyRect(entry);
        allRects.push(recta);
    })
}

MyCanvas.drawWorld = function(world){
	canctx.save();
	canctx.clearRect(0, 0, canvas.width, canvas.height);
	//0,0 Shall be in the middle, therefore translatie coordinate system accordingly
	canctx.translate(canvas.width / 2, canvas.height / 2);

	allRects.forEach(function(entry){
		entry.update();
		entry.draw();
	});

	canctx.restore();
}

//Class describing Rectangle on Canvas
function MyRect(node){
	
	this.node 	  = node;
	this.width	  = 8;
	this.hexcolor = '#000000';
	this.xPos 	  = node.position.getX();
	this.yPos 	  = node.position.getZ();

	this.update = function(){
		this.xPos = node.position.getX();
		this.yPos = node.position.getZ();
	}

	this.draw = function(){
		if (node instanceof PlayerNode) this.hexcolor = '#ff0000'
		if (node instanceof AudioNode)  this.hexcolor = '#00ff00'
		canctx.fillStyle = this.hexcolor;
		canctx.fillRect(this.xPos-(this.width/2),
						this.yPos-(this.width/2),this.width,this.width);
		
		//Orientation indicator
		if(node instanceof PlayerNode){
			canctx.beginPath();
			canctx.moveTo(this.xPos,this.yPos);
			canctx.lineTo(this.xPos+world.localPlayer.orientation.getX()*16, 
						  this.yPos+world.localPlayer.orientation.getZ()*16);
			canctx.stroke();
			canctx.beginPath();
			//Draw perpendicular orientation Vector on XZ plane
			canctx.moveTo(this.xPos,this.yPos);
			canctx.strokeStyle = '#ffaaff';
			canctx.lineTo(this.xPos+world.localPlayer.orientation.getZ()*-16,
						  this.yPos+world.localPlayer.orientation.getX()*16);
			canctx.stroke();
		}
	}
}