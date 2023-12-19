import { devNull } from "os";
import { checkArrayInArray2D,readFile } from "./otherProcessing.js";
var Map = require('Map');
cc.Class({
    extends: cc.Component,
    properties: {
        atlas: [cc.SpriteAtlas],
        prefabs: [cc.Prefab],
        tiles: [cc.Node],
        spriteDestination: cc.SpriteFrame,
        map:null
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
                let id = [row, col];
                if (checkArrayInArray2D(id, map.wallLeft)) {
                    newTile.getChildByName('left').active = true;
                }
                if (checkArrayInArray2D(id, map.wallRight)) {
                    newTile.getChildByName('right').active = true;
                }
                if (checkArrayInArray2D(id, map.wallTop)) {
                    newTile.getChildByName('top').active = true;
                }
                if (checkArrayInArray2D(id, map.wallBottom)) {
                    newTile.getChildByName('bottom').active = true;
                }
                if (id[0] == map.destination[0] && id[1] == map.destination[1]) {
                    newTile.getComponent(cc.Sprite).spriteFrame = this.spriteDestination;
                    newTile.getChildByName('EndHoleText').active = true;
                }
            }
        }

        return [map.start[0], map.start[1]];
    },

    destroyChildrenNode() {
        let oldElement = this.node.children;
        for (let index = 0; index < oldElement.length; ++index) {
            if (oldElement[index].name == "Element") oldElement[index].destroy();
        }
    },

    createMapWithCsv(data){
        console.log('aaa',data)
        this.map=new Map();
        this.map.setWall(data["wallLeft"], 'left');
        this.map.setWall(data["wallRight"], 'right')
        this.map.setWall(data["wallTop"], 'top')
        this.map.setWall(data["wallBottom"], 'bottom')
        this.map.setStart(data["start"][0],data["start"][1]);
        this.map.setDestination(data["destination"][0],data["destination"][1]);
        return this.map
    },
    
});