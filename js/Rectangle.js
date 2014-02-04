Rectangle = function(x,y,w,h,solid,func){ //position x,y width,height

if ( x == null || y == null || w == null || h == null ) 
{
	alert("Failed to initialize variables (x,y,w,h)");
	
	var errorMsg = "The following was not provided:";
	
	if ( x == null)
		errorMsg += " 'x' ";
	if ( y == null)
		errorMsg += " 'y' ";
	if ( w == null)
		errorMsg += " 'width' ";
	if ( h == null)
		errorMsg += " 'height' ";

	throw new Error(errorMsg);
}

this.id = IdManager.getRectId();
this.x = x;
this.y = y;
this.width = w;
this.height = h;
this.solid = solid;

this.func = func;
//For now, lets just fire the callback once
this.funcFired = false;

//check if in boundarys
this.Contains = function(x,y)
{
	if (x >=this.x && x <= this.x + this.width &&
		y >=this.y && y <= this.y + this.height)
		return true;
	else
		return false;
};

this.startAssociatedFunction = function(){
	if(this.func != undefined && !this.funcFired){
		this.func();
		this.funcFired = true;
	}
    else if(this.funcFired == true){
        console.log("func already fired");
    }
	else{
		console.log("No callback defined for collision");
	}
}

//check Intersections - see Contains
this.Intersects = function(shape) //for rectangles and circles
{
	if (this.Contains(shape.x , shape.y ) || this.Contains(shape.x + shape.width , shape.y ) ||
	this.Contains(shape.x , shape.y + shape.height )|| this.Contains(shape.x + shape.width , shape.y + shape.height ))
	{
	return true;
	}
	else if(shape.Contains(this.x , this.y ) || shape.Contains(this.x + this.width , this.y )||
	shape.Contains(this.x , this.y + this.height ) || shape.Contains(this.x + this.width , this.y + this.height ))
	{
	return true;
	}
	
	return false;
};


this.isContainingPoint = function (point){
	if (point.getX() >= this.x && point.getX() <= this.x + this.width &&
		point.getZ() >= this.y && point.getZ() <= this.y + this.height){
			console.log("point contained in rect"+this.id);
            return true;
            //DEBUG

	}
	else{
		return false;
	}
};

this.changePositionX = function(_x){
    this.x =_x;
}

this.changePositionY = function(_y){
    this.y = _y;
}

this.changeSizeW = function (_w) {
    this.width = _w;
}

this.changeSizeH = function (_h) {
    this.height = _h;
}

this.drawRECT = function (context){
    context.strokeStyle = "#000000";
    context.lineWidth   = 1;

    if(this.solid){
        context.fillStyle = '#0000ff';
    }
    else{
        context.fillStyle = 'rgba(123,231,255,0.3)';
    }

	context.fillRect(this.x,this.y,this.width,this.height);
    context.strokeRect(this.x,this.y,this.width,this.height);
	//context.fillRect(0,0,50,50);

};		

};