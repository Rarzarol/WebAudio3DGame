window.setInterval(function(){
world.drawState();}
    ,5);

window.addEventListener('keydown', function (e) {
	//d
    if (e.keyCode === 68) { world.localPlayer.rotate(-2); }
    //a
    if (e.keyCode === 65) { world.localPlayer.rotate(2); }
    //w
    if (e.keyCode === 87) { world.localPlayer.moveInDirection(2); }
    //s
    if (e.keyCode === 83) { world.localPlayer.moveInDirection(-2); }
    //r
    if (e.keyCode === 82) { world.localPlayer.lookUpDown(5); }
    //f
    if (e.keyCode === 70) { world.localPlayer.lookUpDown(-5); }

    MyCanvas.resetText();
}, false);

canvas.addEventListener('mousedown', function(evt) {
    mousePos = MyCanvas.getMousePos(evt);
    Debug.chooseNodeByCoords(mousePos.x,mousePos.y);

},false);

/////////////////////////////////////////////////////////////////////
// Mouse Capture Code
/////////////////////////////////////////////////////////////////////

function moveCallback(e){
    var canvas = $("#pointerLock").get()[0];
    var ctx = canvas.getContext('2d');

    var movementX = (e.movementX || e.mozMovementX || e.webkitMovementX || 0) / 10;
    var movementY = (e.movementY || e.mozMovementY || e.webkitMovementY || 0) / 10;

    console.log(movementX+"|"+movementY);

    world.localPlayer.lookUpDown(movementY*-1);
    world.localPlayer.rotate(movementX*-1);
    world.drawState();
}

// called when the pointer lock has changed. Here we check whether the
// pointerlock was initiated on the element we want.
function changeCallback(e){
    var canvas = $("#pointerLock").get()[0];
    if (document.pointerLockElement === canvas ||
            document.mozPointerLockElement === canvas ||
            document.webkitPointerLockElement === canvas) {

        // we've got a pointerlock for our element, add a mouselistener
        document.addEventListener("mousemove", moveCallback, false);
    } else {

        // pointer lock is no longer active, remove the callback
        document.removeEventListener("mousemove", moveCallback, false);
        // and reset the entry coordinates
        entryCoordinates = {x:-1, y:-1};
    }
};

// Hook pointer lock state change events
document.addEventListener('pointerlockchange', changeCallback, false);
document.addEventListener('mozpointerlockchange', changeCallback, false);
document.addEventListener('webkitpointerlockchange', changeCallback, false);

// when element is clicked, we're going to request a pointerlock
$("#pointerLock").click(function () {
    var canvas = $("#pointerLock").get()[0];
    canvas.requestPointerLock = canvas.requestPointerLock ||
            canvas.mozRequestPointerLock ||
            canvas.webkitRequestPointerLock;

    // Ask the browser to lock the pointer)
    canvas.requestPointerLock();
});

