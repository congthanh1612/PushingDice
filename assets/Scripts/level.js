const Emitter = require('mEmitter');

cc.Class({
    extends: cc.Component,

    properties: {},

    selectedLevel() {
        Emitter.instance.emit("clickSound");
        let isLock = this.node.children[0].active;
        if (isLock) {
            Emitter.instance.emit("startRound");
            Emitter.instance.emit('playMusicIngame');
            let levelNumber = this.node.children[0].getComponent(cc.Label).string;
            levelNumber = parseInt(levelNumber) - 1;
            Emitter.instance.emit('SELECTED_LEVEL', levelNumber);
        } else {
            this.showNotification();
        }
    },

    getParent() {
        let currentNode = this.node;
        let parentCount = 0;
        while (currentNode.getParent() && parentCount < 4) {
            currentNode = currentNode.getParent();
            parentCount++;
        }
        return currentNode;
    },

    showNotification(){
        this.getParent().children[3].children[1].getComponent(cc.Label).string = 'Levels are not unlocked yet';
        this.getParent().children[3].active = true;
        this.scheduleOnce(() => {
            this.getParent().children[3].active = false;
        }, 3);
    }
});