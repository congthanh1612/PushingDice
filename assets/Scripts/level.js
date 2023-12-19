const Emitter = require('mEmitter');

cc.Class({
    extends: cc.Component,

    properties: {},

    selectedLevel() {
        let isLock = this.node.children[0].active;
        if (isLock) {
            let levelNumber = this.node.children[0].getComponent(cc.Label).string;
            levelNumber = parseInt(levelNumber) - 1;
            Emitter.instance.emit('SELECTED_LEVEL', levelNumber);
        }
    }, 
});