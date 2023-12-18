const Emitter = require('mEmitter');
const audioEngine = cc.audioEngine;

cc.Class({
    extends: cc.Component,

    properties: {
        soundEffect: {
            default: [],
            type: [cc.AudioClip],
        },
    },

    selectedLevel() {
        let isLock = this.node.children[0].active;
        if (isLock) {
            this.playEffect();
            let levelNumber = this.node.children[0].getComponent(cc.Label).string
            Emitter.instance.emit('SELECTED_LEVEL', levelNumber);
        }
    }, 

    playEffect() {
        if (this.soundEffect[0]) {
            audioEngine.playEffect(this.soundEffect[0], false);
        }
    },
});