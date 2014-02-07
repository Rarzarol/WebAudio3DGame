var canvas = document.getElementById('myCanvas');
var canctx = canvas.getContext('2d');
var allRects = new Array();
var textpos  = 20;
var savedText = "Pick a Node to change Params";

var offsetX = 0;
var offsetY = 0;

function MyCanvas(){
}

MyCanvas.writeMessage = function(message) {
	var text;
	//canctx.clearRect(0, 0, canvas.width, canvas.height);
	if(message === undefined) {
		text = savedText;
	}
	else {
		text = message;
		savedText = message;
	}
	canctx.font = '18pt Calibri';
	canctx.fillStyle = 'black';
	canctx.fillText(text, 10, textpos);
	//textpos += 25;
}

MyCanvas.resetText = function() {
	textpos = 20;
}

MyCanvas.getMousePos = function(evt) {
	var rect = canvas.getBoundingClientRect();
	return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
	};
}

MyCanvas.destroyControlSet = function() {
	var controlSection    = document.getElementById('controls');
	while (controlSection.firstChild) {
    controlSection.removeChild(controlSection.firstChild);
}

}

MyCanvas.createRectControlSet = function(rect){
    var controlSection          = document.getElementById('controls');
    var controlrow1			  	= document.createElement('div');
    controlrow1.id 			  	= 'controlrow1';

    var xPosText   	= document.createTextNode('Xpos:');
    var xPosInput   = document.createElement('input');
    var yPosText    = document.createTextNode('YPos:');
    var yPosInput   = document.createElement('input');
    xPosInput.type  = 'number';
    xPosInput.value= rect.x;
    xPosInput.onchange = function changeHandler(){
        rect.changePositionX(this.value);
    };

    yPosInput.type  = 'number';
    yPosInput.value = rect.y;
    yPosInput.onchange = function changeHandler(){
        rect.changePositionY(this.value);
    };

    controlrow1.appendChild(xPosText);
    controlrow1.appendChild(xPosInput);
    controlrow1.appendChild(yPosText);
    controlrow1.appendChild(yPosInput);

    var wText   	= document.createTextNode('width:');
    var wInput   = document.createElement('input');
    var hText    = document.createTextNode('height:');
    var hInput   = document.createElement('input');
    wInput.type  = 'number';
    wInput.value= rect.width;
    wInput.onchange = function changeHandler(){
        rect.changeSizeW(this.value);
    };

    hInput.type  = 'number';
    hInput.value = rect.height;
    hInput.onchange = function changeHandler(){
        rect.changeSizeH(this.value);
    };

    controlrow1.appendChild(wText);
    controlrow1.appendChild(wInput);
    controlrow1.appendChild(hText);
    controlrow1.appendChild(hInput);

    controlSection.appendChild(controlrow1);

}

