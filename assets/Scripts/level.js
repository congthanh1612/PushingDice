const Emitter = require('mEmitter');
const audioEngine = cc.audioEngine;

cc.Class({
    extends: cc.Component,

    properties: {},

    selectedLevel() {
        let isLock = this.node.children[0].active;
        if (isLock) {
            let levelNumber = this.node.children[0].getComponent(cc.Label).string;
            levelNumber = parseInt(levelNumber) - 1;
            console.log(levelNumber);
            Emitter.instance.emit('SELECTED_LEVEL', levelNumber);
        }
    }, 
});