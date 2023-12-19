
const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        soundClick:{
            type: cc.AudioClip,
            default:null },
        musicAudio:{
            type: cc.AudioClip,
            default:null },
        
    },

    onLoad () {
        Emitter.instance.registerEvent('clickSound',this.onSoundButton.bind(this));
        Emitter.instance.registerEvent('playMusic',this.onPlay.bind(this));
    },
    onSoundButton(){
        cc.audioEngine.playEffect(this.soundClick,false);
        let volumeLocal=cc.sys.localStorage.getItem('volumeSound');
        if(volumeLocal==null)volumeLocal=1;
        cc.audioEngine.setEffectsVolume(volumeLocal/10);
    },
    onPlay(){
        cc.audioEngine.playMusic(this.musicAudio, true);
        let musicLocal = cc.sys.localStorage.getItem('volumeMusic');
        if(musicLocal==null)musicLocal=1;
        cc.audioEngine.setMusicVolume(musicLocal/10);
    },
    start () {

    },

    // update (dt) {},
});
