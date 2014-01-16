function Reverb(file,object){

	this.file = file;
	this.object = object;
	this.convolver = context.createConvolver();
	this.object.connect(this.convolver);
	this.convolver.connect(context.destination);

	this.loadIR = function(string){
		this.bufferLoader = new BufferLoader(context,[string],this.finishedLoading.bind(this));
		this.bufferLoader.load();
	}

	this.finishedLoading = function(bufferlist){
		this.convolver.buffer = bufferlist[0];
	}

	this.loadIR(file);

}