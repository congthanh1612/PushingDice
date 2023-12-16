import { checkArrayInArray2D } from './CheckValue.js';
cc.Class({
    extends: cc.Component,
    properties: {
        atlas: [cc.SpriteAtlas],
        prefabs: [cc.Prefab],
        tiles: [cc.Node],
        spriteDestination:cc.SpriteFrame
    },

    // onLoad () {},

    start() {

    },
    renderMap(map) {
        this.destroyChildrenNode();
        this.tiles = [];
        for (let row = 0; row < map.rows; row++) {
            this.tiles.push([])
            for (let col = 0; col < map.cols; col++) {
                let newTile = cc.instantiate(this.prefabs[0]);
                this.tiles[row].push(newTile);
                newTile.parent = this.node;
                newTile.x = 80 * col;
                newTile.y = 80 * (map.cols - row);
                let id = [row,col];
                if (checkArrayInArray2D(id,map.wallLeft)) {
                    newTile.getChildByName('left').active = true;
                }
                if (checkArrayInArray2D(id,map.wallRight)) {
                    newTile.getChildByName('right').active = true;
                }
                if (checkArrayInArray2D(id,map.wallTop)) {
                    newTile.getChildByName('top').active = true;
                }
                if (checkArrayInArray2D(id,map.wallBottom)) {
                    newTile.getChildByName('bottom').active = true;
                }
                if(id[0]==map.destination[0]&&id[1]==map.destination[1]){ 
                    newTile.getComponent(cc.Sprite).spriteFrame=this.spriteDestination;
                    newTile.getChildByName('EndHoleText').active = true;
                }
            }
        }
        
        return [map.start[0],map.start[1]];
    },

    destroyChildrenNode() {
        let oldElement = this.node.children;
        for (let index = 0; index < oldElement.length; ++index) {
            if(oldElement[index].name=="Element")oldElement[index].destroy();
        }
    },

    checkHaveSetWall(id, walls) {
        for (let i = 0; i < walls.length; i++) {
            const currentArray = walls[i];
            if (currentArray.length === id.length) {
                let isEqual = true;
                for (let j = 0; j < currentArray.length; j++) {
                    if (currentArray[j] !== id[j]) {
                        isEqual = false;
                        break;
                    }
                }
                if (isEqual) {
                    return true;
                }
            }
        }
        return false;
    }
});
