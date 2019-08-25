"use strict"

function SceneFileParser(sceneFilePath) {
    this.mSceneXml = gEngine.ResourceMap.retrieveAsset(sceneFilePath);
}

SceneFileParser.prototype._getElm = function(tagElm){
    var theElm = this.mSceneXml.getElementsByTagName(tagElm);
    if (theElm.length === 0){
        console.error("Warning: Level element:[" + tagElm + "]: is not found!");
    }
    return theElm;
};

SceneFileParser.prototype.parseCamera = function(){
    var camElm = this._getElm("Camera");
    var cX = Number(camElm[0].getAttribute("CenterX"));
    var cY = Number(camElm[0].getAttribute("CenterY"));
    var w = Number(camElm[0].getAttribute("Width"));
    var viewport = camElm[0].getAttribute("Viewport").split(" ");
    var bgColor = camElm[0].getAttribute("BgColor").split(" ");

    for (let j = 0; j < 4; j++){
        bgColor[j] = Number(bgColor[j]);
        viewport[j] = Number(viewport[j]);
    }

    var cam = new Camera(glMatrix.vec2.fromValues(cX, cY), w, viewport);
    cam.setBackgroundColor(bgColor);
    return cam;
}

SceneFileParser.prototype.parseSquares = function(sqSet){
    var elm = this._getElm("Square");
    for (let i = 0; i < elm.length; i++){
        let x = Number(elm.item(i).attributes.getNamedItem("PosX").value);
        let y = Number(elm.item(i).attributes.getNamedItem("PosY").value);
        let w = Number(elm.item(i).attributes.getNamedItem("Width").value);
        let h = Number(elm.item(i).attributes.getNamedItem("Height").value);
        let r = Number(elm.item(i).attributes.getNamedItem("Rotation").value);
        let c = elm.item(i).attributes.getNamedItem("Color").value.split(" ");
        let sq = new Renderable(gEngine.DefaultResources.getConstColorShader());

        for (let j = 0; j < 3; j++){
            c[j] = Number(c[j]);
        }

        sq.setColor(c);
        sq.getXform().setPosition(x, y);
        sq.getXform().setRotationInDegree(r);
        sq.getXform().setSize(w, h);
        sqSet.push(sq);
    }
};