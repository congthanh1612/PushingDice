import { checkArrayInArray2D } from './CheckValue.js';
cc.Class({
    extends: cc.Component,
    properties: {
        atlas: [cc.SpriteAtlas],
        prefabs: [cc.Prefab],
        tiles: [cc.Node]
    },

    // onLoad () {},

    start() {

    },
    renderMap(map) {
        this.destroyChildrenNode();
        this.tiles = [];
        for (let row = 0; row < map.y; row++) {
            this.tiles.push([])
            for (let col = 0; col < map.x; col++) {
                let newTile = cc.instantiate(this.prefabs[0]);
                this.tiles[row].push(newTile);
                newTile.parent = this.node;
                newTile.x = 100 * col;
                newTile.y = 100 * (map.x - row);
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
            }
        }
    },

    destroyChildrenNode() {
        let oldElement = this.node.children;
        for (let index = 0; index < oldElement.length; ++index) {
            oldElement[index].destroy();
        }
        this.node.removeAllChildren();

    },

    checkHaveSetWall(id, walls) {
        for (let i = 0; i < walls.length; i++) {
            const currentArray = walls[i];
            cc.log(currentArray);
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
