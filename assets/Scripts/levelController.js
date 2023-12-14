const Emitter = require('mEmitter');

cc.Class({
    extends: cc.Component,

    properties: {
        startScreen: cc.Node,
    },

    onBack(){
        this.node.active = false;
        this.startScreen.active = true;
    }
});