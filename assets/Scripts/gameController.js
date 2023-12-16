var Map = require('Map');
const DICE_DIRECTION = {
    LEFT: 1,
    RIGHT: 2,
    UP: 3,
    DOWN: 4
};
cc.Class({
    extends: cc.Component,

    properties: {
        map: cc.Node,
        diceController: cc.Node,
        btnHolder: cc.Node,
        moves: cc.Label,

        diceFace: {
            type: [cc.Label],
            default: [],
        } 
    },

    onLoad() {
        this.log();
        this.countMove = 16;
        this.diceController.zIndex = 999
        this.tilesMap = this.map.getComponent("MapController").tiles;
        this.setupDice();
        // this.posStart = null;
        this.dice = this.diceController.getComponent("DiceController")
        this.moves.getComponent(cc.Label).string = 'Moves: ' + this.countMove;
        cc.log(this.dice._indexDice)
    },

    start() {

    },

    log() {
        this.newMap = new Map();
        this.newMap.setWall([[0, 5]], 'left');
        this.newMap.setWall([[3,0],[3,1]],'right')
        this.newMap.setWall([[3,0],[3,1]],'top')
        this.newMap.setWall([[4,0],[4,1]],'bottom')
        this.newMap.setStart(3, 0);
        this.newMap.setDestination(0, 5);
        this.posStart = this.map.getComponent('MapController').renderMap(this.newMap);
    },

    setupDice() {
        this.diceController.position = this.tilesMap[this.posStart[0]][this.posStart[1]].position;
        this.currentDicePos = {
            row: this.posStart[0],
            col: this.posStart[1]  
        };
    },

    moveDice(event, direction) {
        if (this.isMovingDice) return;
        this.btnHolder.active = false;
        let col = this.currentDicePos.col;
        let row = this.currentDicePos.row;

        switch (Number(direction)) {
            case DICE_DIRECTION.LEFT:
                if (col > 0) {
                    col -= 1;
                    this.dice.Left();
                }
                break;
            case DICE_DIRECTION.RIGHT:
                if (col < this.newMap.cols - 1) {
                    col += 1;
                    this.dice.Right()
                }
                break;
            case DICE_DIRECTION.UP:
                if (row > 0) {
                    row -= 1;
                    this.dice.Up()
                }
                break;
            case DICE_DIRECTION.DOWN:
                if (row < this.newMap.rows - 1) {
                    row += 1;
                    this.dice.Down()
                }
                break;
        }

        this.currentDicePos = {
            row,
            col
        };
        
        this.isMovingDice = true;
        if (-1 < row < this.newMap.rows && -1 < col < this.newMap.cols) {
            const targetPosition = this.tilesMap[row][col].position;
            if (targetPosition) {
                this.diceController.runAction(cc.sequence(
                    cc.moveTo(0.3, targetPosition),
                    cc.callFunc(() => {
                        this.countMove--;
                        this.moves.getComponent(cc.Label).string = 'Moves: ' + this.countMove;
                        if(row === this.newMap.destination[0] && col === this.newMap.destination[1] && this.dice.getDiceFace() ===6 ){
                            alert('You Win')
                            this.diceController.active = false;
                        }
                        else if(row === this.newMap.destination[0] && col === this.newMap.destination[1] && this.dice.getDiceFace() !=6 || this.countMove ===0 ){
                            alert('you lose')
                            this.diceController .active = false;
                        };
                        this.isMovingDice = false;
                        this.showBtnDirection();
                    })
                ));
            }
            else {
                cc.error("ô trên không hợp lệ.");
            }
        }
    },

    showBtnDirection() {
        this.btnHolder.active = true;
        this.btnHolder.emit("UPDATE_BTN_CONTROLLER", this.currentDicePos, this.newMap.cols, this.newMap.rows, this.newMap);
        this.onDiceFaces();
    },

    onDiceFaces() {
        this.diceFace = this.dice.getDiceFaces().map((str, index) => {
            this.btnHolder.emit("UPDATE_DICE_NUMBER", str, index + 1);
        });
    },

    undoDice() {

    },
    replayGame(event) { 
        return this.gameStartState();
    },

    gameStartState(){
        this.setupDice(); 
        this.diceController.zIndex = 999
        this.dice.resetDiceFace();
        this.countMove = 16;
        this.moves.getComponent(cc.Label).string = 'Moves: '+ this.countMove;
        this.showBtnDirection();
    },
});