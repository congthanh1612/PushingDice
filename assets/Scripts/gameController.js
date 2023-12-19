var Map = require('Map');
const Emitter = require('mEmitter');
import { log } from "console";
import { readFile } from "./otherProcessing.js";

cc.Class({
    extends: cc.Component,

    properties: {
        map: cc.Node,
        diceController: cc.Node,
        levelScreen: cc.Node,
        levels: [cc.TextAsset],
        diceNode: cc.Node,
        btnHolder: cc.Node,
        popupGameWin: cc.Node,
        popupGameOver: cc.Node,
        popupSettings: cc.Node,
        _level: 0,
        _isShow: false,
    },
    onLoad() {
        Emitter.instance.registerEvent('COMPLETE_LEVEL', this.showPopupGameWin.bind(this));
        Emitter.instance.registerEvent('GAME_OVER', this.showPopupGameOver.bind(this));
    },

    startGame(level) {
        this._level = level;
        this.dataLevel = this.levels[level].text;
        this.dataLevel = readFile(this.dataLevel);
        this.dataLevel["level"] = level + 1;
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

    showPopupGameWin() {
        this.popupGameWin.active = true;
    },

    showPopupGameOver() {
        this.popupGameOver.active = true;
    },

    reloadGame() {
        this.hidePopup();
        this.startGame(this._level);
    },

    playNextLevel() {
        this.hidePopup();
        this.startGame(this._level + 1);
    },

    hidePopup() {
        this.diceNode.active = true;
        this.popupGameWin.active = false;
        this.popupGameOver.active = false;
        this.popupSettings.active = false;
        this.btnHolder.active = false;
    },

    backLevelScreen(){
        this.node.parent.active = false;
        this.levelScreen.active = true;
        this.hidePopup();
    }

});