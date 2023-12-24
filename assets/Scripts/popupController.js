const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        loginPage:cc.Node,
        gameScreen:cc.Node,
        LevelScreen:cc.Node,
        SettingMain:cc.Node,
        SettingIngame:cc.Node,
        popupGameWin: cc.Node,
        popupGameOver: cc.Node,
        tutorialPopup: cc.Node,
    },
    onLoad(){
        Emitter.instance.registerEvent('COMPLETE_LEVEL', this.showPopupGameWin.bind(this));
        Emitter.instance.registerEvent('GAME_OVER', this.showPopupGameOver.bind(this));
    },
    showPopupGameWin() {
        Emitter.instance.emit('levelWin')
        this.blockButton();
        this.popupGameWin.active = true;
    },
    showPopupGameOver() {
        Emitter.instance.emit('levelLose')
        this.blockButton();
        this.popupGameOver.active = true;
    },
    onShowSettingPage() {
        Emitter.instance.emit("clickSound");
        this.loginPage.opacity = 108;
        this.loginPage.getComponent('loginController').loadDataSound();
        this.SettingMain.getComponent('settingController').loadDataMusic();
        this.SettingMain.active = true;
        let buttons = this.loginPage.getComponentsInChildren(cc.Button);
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].interactable = false;
        }
    },
    onHideSettingPage() {
        Emitter.instance.emit("clickSound");
        this.SettingMain.active = false;
        this.loginPage.opacity = 255;
        let buttons = this.loginPage.getComponentsInChildren(cc.Button);
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].interactable = true;
        }
    },
    onBackGame() {
        Emitter.instance.emit("clickSound");
        this.unblockButton();
        this.gameScreen.opacity = 255;
        this.SettingIngame.active = false;
    },
    blockButton() {
        let buttons = this.gameScreen.getComponentsInChildren(cc.Button);
        this.gameScreen.opacity = 108
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].interactable = false;
        }
    },
    unblockButton(){
        let buttons = this.gameScreen.getComponentsInChildren(cc.Button);
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].interactable = true;
        }
    },
    onPauseButtonBoard() {
        Emitter.instance.emit("clickSound");
        this.SettingIngame.getComponent('pausePageController').loadData();
        this.SettingIngame.getComponent('pausePageController').loadDataMusic();
        let buttons = this.gameScreen.getComponentsInChildren(cc.Button);
        this.gameScreen.opacity = 108;
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].interactable = false;
        }
        this.SettingIngame.active = true;
    },
    closeTutorial(){
        Emitter.instance.emit("clickSound");
        this.tutorialPopup.active= false;
        this.unblockButton();
    },
    onTutorialPopup() {
        Emitter.instance.emit("clickSound");
        this.tutorialPopup.active = true;
        this.blockButton();
    },
});
