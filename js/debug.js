var chosenNode;
var nodes;

var codeString;

function changeXOffset(x){
	offsetX=parseInt(x);
	console.log("offsetX:"+offsetX);
}

function changeYOffset(y){
	offsetY=parseInt(y);
	console.log("offsetY:"+offsetY);
}

function Debug(){

}

Debug.chooseNodeByCoords = function(x,y){
	x -= (canvas.width/2)+offsetX;
	y -= (canvas.height/2)+offsetY;
	MyCanvas.writeMessage("Selected Position"+x+"|"+y);

	var rectFound = false;

	allRects.forEach(function(entry){
		console.log(entry.xPos+" "+entry.yPos);
		if( (entry.xPos <= x+8 && entry.xPos >= x-8) && 
		    (entry.yPos <= y+8 && entry.yPos >= y-8 ) ) {
			rectFound = true;
			MyCanvas.writeMessage("Node "+entry.node.id+" selected");
			MyCanvas.destroyControlSet();
			//vorerst nur AudioNodes spawnen controlset
			if(entry.node instanceof AudioNode) MyCanvas.createControlSet(entry.node);
		}
	})
    
	if(rectFound === false){
		if (confirm('Create AudioNode at Position'+x+'|'+y+'?')){
		world.createAudioNode(x,0,y,1,0,1);
		MyCanvas.initNodes();
		}
	}
}

Debug.addLine = function(string){
	codeString+= "\n"+string;
}

Debug.levelToString = function(){
	
	//Get all AudioNodes
	world.audioNodes.forEach(function(node){
		Debug.addLine("world.createAudioNode("	+node.position.getX()+","
												+node.position.getY()+","
												+node.position.getZ()+","
												+node.orientation.getX()+","
												+node.orientation.getY()+","
												+node.orientation.getZ()+","
												+'\"'+node.filename+'\"'+");");
	});
	
	//Get all Rectangles
	world.rectangles.forEach(function(rect){
		Debug.addLine("world.createRectangle("+rect.x+","
										+rect.y+","
										+rect.width+","
										+rect.height+","
										+rect.solid+","
										+rect.func+");");
	});

	console.log(codeString);
	codeString = "";
}