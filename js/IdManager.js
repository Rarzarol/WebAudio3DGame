currentId = 0;

function IdManager(){
}

IdManager.getId = function(){
	oldId = currentId;
	currentId += 1;
	return oldId;
}