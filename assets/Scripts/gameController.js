var Map = require('Map');

cc.Class({
    extends: cc.Component,

    properties: {
        map: cc.Node,
        diceController: cc.Node,
        
    },

    onLoad() {
        this.startGame(0);
       
    },

    startGame(level){
        
        this.createMap(level);
    },
    createMap(index) {
        this.dice = this.diceController.getComponent("DiceController")
        this.newMap = this.map.getComponent('MapController').createMapWithCsv(index);
        this.map.getComponent('MapController').renderMap(this.newMap)
        this.posStart = this.map.getComponent('MapController').renderMap(this.newMap);
        this.diceController.zIndex = 999
        this.dice.setupDice(this.posStart)
        cc.log(this.posStart)
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
