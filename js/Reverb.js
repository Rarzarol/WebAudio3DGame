function Reverb(file,object,volume){
	this.volume = volume;
	this.file = file;
	this.object = object;
	this.convolver = context.createConvolver();
	this.object.connect(this.convolver);
	this.gainnode = context.createGain();
	this.gainnode.gain.setValueAtTime(this.volume,context.currentTime);
	this.convolver.connect(this.gainnode);
	this.gainnode.connect(context.destination);

	this.loadIR = function(string){
		this.bufferLoader = new BufferLoader(context,[string],this.finishedLoading.bind(this));
		this.bufferLoader.load();
	}

	this.finishedLoading = function(bufferlist){
		this.convolver.buffer = bufferlist[0];
	}

	this.loadIR(file);

}