
cc.Class({
    extends: cc.Component,

    properties: {
        nameEditBox:cc.EditBox,
        playButton:cc.Button,
        settingButton:cc.Button,
        settingPage:cc.Layout,
        levelScreen: cc.Node
    },
    onLoad () {},

    start () {

    },

    onSubmit(){
        this.player ={
            namePlayer:this.nameEditBox.string,
        }
        this.node.active = false;
        this.levelScreen.getComponent('levelController').loadLevel();
        this.levelScreen.active = true;
    },
    onShowSettingPage(){
        this.nameEditBox.enabled = false;
        this.node.opacity = 108;
        this.settingPage.node.active = true;
    },
    onHideSettingPage(){
        this.nameEditBox.enabled = true;
        this.settingPage.node.active = false;
        this.node.opacity = 255;
    }
    // update (dt) {},
});
