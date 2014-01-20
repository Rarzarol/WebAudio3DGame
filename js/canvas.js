var canvas = document.getElementById('myCanvas');
var canctx = canvas.getContext('2d');
var allRects = new Array();
var textpos  = 20;
var savedText = "Pick a Node to change Params";

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

MyCanvas.createControlSet = function(node) {
	var controlSection    = document.getElementById('controls');
	//New sub div of control Section - here be all sliders
	var controlrow1			  = document.createElement('div');
	controlrow1.id 			  = 'controlrow1';
	//Creating sliders for manipulating params
	var nodeVolumeText        	= document.createTextNode('Node '+node.id+' Volume');
	var nodeVolumeSlider      	= document.createElement('input');

	var nodeOrientationText   	= document.createTextNode('Degrees:');
	var nodeOrientationInput  	= document.createElement('input');
	var nodeOrientationButton 	= document.createElement('button');
	
	var nodeSampleTextInput   	= document.createElement('input');
	var nodeSampleButton	  	= document.createElement('button');

	var controlrow2			  = document.createElement('div');
	controlrow2.id 			  = 'controlrow2';
	var nodeConeAngleText		= document.createTextNode('Cone Angles:');
	var nodeInnerConeAngleInput = document.createElement('input');
	var nodeOuterConeAngleInput = document.createElement('input');
	var nodeConeAngleButton 	= document.createElement('button');

	var nodeConeGainText		= document.createTextNode('Cone Gains:');
	var nodeInnerConeGainInput 	= document.createElement('input');
	var nodeOuterConeGainInput 	= document.createElement('input');

///////////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////////

    //Setting OrientationInput attributes
    nodeOrientationInput.type  = 'number';
	nodeOrientationInput.id	   = node.id;
	nodeOrientationInput.value = node.degrees;
	nodeOrientationInput.min   = 0;
	nodeOrientationInput.max   = 360;
	nodeOrientationInput.step  = 1;

	//Setting Orientation Button
	nodeOrientationButton.innerHTML = 'Add Degrees';
    nodeOrientationButton.onclick = function changeHandler() {
		node.rotate(parseInt(nodeOrientationInput.value));
    };

///////////////////////////////////////////////////////////////////////////////////

    //Setting nodeInnerConeAngleInput attributes
    nodeInnerConeAngleInput.type  = 'number';
	nodeInnerConeAngleInput.id	  = node.id;
	nodeInnerConeAngleInput.value = node.panner.coneInnerAngle;
	nodeInnerConeAngleInput.min   = 0;
	nodeInnerConeAngleInput.max   = 360;
	nodeInnerConeAngleInput.step  = 0.1;

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
		node.setConeAngle(parseInt(nodeInnerConeAngleInput.value),parseInt(nodeOuterConeAngleInput.value));
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
	nodeInnerConeGainInput.value = node.panner.coneGain;
	nodeInnerConeGainInput.max   = 3;
	nodeInnerConeGainInput.step  = 0.01;
    nodeInnerConeGainInput.onchange = function changeHandler() {
    	node.setInnerConeGain(parseInt(this.value));
    };

    //Setting ConeGainOuter attributes
	nodeOuterConeGainInput.type  = 'range';
	nodeOuterConeGainInput.id	 = node.id;
	nodeOuterConeGainInput.value = node.panner.coneOuterGain;
	nodeOuterConeGainInput.max   = 3;
	nodeOuterConeGainInput.step  = 0.01;
    nodeOuterConeGainInput.onchange = function changeHandler() {
    	node.setOuterConeGain(parseInt(this.value));
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
	
	controlSection.appendChild(controlrow1);
	controlSection.appendChild(controlrow2);
}

MyCanvas.refreshNodes = function() {
    var allPlayerNodes = world.getPlayerNodes();
    var allAudioNodes  = world.getAudioNodes();

	
    allPlayerNodes.forEach(function(entry){
    	recta = new displayRect(entry);
        allRects.push(recta);
    })
    allAudioNodes.forEach(function(entry){
        recta = new displayRect(entry);
        allRects.push(recta);
    })
}

MyCanvas.drawWorld = function(world) {
	canctx.save();
	canctx.clearRect(0, 0, canvas.width, canvas.height);
	//0,0 Shall be in the middle, therefore translatie coordinate system accordingly
	canctx.translate(canvas.width / 2, canvas.height / 2);

	allRects.forEach(function(entry){
		entry.update();
		entry.draw();
	});
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
		//Insert code for cones

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
			var leftOuterConeVector = this.node.orientation.rotateXZ(this.node.panner.coneOuterAngle/2);
			var rightOuterConeVector = leftOuterConeVector.rotateXZ(this.node.panner.coneOuterAngle*-1);

			var leftInnerConeVector = this.node.orientation.rotateXZ(this.node.panner.coneInnerAngle/2);
			var rightInnerConeVector = leftInnerConeVector.rotateXZ(this.node.panner.coneInnerAngle*-1);

			var innerAngle = MathHelper.radToDeg(leftInnerConeVector.getAngle(rightInnerConeVector));
			var outerAngle = MathHelper.radToDeg(leftOuterConeVector.getAngle(rightOuterConeVector));
			var innerScaleFactor = 20*innerAngle;
			var outerScaleFactor = 20*outerAngle;
			canctx.save();
				//clip radial area for cone display
				canctx.beginPath();
    			canctx.arc(this.xPos, this.yPos, 120, 0, Math.PI*2, false);
    			canctx.clip();

				canctx.beginPath();
				canctx.moveTo(this.xPos,this.yPos);
				//pink color for outer Cone Area
				canctx.fillStyle = 'rgba(248, 181, 255, 0.3)';
					canctx.lineTo(this.xPos+leftOuterConeVector.getX()*innerScaleFactor,this.yPos+leftOuterConeVector.getZ()*innerScaleFactor);
					canctx.lineTo(this.xPos+rightOuterConeVector.getX()*innerScaleFactor,this.yPos+rightOuterConeVector.getZ()*innerScaleFactor);
					canctx.lineTo(this.xPos,this.yPos);
				canctx.fill();

				canctx.beginPath();
				canctx.moveTo(this.xPos,this.yPos);
				canctx.fillStyle = 'rgba(233, 36, 255, 0.7)';
					canctx.lineTo(this.xPos+leftInnerConeVector.getX()*outerScaleFactor,this.yPos+leftInnerConeVector.getZ()*outerScaleFactor);
					canctx.lineTo(this.xPos+rightInnerConeVector.getX()*outerScaleFactor,this.yPos+rightInnerConeVector.getZ()*outerScaleFactor);
					canctx.lineTo(this.xPos,this.yPos);
				canctx.fill();
			canctx.restore();
		}
	}
}