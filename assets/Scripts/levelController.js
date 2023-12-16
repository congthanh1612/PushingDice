const Emitter = require('mEmitter');

cc.Class({
    extends: cc.Component,

    properties: {
        startScreen: cc.Layout,
    },

    onBack(){
        this.node.active = false;
        this.startScreen.node.active = true;
    }
});