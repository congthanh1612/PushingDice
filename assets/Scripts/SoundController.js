
const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        soundClick:{
            type: cc.AudioClip,
            default:null },
        musicSlider: cc.Slider,
        musicSliderPrefab: cc.Slider,
        musicAudio: cc.AudioSource,
        musicLabelSetting: cc.Label,
        musicLabelPause: cc.Label,
        musicButtonSetting: cc.Button,
        musicButtonPause: cc.Button,
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Emitter.instance.registerEvent('clickSound',this.onSoundButton.bind(this));
        Emitter.instance.registerEvent('playMusic',this.onPlay.bind(this));



        Emitter.instance.registerEvent('musicVolumeChanged', this.onReceiveChangeMusic.bind(this));

        Emitter.instance.registerEvent('musicVolumeChangedFromScript2', this.onChangeMusic.bind(this));
    },
    onSoundButton(){
        cc.audioEngine.playEffect(this.soundClick,false);
        let volumeLocal=cc.sys.localStorage.getItem('volumeSound');
        if(volumeLocal==null)volumeLocal=1;
        cc.audioEngine.setEffectsVolume(volumeLocal/10);
    },
    onPlay(){
        this.musicAudio.play();
    },


    onChangeMusic(data) {
        this.musicSliderPrefab.progress = data.volume;
        this.musicAudio.volume = data.volume;
        this.musicLabelPause.string = data.volume.toFixed(1) * 10;
        this.musicButtonPause.getComponent(cc.Sprite).spriteFrame = data.spriteFrame;
    },

    onReceiveChangeMusic(data) {
        this.musicSlider.progress = data.volume;
        this.musicAudio.volume = data.volume;
        this.musicLabelSetting.string = data.volume.toFixed(1) * 10;
        this.musicButtonSetting.getComponent(cc.Sprite).spriteFrame = data.spriteFrame;
    },
    start () {

    },

    // update (dt) {},
});