MyCanvas.createControlSet = function(node) {
	var controlSection    = document.getElementById('controls');
	//New sub div of control Section - here be all sliders
	var controlrow1			  	= document.createElement('div');
	controlrow1.id 			  	= 'controlrow1';
	//Creating sliders for manipulating params
	var nodeVolumeText        	= document.createTextNode('Node '+node.id+' Volume');
	var nodeVolumeSlider      	= document.createElement('input');

	var nodeOrientationText   	= document.createTextNode('Degrees:');
	var nodeOrientationInput  	= document.createElement('input');
	var nodeOrientationButton 	= document.createElement('button');
	
	var nodeSampleTextInput   	= document.createElement('input');
	var nodeSampleButton	  	= document.createElement('button');

	var controlrow2			  	= document.createElement('div');
	controlrow2.id 			  	= 'controlrow2';
	var nodeConeAngleText		= document.createTextNode('Cone Angles:');
	var nodeInnerConeAngleInput = document.createElement('input');
	var nodeOuterConeAngleInput = document.createElement('input');
	var nodeConeAngleButton 	= document.createElement('button');

	var nodeConeGainText		= document.createTextNode('Cone Gains:');
	var nodeInnerConeGainInput 	= document.createElement('input');
	var nodeOuterConeGainInput 	= document.createElement('input');

	var controlrow3			 	= document.createElement('div');
	controlrow3.id 			  	= 'controlrow3';

	var nodeRefDistanceText		= document.createTextNode('RefDist:');
	var nodeRefDistanceSlider 	= document.createElement('input');
	var nodeMaxDistanceText		= document.createTextNode('MaxDist:');
	var nodeMaxDistanceSlider 	= document.createElement('input');
	var nodeRolloffText 		= document.createTextNode('Rolloff:');
	var nodeRolloffSlider 		= document.createElement('input');

	var distModelSelect = document.createElement('select');

///////////////////////////////////////////////////////////////////////////////////

	var opt1 = document.createElement("option"); 
	opt1.text = 'linear';
	distModelSelect.options.add(opt1);

	var opt2 = document.createElement("option"); 
	opt2.text = 'inverse';
	distModelSelect.options.add(opt2);

	var opt3 = document.createElement("option"); 
	opt3.text = 'exponential';
	distModelSelect.options.add(opt3);

	if (node.panner.distanceModelType == "linear"){
		distModelSelect.selectedIndex = 0;
	} else if (node.panner.distanceModelType == "inverse"){
		distModelSelect.selectedIndex = 1;
	} else if (node.panner.distanceModelType == "exponential"){
		distModelSelect.selectedIndex = 2;
	}

	//This always switched back to 1...
	distModelSelect.onchange = function() {

		var chosenOne = this.selectedIndex;
		if (chosenOne == 0) {
			//node.panner.distanceModelType = node.panner.LINEAR_DISTANCE;
			node.panner.distanceModelType = "linear";
		}
		else if (chosenOne == 1) {
			//node.panner.distanceModelType = node.panner.INVERSE_DISTANCE;
			node.panner.distanceModelType = "inverse";
		}
		else if (chosenOne == 2) {
			//node.panner.distanceModelType = node.panner.EXPONENTIAL_DISTANCE;
			node.panner.distanceModelType = "exponential";
		}
	}

///////////////////////////////////////////////////////////////////////////////////

	nodeRefDistanceSlider.type = 'range';
	nodeRefDistanceSlider.id = node.id;
	nodeRefDistanceSlider.max = 10;
	nodeRefDistanceSlider.min = 0;
	nodeRefDistanceSlider.step = 0.001;
	nodeRefDistanceSlider.value = node.panner.refDistance;
	nodeRefDistanceSlider.onchange = function changeHandler(){
		node.setRefDist(nodeRefDistanceSlider.value);
		//changed from this.value, because that would be to easy and to nice to work
	};

///////////////////////////////////////////////////////////////////////////////////

	nodeMaxDistanceSlider.type 	= 'range';
	nodeMaxDistanceSlider.id 	= node.id;
	nodeMaxDistanceSlider.max 	= 10000;
	nodeMaxDistanceSlider.min 	= 10;
	nodeMaxDistanceSlider.step 	= 1;
	nodeMaxDistanceSlider.value = node.panner.maxDistance;
	nodeMaxDistanceSlider.onchange = function changeHandler(){
		node.setMaxDist(nodeMaxDistanceSlider.value);
		//changed from this.value, because that would be to easy and to nice to work
	};

///////////////////////////////////////////////////////////////////////////////////

	nodeRolloffSlider.type	= 'range';
	nodeRolloffSlider.id 	= node.id;
	nodeRolloffSlider.max 	= 5;
	nodeRolloffSlider.min 	= 1;
	nodeRolloffSlider.step 	= 0.001;
	nodeRolloffSlider.value = node.panner.rolloffFactor;
	nodeRolloffSlider.onchange = function changeHandler(){
		node.setRolloff(nodeRolloffSlider.value);
		//changed from this.value, because that would be to easy and to nice to work
	};

///////////////////////////////////////////////////////////////////////////////////

	//Setting VolumeSlider attributes
	nodeVolumeSlider.type  = 'range';
	nodeVolumeSlider.id	   = node.id;
	nodeVolumeSlider.value = node.gainnode.gain.value;
	nodeVolumeSlider.max   = 20;
	nodeVolumeSlider.step  = 1;
	nodeVolumeSlider.value = node.gainnode.gain.value;
	//Setting up VolumeSLider onchange
    nodeVolumeSlider.onchange = function changeHandler() {
    	node.setVolume(nodeVolumeSlider.value);
    	//changed from this.value, because that would be to easy and to nice to work
    };

///////////////////////////////////////////////////////////////////////////////////

    //Setting OrientationInput attributes
    nodeOrientationInput.type  = 'number';
	nodeOrientationInput.id	   = node.id;
	nodeOrientationInput.min   = 0;
	nodeOrientationInput.max   = 360;
	nodeOrientationInput.step  = 1;
	nodeOrientationInput.value = node.degrees;
	
	//Setting Orientation Button
	nodeOrientationButton.innerHTML = 'Add Degrees';
    nodeOrientationButton.onclick = function changeHandler() {
		node.rotate(nodeOrientationInput.value);
		//changed from this.value, because that would be to easy and to nice to work
    };

///////////////////////////////////////////////////////////////////////////////////

    //Setting nodeInnerConeAngleInput attributes
    nodeInnerConeAngleInput.type  = 'number';
	nodeInnerConeAngleInput.id	  = node.id;
	nodeInnerConeAngleInput.min   = 0;
	nodeInnerConeAngleInput.max   = 360;
	nodeInnerConeAngleInput.step  = 0.1;
	nodeInnerConeAngleInput.value = node.panner.coneInnerAngle;
	
	//Setting nodeOuterConeAngleInput attributes
    nodeOuterConeAngleInput.type  = 'number';
	nodeOuterConeAngleInput.id	  = node.id;
	nodeOuterConeAngleInput.value = node.panner.coneOuterAngle;
	nodeOuterConeAngleInput.min   = 0;
	nodeOuterConeAngleInput.max   = 360;
	nodeOuterConeAngleInput.step  = 0.1;

	//Setting nodeConeAngleButton
	nodeConeAngleButton.innerHTML = 'Set inner/outer Cone Angle';
    nodeConeAngleButton.onclick = function changeHandler() {
		node.setConeAngle(nodeInnerConeAngleInput.value,nodeOuterConeAngleInput.value);
    };

///////////////////////////////////////////////////////////////////////////////////

    //Setting sample Button
    nodeSampleTextInput.type   = 'text';
    nodeSampleButton.innerHTML = 'load Sample';

    //Sample Button Change handler
    nodeSampleButton.onclick = function changeHandler() {
    	var filename = nodeSampleTextInput.value;
    	node.stopSound();
    	node.startAsSample(filename);

    }

///////////////////////////////////////////////////////////////////////////////////

	//Setting ConeGain attributes
	nodeInnerConeGainInput.type  = 'range';
	nodeInnerConeGainInput.id	 = node.id;
	nodeInnerConeGainInput.max   = 5;
	nodeInnerConeGainInput.step  = 0.001;
		nodeInnerConeGainInput.value = node.panner.coneGain;
    nodeInnerConeGainInput.onchange = function changeHandler() {
    	node.setInnerConeGain(nodeInnerConeGainInput.value);
    	//changed from this.value, because that would be to easy and to nice to work
    };

    //Setting ConeGainOuter attributes
	nodeOuterConeGainInput.type  = 'range';
	nodeOuterConeGainInput.id	 = node.id;
	nodeOuterConeGainInput.max   = 3;
	nodeOuterConeGainInput.step  = 0.001;
	nodeOuterConeGainInput.value = node.panner.coneOuterGain;
    nodeOuterConeGainInput.onchange = function changeHandler() {
    	node.setOuterConeGain(nodeOuterConeGainInput.value);
    	//changed from this.value, because that would be to easy and to nice to work
    };


///////////////////////////////////////////////////////////////////////////////////
    //Inserting into DOM
	controlrow1.appendChild(nodeVolumeText);
	controlrow1.appendChild(nodeVolumeSlider);
	controlrow1.appendChild(nodeOrientationText);
	controlrow1.appendChild(nodeOrientationInput);
	controlrow1.appendChild(nodeOrientationButton);
	controlrow1.appendChild(nodeSampleTextInput);
	controlrow1.appendChild(nodeSampleButton);

	controlrow2.appendChild(nodeInnerConeAngleInput);
	controlrow2.appendChild(nodeOuterConeAngleInput);
	controlrow2.appendChild(nodeConeAngleButton);
	controlrow2.appendChild(nodeConeGainText);
	controlrow2.appendChild(nodeInnerConeGainInput);
	controlrow2.appendChild(nodeOuterConeGainInput);

	controlrow3.appendChild(nodeRefDistanceText);
	controlrow3.appendChild(nodeRefDistanceSlider);
	controlrow3.appendChild(nodeRolloffText);
	controlrow3.appendChild(nodeRolloffSlider);
	controlrow3.appendChild(nodeMaxDistanceText);
	controlrow3.appendChild(nodeMaxDistanceSlider);
	controlrow3.appendChild(distModelSelect);
	
	controlSection.appendChild(controlrow1);
	controlSection.appendChild(controlrow2);
	controlSection.appendChild(controlrow3);
}

