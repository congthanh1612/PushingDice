
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
    },

    updateBtnController(currentDicePos, maxCol, maxRow) {
        const isLeftEdge = currentDicePos.col === 0;
        const isRightEdge = currentDicePos.col === maxCol-1;
        const isTopEdge = currentDicePos.row === 0;
        const isBottomEdge = currentDicePos.row === maxRow-1;
        cc.log('Right-Bot',isRightEdge,isBottomEdge )
        // cc.log('left-top',isLeftEdge, isTopEdge )
        cc.log('col: ',currentDicePos.col)
        cc.log('row: ',currentDicePos.row )
        
        this.btnLeft.active = !isLeftEdge;
        this.btnRight.active = !isRightEdge;
        this.btnUp.active = !isTopEdge;
        this.btnDown.active = !isBottomEdge;
    }
});
