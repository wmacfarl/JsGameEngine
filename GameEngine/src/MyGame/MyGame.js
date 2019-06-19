"use strict"

function MyGame(htmlCanvasID){
    this.mShader = null;
    this.mConstColorShader = null;
    this.mWhiteSq = null;
    this.mRedSq = null;
    this.mCamera = null;

    gEngine.Core.initializeEngineCore(htmlCanvasID);
    this.initialize();

}

MyGame.prototype.initialize = function() {
    this.mCamera = new Camera(glMatrix.vec2.fromValues(20,60), 20, [20,40,600,300]);
    this.mCamera.setBackgroundColor([.8,.8,.8,1]);
    this.mConstColorShader = new SimpleShader(
        "src/GLSL_Shaders/SimpleVS.glsl", // Path to the VertexShader
        "src/GLSL_Shaders/SimpleFS.glsl"); // Path to the FragmentShader

        this.mWhiteSq = new Renderable(this.mConstColorShader);
        this.mWhiteSq.setColor([1,1,1,1]);

        this.mRedSq = new Renderable(this.mConstColorShader);
        this.mRedSq.setColor([1,0,0,1]);

        this.mWhiteSq.getXform().setPosition(20,60);
        this.mWhiteSq.getXform().setRotationInRad(.2);
        this.mWhiteSq.getXform().setSize(5, 5);

        this.mRedSq.getXform().setPosition(20,60);
        this.mRedSq.getXform().setSize(2,2);
        gEngine.GameLoop.start(this);
}

MyGame.prototype.update = function(){
    var whiteXform = this.mWhiteSq.getXform();
    var deltaX = 0;
    var deltaRot = 0;

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)){
        deltaX += 0.5;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)){
        deltaX -= 0.5;
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

    var redXform = this.mRedSq.getXform();
    if (redXform.getWidth() > 5){
        redXform.setSize(2,2);
    }
    redXform.incSizeBy(.05);
};

MyGame.prototype.draw = function(){
    gEngine.Core.clearCanvas([.9,.9,.9,1]);
    this.mCamera.setupViewProjection();
    this.mWhiteSq.draw(this.mCamera.getVPMatrix());
    this.mRedSq.draw(this.mCamera.getVPMatrix());
};