
cc.Class({
    extends: cc.Component,

    properties: {
        nameEditBox:cc.EditBox,
        playButton:cc.Button,
        settingButton:cc.Button,
        settingPage:cc.Layout,
        levelScreen:cc.Node,
        warningLabel:cc.Label,

    },
    onLoad () {
        this.nameEditBox.node.on(cc.Node.EventType.TOUCH_START, this.onEditBoxClick, this);

    },
    onEditBoxClick() {
        this.warningLabel.node.active = false;
    },

    start () {

    },

    onSubmit(){
        if(this.nameEditBox.string === ""){
            return this.warningLabel.node.active = true;
        }
        this.player ={
            namePlayer:this.nameEditBox.string,
        }
        this.node.active = false;
        this.levelScreen.active = true;
        
    },
    onShowSettingPage(){
        this.nameEditBox.enabled = false;
        this.node.opacity = 108;
        this.settingPage.node.active = true;
        let buttons = this.node.getComponentsInChildren(cc.Button);
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].interactable = false;
        }
    },
    onHideSettingPage(){
        this.nameEditBox.enabled = true;
        this.settingPage.node.active = false;
        this.node.opacity = 255;
        let buttons = this.node.getComponentsInChildren(cc.Button);
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].interactable = true;
    }
    }
    // update (dt) {},
});
