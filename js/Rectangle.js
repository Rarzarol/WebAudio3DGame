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
this.functionFired = false;

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
	if(this.func != undefined && !this.functionFired){
		this.func();
		this.functionFired = true;
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
			return true;
	}
	else{
		return false;
	}
};
		

this.drawRECT = function (context){
    if(this.solid){
        context.fillStyle = '#0000ff';
    }
    else{
        context.fillStyle = 'rgba(123,123,244,0.2)';
    }

	context.fillRect(this.x,this.y,this.width,this.height);
	//context.fillRect(0,0,50,50);

};		

};