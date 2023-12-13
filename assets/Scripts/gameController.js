var Map = require('Map');
const Emitter = require('mEmitter');

cc.Class({
    extends: cc.Component,

    properties: {
        dice: cc.Node,
        map: cc.Node,
        _level: '',
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
    },

    start() {
        this.log()
    },
    log() {
        let newMap = new Map(6, 8);
        newMap.setWall([[2, 1], [1, 1]], 'bottom');
        this.map.getComponent('MapController').renderMap(newMap)
        cc.log(this.map.getComponent('MapController').tiles)
    },

    onUnlock(){
        let level = this._level;
        let matches = level.match(/\d+/);
        let currentLevel = parseInt(matches[0]);
        let newLevel = currentLevel + 1;
        let levelUnlock = level.replace(/\d+/, newLevel);

        Emitter.instance.emit('COMPLETE_LEVEL', {level, levelUnlock});
    },

    // update (dt) {},
});
