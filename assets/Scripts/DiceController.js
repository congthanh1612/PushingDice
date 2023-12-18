var Dice = require('Dice'); 
cc.Class({
    extends: cc.Component,

    properties: {
        atlas: cc.SpriteAtlas,
        _indexDice:1,
    },

    onLoad() {
        this.dice=new Dice(  [0,3,0],
                                [5,1,2],
                                [0,4,0]);
        //cc.log(this.dice)
    },

    changeAtlas(index){
        this.node.getComponent(cc.Sprite).spriteFrame=this.atlas.getSpriteFrames()[index];
    },

    Left(){
        this._indexDice=this.dice.Left();
        this.changeAtlas(this._indexDice);
    },
    Right(){
        this._indexDice=this.dice.Right();
        this.changeAtlas(this._indexDice);
    },
    Up(){
        this._indexDice=this.dice.Up();
        this.changeAtlas(this._indexDice);
    },
    Down(){
        this._indexDice=this.dice.Down();
        this.changeAtlas(this._indexDice);
    },

    getDiceFaces(){ 
        return this.dice.setDiceFaces()
    },

    resetDiceFace(){
        this.dice=new Dice(  [0,3,0],
            [5,1,2],
            [0,4,0]);
        this._indexDice=0,
        this.changeAtlas(this._indexDice);
    },
    getDiceFace(){
        return this.dice.diceFace;
    }
    

});
