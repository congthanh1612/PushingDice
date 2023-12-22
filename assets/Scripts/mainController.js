const Emitter = require('mEmitter');

cc.Class({
    extends: cc.Component,

    properties: {
        levelScreen: cc.Node,
        gameScreen: cc.Node,
        content: cc.Node,

        musicSlider: cc.Slider,
        musicSliderPrefab: cc.Slider,
        musicAudio: cc.AudioSource,

        scrollview: cc.ScrollView,
    },

    onLoad() {
        cc.view.setResizeCallback(() => {
            this.adjustSize();
        });
        this.adjustSize();
        this.hideScrollbar();

        Emitter.instance = new Emitter();
        Emitter.instance.registerEvent('SELECTED_LEVEL', this.onSelectedLevel.bind(this));
        Emitter.instance.registerEvent('COMPLETE_LEVEL', this.unlockNextLevel.bind(this));
    },

    onSelectedLevel(data) {
        this.gameScreen.children[0].getComponent('gameController').startGame(data);
        this.levelScreen.active = false;
        this.gameScreen.active = true;
    },

    unlockNextLevel(data) {
        let totalLevel = this.gameScreen.children[0].getComponent('gameController').levels.length;
        let levelUnlock = data + 1;
        var value = cc.sys.localStorage.getItem('unlock');
        value = parseInt(value);

        if (levelUnlock > totalLevel) {
            cc.sys.localStorage.setItem('unlock', data);
            this.levelScreen.children[3].children[1].getComponent(cc.Label).string = 'The game is developing';
            this.levelScreen.children[3].active = true;
            this.scheduleOnce(() => {
                this.levelScreen.children[3].active = false;
            }, 3);
        } else {
            if (data < value) {
                cc.sys.localStorage.setItem('unlock', value);
            } else {
                cc.sys.localStorage.setItem('unlock', levelUnlock);
            }
        }
        this.levelScreen.getComponent('levelController').loadLevel();
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

    hideScrollbar() {
        this.scrollview.horizontalScrollBar = null;
        this.scrollview.verticalScrollBar = null;
    }
});