MyCanvas.initNodes = function() {
    var allAudioNodes  = world.getAudioNodes();
	allRects.length = 0;
    allRects.push(new displayRect(world.localPlayer));

    allAudioNodes.forEach(function(entry){
        recta = new displayRect(entry);
        allRects.push(recta);
    })
};

MyCanvas.drawWorld = function(world) {
	canctx.save();
	canctx.clearRect(0, 0, canvas.width, canvas.height);
	//0,0 Shall be in the middle, therefore translate coordinate system accordingly
	canctx.translate((canvas.width / 2)+offsetX, (canvas.height / 2)+offsetY);

	
	//Boundarys and Rectangles
	var rectangles = world.rectangles;
	
	 for(var i=0; i<rectangles.length; i++){
		 rectangles[i].drawRECT(canctx);
	 }

    allRects.forEach(function(entry){
        entry.update();
        entry.draw();
    });

	 //Movers
	 
	
	canctx.restore();
	MyCanvas.writeMessage();
}

//Class describing Rectangle on Canvas
function displayRect(node) {
	
	this.node 	  = node;
	this.width	  = 8;
	this.hexcolor = '#000000';
	this.xPos 	  = this.node.position.getX();
	this.yPos 	  = this.node.position.getZ();

	this.update = function(){
		this.xPos = this.node.position.getX();
		this.yPos = this.node.position.getZ();
	}

	this.draw = function(){
		if (this.node instanceof PlayerNode) this.hexcolor = '#ff0000';
		if (this.node instanceof AudioNode)  this.hexcolor = '#00ff00';
		canctx.fillStyle = this.hexcolor;
		canctx.fillRect(this.xPos-(this.width/2),
						this.yPos-(this.width/2),this.width,this.width);
		
		//Orientation indicator
		if(this.node instanceof PlayerNode){
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
		else if(this.node instanceof AudioNode){
			//Draw Orientation vector
			canctx.beginPath();
			canctx.moveTo(this.xPos,this.yPos);
			canctx.lineTo(this.xPos+this.node.orientation.getX()*16, 
						  this.yPos+this.node.orientation.getZ()*16);
			canctx.stroke();

			//Draw Audio Cone
			var coneInnerAngle = MathHelper.degToRad(node.panner.coneInnerAngle);

			var coneOuterAngle = MathHelper.degToRad(node.panner.coneOuterAngle);

			var xAxis = new Vector(1,0,0);

			var leftInnerConeVector = this.node.orientation.rotateXZ(this.node.panner.coneInnerAngle/2);
			var leftOuterConeVector = this.node.orientation.rotateXZ(this.node.panner.coneOuterAngle/2);

			var innerStartAngle = Math.atan2(leftInnerConeVector.getZ(),leftInnerConeVector.getX());
			var outerStartAngle = Math.atan2(leftOuterConeVector.getZ(),leftOuterConeVector.getX());

			canctx.save();
			canctx.translate(this.xPos,this.yPos);
			//canctx.rotate(rotation);
			canctx.beginPath();
			canctx.moveTo(0,0);
			canctx.fillStyle = 'rgba(248, 181, 255, 0.5)';
			canctx.arc(0, 0, 120, innerStartAngle, innerStartAngle+coneInnerAngle, false);
			canctx.fill();
			canctx.restore();

			canctx.save();
			canctx.translate(this.xPos,this.yPos);
			//canctx.rotate(rotation);
			canctx.beginPath();
			canctx.moveTo(0,0);
			canctx.fillStyle = 'rgba(233, 36, 255, 0.2)';
			canctx.arc(0, 0, 120, outerStartAngle, outerStartAngle+coneOuterAngle, false);
			canctx.fill();
			canctx.restore();
		}
	}
}