currentNodeId = 0;
currentRectId = 0;
function IdManager(){
}

IdManager.getRectId = function(){
	oldId = currentRectId;
	currentRectId += 1;
	return oldId;
}

IdManager.getNodeId = function(){
    oldId = currentNodeId;
    currentNodeId += 1;
    return oldId;
}