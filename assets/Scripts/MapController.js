import { checkArrayInArray2D,readFile } from "./otherProcessing.js";
var Map = require('Map');
cc.Class({
    extends: cc.Component,
    properties: {
        atlas: [cc.SpriteAtlas],
        prefabs: [cc.Prefab],
        tiles: [cc.Node],
        spriteDestination: cc.SpriteFrame,
        loadMap:[cc.TextAsset]
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
                newTile.x = 100 * col;
                newTile.y = 100 * (map.cols - row);
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

    createMapWithCsv(index){
        let data= this.loadMap[index].text;
        cc.log(data)
        data=readFile(data);
        let map=new Map();
        map.setWall(data["wallLeft"], 'left');
        map.setWall(data["wallRight"], 'right')
        map.setWall(data["wallTop"], 'top')
        map.setWall(data["wallBottom"], 'bottom')
        map.setStart(data["start"]);
        map.setDestination(data["destination"]);
        return map
    },
    
});
