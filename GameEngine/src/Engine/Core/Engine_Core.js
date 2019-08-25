"use strict"

var gEngine = gEngine || {};
gEngine.Core = (function() {
    var mGL = null;
    var getGL = function(){return mGL;};

    var _initializeWebGL = function(htmlCanvasID){
        var canvas = document.getElementById(htmlCanvasID);
        mGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

        if (mGL === null){
            document.write("<br> <b>WebGL is not supported</b>");
            return;
        }
    }

    var initializeEngineCore = function (htmlCanvasID, myGame){
        _initializeWebGL(htmlCanvasID);
        gEngine.VertexBuffer.initialize();
        gEngine.Input.initialize();
        gEngine.AudioClips.initAudioContext();
        gEngine.DefaultResources.initialize(function() {startScene(myGame);});
    };

    var startScene = function(myGame){
        myGame.loadScene.call(myGame);
        gEngine.GameLoop.start(myGame);
    };

    var clearCanvas = function(color){
        mGL.clearColor(color[0], color[1], color[2], color[3]);
        mGL.clear(mGL.COLOR_BUFFER_BIT);
    };

    var inheritPrototype = function(subClass, superClass){
        var prototype = Object.create(superClass.prototype);
        prototype.constructor = subClass;
        subClass.prototype = prototype;
    };


    var mPublic = {
        getGL: getGL,
        startScene: startScene,
        inheritPrototype: inheritPrototype,
        initializeEngineCore: initializeEngineCore,
        clearCanvas: clearCanvas
    };

    return mPublic;
}());