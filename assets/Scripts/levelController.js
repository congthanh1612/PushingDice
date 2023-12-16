var levelsUnlock = ['Level 1'];

cc.Class({
    extends: cc.Component,

    properties: {
        gameScreen: cc.Node,
        levelUnlock: cc.SpriteFrame,
        loginPage:cc.Node,

    },

    onBack() {
        this.node.active = false;
        this.loginPage.active = true;
    },

    onLoad() {
        this.loadLevels();
        //this.unlockLevel();
    },

    loadLevels() {
        let length = this.node.children[1].children.length;
        for (let i = 0; i < levelsUnlock.length; i++) {
            for (let j = 0; j < length; j++) {
                let name = this.node.children[1].children[j].name;
                let levelNode = this.node.children[1].children[j];
                if (name == levelsUnlock[i]) {
                    levelNode.children[0].active = true;
                    levelNode.getComponent(cc.Sprite)._spriteFrame = this.levelUnlock;
                }
            }
        }
    },

    unlockLevel() {
        const unlockLevel = window.globalData.unlockLevel;
        if (levelsUnlock.indexOf(unlockLevel) === -1) {
            levelsUnlock.push(unlockLevel);
        }
        this.loadLevels();
    },
});