function PlayerSound(){

    var wood = new WX.Sampler({ source:"new_sounds/wood2.ogg" });
    wood.gain = 1;
    WX.link(wood,WX.DAC);

    this.footstep = function(){
        //Alternate between footsteps
    }

    this.collideStone = function(){

    }

    this.collideFence = function(){

    }

    this.collideWood = function(){
        wood.noteOn(60);
    }
}


