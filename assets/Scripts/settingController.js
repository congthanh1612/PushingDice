const Emitter = require("mEmitter")
cc.Class({
    extends: cc.Component,

    properties: {
        musicSlider:cc.Slider,
        soundSlider:cc.Slider,
        musicAudio:cc.AudioSource,
        loginPage:cc.Layout,
        pausePage:cc.Layout

    },
    onLoad () {
        this.musicSlider.node.on('slide', this.onSendMusicSliderChange,this);
    },

    start () {

    },
    onBack(){
        this.node.active = false;
        this.loginPage.node.active = true;
    },

    onPauseButtonBoard(){
        this.pausePage.node.active = true;
    },

    onSendMusicSliderChange(event) {
        const newVolume = event.progress;
        this.musicAudio.volume = newVolume;
        Emitter.instance.emit('musicVolumeChangedFromScript2', newVolume);
    },

    // update (dt) {},
});
