const Emitter = require("mEmitter")
cc.Class({
    extends: cc.Component,

    properties: {
        playButton: cc.Button,
        backButton: cc.Button,
        soundSliderPrefab: cc.Slider,
        musicSliderPrefab: cc.Slider,
        LoginPage: cc.Layout,
        musicAudio: cc.AudioSource,
        musicLabel: cc.Label,
        musicButton: cc.Button,

        musicButtonOffSprite: cc.SpriteFrame,
        musicButtonOnSprite: cc.SpriteFrame,
    },
    onLoad() {
        this.musicSliderPrefab.node.on('slide', this.onSendMusicSliderChange, this);
        this.musicButton.node.on('click', this.onMusicPauseButtonClick, this);

    },

    start() {

    },

    onBack() {
        this.node.active = false;
    },

    onSendMusicSliderChange(event) {
        const newVolume = event.progress;
        this.musicAudio.volume = newVolume;
        this.musicLabel.string = newVolume.toFixed(1) * 10;
        Emitter.instance.emit('musicVolumeChanged', newVolume);
    },

    onMusicPauseButtonClick() {
        const currentValue = this.musicSliderPrefab.progress;
        const newValue = (currentValue === 0) ? 1 : 0;
        const spriteFrame = (newValue === 0) ? this.musicButtonOffSprite : this.musicButtonOnSprite;
        if (newValue === 0) {
            this.musicButton.getComponent(cc.Sprite).spriteFrame = this.musicButtonOffSprite;
        } else {
            this.musicButton.getComponent(cc.Sprite).spriteFrame = this.musicButtonOnSprite;
        }
        this.musicSliderPrefab.progress = newValue;
        this.musicAudio.volume = newValue;
        this.musicLabel.string = newValue.toFixed(1) * 10;
        Emitter.instance.emit('musicVolumeChanged', { volume: newValue, spriteFrame: spriteFrame });
    },

    // update (dt) {},
});