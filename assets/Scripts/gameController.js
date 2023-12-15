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
        diceFace: {
            type: [cc.Label],
            default: [],
        }
    },

    onLoad() {
        this.log();
        //cc.log(this.diceController);
        this.diceController.zIndex = 999
        this.tilesMap = this.map.getComponent("MapController").tiles;
        this.setupDice();
        this.posStart = null;
        this.dice = this.diceController.getComponent("DiceController")
    },

    start() {


    },

    log() {
        this.newMap = new Map();
        this.newMap.setWall([[0, 5]], 'left');
        this.newMap.setStart(3, 0);
        this.newMap.setDestination(0, 5);
        this.posStart = this.map.getComponent('MapController').renderMap(this.newMap);
    },

    setupDice() {
        this.diceController.position = this.tilesMap[this.posStart[0]][this.posStart[1]].position;
        this.currentDicePos = {
            col: this.posStart[1],
            row: this.posStart[0]
        };
    },

    moveDice(event, direction) {
        cc.log('aaa',this.newMap.cols,this.newMap.rows )
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
                if (col < this.newMap.rows - 1) {
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
                if (row < this.newMap.cols - 1) {
                    row += 1;
                    this.dice.Down()
                }
                break;
        }

        this.currentDicePos = {
            col,
            row
        };
        this.isMovingDice = true;
        if (-1 < row < this.newMap.rows && -1 < col < this.newMap.cols) {
            const targetPosition = this.tilesMap[row][col].position;
            if (targetPosition) {
                this.diceController.runAction(cc.sequence(
                    cc.moveTo(0.3, targetPosition),
                    cc.callFunc(() => {
                        this.isMovingDice = false;
                    })
                ));
            }
            else {
                cc.error("ô trên không hợp lệ.");
            }
        }
        // else {
        //     cc.error("Vị trí mới nằm ngoài biên của lưới.");
        // }
    },
    showBtnDirection() {
        this.btnHolder.active = true;
        this.btnHolder.emit("UPDATE_BTN_CONTROLLER", this.currentDicePos, this.newMap.rows, this.newMap.cols);
        this.onDiceFaces();
    },

    onDiceFaces() {
        this.diceFace = this.dice.getDiceFaces().map((str, index) => {
            this.btnHolder.emit("UPDATE_DICE_NUMBER", str, index + 1);
        });
    }
});
