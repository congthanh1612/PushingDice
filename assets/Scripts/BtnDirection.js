
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
    },

    updateBtnController(currentDicePos, maxCol, maxRow) {
        const isLeftEdge = currentDicePos.col === 0;
        const isRightEdge = currentDicePos.col === maxCol-1;
        const isTopEdge = currentDicePos.row === 0;
        const isBottomEdge = currentDicePos.row === maxRow-1;
        // cc.log('Right-Bot',isRightEdge,isBottomEdge )
        // cc.log('col: ',currentDicePos.col)
        // cc.log('row: ',currentDicePos.row )
        
        this.btnLeft.active = !isLeftEdge;
        this.btnRight.active = !isRightEdge;
        this.btnUp.active = !isTopEdge;
        this.btnDown.active = !isBottomEdge;
        cc.log('left',this.btnLeft)
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
        cc.log(DICE_DIRECTION.LEFT,this.btnLeft.getComponentInChildren(cc.Label).string )
    }
});
