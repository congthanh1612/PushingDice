const Emitter = require('mEmitter');

cc.Class({
    extends: cc.Component,

    properties: {
        levelScreen: cc.Node,
        gameScreen: cc.Node,

    },

    onLoad() {
        cc.view.setResizeCallback(() => {
            this.adjustSize();
        });
        this.adjustSize();
        Emitter.instance = new Emitter();
        Emitter.instance.registerEvent('SELECTED_LEVEL', this.onSelectedLevel.bind(this));
        Emitter.instance.registerEvent('COMPLETE_LEVEL', this.onUnlockNextLevel.bind(this));
    },

    onSelectedLevel(data) {
        this.levelScreen.active = false;
        // this.gameScreen.getComponent('gameController')._level = data;
        this.gameScreen.active = true;

        let length = this.gameScreen.children.length;
        for (let i = 0; i < length; i++) {
            let name = this.gameScreen.children[i]._name;
            if (name == data) {
                this.gameScreen.children[i].active = true;
            }
        }
    },
    onUnlockNextLevel() {
        this.gameScreen.active = false;
        this.levelScreen.active = true;
    },
    adjustSize() {
        let screenSize = cc.view.getVisibleSize();
        let ratio = screenSize.width / screenSize.height;

        let targetRatio = 18 / 9;
        let newWidth = screenSize.width;
        let newHeight = screenSize.height;

        if (ratio < targetRatio) {
            newHeight = screenSize.width / targetRatio;
        } else {
            newWidth = screenSize.height * targetRatio;
        }
        this.node.width = newWidth;
        this.node.height = newHeight;
    },
});
