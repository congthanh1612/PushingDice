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
        },
        levelWin:{
            type:cc.AudioClip,
            default:null,
        },
        levelLose:{
            type:cc.AudioClip,
            default:null,
        },
        startRound:{
            type:cc.AudioClip,
            default:null,
        },
        reload:{
            type:cc.AudioClip,
            default:null,
        },
        back:{
            type:cc.AudioClip,
            default:null,
        },
    },
    onLoad() {
        Emitter.instance.registerEvent('clickSound', this.onSoundButton.bind(this));
        Emitter.instance.registerEvent('playMusic', this.onPlayMainMenu.bind(this));
        Emitter.instance.registerEvent('playMusicIngame', this.onPlayIngame.bind(this));
        Emitter.instance.registerEvent('changeVolume', this.onChangeVolume.bind(this));
        Emitter.instance.registerEvent('dice', this.onDiceRolling.bind(this));
        Emitter.instance.registerEvent('blackHole', this.onBlackHole.bind(this));
        Emitter.instance.registerEvent('levelWin', this.onlevelWin.bind(this));
        Emitter.instance.registerEvent('levelLose', this.onlevelLose.bind(this));
        Emitter.instance.registerEvent('startRound', this.onStartRound.bind(this));
        Emitter.instance.registerEvent('reload', this.onReload.bind(this));
        Emitter.instance.registerEvent('back', this.onBack.bind(this));
        this.onPlayMainMenu();
    },
    onSoundButton() {
        cc.audioEngine.playEffect(this.soundClick, false);
        let volumeLocal = cc.sys.localStorage.getItem('volumeSound');
        if (volumeLocal == null) volumeLocal = 10;
        cc.audioEngine.setEffectsVolume(volumeLocal / 10);
    },
    onReload() {
        cc.audioEngine.playEffect(this.reload, false);
        let volumeLocal = cc.sys.localStorage.getItem('volumeSound');
        if (volumeLocal == null) volumeLocal = 10;
        cc.audioEngine.setEffectsVolume(volumeLocal / 10);
    },
    onBack() {
        cc.audioEngine.playEffect(this.back, false);
        let volumeLocal = cc.sys.localStorage.getItem('volumeSound');
        if (volumeLocal == null) volumeLocal = 10;
        cc.audioEngine.setEffectsVolume(volumeLocal / 10);
    },
    onlevelWin() {
        cc.audioEngine.playEffect(this.levelWin, false);
        let volumeLocal = cc.sys.localStorage.getItem('volumeSound');
        if (volumeLocal == null) volumeLocal = 10;
        cc.audioEngine.setEffectsVolume(volumeLocal/3);
    },
    onlevelLose() {
        cc.audioEngine.playEffect(this.levelLose, false);
        let volumeLocal = cc.sys.localStorage.getItem('volumeSound');
        if (volumeLocal == null) volumeLocal = 10;
        cc.audioEngine.setEffectsVolume(volumeLocal / 10);
    },
    onStartRound() {
        cc.audioEngine.playEffect(this.startRound, false);
        let volumeLocal = cc.sys.localStorage.getItem('volumeSound');
        if (volumeLocal == null) volumeLocal = 10;
        cc.audioEngine.setEffectsVolume(volumeLocal / 10);
    },
    onBlackHole() {
        cc.audioEngine.playEffect(this.blackHole, false);
        let volumeLocal = cc.sys.localStorage.getItem('volumeSound');
        if (volumeLocal == null) volumeLocal = 10;
        cc.audioEngine.setEffectsVolume(volumeLocal / 12);
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
        if (musicLocal == null) musicLocal = 10;
        cc.audioEngine.setMusicVolume(musicLocal / 10);
    },
    onDiceRolling() {
        cc.audioEngine.playEffect(this.diceRolling, false);
        let volumeLocal = cc.sys.localStorage.getItem('volumeSound');
        if (volumeLocal == null) volumeLocal = 10;
        cc.audioEngine.setEffectsVolume(volumeLocal / 5);
    },
});
