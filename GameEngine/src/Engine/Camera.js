"use strict"

function Camera(wcCenter, wcWidth, viewportArray){
    this.mWCCenter = wcCenter;
    this.mWCWidth = wcWidth;
    this.mViewport = viewportArray;
    this.mNearPlane = 0;
    this.mFarPlane = 1000;

    this.mViewMatrix = glMatrix.mat4.create();
    this.mProjMatrix = glMatrix.mat4.create();
    this.mVPMatrix = glMatrix.mat4.create();
    this.mBgColor = [.8,.8,.8,1];
}

Camera.prototype.setBackgroundColor = function (newColor) { this.mBgColor = newColor; };
Camera.prototype.getBackgroundColor = function () { return this.mBgColor; };

Camera.prototype.setWCCenter = function(xPos, yPos){
    this.mWCCenter[0] = xPos;
    this.mWCCenter[1] = yPos;
};

Camera.prototype.getWCCenter = function(){
    return this.mWCCenter;
};

Camera.prototype.setWCWidth = function(width){
    this.mWCWidth = width;
};

Camera.prototype.getWCWidth = function(){
    return this.mWCWidth;
};

Camera.prototype.setViewport = function(viewportArray){
    this.mViewport = viewportArray;
};

Camera.prototype.getViewport = function(){
    return this.mViewport;
};

Camera.prototype.setBgColor = function(bgColor){
    this.mBgColor = bgColor;
};

Camera.prototype.getBgColor = function(){
    return this.mBgColor;
};

Camera.prototype.getVPMatrix = function(){
    return this.mVPMatrix;
};

Camera.prototype.setupViewProjection = function(){
    var gl = gEngine.Core.getGL();
    gl.viewport(this.mViewport[0], this.mViewport[1], this.mViewport[2], this.mViewport[3]);
    gl.scissor(this.mViewport[0], this.mViewport[1], this.mViewport[2], this.mViewport[3]);
    gl.clearColor(this.mBgColor[0], this.mBgColor[1], this.mBgColor[2], this.mBgColor[3]);
    gl.enable(gl.SCISSOR_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.disable(gl.SCISSOR_TEST);

    glMatrix.mat4.lookAt(this.mViewMatrix, 
        [this.mWCCenter[0], this.mWCCenter[1], 10],
        [this.mWCCenter[0], this.mWCCenter[1], 0],
        [0,1,0]        );

    var halfWCWidth = .5*this.mWCWidth;
    var halfWCHeight = halfWCWidth * this.mViewport[3] / this.mViewport[2];
    glMatrix.mat4.ortho(this.mProjMatrix,
        -halfWCWidth, halfWCWidth, -halfWCHeight, halfWCHeight,
        this.mNearPlane, this.mFarPlane);
    
        glMatrix.mat4.multiply(this.mVPMatrix,this.mProjMatrix, this.mViewMatrix);

};



