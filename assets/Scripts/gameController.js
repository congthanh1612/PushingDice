var Map = require('Map');
const Emitter = require('mEmitter');
import {readFile } from "./otherProcessing.js";
cc.Class({
    extends: cc.Component,

    properties: {
        map: cc.Node,
        diceController: cc.Node,
        levels:[cc.TextAsset],
        _level: 0
    },
    onLoad() {
        this.startGame(8);
    },

    startGame(level){
        this.dataLevel=this.levels[level].text;
        this.dataLevel=readFile(this.dataLevel);
        this.createMap(this.dataLevel);
    },
    createMap(dataLevel) {
        this.dice = this.diceController.getComponent("DiceController")
        this.newMap = this.map.getComponent('MapController').createMapWithCsv(dataLevel);
        this.posStart = this.map.getComponent('MapController').renderMap(this.newMap);
        this.diceController.zIndex = 999;
        this.dice.createDice(dataLevel);
        this.dice.setupDice(this.posStart)
    },

    

    replayGame(event) {
        return this.gameStartState();
    },

    gameStartState() {
        this.setupDice();
        this.diceController.zIndex = 999
        this.dice.resetDiceFace();
        this.countMove = 16;
        this.moves.getComponent(cc.Label).string = 'Moves: ' + this.countMove;
        this.showBtnDirection();
    },
});
