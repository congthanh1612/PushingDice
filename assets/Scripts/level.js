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
            let level = this.node.name;
            Emitter.instance.emit('SELECTED_LEVEL', level);
            // window.globalData = {
            //     selectedLevel: this.node.name,
            // };
        }
    }, 

    playEffect() {
        if (this.soundEffect[0]) {
            audioEngine.playEffect(this.soundEffect[0], false);
        }
    },
});