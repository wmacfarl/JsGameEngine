"use strict"

var gEngine = gEngine || {};
gEngine.VertexBuffer = (function(){
    var verticesOfSquare = [
         0.5,  0.5, 0.0,
        -0.5,  0.5, 0.0,
         0.5, -0.5, 0.0,
        -0.5, -0.5, 0.0
    ];

    var mSquareVertexBuffer = null;
    var getGLVertexRef = function(){
        return mSquareVertexBuffer;
    };

    var initialize = function() {
        var gl = gEngine.Core.getGL();
        mSquareVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, mSquareVertexBuffer);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);
    };

    var mPublic = {
        initialize: initialize,
        getGLVertexRef: getGLVertexRef
    };

return mPublic;
}());

