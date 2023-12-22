var Dice = require('Dice');
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
        atlas: cc.SpriteAtlas,
        _indexDice: 1,
        map: cc.Node,
        btnHolder: cc.Node,
        moves: cc.Label,
        diceFace: {
            type: [cc.Label],
            default: [],
        },
    },

    createDice(data) {
        this.dice = new Dice(data['firstRow'],
            data['secondRow'],
            data['thirdRow']);
        this.changeAtlas(this.dice.diceFace - 1)
        this.countMove = data['moves'][0];
        this._totalMove = data['moves'][0];
        this.moves.getComponent(cc.Label).string = `${this.countMove}/${this._totalMove}`;
        this.posStart = data['start'];
        this.newMap = this.map.getComponent('MapController').map;
        this.destination = {
            row: data['destination'][0],
            col: data['destination'][1]
        };
        this.currentLevel = data['level'];
        this.diceMovingSteps = [];
    },

    setupDice(pos) {
        this.diceResult = 6;
        this.tilesMap = this.map.getComponent("MapController").tiles;
        this.node.position = this.tilesMap[pos[0]][pos[1]].position;
        this.node.x+=40;
        this.node.y-=40;
        this.currentDicePos = {
            row: pos[0],
            col: pos[1]
        };
        this.diceMovingSteps = [];
    },

    moveDice(event, direction, isUndo = false) {
        this.tilesMap = this.map.getComponent("MapController").tiles;
        if (this.isMovingDice) return;
        this.btnHolder.active = false;
        let col = this.currentDicePos.col;
        let row = this.currentDicePos.row;
        if (!isUndo) {
            this.diceMovingSteps.push(direction);
        }
        const oldDiceFace=this.dice.diceFace;
        switch (Number(direction)) {
            case DICE_DIRECTION.LEFT:
                Emitter.instance.emit('dice')
                if (col > 0) {
                    col -= 1;
                    this.Left();
                    this.node.angle=270;
                }
                break;
            case DICE_DIRECTION.RIGHT:
                Emitter.instance.emit('dice')
                if (col < this.newMap.cols - 1) {
                    col += 1;
                    this.Right()
                    this.node.angle=90;
                }
                break;
            case DICE_DIRECTION.UP:
                Emitter.instance.emit('dice')
                if (row > 0) {
                    row -= 1;
                    this.Up()
                    this.node.angle=180;
                }
                break;
            case DICE_DIRECTION.DOWN:
                Emitter.instance.emit('dice')
                if (row < this.newMap.rows - 1) {
                    row += 1;
                    this.Down()
                }
                break;
        }
        const newDiceFace=this.dice.diceFace;
        this.node.getComponent(cc.Animation).play(`${oldDiceFace} to ${newDiceFace}`);
        this.lastMove = direction;
        this.currentDicePos = {
            row,
            col
        };
        this.isMovingDice = true;
        if (-1 < row < this.newMap.rows && -1 < col < this.newMap.cols) {
            const targetPosition = this.tilesMap[row][col].position;
            targetPosition.x+=40;
            targetPosition.y-=40;
            if (targetPosition) {
                this.node.runAction(cc.sequence(
                    cc.moveTo(0.3, targetPosition),
                    cc.callFunc(() => {
                        this.countMove--;
                        this.moves.getComponent(cc.Label).string = `${this.countMove}/${this._totalMove}`;
                        if (row === this.newMap.destination[0] && col === this.newMap.destination[1] && this.getDiceFace() === this.diceResult) {
                            this.playEndGame(true);
                        }
                        else if (row === this.destination.row && col === this.destination.col && this.getDiceFace() != this.diceResult) {
                            this.playEndGame();
                        }else if(this.countMove === 0){
                            Emitter.instance.emit('GAME_OVER', this.currentLevel);
                            this.isMovingDice = false;
                        } else {
                            this.isMovingDice = false;
                        }
                        this.showBtnDirection();                    
                        this.node.angle=0;
                    })
                ));
            }
            else {
                cc.error("ô trên không hợp lệ.");
            }
        }
    },

    undoMove() {
        if (this.isMovingDice ) return;
        this.moves.active = false;
        if (!this.diceMovingSteps || !this.diceMovingSteps.length || !this.diceMovingSteps[this.diceMovingSteps.length - 1]) {
            cc.error("Không có lượt chơi trước");
            return;
        }
        this.countMove++ ;
        this.moves.getComponent(cc.Label).string = `${this.countMove}/${this._totalMove}`;
        const direction = this.diceMovingSteps.pop();
        switch (Number(direction)) {
            case DICE_DIRECTION.LEFT:
                this.moveDice(null, DICE_DIRECTION.RIGHT, true);
                this.countMove++ ;
                break;
            case DICE_DIRECTION.RIGHT:
                this.moveDice(null, DICE_DIRECTION.LEFT, true);
                this.countMove++ ;
                break;
            case DICE_DIRECTION.UP:
                this.moveDice(null, DICE_DIRECTION.DOWN, true);
                this.countMove++ ;
                break;
            case DICE_DIRECTION.DOWN:
                this.moveDice(null, DICE_DIRECTION.UP, true);
                this.countMove++ ;
                break;
        } 
    },

    playEndGame(isWin) {
        this.onBlackHole();
        this.node.runAction(cc.sequence(
            cc.delayTime(1),
            cc.callFunc(() => {
                if (isWin) {
                    Emitter.instance.emit('COMPLETE_LEVEL', this.currentLevel);
                    this.node.active = false;
                } else {
                    Emitter.instance.emit('GAME_OVER', this.currentLevel);
                    this.node.active = false;
                };
                this.isMovingDice = false;
                this.btnHolder.active = false;
                this.showBtnDirection();
            })
        ));
    },

    onBlackHole() {
        Emitter.instance.emit('blackHole')
        this.node.oldAnchorX = this.node.anchorX;
        this.node.oldAnchorY = this.node.anchorY;
        this.node.anchorX = 0.5;
        this.node.anchorY = 0.5;
        this.btnHolder.active = false;
        let rotateAction = cc.rotateBy(1, 360).repeatForever();
        let scaleAction = cc.scaleTo(1, 0, 0);
        let spawnAction = cc.spawn(rotateAction, scaleAction);
        this.node.runAction(cc.sequence(
            spawnAction,
            cc.callFunc(() => {
                this.node.scale = 1;
                this.node.angle = 0;
                this.node.anchorX = this.node.oldAnchorX;
                this.node.anchorY = this.node.oldAnchorY;
            })
        ));
    },
    showBtnDirection() {
        if(this.isMovingDice) return;
        this.btnHolder.active = true;
        this.btnHolder.emit("UPDATE_BTN_CONTROLLER", this.currentDicePos, this.newMap.cols, this.newMap.rows, this.newMap);
        this.btnHolder.emit("UPDATE_DICE_COLOR", this.currentDicePos, this.destination, this.getFacesText(), this.diceResult);
        this.onDiceFaces();
    },

    onDiceFaces() {
        this.diceFace = this.getFacesText().map((str, index) => {
            this.btnHolder.emit("UPDATE_DICE_NUMBER", str, index + 1);
        });
    },

    changeAtlas(index) {
        this.node.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrames()[index];
    },

    Left() {
        this._indexDice = this.dice.Left();
        this.changeAtlas(this._indexDice);
    },
    Right() {
        this._indexDice = this.dice.Right();
        this.changeAtlas(this._indexDice);
    },
    Up() {
        this._indexDice = this.dice.Up();
        this.changeAtlas(this._indexDice);
    },
    Down() {
        this._indexDice = this.dice.Down();
        this.changeAtlas(this._indexDice);
    },

    getFacesText() {
        return this.dice.setFacesText()
    },

    resetDiceFace() {
        this.dice = new Dice([0, 3, 0],
            [5, 1, 2],
            [0, 4, 0]);
        this._indexDice = 0,
            this.changeAtlas(this._indexDice);
    },
    getDiceFace() {
        return this.dice.diceFace;
    },

});