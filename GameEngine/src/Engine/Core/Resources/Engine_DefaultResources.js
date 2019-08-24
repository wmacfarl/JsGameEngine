var gEngine = gEngine || {};

gEngine.DefaultResources = (function(){
    var kSimpleVS = "src/GLSL_Shaders/SimpleVS.glsl";
    var kSimpleFS = "src/GLSL_Shaders/SimpleFS.glsl";

    var mConstColorShader = null;

    var getConstColorShader = function(){
        return mConstColorShader;
    }

    var _createShaders = function(callBackFunction){
        mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
        callBackFunction();
    };

    var initialize = function(callBackFunction){
        gEngine.TextFileLoader.loadTextFile(kSimpleFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kSimpleVS, gEngine.TextFileLoader.eTextFileType.eTextFile);

        gEngine.ResourceMap.setLoadCompleteCallback(function() {_createShaders(callBackFunction);});
    };

    var mPublic = {
        initialize: initialize,
        getConstColorShader: getConstColorShader
    };
    return mPublic;
}());