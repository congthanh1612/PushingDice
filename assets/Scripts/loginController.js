const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        levelScreen:cc.Node,
        soundSlider:cc.Slider,
        soundLabel:cc.Label,
        soundButton:cc.Button,
        soundButtonOffSprite:cc.SpriteFrame,
        soundButtonOnSprite:cc.SpriteFrame,
    },
    onLoad () {
        this.soundSlider.node.on('slide',this.onChangeSound.bind(this))
        this.soundButton.node.on('click', this.onButtonClickSound, this);
    },
    onChangeSound(){
        const volume = this.soundSlider.progress.toFixed(1) * 10
        cc.sys.localStorage.setItem('volumeSound',volume)
        this.soundLabel.string = volume;
        const spriteFrame = (volume === 0) ? this.soundButtonOffSprite : this.soundButtonOnSprite;
        this.soundButton.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        cc.sys.localStorage.setItem('spriteFrame', this.soundButton.getComponent(cc.Sprite).spriteFrame.name)
        return volume;
    },
    onButtonClickSound(){
        Emitter.instance.emit("clickSound");
        const currentValue = this.onChangeSound();
        const newValue = (currentValue === 0) ? 1 : 0;
        const spriteFrame = (newValue === 0) ? this.soundButtonOffSprite : this.soundButtonOnSprite;
        if (newValue === 0) {
            this.soundButton.getComponent(cc.Sprite).spriteFrame = this.soundButtonOffSprite;
            cc.sys.localStorage.setItem('spriteFrame', this.soundButtonOffSprite.name)
            cc.log(this.soundButtonOffSprite.name)
        } else {
            this.soundButton.getComponent(cc.Sprite).spriteFrame = this.soundButtonOnSprite;
            cc.sys.localStorage.setItem('spriteFrame', this.soundButtonOnSprite.name)
            cc.log(this.soundButtonOnSprite.name)
        }
        this.soundSlider.progress = newValue;
        this.soundLabel.string = newValue.toFixed(1) * 10;
        cc.sys.localStorage.setItem('volumeSound',newValue.toFixed(1) * 10)
        return spriteFrame
    },
    loadDataSound(){
        let volumeLocal=cc.sys.localStorage.getItem('volumeSound');
        let spriteFrameName = cc.sys.localStorage.getItem('spriteFrame')
        cc.log(spriteFrameName);
        if(volumeLocal==null)volumeLocal=10;
        this.soundLabel.string=volumeLocal;
        if (spriteFrameName === this.soundButtonOnSprite.name) {
            this.soundButton.getComponent(cc.Sprite).spriteFrame = this.soundButtonOnSprite;
        } else if (spriteFrameName === this.soundButtonOffSprite.name) {
            this.soundButton.getComponent(cc.Sprite).spriteFrame = this.soundButtonOffSprite;
        } else {
            cc.error("Sprite frame not found:", spriteFrameName);
        }
        this.soundSlider.progress=volumeLocal/10;
    },
    onSubmit(){
        Emitter.instance.emit("clickSound");
        this.node.active = false;
        this.levelScreen.getComponent('levelController').loadLevel();
        this.levelScreen.active = true;
    },
});
