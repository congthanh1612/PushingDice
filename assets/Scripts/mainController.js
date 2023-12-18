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

        Emitter.instance.registerEvent('musicVolumeChanged', this.onReceiveChangeMusic.bind(this));
        Emitter.instance.registerEvent('musicVolumeChangedFromScript2', this.onChangeMusic.bind(this));
    },

    onSelectedLevel(data) {
        console.log(data);
        this.gameScreen.children[0].getComponent('gameController')._level = data;
        this.levelScreen.active = false;
        this.gameScreen.active = true;
        // this.gameScreen.getComponent('gameController').startGame();
    },

    unlockNextLevel(data) {
        cc.sys.localStorage.setItem('unlock', data);
        this.levelScreen.getComponent('levelController').loadLevel();
    },

    onChangeMusic(volume) {
        this.musicSliderPrefab.progress = volume;
        this.musicAudio.volume = volume;
        cc.log('Received music volume change from script 1:', volume);
    },

    onReceiveChangeMusic(volume) {
        this.musicSlider.progress = volume;
        this.musicAudio.volume = volume;
        cc.log('Received music volume change from script 2:', volume);
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
