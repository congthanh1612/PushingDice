
const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        soundClick: {
            type: cc.AudioClip,
            default: null
        },
        musicAudio: {
            type: cc.AudioClip,
            default: null
        },
        musicAudioInGame: {
            type: cc.AudioClip,
            default: null
        },
        diceRolling:{
            type:cc.AudioClip,
            default:null,
        },
        blackHole:{
            type:cc.AudioClip,
            default:null,
        }
        
        

    },

    onLoad() {
        Emitter.instance.registerEvent('clickSound', this.onSoundButton.bind(this));
        Emitter.instance.registerEvent('playMusic', this.onPlayMainMenu.bind(this));
        Emitter.instance.registerEvent('playMusicIngame', this.onPlayIngame.bind(this));
        Emitter.instance.registerEvent('changeVolume', this.onChangeVolume.bind(this));
        Emitter.instance.registerEvent('dice', this.onDiceRolling.bind(this));
        Emitter.instance.registerEvent('blackHole', this.onBlackHole.bind(this));

        this.onPlayMainMenu();
    },
    onSoundButton() {
        cc.audioEngine.playEffect(this.soundClick, false);
        let volumeLocal = cc.sys.localStorage.getItem('volumeSound');
        if (volumeLocal == null) volumeLocal = 1;
        cc.audioEngine.setEffectsVolume(volumeLocal / 10);
    },
    onBlackHole() {
        cc.audioEngine.playEffect(this.blackHole, false);
        let volumeLocal = cc.sys.localStorage.getItem('volumeSound');
        if (volumeLocal == null) volumeLocal = 1;
        cc.audioEngine.setEffectsVolume(volumeLocal / 10);
    },
    onPlayMainMenu() {
        cc.audioEngine.playMusic(this.musicAudio, true);
        this.onChangeVolume();
    },
    onPlayIngame() {
        cc.audioEngine.playMusic(this.musicAudioInGame, true);
        this.onChangeVolume();
    },
    onChangeVolume() {
        let musicLocal = cc.sys.localStorage.getItem('volumeMusic');
        if (musicLocal == null) musicLocal = 1;
        cc.audioEngine.setMusicVolume(musicLocal / 10);
    },
    onDiceRolling() {
        cc.audioEngine.playEffect(this.diceRolling, false);
        let volumeLocal = cc.sys.localStorage.getItem('volumeSound');
        if (volumeLocal == null) volumeLocal = 1;
        cc.audioEngine.setEffectsVolume(volumeLocal / 10);
    },
});
