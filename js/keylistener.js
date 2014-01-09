window.addEventListener('keydown', function (e) {

	//d
    if (e.keyCode === 68) {
    	world.localPlayer.rotate(-2);
    }

    //a
    if (e.keyCode === 65) {
		world.localPlayer.rotate(2);
    }

    //w
    if (e.keyCode === 87) {
		world.localPlayer.moveInDirection(2);
    }

    //s
    if (e.keyCode === 83) {
        world.localPlayer.moveInDirection(-2);
    }

    //r
    if (e.keyCode === 82) {
        world.localPlayer.lookUpDown(5);
    }
    //f
    if (e.keyCode === 70) {
        world.localPlayer.lookUpDown(-5);
    }

    //Draw World State
    MyCanvas.resetText();
    world.drawState();

}, false);

/*canvas.addEventListener('mousemove', function(evt) {
    mousePos = MyCanvas.getMousePos(canvas, evt);
    MyCanvas.writeMessage(canvas, 'Mouse position: ' + mousePos.x + ',' + mousePos.y);
}, false);*/

canvas.addEventListener('mousedown', function(evt) {
    mousePos = MyCanvas.getMousePos(evt);
    Debug.chooseNodeByCoords(mousePos.x,mousePos.y);

},false);