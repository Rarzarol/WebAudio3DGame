	Rectangle = function(x,y, w,h) //position x,y width,height
	{
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
	
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	


	//check if in boundarys
	this.Contains = function(x,y)
	{
		if (x >=this.x && x <= this.x + this.width &&
			y >=this.y && y <= this.y + this.height)
			return true;
		else
			return false;
	};
	
	
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
			
	
	};
	
	Vector2 = function(x, y)
{
	this.x = 0;
//	this.z = 0;
	this.y = 0;
	
	if (x != null)
	this.x = x;
//	if (z != null)
//	this.z = z;
	if (y != null)
	this.y = y;
	
	this.previousX = 0;
//	this.previousZ = 0;
	this.previousY = 0;
	
//	this.Set =function(x,z,y)
	this.Set =function(x,y)

	{
		//if (x ==null && z == null && y == null)
		if (x ==null && y == null)
		{
			//console.log("No 'x' , 'z' , or 'y' has been passed to Vector3's Set function");
			console.log("No 'x' or 'y' has been passed to Vector2's Set function");
		}
		else
		{
			this.previousX = this.x;
			//this.previousZ = this.z;
			this.previousY = this.y;
			
			if (x != null)
				this.x = x;
		//	if (z != null)
		//		this.z = z;
			if (y != null)
				this.y = y;
		}
	};
	
	this.Move = function(vec3)
	{
		this.x += vec3.x;
		//this.z += vec3.z;
		this.y += vec3.y;
	
	};
	
	this.Normalize = function()
	{
	//	var tmp = new Vector3(this.x, this.z, this.y);
		var tmp = new Vector2(this.x, this.y);
		
	//	var mag = Math.sqrt((tmp.x * tmp.x) + (tmp.z * tmp.z) +(tmp.y * tmp.y));
		var mag = Math.sqrt((tmp.x * tmp.x) +(tmp.y * tmp.y));
		tmp.x = tmp.x / mag;
		//tmp.z = tmp.z / mag;
		tmp.y = tmp.y / mag;
		
		return tmp;
		
	};
	
	this.Distance = function(vec3)
	{
		if(vec3 != null)
		//	return Math.sqrt(((vec3.x - this.x) * (vec3.x - this.x)) + ((this.z - vec3.z) * (this.z - vec3.z))  + ((vec3.y - this.y) * (vec3.y - this.y)));
			return Math.sqrt(((vec3.x - this.x) * (vec3.x - this.x)) + ((this.y - vec3.z) * (this.y - vec3.z)));
		else
			//return Math.sqrt(((this.previousX - this.x) * (this.previousX - this.x)) + ((this.z- this.previousZ) * (this.z - this.previousZ))  + ((this.previousY - this.y) * (this.previousY - this.y)));
			return Math.sqrt(((this.previousX - this.x) * (this.previousX - this.x)) + ((this.y- this.previousY) * (this.y - this.previousY)));
	};
	
	
	this.HasChanged = function()
	{
	//	if (this.x != this.previousX || this.z != this.previousZ || this.y != this.previousY)
		if (this.x != this.previousX || this.y != this.previousY)
			return true;
			
		return false;
	};
	
	this.Difference = function(vec3)
	{
		if (vec3 == null)
	//		return new Vector3(this.x - this.previousX,this.z - this.previousZ, this.Y - this.previousY);
			return new Vector2(this.x - this.previousX,this.Y - this.previousY);
		else
		//	return new Vector3((this.x - vec3.x) * inv,(this.z - vec3.z) * inv,(this.y - vec3.y) * inv);   
		return new Vector2((this.x - vec3.x) * inv,(this.y - vec3.y) * inv);   
	};
};