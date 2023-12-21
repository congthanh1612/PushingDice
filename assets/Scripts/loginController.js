const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        nameEditBox:cc.EditBox,
        playButton:cc.Button,
        settingButton:cc.Button,
        settingPage:cc.Layout,
        levelScreen:cc.Node,
        warningLabel:cc.Label,
        soundSlider:cc.Slider,
        soundLabel:cc.Label,
        soundButton:cc.Button,
        soundButtonOffSprite:cc.SpriteFrame,
        soundButtonOnSprite:cc.SpriteFrame,
        title:cc.Label,

    },
    onLoad () {
        this.soundSlider.node.on('slide',this.onChangeSound.bind(this))
        this.soundButton.node.on('click', this.onButtonClickSound, this);
    },

    start () { 

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
        if(volumeLocal==null)volumeLocal=1;
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
    onShowSettingPage(){
        Emitter.instance.emit("clickSound");
        this.nameEditBox.enabled = false;
        this.node.opacity = 108;
        this.loadDataSound();
        this.settingPage.getComponent('settingController').loadDataMusic();
        this.settingPage.node.active = true;
        let buttons = this.node.getComponentsInChildren(cc.Button);
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].interactable = false;
        }
    },
    onHideSettingPage(){
        Emitter.instance.emit("clickSound");
        this.nameEditBox.enabled = true;
        this.settingPage.node.active = false;
        this.node.opacity = 255;
        let buttons = this.node.getComponentsInChildren(cc.Button);
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].interactable = true;
    }
    }
});
