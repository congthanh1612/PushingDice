var MapDice = require('MapDice');
var faceDices = [];
cc.Class({
    extends: cc.Component,

    properties: {
        atlas: cc.SpriteAtlas,
        _indexDice: 1,
        aniFace_1: cc.Animation,
    },

    onLoad() {
        this.dice = new MapDice([0, 4, 0],
            [5, 1, 2],
            [0, 3, 0]);
        this.pushFaceDice(this.dice.diceFace);
    },

    changeAtlas(index) {
        this.node.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrames()[index];
    },

    Left() {
        this._indexDice = this.dice.Left();
        this.pushFaceDice(this.dice.diceFace);
        this.runAnim(this._indexDice);
    },
    Right() {
        this._indexDice = this.dice.Right();
        this.pushFaceDice(this.dice.diceFace);
        this.runAnim(this._indexDice);
    },
    Up() {
        this._indexDice = this.dice.Up();
        this.pushFaceDice(this.dice.diceFace);
        this.runAnim(this._indexDice);
    },
    Down() {
        this._indexDice = this.dice.Down();
        this.pushFaceDice(this.dice.diceFace);
        this.runAnim(this._indexDice);
    },

    getDiceFaces() {
        return this.dice.setDiceFaces()
    },

    resetDiceFace() {
        this.dice = new MapDice([0, 3, 0],
            [5, 1, 2],
            [0, 4, 0]);
        this._indexDice = 0;
        this.changeAtlas(this._indexDice);
    },
    getDiceFace() {
        return this.dice.diceFace;
    },

    pushFaceDice(faceDice) {
        faceDices.push(faceDice);
    },

    runAnim(indexFace) {
        let face = faceDices[faceDices.length - 2];
        let nextFace = indexFace + 1;
        let nameAnim = `${face} to ${nextFace}`;
        this.aniFace_1.play(nameAnim);
    },
});