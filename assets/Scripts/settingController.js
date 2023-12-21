const Emitter = require("mEmitter")
cc.Class({
    extends: cc.Component,

    properties: {
        musicSlider: cc.Slider,
        soundSlider: cc.Slider,
        loginPage: cc.Layout,
        pausePage: cc.Layout,
        musicLabel: cc.Label,
        musicButton: cc.Button,
        musicButtonOffSprite: cc.SpriteFrame,
        musicButtonOnSprite: cc.SpriteFrame,
        gameScreen:cc.Node,
        levelScreen:cc.Node,


    },
    onLoad() {
        this.musicSlider.node.on('slide', this.onSendMusicSliderChange, this);
        this.musicButton.node.on('click', this.onMusicButtonClick, this);

    },

    start() {

    },

    onPauseButtonBoard() {
        Emitter.instance.emit("clickSound");
        this.pausePage.getComponent('pausePageController').loadData();
        this.pausePage.getComponent('pausePageController').loadDataMusic();
        let buttons = this.gameScreen.getComponentsInChildren(cc.Button);
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].interactable = false;
        }
        this.pausePage.node.active = true;
    },

    onSendMusicSliderChange() {
        Emitter.instance.emit("changeVolume");
        const newVolume = this.musicSlider.progress.toFixed(1) * 10
        cc.sys.localStorage.setItem('volumeMusic', newVolume)
        this.musicLabel.string = newVolume;
        const spriteFrame = (newVolume === 0) ? this.musicButtonOffSprite : this.musicButtonOnSprite;
        this.musicButton.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        cc.sys.localStorage.setItem('spriteFrameMusic', this.musicButton.getComponent(cc.Sprite).spriteFrame.name)
    },
    onMusicButtonClick() {
        Emitter.instance.emit("clickSound");
        const currentValue = this.musicSlider.progress;
        const newValue = (currentValue === 0) ? 1 : 0;
        console.log(newValue);
        if (newValue === 0) {
            this.musicButton.getComponent(cc.Sprite).spriteFrame = this.musicButtonOffSprite;
            cc.sys.localStorage.setItem('spriteFrameMusic', this.musicButtonOffSprite.name)
        } else {
            this.musicButton.getComponent(cc.Sprite).spriteFrame = this.musicButtonOnSprite;
            cc.sys.localStorage.setItem('spriteFrameMusic', this.musicButtonOnSprite.name)
        }
        this.musicSlider.progress = newValue;
        this.musicLabel.string = newValue.toFixed(1) * 10;
        cc.sys.localStorage.setItem('volumeMusic', newValue.toFixed(1) * 10);
        Emitter.instance.emit("changeVolume");
    },

    loadDataMusic() {
        let volumeLocal = cc.sys.localStorage.getItem('volumeMusic');
        let spriteFrameName = cc.sys.localStorage.getItem('spriteFrameMusic')
        if (volumeLocal == null) volumeLocal = 1;

        if (spriteFrameName == null) spriteFrameName = this.musicButtonOffSprite;
        this.musicLabel.string = volumeLocal;
        if (spriteFrameName === this.musicButtonOnSprite.name) {
            this.musicButton.getComponent(cc.Sprite).spriteFrame = this.musicButtonOnSprite;
        } else if (spriteFrameName === this.musicButtonOffSprite.name) {
            this.musicButton.getComponent(cc.Sprite).spriteFrame = this.musicButtonOffSprite;
        } else {
            cc.error("Sprite frame not found:", spriteFrameName);
        }
        this.musicSlider.progress = volumeLocal / 10;
    }
});
