
var Dice = require('Dice'); 
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
        atlas: cc.SpriteAtlas,
        _indexDice:1,
        map: cc.Node,
        btnHolder: cc.Node,
        moves: cc.Label,
        diceFace: {
            type: [cc.Label],  
            default: [],
        }
    },

    createDice(data){
        this.dice=new Dice( data['firstRow'],   
                            data['secondRow'],
                            data['thirdRow']);
        this.changeAtlas(this.dice.diceFace-1)
        this.countMove = data['moves'][0];
        this.moves.getComponent(cc.Label).string = 'Moves: ' + this.countMove;   
        this.posStart = data['start'];
        this.newMap=this.map.getComponent('MapController').map;
        this.destination = {                               
            row: data['destination'][0],
            col: data['destination'][1]
        };
    },

    setupDice(pos) { 
        this.diceResult = 6;
        this.tilesMap = this.map.getComponent("MapController").tiles;
        this.node.position = this.tilesMap[pos[0]][pos[1]].position;
        this.currentDicePos = {
            row: pos[0],
            col: pos[1]
        };
    },

    moveDice(event, direction) {
        this.tilesMap = this.map.getComponent("MapController").tiles;
        if (this.isMovingDice) return;
        this.btnHolder.active = false;
        let col = this.currentDicePos.col;
        let row = this.currentDicePos.row;
        // cc.log(this.newMap.destination[0])
        switch (Number(direction)) {
            case DICE_DIRECTION.LEFT:
                if (col > 0) {
                    col -= 1;
                    this.Left();
                }
                break;
            case DICE_DIRECTION.RIGHT:
                if (col < this.newMap.cols - 1) {
                    col += 1;
                    this.Right()
                }
                break;
            case DICE_DIRECTION.UP:
                if (row > 0) {
                    row -= 1;
                    this.Up()
                }
                break;
            case DICE_DIRECTION.DOWN:
                if (row < this.newMap.rows - 1) {
                    row += 1;
                    this.Down()
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
                this.node.runAction(cc.sequence(
                    cc.moveTo(0.3, targetPosition),
                    cc.callFunc(() => {
                        this.countMove--;
                        this.moves.getComponent(cc.Label).string = 'Moves: ' + this.countMove;
                        if (row === this.newMap.destination[0] && col === this.newMap.destination[1] && this.getDiceFace() === this.diceResult) {
                            alert('You Win')
                            this.node.active = false;
                        }
                        else if (row === this.newMap.destination[0] && col === this.newMap.destination[1] && this.getDiceFace() != this.diceResult || this.countMove === 0) {
                            alert('you lose')
                            this.node.active = false;
                            
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
        this.btnHolder.emit("UPDATE_DICE_COLOR", this.currentDicePos, this.destination, this.getDiceFaces(), this.diceResult);
        this.onDiceFaces();
    },

    onDiceFaces() {
        this.diceFace = this.getDiceFaces().map((str, index) => {
            this.btnHolder.emit("UPDATE_DICE_NUMBER", str, index + 1);
        });
    },

    changeAtlas(index){
        this.node.getComponent(cc.Sprite).spriteFrame=this.atlas.getSpriteFrames()[index];
    },

    Left(){
        this._indexDice=this.dice.Left();
        this.changeAtlas(this._indexDice);
    },
    Right(){
        this._indexDice=this.dice.Right();
        this.changeAtlas(this._indexDice);
    },
    Up(){
        this._indexDice=this.dice.Up();
        this.changeAtlas(this._indexDice);
    },
    Down(){
        this._indexDice=this.dice.Down();
        this.changeAtlas(this._indexDice);
    },

    getDiceFaces(){ 
        return this.dice.setDiceFaces()
    },

    resetDiceFace(){
        this.dice=new Dice(  [0,3,0],
            [5,1,2],
            [0,4,0]);
        this._indexDice=0,
        this.changeAtlas(this._indexDice);
    },
    getDiceFace(){
        return this.dice.diceFace;
    }

});