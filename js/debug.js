var chosenNode;

var nodes;

function Debug(){

}

Debug.chooseNodeByCoords = function(x,y){
	x -= canvas.width/2;
	y -= canvas.height/2;
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
		if (confirm('Create AudioNode at Position'+x+'|'+'0'+y+'?')){
		world.addAudioNode(new AudioNode(x,0,y,1,0,1));
		MyCanvas.refreshNodes();
		}
	}
}