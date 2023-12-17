const Emitter = require("mEmitter")
cc.Class({
    extends: cc.Component,

    properties: {
        musicSlider: cc.Slider,
        soundSlider: cc.Slider,
        musicAudio: cc.AudioSource,
        loginPage: cc.Layout,
        pausePage: cc.Layout,
        musicLabel: cc.Label,
        musicButton:cc.Button,
        musicButtonOffSprite:cc.SpriteFrame,
        musicButtonOnSprite:cc.SpriteFrame,
        soundClick:cc.AudioClip,

    },
    onLoad() {
        this.musicSlider.node.on('slide', this.onSendMusicSliderChange, this);
        this.musicButton.node.on('click', this.onMusicButtonClick, this);

    },

    start() {

    },
    onBack() {
        this.node.active = false;
        this.loginPage.node.active = true;
    },

    onPauseButtonBoard() {
        this.pausePage.node.active = true;
    },

    onSendMusicSliderChange(event) {
        const newVolume = event.progress;
        this.musicAudio.volume = newVolume;
        this.musicLabel.string = newVolume.toFixed(1) * 10;
        const spriteFrame = (newVolume === 0) ? this.musicButtonOffSprite : this.musicButtonOnSprite;
        if (newVolume === 0) {
            console.log(this.musicButton.node);
            this.musicButton.getComponent(cc.Sprite).spriteFrame = this.musicButtonOffSprite;
        } else {
            this.musicButton.getComponent(cc.Sprite).spriteFrame = this.musicButtonOnSprite;
        }
        Emitter.instance.emit('musicVolumeChangedFromScript2', { volume: newVolume, spriteFrame: spriteFrame });
    },
    onMusicButtonClick() {
        Emitter.instance.emit("clickSound",this.soundClick);
        const currentValue = this.musicSlider.progress;
        const newValue = (currentValue === 0) ? 1 : 0;
        const spriteFrame = (newValue === 0) ? this.musicButtonOffSprite : this.musicButtonOnSprite;
        if (newValue === 0) {
            console.log(this.musicButton.node);
            this.musicButton.getComponent(cc.Sprite).spriteFrame = this.musicButtonOffSprite;
        } else {
            this.musicButton.getComponent(cc.Sprite).spriteFrame = this.musicButtonOnSprite;
        }
        this.musicSlider.progress = newValue;
        this.musicAudio.volume = newValue;
        this.musicLabel.string = newValue.toFixed(1) * 10;
        Emitter.instance.emit('musicVolumeChangedFromScript2',{ volume: newValue, spriteFrame: spriteFrame });
    },

    // update (dt) {},
});
