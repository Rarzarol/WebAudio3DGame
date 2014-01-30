//Gets array of points, this describes curve. 4 Vectors are expected.
function Mover(audioNode,length,speed,oneshot){

    this.oneshot = oneshot;
    this.origin = audioNode.position;
    this.oneshot = oneshot;
    this.length = length;
	this.audioNode = audioNode;
	//this.bezierPoints = bezierPoints;
	this.speed = speed;
	//this.t = 0;
    this.currentLinePos = 0;
    this.started = false;

    this.start = function(){
        this.started = true;
    }

    this.animate = function(){
        if (this.started){
            this.setNewPosition();
        }
    }

    this.setNewPosition = function(){
        if (this.audioNode.position.subtractPointFromPoint(this.origin).vectorLength() >= this.length){
            speed = speed*-1;
        }else{
            this.currentLinePos += speed;
            this.audioNode.changePosition(this.audioNode.position.addVectorToPoint(this.audioNode.orientation.scale(this.currentLinePos)));
        };

    }
}