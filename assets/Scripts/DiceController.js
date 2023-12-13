var MapDice = require('MapDice');
cc.Class({
    extends: cc.Component,

    properties: {
        atlas: cc.SpriteAtlas,
        _mapDice:MapDice,//[[0,3,0],[5,1,2],[0,4,0]],
        _indexDice:1
    },
    onLoad() {
        cc.log(this._defaultMapDice)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this._mapDice=new MapDice(  [0,3,0],
                                    [5,1,2],
                                    [0,4,0]);
        cc.log(this._mapDice)
    },
    start() {

    },
    onKeyUp: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this._indexDice=this._mapDice.Left();
                cc.log(this._mapDice.diceFace);
                this.changeAtlas(this._indexDice);
                break;
            case cc.macro.KEY.d:
                this._indexDice=this._mapDice.Right();
                cc.log(this._mapDice.diceFace);
                this.changeAtlas(this._indexDice);
                break;
            case cc.macro.KEY.w:
                this._indexDice=this._mapDice.Up();
                cc.log(this._mapDice.diceFace);
                this.changeAtlas(this._indexDice);
                break;
            case cc.macro.KEY.s:
                this._indexDice=this._mapDice.Down();
                cc.log(this._mapDice.diceFace);
                this.changeAtlas(this._indexDice);
                break;
        }
    },
    changeAtlas(index){
        this.node.getComponent(cc.Sprite).spriteFrame=this.atlas.getSpriteFrames()[index];
    },
});
