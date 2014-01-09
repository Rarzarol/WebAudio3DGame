/*
* Audio Context initialization
*
*/

var context    = new window.webkitAudioContext;
var masterGain = context.createGain();
masterGain.connect(context.destination);


//Static methods for global audio access
function GlobalAudio(){
};

	GlobalAudio.connectToMasterGain = function(node){
		node.connect(masterGain);
	};

	GlobalAudio.getTime = function(){
		return context.currentTime;
	};

	GlobalAudio.getContext = function(){
		return context;
	};

	GlobalAudio.getListener = function(){
		return context.listener;
	};

	GlobalAudio.setOrientation = function(frontvector,upvector){
		context.listener.setOrientation(frontvector.getX(),
										frontvector.getY(),
										frontvector.getZ(),
										upvector.getX(),
										upvector.getY(),
										upvector.getZ() );
	};		