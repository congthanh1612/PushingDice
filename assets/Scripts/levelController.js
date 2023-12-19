cc.Class({
    extends: cc.Component,

    properties: {
        loginScreen: cc.Node,
        levelUnlock: cc.SpriteFrame,
        content: cc.Node,
        prefabLevel: cc.Prefab,
        scrollView: cc.ScrollView,
        _countLevel: 50
    },
    
    onLoad() {
        this._countLevel = 50;
        this.hideScrollBar();
    },

    onBack() {
        this.node.active = false;
        this.loginScreen.active = true;
    },

    loadLevel() {
        this.content.removeAllChildren();
        cc.sys.localStorage.removeItem('unlock');
        var retrievedValue = cc.sys.localStorage.getItem('unlock');
        if (retrievedValue == null) retrievedValue = 1;

        for (let i = 0; i < this._countLevel; i++) {
            let newLevel = cc.instantiate(this.prefabLevel);
            for (let j = 0; j < retrievedValue; j++) {
                if (i == j) {
                    newLevel.getComponent(cc.Sprite)._spriteFrame = this.levelUnlock;
                    newLevel.children[0].active = true;
                    newLevel.children[0].getComponent(cc.Label).string = i + 1;
                    continue;
                }
            }
            this.content.addChild(newLevel);
        }
    },

    hideScrollBar() {
        this.scrollView.verticalScrollBar = null;
    }
});