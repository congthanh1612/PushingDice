const Emitter = require("mEmitter");
cc.Class({
    extends: cc.Component,

    properties: {
        musicSlider:cc.Slider,
        musicSliderPrefab:cc.Slider,
        musicAudio:cc.AudioSource,
    },
    onLoad () {
        Emitter.instance = new Emitter();

        Emitter.instance.registerEvent('musicVolumeChanged', this.onReceiveChangeMusic.bind(this));

        Emitter.instance.registerEvent('musicVolumeChangedFromScript2', this.onChangeMusic.bind(this));

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
    start () {

    },

});
