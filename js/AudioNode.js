function AudioNode(x,y,z,orx,ory,orz,filename,innerConeAngle,outerConeAngle,refDistance,maxDistance,rolloff,innerConeGain,outerConeGain,distanceModel,gain){


    this.position = new Point(x,y,z);
	this.orientation = new Vector(orx,ory,orz);
	this.bufferLoader;
	this.audioBuffer = null;
	this.source;
	this.currentRotation = 0;
	gain == undefined ? this.volume = 1 : this.volume = gain;
	this.panner   = context.createPanner();

    //init panner
    //this.panner.panningModel = "HRTF";

    this.panner.coneGain = (innerConeGain == undefined) ? 1 : innerConeGain ;
    this.panner.coneOuterGain = (outerConeGain == undefined) ? 1 : outerConeGain;
    this.panner.refDistance = (refDistance == undefined) ? 1 : refDistance;
    this.panner.maxDistance = (maxDistance == undefined) ? 10000 : maxDistance ;
    this.panner.coneInnerAngle = (innerConeAngle == undefined) ? 360 : innerConeAngle;
    this.panner.coneOuterAngle = (outerConeAngle == undefined) ? 360 : outerConeAngle;
    this.panner.rolloffFactor = (rolloff == undefined) ? 1 : rolloff;
	this.panner.distanceModelType = (distanceModel == undefined) ? "linear" : distanceModel;

	this.gainnode = context.createGainNode();
	this.isPlaying = false;
	this.filename = filename;
	this.id = IdManager.getNodeId();

	this.startAsSample = function(string){
		this.bufferLoader = new BufferLoader(context,[string],this.finishedLoading.bind(this));
		this.bufferLoader.load();
	}

	this.changePosition = function(point){
		this.panner.setPosition(point.getX(),point.getY(),point.getZ());
		this.position = point;
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
		romanMode == true ? this.gainnode.gain.setValueAtTime(this.volume,context.currentTime) : this.gainnode.gain.setValueAtTime(1,context.currentTime);
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
		this.setOrientation(vector);
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

	this.setConeAngle = function(innerDeg,outerDeg){
		this.panner.coneInnerAngle = innerDeg;
		this.panner.coneOuterAngle = outerDeg;
	}

	this.setRefDist = function(dist){
		this.panner.refDistance = dist;
	}

	this.setMaxDist = function(dist){
		this.panner.maxDistance = dist;
	}

	this.setRolloff = function(value){
		this.panner.rolloffFactor = value;
	}
	
	this.setInnerConeGain= function(value){
		this.panner.coneGain = value;
	}
	
	this.setOuterConeGain= function(value){
		this.panner.coneOuterGain = value;
	}

	this.stopSound = function(){
		if(this.isPlaying) this.source.stop(context.currentTime);
	}

	this.connectToGainNode = function(source){
		source.connect(this.gainnode);
	}

	this.setOrientation(this.orientation);
	this.panner.setPosition(x,y,z);
	if(filename != undefined){
		this.startAsSample(this.filename);
	};
}