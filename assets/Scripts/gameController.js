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
        dice: cc.Node,
        btnHolder: cc.Node
    },

    onLoad() {
        this.log();
        this.dice.zIndex = 999
        this.tilesMap = this.map.getComponent("MapController").tiles;
        this.setupDice();
        this.posStart = null;
    },

    start() {


    },

    log() {
        let newMap = new Map();
        newMap.setWall([[0,5]], 'left');
        newMap.setStart(3,0);
        newMap.setDestination(0,5);
        this.posStart = this.map.getComponent('MapController').renderMap(newMap);
    },

    setupDice() {
        ///cc.log(this.posStart)
        this.dice.position = this.tilesMap[this.posStart[0]][this.posStart[1]].position;
        //this.btnHolder.position = this.dice.position;
        this.currentDicePos = {
            col: this.posStart[1],
            row: this.posStart[0]
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
                }
                break;
            case DICE_DIRECTION.RIGHT:
                if (col < this.mapCols - 1) {
                    col += 1;
                }
                break;
            case DICE_DIRECTION.UP:
                if (row > 0) {
                    row -= 1;
                }
                break;
            case DICE_DIRECTION.DOWN:
                if (row < this.mapRows - 1) {
                    row += 1;
                }
                break;
        }

        this.currentDicePos = {
            col,
            row
        };
        this.isMovingDice = true;
        const targetPosition = this.tilesMap[row][col].position;
        //cc.log(targetPosition)
        if (-1 < row < this.mapRows && -1 < col < this.mapCols) {
            const targetPosition = this.tilesMap[row][col].position;
            if (targetPosition) {
                this.dice.runAction(cc.sequence(
                    cc.moveTo(0.3, targetPosition),
                    cc.callFunc(() => {
                        this.isMovingDice = false;
                    })
                ));
            } else {
                cc.error("ô trên không hợp lệ.");
            }
        } else {
            cc.error("Vị trí mới nằm ngoài biên của lưới.");
        }
    },
    showBtnDirection() {
        //this.btnHolder.position = this.dice.position;
        this.btnHolder.active = true;
        this.btnHolder.emit("UPDATE_BTN_CONTROLLER", this.currentDicePos, this.mapCols, this.mapRows);
        //cc.log('btnHolder', this.btnHolder.position);
    },
});
