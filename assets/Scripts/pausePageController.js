const Emitter = require("mEmitter")
cc.Class({
    extends: cc.Component,

    properties: {
        playButton:cc.Button,
        backButton:cc.Button,
        soundSliderPrefab :cc.Slider,
        musicSliderPrefab:cc.Slider,
        LoginPage:cc.Layout,
        musicLabel:cc.Label,
        musicButton:cc.Button,

        musicButtonOffSprite:cc.SpriteFrame,
        musicButtonOnSprite:cc.SpriteFrame,
        LevelScreen:cc.Node,
        gamePage:cc.Node,

        soundSliderPause:cc.Slider,
        soundLabelPause:cc.Label,
        soundButtonPause:cc.Button,
        soundButtonOffSprite:cc.SpriteFrame,
        soundButtonOnSprite:cc.SpriteFrame,
    },
    onLoad() {
        this.musicSliderPrefab.node.on('slide', this.onSendMusicSliderChange,this);
        this.musicButton.node.on('click', this.onMusicPauseButtonClick, this);

        this.soundSliderPause.node.on('slide',this.onChangeSound.bind(this))
        this.soundButtonPause.node.on('click', this.onButtonClickSound, this);
    },

    onChangeSound(){
        const volume = this.soundSliderPause.progress
        cc.sys.localStorage.setItem('volumeSound',volume.toFixed(1) * 10)
        this.soundLabelPause.string = volume.toFixed(1) * 10;
        const spriteFrame = (volume === 0) ? this.soundButtonOffSprite : this.soundButtonOnSprite;
        this.soundButtonPause.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        cc.sys.localStorage.setItem('spriteFrame', this.soundButtonPause.getComponent(cc.Sprite).spriteFrame.name)
        return volume;
    },
    
    onButtonClickSound(){
        Emitter.instance.emit("clickSound");
        const currentValue = this.onChangeSound();
        const newValue = (currentValue === 0) ? 1 : 0;
        const spriteFrame = (newValue === 0) ? this.soundButtonOffSprite : this.soundButtonOnSprite;
        if (newValue === 0) {
            this.soundButtonPause.getComponent(cc.Sprite).spriteFrame = this.soundButtonOffSprite;
            cc.sys.localStorage.setItem('spriteFrame', this.soundButtonPause.getComponent(cc.Sprite).spriteFrame.name)
        } else {
            this.soundButtonPause.getComponent(cc.Sprite).spriteFrame = this.soundButtonOnSprite;
            cc.sys.localStorage.setItem('spriteFrame', this.soundButtonPause.getComponent(cc.Sprite).spriteFrame.name)
        }
        this.soundSliderPause.progress = newValue;
        this.soundLabelPause.string = newValue.toFixed(1) * 10;
        cc.sys.localStorage.setItem('volumeSound',newValue.toFixed(1) * 10)
        return spriteFrame
    },
    loadData(){
        let volumeLocal=cc.sys.localStorage.getItem('volumeSound');
        let spriteFrameName = cc.sys.localStorage.getItem('spriteFrame')
        if(volumeLocal==null)volumeLocal=1;
        this.soundLabelPause.string=volumeLocal;
        if (spriteFrameName === this.soundButtonOnSprite.name) {
            this.soundButtonPause.getComponent(cc.Sprite).spriteFrame = this.soundButtonOnSprite;
        } else if (spriteFrameName === this.soundButtonOffSprite.name) {
            this.soundButtonPause.getComponent(cc.Sprite).spriteFrame = this.soundButtonOffSprite;
        } else {
            cc.error("Sprite frame not found:", spriteFrameName);
        }
        this.soundSliderPause.progress=volumeLocal/10;
    },
    start () {

    },

    onBack() {
        Emitter.instance.emit("clickSound");
        this.node.active = false;
    },
    onBackMainMenu(){
        Emitter.instance.emit("clickSound");
        Emitter.instance.emit('playMusic')
        this.node.active = false;
        this.gamePage.active = false;
        this.LevelScreen.active = true;
    },

    onSendMusicSliderChange(event) {
        Emitter.instance.emit("changeVolume");
        const newVolume = event.progress;
        cc.sys.localStorage.setItem('volumeMusic',newVolume.toFixed(1) * 10)
        this.musicLabel.string = newVolume.toFixed(1) * 10;
        const spriteFrame = (newVolume === 0) ? this.musicButtonOffSprite : this.musicButtonOnSprite;
        this.musicButton.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        cc.sys.localStorage.setItem('spriteFrameMusic', this.musicButton.getComponent(cc.Sprite).spriteFrame.name)
    },

    onMusicPauseButtonClick() {
        Emitter.instance.emit("clickSound");
        const currentValue = this.musicSliderPrefab.progress;
        const newValue = (currentValue === 0) ? 1 : 0;
        if (newValue === 0) {
            this.musicButton.getComponent(cc.Sprite).spriteFrame = this.musicButtonOffSprite;
            cc.sys.localStorage.setItem('spriteFrameMusic', this.musicButtonOffSprite.name)
        } else {
            this.musicButton.getComponent(cc.Sprite).spriteFrame = this.musicButtonOnSprite;
            cc.sys.localStorage.setItem('spriteFrameMusic', this.musicButtonOnSprite.name)
        }
        this.musicSliderPrefab.progress = newValue;
        this.musicLabel.string = newValue.toFixed(1) * 10;
        cc.sys.localStorage.setItem('volumeMusic',newValue.toFixed(1) * 10)
        Emitter.instance.emit("changeVolume");
    },
    loadDataMusic(){
        let volumeLocal=cc.sys.localStorage.getItem('volumeMusic');
        let spriteFrameName = cc.sys.localStorage.getItem('spriteFrameMusic')
        if(volumeLocal==null)volumeLocal=1;
        if(spriteFrameName==null)spriteFrameName=this.musicButtonOffSprite;
        this.musicLabel.string=volumeLocal;
        if (spriteFrameName === this.musicButtonOnSprite.name) {
            this.musicButton.getComponent(cc.Sprite).spriteFrame = this.musicButtonOnSprite;
        } else if (spriteFrameName === this.musicButtonOffSprite.name) {
            this.musicButton.getComponent(cc.Sprite).spriteFrame = this.musicButtonOffSprite;
        } else {
            cc.error("Sprite frame not found:", spriteFrameName);
        }
        this.musicSliderPrefab.progress=volumeLocal/10;
    }
});