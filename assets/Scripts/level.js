const Emitter = require('mEmitter');

cc.Class({
    extends: cc.Component,

    properties: {
        levelLock: cc.SpriteFrame,
        levelUnlock: cc.SpriteFrame,
    },

    start() {
        Emitter.instance.registerEvent('COMPLETE_LEVEL', this.onCompleteLevel.bind(this));
    },

    selectedLevel() {
        let isLock = this.node.children[0].active;
        if (isLock) {
            let level = this.node.name;
            Emitter.instance.emit('SELECTED_LEVEL', level);
        }
    },

    onCompleteLevel(data) {
        if (data.levelUnlock == this.node.name) {
            this.node.children[0].active = true;
            this.node.getComponent(cc.Sprite)._spriteFrame = this.levelUnlock;
        }
    }
});

// Color unlock: new cc.Color(53, 150, 255); #3596FF
// Color lock: new cc.Color(29, 82, 139); #1D528B