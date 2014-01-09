function AudioNode(x,y,z,orx,ory,orz){
	this.position = new Point(x,y,z);
	this.orientation = new Vector(orx,ory,orz);
	this.bufferLoader;
	this.audioBuffer = null;
	this.source;
	this.currentRotation = 0;
	this.volume = 10;
	this.panner   = context.createPanner();
	this.gainnode = context.createGainNode();
	this.isPlaying = false;
	this.id = IdManager.getId();

	this.startAsSample = function(string){
		this.bufferLoader = new BufferLoader(context,[string],this.finishedLoading.bind(this));
		this.bufferLoader.load();
	}

	this.setVolume = function(value){
		this.volume = value;
		this.gainnode.gain.setValueAtTime(value,context.currentTime);
	}

	this.finishedLoading = function(bufferlist){
		this.source = context.createBufferSource();
		this.source.buffer = bufferlist[0];
		this.source.loop = true;
		this.source.connect(this.panner);
		this.panner.connect(this.gainnode);
		this.gainnode.gain.setValueAtTime(10,context.currentTime);
		GlobalAudio.connectToMasterGain(this.gainnode);
		this.isPlaying = true;
        this.source.start(context.currentTime);
	}

	this.setOrientation = function(vector){
		var normalizedDirectionVector = vector.normalize();
		this.orientation 		      = normalizedDirectionVector;
		this.panner.setOrientation(this.orientation.getX(),this.orientation.getY(),this.orientation.getZ());
	}

	this.rotate = function(degrees){
		var vector = this.orientation.rotateXZ(degrees);
		this.updateDegrees(degrees);
		this.setOrientation(this.orientation);
	}

	this.updateDegrees = function(degree){
	if(this.currentRotation + degree >= 360){
		var diff = (this.currentRotation + degree) % 360;
		this.currentRotation = diff;
		console.log("Einmal rum! Plus neuer Wert" + this.currentRotation);
	}
	else {
		this.currentRotation += degree;
		console.log("Akt. Drehung:"+this.currentRotation);
	}
	}

	this.stopSound = function(){
		if(this.isPlaying) this.source.stop(context.currentTime);
	}

	this.connectToGainNode = function(source){
		source.connect(this.gainnode);
	}

	this.setOrientation(this.orientation);
	this.panner.setPosition(x,y,z);
}