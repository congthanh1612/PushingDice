var Map = require('Map');
const Emitter = require('mEmitter');
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
        tutorialPopup: cc.Node,
        _level: 0,
        _isShow: false,
    },
    onLoad() {
        var retrievedValue = cc.sys.localStorage.getItem('unlock');
        if (retrievedValue == null) {
            this.tutorialPopup.active = true;
            this.blockButton();
        }
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
        cc.log(this.newMap)
    },

    showPopupGameWin() {
        Emitter.instance.emit('levelWin')
        this.blockButton();
        this.popupGameWin.active = true;
    },

    showPopupGameOver() {
        Emitter.instance.emit('levelLose')
        this.blockButton();
        this.popupGameOver.active = true;
    },

    reloadGame() {
        if (this.dice.isMovingDice) return;
        Emitter.instance.emit("reload");
        this.hidePopup();
        this.unblockButton();
        this.startGame(this._level);
    },

    undoMove() {
        Emitter.instance.emit('back')
        this.dice.undoMove();
    },

    playNextLevel() {
        let nextLevel = this._level + 1;
        let totalLevel = this.levels.length;

        if (nextLevel >= totalLevel) {
            this.backLevelScreen();
        } else {
            Emitter.instance.emit("clickSound");
            Emitter.instance.emit("startRound");
            this.hidePopup();
            this.startGame(nextLevel);
            this.unblockButton();
        }
    },

    hidePopup() {
        this.diceNode.active = true;
        this.popupGameWin.active = false;
        this.popupGameOver.active = false;
        this.popupSettings.active = false;
        this.btnHolder.active = false;
    },

    backLevelScreen() {
        Emitter.instance.emit("clickSound");
        Emitter.instance.emit('playMusic')
        this.node.parent.active = false;
        this.levelScreen.active = true;
        this.hidePopup();
        this.unblockButton();
    },

    closeTutorial(){
        Emitter.instance.emit("clickSound");
        this.tutorialPopup.active= false;
        this.unblockButton();
    },
    onTutorialPopup() {
        Emitter.instance.emit("clickSound");
        this.tutorialPopup.active = true;
        this.blockButton();
    },

    blockButton() {
        let buttons = this.node.parent.getComponentsInChildren(cc.Button);
        this.node.parent.opacity = 108
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].interactable = false;
        }
    },
    unblockButton() {
        let buttons = this.node.parent.getComponentsInChildren(cc.Button);
        this.node.parent.opacity = 255
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].interactable = true;
        }
    }
});