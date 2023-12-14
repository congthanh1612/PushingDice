const Emitter = require("mEmitter")
cc.Class({
    extends: cc.Component,

    properties: {
        playButton:cc.Button,
        backButton:cc.Button,
        soundSliderPrefab :cc.Slider,
        musicSliderPrefab:cc.Slider,
        LoginPage:cc.Layout,
        musicAudio:cc.AudioSource,
    },
    onLoad() {
        this.musicSliderPrefab.node.on('slide', this.onSendMusicSliderChange,this);
    },

    start () {

    },

    onBack(){
        this.node.active = false;
    },

    onSendMusicSliderChange(event) {
        const newVolume = event.progress;
        this.musicAudio.volume = newVolume;
        Emitter.instance.emit('musicVolumeChanged', newVolume);
    },

    // update (dt) {},
});
