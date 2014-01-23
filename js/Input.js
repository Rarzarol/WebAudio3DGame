function Input(){

	this.wDown;
	this.sDown;
	this.aDown;
	this.dDown;

	this.lastXdelta = 0;
	this.lastYdelta = 0;

	this.mouseXdelta = 0;
	this.mouseYdelta = 0;

	this.setMouseDeltas = function(x,y){
		this.mouseXdelta = x;
		this.mouseYdelta = y;
	}

	this.getMouseDeltas = function(){
		if(this.lastXdelta == this.mouseXdelta){
			this.mouseXdelta = 0;
		}
		if(this.lastYdelta == this.mouseYdelta){
			this.mouseYdelta = 0;
		}
		this.lastXdelta = this.mouseXdelta;
		this.lastYdelta = this.mouseYdelta;
		var deltas = [this.mouseXdelta,this.mouseYdelta];
		//console.log("Deltas: "+this.mouseXdelta+"|"+this.mouseYdelta);
		return deltas;
	}

}