"use strict"
function Transform(){
    this.mPosition = glMatrix.vec2.fromValues(0,0);
    this.mScale = glMatrix.vec2.fromValues(1,1);
    this.mRotationInRad = 0.0;
};

Transform.prototype.setPosition = function(xPos, yPos){
    this.setXPos(xPos);
    this.setYPos(yPos);
};

Transform.prototype.getPosition = function(){
    return this.mPosition;
};

Transform.prototype.setXPos = function(xPos){
    this.mPosition[0] = xPos;
};

Transform.prototype.getXPos = function(){
   return this.mPosition[0];
};

Transform.prototype.setYPos = function(yPos){
    this.mPosition[1] = yPos;
};

Transform.prototype.getYPos = function(){
    return this.mPosition[1];
 };
 
Transform.prototype.incXPosBy = function(deltaX){
    this.setXPos(this.getXPos() + deltaX);
}

Transform.prototype.incYPosBy = function(deltaY){
    this.setYPos(this.getYPos() + deltaY);
}


 Transform.prototype.setSize = function(width, height){
     this.setWidth(width);
     this.setHeight(height);
 };

 Transform.prototype.setWidth = function(width){
     this.mScale[0] = width;
 }

 Transform.prototype.setHeight = function(height){
    this.mScale[1] = height;
}

Transform.prototype.getSize = function(){
    return this.mScale;
};

Transform.prototype.incSizeBy = function(delta){
    this.mScale[0]+=delta;
    this.mScale[1]+=delta;
};

Transform.prototype.getWidth = function(){
    return this.mScale[0];
};

Transform.prototype.getHeight = function(){
    return this.mScale[1];
};

Transform.prototype.setRotationInRad = function(rotationInRad){
    this.mRotationInRad = rotationInRad;
    while (this.mRotationInRad > 2*Math.PI){
        this.mRotationInRad -= (2*Math.PI);
    };
}

Transform.prototype.getRotationInRad = function(){
    return this.mRotationInRad;
}

Transform.prototype.getRotationInDegree = function(){
    return this.mRotationInRad*57.2958;
}


Transform.prototype.setRotationInDegree = function (rotationInDegree) {
    this.setRotationInRad(rotationInDegree * Math.PI / 180.0);
};

Transform.prototype.incRotationByDegree = function(rotationDelta){
    this.setRotationInDegree(this.getRotationInDegree()+rotationDelta);
};

Transform.prototype.incRotationByRadian = function(rotationDelta){
    this.setRotationInRad(this.mRotationInRad + rotationDelta)
};


Transform.prototype.getXform = function(){
    var matrix = glMatrix.mat4.create();
    glMatrix.mat4.translate(matrix, matrix, glMatrix.vec3.fromValues(this.getXPos(), this.getYPos(), 0.0));
    glMatrix.mat4.rotateZ(matrix, matrix, this.getRotationInRad());
    glMatrix.mat4.scale(matrix, matrix, glMatrix.vec3.fromValues(this.getWidth(), this.getHeight(), 1.0));
    return matrix;
};

