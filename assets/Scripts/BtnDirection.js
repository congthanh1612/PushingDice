import { checkArrayInArray2D } from './otherProcessing.js';
const DICE_DIRECTION = {
    LEFT: 1,
    RIGHT: 2,
    UP: 3,
    DOWN: 4
};

cc.Class({
    extends: cc.Component,

    properties: {
        btnLeft: cc.Node,
        btnRight: cc.Node,
        btnUp: cc.Node,
        btnDown: cc.Node,
       
    },
    
    onLoad () {
        this.node.on("UPDATE_BTN_CONTROLLER", this.updateBtnController, this);
        this.node.on("UPDATE_DICE_NUMBER", this.updateDiceNumber, this);
        this.node.on("UPDATE_DICE_COLOR", this.updateColorBtn, this);
        cc.log('asdas',this.btnLeft)
    },

    updateBtnController(currentDicePos, maxCol, maxRow, map) {
        let isLeftEdge = currentDicePos.col === 0;
        let isRightEdge = currentDicePos.col === maxCol-1;
        let isTopEdge = currentDicePos.row === 0;
        let isBottomEdge = currentDicePos.row === maxRow-1;

        const arrPos=[currentDicePos.row,currentDicePos.col]
        if(isLeftEdge==false&&checkArrayInArray2D(arrPos,map.wallLeft))isLeftEdge=true;
        if(isRightEdge==false&&checkArrayInArray2D(arrPos,map.wallRight))isRightEdge=true;
        if(isTopEdge==false&&checkArrayInArray2D(arrPos,map.wallTop))isTopEdge=true;
        if(isBottomEdge==false&&checkArrayInArray2D(arrPos,map.wallBottom))isBottomEdge=true;

        this.btnLeft.active = !isLeftEdge;
        this.btnRight.active = !isRightEdge;
        this.btnUp.active = !isTopEdge;
        this.btnDown.active = !isBottomEdge;
    },

    updateDiceNumber(number, direction) {
        switch (Number(direction)) {
            case DICE_DIRECTION.LEFT:
                this.btnLeft.getComponentInChildren(cc.Label).string = number;
                break;
            case DICE_DIRECTION.RIGHT:
                this.btnRight.getComponentInChildren(cc.Label).string = number;
                break;
            case DICE_DIRECTION.UP:
                this.btnUp.getComponentInChildren(cc.Label).string = number;
                break;
            case DICE_DIRECTION.DOWN:
                this.btnDown.getComponentInChildren(cc.Label).string = number;
                break;
        }
    },
    updateColorBtn(currentPos, desPos, currentDices, diceResult) {
        var customColor = new cc.Color(0, 255, 224, 255);
        this.btnLeft.color = customColor;
        this.btnRight.color = customColor;
        this.btnUp.color = customColor;
        this.btnDown.color = customColor;

        const isDestinationOnLeft = currentPos.col - 1 == desPos.col && currentPos.row == desPos.row;
        const isDestinationOnRight = currentPos.col + 1 == desPos.col && currentPos.row == desPos.row;
        const isDestinationAbove = currentPos.row - 1 == desPos.row && currentPos.col == desPos.col;
        const isDestinationBelow = currentPos.row + 1 == desPos.row && currentPos.col == desPos.col;

        if (isDestinationOnLeft) {
            this.btnLeft.color = currentDices[DICE_DIRECTION.LEFT - 1] == diceResult ? cc.Color.GREEN : cc.Color.RED;
        } else if (isDestinationOnRight) {
            this.btnRight.color = currentDices[DICE_DIRECTION.RIGHT - 1] == diceResult ? cc.Color.GREEN : cc.Color.RED;
        } else if (isDestinationAbove) {
            this.btnUp.color = currentDices[DICE_DIRECTION.UP - 1] == diceResult ? cc.Color.GREEN : cc.Color.RED;
        } else if (isDestinationBelow) {
            this.btnDown.color = currentDices[DICE_DIRECTION.DOWN - 1] == diceResult ? cc.Color.GREEN : cc.Color.RED;
        }
    },
});
