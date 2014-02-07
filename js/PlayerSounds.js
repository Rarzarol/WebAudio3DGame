var NUMBER_OF_FOOTSTEP_FILES = 5;

function PlayerSound(parent){
    this.parent = parent;
    this.nextFootstep = 0;
    this.timeOfLastFootstep = 0;

    var wood = new WX.Sampler({ source:"new_sounds/woodcollide1.wav" });
    wood.gain = 1;
    WX.link(wood,WX.DAC);
	
	var fire = new WX.Sampler({ source:"new_sounds/firecollide1.wav" });
    fire.gain = 1;
    WX.link(fire,WX.DAC);
	
	var stone = new WX.Sampler({ source:"new_sounds/stonecollide1.wav" });
	stone.gain = 1;
	WX.link(stone,WX.DAC);
	
	var fence = new WX.Sampler({ source:"new_sounds/fencecollide1.wav" });
	fence.gain = 1;
	WX.link(fence,WX.DAC);
	
    this.normalFootSteps = new Array();
    this.grassFootSteps = new Array();
    this.hiGrassFootSteps = new Array();
    this.gravelFootSteps = new Array();
    this.leavesFootSteps = new Array();
    for(var i = 0; i<=NUMBER_OF_FOOTSTEP_FILES-1; i++){
        var sample = new WX.Sampler( { source:"footstep_sounds/playerStepNormal"+Number(i+1)+".ogg" } );
        var grassSample = new WX.Sampler( { source:"footstep_sounds/playerStepGrass"+Number(i+1)+".ogg" } );
        var gravelSample = new WX.Sampler( { source:"footstep_sounds/playerStepGravel"+Number(i+1)+".ogg" } );
        var hiGrassSample = new WX.Sampler( { source:"footstep_sounds/playerStepHiGrass"+Number(i+1)+".ogg" } );
        var leavesSample = new WX.Sampler( { source:"footstep_sounds/playerStepLeaves"+Number(i+1)+".ogg" } );
        sample.gain = 1;
        grassSample.gain = 0.3;
        gravelSample.gain = 1;
        hiGrassSample.gain = 1;
        leavesSample.gain = 1;
        WX.link(sample,WX.DAC);
        WX.link(grassSample,WX.DAC);
        WX.link(gravelSample,WX.DAC);
        WX.link(hiGrassSample,WX.DAC);
        WX.link(leavesSample,WX.DAC);
        this.normalFootSteps.push(sample);
        this.grassFootSteps.push(grassSample);
        this.gravelFootSteps.push(gravelSample);
        this.hiGrassFootSteps.push(hiGrassSample);
        this.hiGrassFootSteps.push(leavesSample);
    }

    this.footstep = function(){
        //Randomize next step
        if(context.currentTime - this.timeOfLastFootstep >= 0.6){
            if(parent.currentGround == GroundTypes.NORMAL){
                this.normalFootSteps[this.nextFootstep].noteOn(60);
            }
            else if(parent.currentGround == GroundTypes.GRASS){
                this.grassFootSteps[this.nextFootstep].noteOn(60);
            }
            else if(parent.currentGround == GroundTypes.GRAVEL){
                this.gravelFootSteps[this.nextFootstep].noteOn(60);
            }
            else if(parent.currentGround == GroundTypes.HIGRASS){
                this.hiGrassFootSteps[this.nextFootstep].noteOn(60);
            }
            this.nextFootstep = Math.floor(Math.random() * (NUMBER_OF_FOOTSTEP_FILES-1));
            this.timeOfLastFootstep = context.currentTime;

            console.log("next footstep:"+this.nextFootstep);
        }
    };



    this.collideStone = function(){
		stone.noteOn(60);
    }

    this.collideFence = function(){
		fence.noteOn(60);
    }

    this.collideWood = function(){
        wood.noteOn(60);
    }
	this.collideFire = function(){
        fire.noteOn(60);
    }
}


