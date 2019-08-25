function BlueLevel(){
    this.kSceneFile = "assets/BlueLevel.xml";
    this.mSqSet = [];
    this.mCamera = null;
    this.kBgClip = "assets/sounds/BGClip.mp3";
    this.kCue = "assets/sounds/BlueLevel_cue.wav";
}

gEngine.Core.inheritPrototype(BlueLevel, Scene);

BlueLevel.prototype.loadScene = function(){
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile, gEngine.TextFileLoader.eTextFileType.eXMLFile)
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kCue);
};


BlueLevel.prototype.initialize = function(){
    var sceneParser = new SceneFileParser(this.kSceneFile);
    this.mCamera = sceneParser.parseCamera();
    sceneParser.parseSquares(this.mSqSet);
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
}

BlueLevel.prototype.draw = function(){
      gEngine.Core.clearCanvas([.9,.9,.9,1]);
    this.mCamera.setupViewProjection();
    for (let i = 0; i < this.mSqSet.length; i++){
        this.mSqSet[i].draw(this.mCamera.getVPMatrix());
    }
}

BlueLevel.prototype.update = function (){
    var whiteXform = this.mSqSet[0].getXform();
    var deltaX = 0;
    var deltaRot = 0;

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)){
        gEngine.AudioClips.playACue(this.kCue);
        deltaX += 0.5;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)){
        deltaX -= 0.5;
        gEngine.AudioClips.playACue(this.kCue);
    }

    if (whiteXform.getXPos() > 30){
        whiteXform.setPosition(10,60);
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)){
        deltaRot += 1;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)){
        deltaRot -= 1;
    }

    whiteXform.incXPosBy(deltaX);
    
    whiteXform.incRotationByDegree(deltaRot);

    var redXform = this.mSqSet[1].getXform();
    if (redXform.getWidth() > 5){
        redXform.setSize(2,2);
    }
    redXform.incSizeBy(.05);
    if (whiteXform.getXPos() < 11){
        gEngine.GameLoop.stop();
    }
}

BlueLevel.prototype.unloadScene = function(){
    gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kBgClip);
    gEngine.AudioClips.unloadAudio(this.kCue);

    var nextLevel = new MyGame();
    gEngine.Core.startScene(nextLevel);
}