var Map = require('Map');
const Emitter = require('mEmitter');
const DICE_DIRECTION = {
    LEFT: 1,
    RIGHT: 2,
    UP: 3,
    DOWN: 4
};

cc.Class({
    extends: cc.Component,

    properties: {
        map:cc.Node,
        dice: cc.Node,
        _level: '',
        btnHolder: cc.Node
    },

    onLoad() {
        this.log();
        this.dice.zIndex=999
        this.tilesMap = this.map.getComponent("MapController").tiles; 
        this.setupDice()
    },

    start() {
        
        
    },

    log() {
      let newMap = new Map(6, 8);
        newMap.setWall([[2, 1], [1, 1]], 'bottom');
        this.map.getComponent('MapController').renderMap(newMap)
        cc.log(this.map.getComponent('MapController').tiles)
       this.mapCols = 6;
        this.mapRows = 8;
        let newMap=new Map(this.mapCols, this.mapRows);
        newMap.setWall([[2,1],[1,1]],'bottom');
        this.map.getComponent('MapController').renderMap(newMap);
    },

        
    onUnlock(){
        let level = this._level;
        let matches = level.match(/\d+/);
        let currentLevel = parseInt(matches[0]);
        let newLevel = currentLevel + 1;
        let levelUnlock = level.replace(/\d+/, newLevel);

        Emitter.instance.emit('COMPLETE_LEVEL', {level, levelUnlock});
    },
    setupDice() {
        this.dice.position = this.tilesMap[2][2].position;
        //this.btnHolder.position = this.dice.position;
        this.currentDicePos = {
            col: 2,
            row: 2
        };
    },

    moveDice(event, direction) {
        if (this.isMovingDice) return;
        this.btnHolder.active = false;
        let col = this.currentDicePos.col;
        let row = this.currentDicePos.row;

        switch (Number(direction)) {
            case DICE_DIRECTION.LEFT:
                if(col > 0) {
                    col -= 1;
                }               
                break;
            case DICE_DIRECTION.RIGHT:
                if(col < this.mapCols - 1) {
                    col += 1;
                }
                break;
            case DICE_DIRECTION.UP:
                if(row > 0 ){
                    row -= 1;
                }
                break;
            case DICE_DIRECTION.DOWN:
                if(row < this.mapRows - 1) {
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
        cc.log(targetPosition)
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
        cc.log('btnHolder',this.btnHolder.position);
    },
});
