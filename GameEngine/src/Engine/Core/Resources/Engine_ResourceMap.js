"use strict"

var gEngine = gEngine || {};

gEngine.ResourceMap = (function(){

    var MapEntry = function(rName){
        this.mAsset = rName;
    }

    var mResourceMap = {};
    var mNumOutstandingLoads = 0;
    var mLoadCompleteCallback = null;

    var _checkForAllLoadsCompleted = function(){
        if ((mNumOutstandingLoads == 0) && (mLoadCompleteCallback !== null)){
            let funToCall = mLoadCompleteCallback;
            mLoadCompleteCallback = null;
            funToCall();
        }
    };

    var setLoadCompleteCallback = function(funct) {
        mLoadCompleteCallback = funct;
        _checkForAllLoadsCompleted();
    };

    var asyncLoadRequested = function(rName){
        mResourceMap[rName] = new MapEntry(rName);
        mNumOutstandingLoads+=1;
    };

    var asyncLoadCompleted = function(rName, loadedAsset){
        if (!isAssetLoaded(rName)){
            alert("gEngine.asyncLoadCompleted: [" + rName + "] not in map!");
        }
        mResourceMap[rName].mAsset = loadedAsset;
        mNumOutstandingLoads-=1;
        _checkForAllLoadsCompleted();
    };  

    var isAssetLoaded = function(rName){
        return (rName in mResourceMap);
    };

    var retrieveAsset = function(rName){
        var r = null;
        if (rName in mResourceMap){
            r = mResourceMap[rName].mAsset;
        }else{
            alert(rName +" is not in ResourceMap");
        }
        return r;
    };

    var unloadAsset = function(rName) {
        if (rName in mResourceMap){
            delete mResourceMap[rName];
        }
    };

    var mPublic = {
        asyncLoadRequested: asyncLoadRequested,
        asyncLoadCompleted: asyncLoadCompleted,
        setLoadCompleteCallback: setLoadCompleteCallback,

        retrieveAsset: retrieveAsset,
        unloadAsset: unloadAsset,
        isAssetLoaded: isAssetLoaded
    };
    return mPublic;
}());

