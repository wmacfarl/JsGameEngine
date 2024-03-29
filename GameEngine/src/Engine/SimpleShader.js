    "use strict"

function SimpleShader(vertexShaderID, fragmentShaderID){
    this.mCompiledShader = null;
    this.mShaderVertexPositionAttribute = null;
    this.mPixelColor = null;
    this.mModelTransform = null;
    this.mViewProjTransform = null;

    var gl = gEngine.Core.getGL();

    var vertexShader = this._compileShader(vertexShaderID, gl.VERTEX_SHADER);
    var fragmentShader = this._compileShader(fragmentShaderID, gl.FRAGMENT_SHADER);
    
    this.mCompiledShader = gl.createProgram();
    gl.attachShader(this.mCompiledShader, vertexShader);
    gl.attachShader(this.mCompiledShader, fragmentShader);
    gl.linkProgram(this.mCompiledShader);

    if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)){
        alert("Error linking shader.");
        return null;
    }

    this.mShaderVertexPositionAttribute = gl.getAttribLocation(this.mCompiledShader, "aSquareVertexPosition");

    gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLVertexRef());

    gl.vertexAttribPointer(this.mShaderVertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    this.mPixelColor = gl.getUniformLocation(this.mCompiledShader, "uPixelColor");
    this.mModelTransform = gl.getUniformLocation(this.mCompiledShader, "uModelTransform");
    this.mViewProjTransform = gl.getUniformLocation(this.mCompiledShader, "uViewProjTransform");
};

SimpleShader.prototype.loadObjectTransform = function(modelTransform){
    var gl = gEngine.Core.getGL();
    gl.uniformMatrix4fv(this.mModelTransform, false, modelTransform);
};

SimpleShader.prototype._compileShader = function(filePath, shaderType){
    var gl = gEngine.Core.getGL();
    var shaderSource = null,compiledShader = null;

    shaderSource = gEngine.ResourceMap.retrieveAsset(filePath);
    compiledShader = gl.createShader(shaderType);

    gl.shaderSource(compiledShader, shaderSource);
    gl.compileShader(compiledShader);

    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
        alert("A shader compiling error has occured: " + gl.getShaderInfoLog(compiledShader));
    }
    return compiledShader;
}

SimpleShader.prototype.activateShader = function(pixelColor, vpMatrix){
    var gl = gEngine.Core.getGL();
    gl.useProgram(this.mCompiledShader);
    gl.uniformMatrix4fv(this.mViewProjTransform, false, vpMatrix);
    gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
    gl.uniform4fv(this.mPixelColor, pixelColor);
};

SimpleShader.prototype.getShader = function(){
    return this.mCompiledShader;
};

