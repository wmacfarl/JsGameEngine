"use strict"

var gEngine = gEngine || {};

gEngine.ResourceMap = (function(){

    var MapEntry = function(rName){
        this.mAsset = rName;
        this.refCount = 1;
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

    var incAssetRefCount = function(rName){
        mResourceMap[rName].refCount+=1;
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
        var c = 0;
        if (rName in mResourceMap){
            mResourceMap[rName].refCount -= 1;
            c = mResourceMap[rName].refCount;
            if (c === 0){
                delete mResourceMap[rName];
            }
        }
        return c;
    };

    var mPublic = {
        asyncLoadRequested: asyncLoadRequested,
        asyncLoadCompleted: asyncLoadCompleted,
        setLoadCompleteCallback: setLoadCompleteCallback,
        incAssetRefCount: incAssetRefCount,
        retrieveAsset: retrieveAsset,
        unloadAsset: unloadAsset,
        isAssetLoaded: isAssetLoaded
    };
    return mPublic;
}());

