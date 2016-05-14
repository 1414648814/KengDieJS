/**
 * Created by George on 16/5/12.
 */
//显示失败的界面
function ShowFaildPPanel(yourScene, level, type) {
    //调用插屏广告
    var testJSB = new JSB.JSBinding();
    testJSB.retain();
    testJSB.showFullScreenAd();
    testJSB.release();

    var testJSB = new JSB.JSBinding();
    testJSB.retain();
    var curLevel=0;
    for(var i=0;i<_arr.length;i++) {
        if (_arr[i][0] == level) {
            curLevel=i+1;
        }
    }
    cc.log("now level:" + curLevel);
    testJSB.uploadPassionLevelToUmeng(0,curLevel,3);
    testJSB.release();


    stopAllEffect();
    stopBackgroundMusic();
    playEffect(res.FAIL_SOUNDS);
    cc.log("abcdefg:   " + level);


    var curLevel=0;
    for(var i=0;i<_arr.length;i++) {
        if (_arr[i][0] == level) {
            curLevel=i+1;
        }
    }


    var size = cc.director.getWinSize();
    var bg = new cc.LayerColor(cc.color(0, 0, 0,150), size.width, size.height);
    setPanelAppearAnimation(bg);
    yourScene.addChild(bg, 1000);
    var spriteWithBg = new cc.Sprite("#win_frame.png");
    spriteWithBg.x = size.width/2;
    spriteWithBg.y = size.height/2;
    bg.addChild(spriteWithBg);

    //魂魄
    var ghost=new cc.Sprite("#failure_ghost.png");
    ghost.attr({
        x:705,
        y:145,
        opacity:0
    });
    spriteWithBg.addChild(ghost);


    //人物动画
    var failureMan=new cc.Sprite("#failure_man_07.png");
    failureMan.attr({
        x:545,
        y:190
    });
    var animFrames=[];

    for(var i=1;i<=7;i++){
        var frame=cc.spriteFrameCache.getSpriteFrame("failure_man_0"+i+".png");
        animFrames.push(frame);
    }
    var animation=new cc.Animation(animFrames,0.15);
    var animate=new cc.Animate(animation);
    failureMan.runAction(cc.sequence(animate,cc.callFunc(function(){
        ghost.stopAllActions();
        ghost.runAction(cc.spawn(cc.fadeIn(0.05),cc.place(705,145)));
        ghost.runAction(cc.sequence(cc.moveTo(0.3,cc.p(730,227)),cc.fadeOut(0.1)));
        ghost.runAction(cc.sequence(cc.rotateTo(0.15,5),cc.rotateTo(0.15,0)).repeatForever());
    },this),cc.delayTime(2.4)).repeatForever());

    spriteWithBg.addChild(failureMan);

    //文字说明
    type= type || 0;
    var panelDec = new cc.LabelTTF(_arr[curLevel-1][9+parseInt(type)], getFONT_FZCY_M03SStr(), 30,cc.size(330,150));
    panelDec.attr({
        anchorX:0,
        anchorY:1,
        x:spriteWithBg.getContentSize().width / 2-240,
        y:spriteWithBg.getContentSize().height / 2+90,
        color:cc.color(159,206,236)
    });
    spriteWithBg.addChild(panelDec);

    //改包名去掉分享
//    //吐槽按钮
//    var vomitSlotBtn9Sprite=new cc.Scale9Sprite("com_btn_blue.png");
//    var vomitSlotBtn = new cc.ControlButton(vomitSlotBtn9Sprite);
//    vomitSlotBtn.attr({
//        width:92,
//        height:98,
//        x:spriteWithBg.getContentSize().width/2-170,
//        y:spriteWithBg.getContentSize().height/2-100
//    });
//    vomitSlotBtn.setPreferredSize(cc.size(vomitSlotBtn.width, vomitSlotBtn.height));
//    vomitSlotBtn.addTargetWithActionForControlEvents(this, function(){
//        playEffect(res.BUTTON_SOUNDS);
//        var testJSB = new JSB.JSBinding();
//        testJSB.retain();
//
//        var curLevel=0;
//        for(var i=0;i<_arr.length;i++) {
//            if (_arr[i][0] == level) {
//                curLevel=i+1;
//            }
//        }
//
//        testJSB.showWCImageContent(curLevel,5,_arr[curLevel-1][9+parseInt(type)],curLevel);
//        testJSB.release();
//
//    }, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
//    spriteWithBg.addChild(vomitSlotBtn);
//
//    var vomit_slot_icon = new cc.Sprite("#failure_btn_vomit_slot_icon.png");
//    vomit_slot_icon.x = vomitSlotBtn.width/2-5;
//    vomit_slot_icon.y = vomitSlotBtn.height/2+5;
//    vomitSlotBtn.addChild(vomit_slot_icon);

//    var sendGold  = new cc.Sprite(res.game_send_gold);
//    sendGold.attr({
//        x:vomitSlotBtn.width/2+30,
//        y:vomitSlotBtn.height/2+40
//    });
//    vomitSlotBtn.addChild(sendGold);
//    sendGold.runAction(cc.sequence(cc.scaleTo(0.3,1.15),cc.scaleTo(0.3,1)).repeatForever());


    //再玩一次按钮
    var againBtn9Sprite=new cc.Scale9Sprite("com_btn_blue.png");
    var againBtn = new cc.ControlButton(againBtn9Sprite);
    againBtn.attr({
        width:92,
        height:98,
        x:spriteWithBg.getContentSize().width/2-65,
        y:spriteWithBg.getContentSize().height/2-100
    });
    againBtn.setPreferredSize(cc.size(againBtn.width, againBtn.height));
    againBtn.addTargetWithActionForControlEvents(this, function(){
        stopAllEffect();
        playEffect(res.BUTTON_SOUNDS);
        var scene=sceneList[level-1].sceneName();
        cc.director.runScene(scene);
    }, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
    spriteWithBg.addChild(againBtn);

    var again_icon = new cc.Sprite("#win_btn_again_icon.png");
    again_icon.x = againBtn.width/2-5;
    again_icon.y = againBtn.height/2+5;
    againBtn.addChild(again_icon);


    //获得金币按钮
    if(getLauchCheck()==0&& getAd_Title5_Text() != ""){
    var coinsBtn9Sprite=new cc.Scale9Sprite("com_btn_blue.png");
    var coinsBtn = new cc.ControlButton(coinsBtn9Sprite);
    coinsBtn.attr({
        width:92,
        height:98,
        x:spriteWithBg.getContentSize().width/2+40,
        y:spriteWithBg.getContentSize().height/2-100
    });
    coinsBtn.setPreferredSize(cc.size(coinsBtn.width, coinsBtn.height));
    coinsBtn.addTargetWithActionForControlEvents(this, function(){
        playEffect(res.BUTTON_SOUNDS);
        var testJSB = new JSB.JSBinding();
        testJSB.retain();
        testJSB.openUrl(6,1,getAd_Title5_URL());
        testJSB.release();


    }, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
    spriteWithBg.addChild(coinsBtn);

//    var coins_icon = new cc.Sprite("#failure_btn_coins_icon.png");
//    coins_icon.x = coinsBtn.width/2-3;
//    coins_icon.y = coinsBtn.height/2+5;
//    coinsBtn.addChild(coins_icon);

    var failADTitle = new cc.LabelTTF(getAd_Title5_Text(),getFONT_FZCY_M03SStr(),30);
    failADTitle.x = coinsBtn.width/2-5;
    failADTitle.y = coinsBtn.height/2+7;
    coinsBtn.addChild(failADTitle);
    }




    var listener1 = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            cc.log("begin");
            var target = event.getCurrentTarget();

            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);

            if (cc.rectContainsPoint(rect, locationInNode)) {
                cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                return true;
            }
            return false;
        },
        onTouchMoved: function (touch, event) {

        },
        onTouchEnded: function (touch, event) {
            cc.log("end");
        }
    });
    cc.eventManager.addListener(listener1, bg);

}
//显示胜利的界面
function ShowSuccessPanel(yourScene, level, type) {

    var testJSB = new JSB.JSBinding();
    testJSB.retain();
    testJSB.requestComment();
    testJSB.release();

    var testJSB = new JSB.JSBinding();
    testJSB.retain();

    var curLevel=0;
    for(var i=0;i<_arr.length;i++) {
        if (_arr[i][0] == level) {
            curLevel=i+1;
        }
    }
    cc.log("now level:" + curLevel);
    testJSB.uploadPassionLevelToUmeng(0,curLevel,2);
    testJSB.release();


    stopAllEffect();

    stopBackgroundMusic();
    playEffect(res.SUCCESS_SOUNDS);

    var curLevel=0;
    for(var i=0;i<_arr.length;i++) {
        if (_arr[i][0] == level) {
            curLevel=i+1;
        }
    }

    if(getPassionStatusByLevel(curLevel)!=1){
        setGold(parseInt(getGold() || 0)+10);
        var layers=cc.director.getRunningScene().getChildren();
        if(level!=1)
            layers[1].refreshWithGold();

        ShowGoldChange(yourScene,"+10");
    }


    setPassionStatusByLevel(curLevel,1);
    var size = cc.director.getWinSize();
    var bg = new cc.LayerColor(cc.color(0, 0, 0,150), size.width, size.height);
    setPanelAppearAnimation(bg);
    yourScene.addChild(bg, 1000);
    var spriteWithBg = new cc.Sprite("#win_frame.png");
    spriteWithBg.x = size.width/2;
    spriteWithBg.y = size.height/2;
    bg.addChild(spriteWithBg);


    //人物动画
    var winMan=new cc.Sprite("#win_man_01.png");
    winMan.attr({
        x:425,
        y:195
    });
    var animFrames=[];
    for(var i=1;i<=4;i++){
        var frame=cc.spriteFrameCache.getSpriteFrame("win_man_0"+i+".png");
        animFrames.push(frame);
    }
    var animation=new cc.Animation(animFrames,0.15);
    var animate=new cc.Animate(animation);
    winMan.runAction(animate.repeatForever());
    spriteWithBg.addChild(winMan);


    //文字说明
    var panelDec_word=type?"鄙视花钱过关的人！":_arr[curLevel-1][6];

    var panelDec = new cc.LabelTTF(panelDec_word, getFONT_FZCY_M03SStr(), 30,cc.size(330,150));
    panelDec.attr({
        anchorX:0,
        anchorY:1,
        x:spriteWithBg.getContentSize().width / 2-240,
        y:spriteWithBg.getContentSize().height / 2+90,
        color:cc.color(159,206,236)
    });
    spriteWithBg.addChild(panelDec);

  //改包名去掉分享
//    //炫耀按钮
//    var flauntBtn9Sprite=new cc.Scale9Sprite("com_btn_blue.png");
//    var flauntBtn = new cc.ControlButton(flauntBtn9Sprite);
//    flauntBtn.attr({
//        width:92,
//        height:98,
//        x:spriteWithBg.getContentSize().width/2-170,
//        y:spriteWithBg.getContentSize().height/2-100
//    });
//    flauntBtn.setPreferredSize(cc.size(flauntBtn.width, flauntBtn.height));
//    flauntBtn.addTargetWithActionForControlEvents(this, function(){
//        playEffect(res.BUTTON_SOUNDS);
//
//        cc.log(curLevel + " my level: ");
//
//        var testJSB = new JSB.JSBinding();
//        testJSB.retain();
//
//        var curLevel=0;
//        for(var i=0;i<_arr.length;i++) {
//            if (_arr[i][0] == level) {
//                curLevel=i+1;
//            }
//        }
//        if(type == 1){
//            testJSB.showWCImageContent(curLevel,6,"鄙视花钱过关的人！",curLevel);
//        }else{
//            testJSB.showWCImageContent(curLevel,2,"",curLevel);
//        }
//
//
//        testJSB.release();
//
//
//    }, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
//    spriteWithBg.addChild(flauntBtn);
//
//    var flaunt_icon = new cc.Sprite("#win_btn_flaunt_icon.png");
//    flaunt_icon.x = flauntBtn.width/2-5;
//    flaunt_icon.y = flauntBtn.height/2+5;
//    flauntBtn.addChild(flaunt_icon);

//    var sendGold  = new cc.Sprite(res.game_send_gold);
//    sendGold.attr({
//        x:flauntBtn.width/2+30,
//        y:flauntBtn.height/2+40
//    });
//    flauntBtn.addChild(sendGold);
//    sendGold.runAction(cc.sequence(cc.scaleTo(0.3,1.15),cc.scaleTo(0.3,1)).repeatForever());


    //再玩一次按钮
    var againBtn9Sprite=new cc.Scale9Sprite("com_btn_blue.png");
    var againBtn = new cc.ControlButton(againBtn9Sprite);
    againBtn.attr({
        width:92,
        height:98,
        x:spriteWithBg.getContentSize().width/2-65,
        y:spriteWithBg.getContentSize().height/2-100
    });
    againBtn.setPreferredSize(cc.size(againBtn.width, againBtn.height));
    againBtn.addTargetWithActionForControlEvents(this, function(){
        stopAllEffect();
        playEffect(res.BUTTON_SOUNDS);
        var scene=sceneList[level-1].sceneName();
        cc.director.runScene(scene);
    }, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
    spriteWithBg.addChild(againBtn);

    var again_icon = new cc.Sprite("#win_btn_again_icon.png");
    again_icon.x = againBtn.width/2-5;
    again_icon.y = againBtn.height/2+5;
    againBtn.addChild(again_icon);


    //下一关按钮
    var resumeBtn9Sprite=new cc.Scale9Sprite("com_btn_blue.png");
    var resumeBtn = new cc.ControlButton(resumeBtn9Sprite);
    resumeBtn.attr({
        width:92,
        height:98,
        x:spriteWithBg.getContentSize().width/2+40,
        y:spriteWithBg.getContentSize().height/2-100
    });
    resumeBtn.setPreferredSize(cc.size(resumeBtn.width, resumeBtn.height));
    resumeBtn.addTargetWithActionForControlEvents(this, function(){
        stopAllEffect();
        playEffect(res.BUTTON_SOUNDS);

        if(curLevel+1>9 && !unLock){
            UnlockBuyPanel(yourScene);
        }else{
            if(curLevel<24){
                jumpToSceneByLevel(curLevel+1, _arr, 0);
            }else{
                cc.director.runScene(new PassionScene());
            }
        }

    }, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
    spriteWithBg.addChild(resumeBtn);

    var resume_icon = new cc.Sprite("#win_btn_resume_icon.png");
    resume_icon.x = resumeBtn.width/2;
    resume_icon.y = resumeBtn.height/2+5;
    resumeBtn.addChild(resume_icon);


    var listener1 = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            cc.log("begin");
            var target = event.getCurrentTarget();

            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);

            if (cc.rectContainsPoint(rect, locationInNode)) {
                cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                return true;
            }
            return false;
        },
        onTouchMoved: function (touch, event) {

        },
        onTouchEnded: function (touch, event) {
            cc.log("end");
        }
    });
    cc.eventManager.addListener(listener1, bg);


}
//正常游戏
function ShowNormalGame(yourScene, level,_arr)
{


    yourScene.pauseTheGame();

    pauseAllEffect();
    cc.log("passion game level:"+level);

    playBackgroundMusic("res/music/normal_panel.mp3",true);


    //大背景
    var t=0;
    var size = cc.winSize;
    var bg = new cc.LayerColor(cc.color(0, 0, 0, 150), size.width, size.height);
    setPanelAppearAnimation(bg);
    yourScene.addChild(bg, 1000);
    bg.onEnter();

    var bg1=new cc.Sprite("#normal_game_bg.png");
    bg1.setPosition(cc.p(size.width/2,size.height/2));
    bg.addChild(bg1,0);

    var listener1 = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            cc.log("begin");
            var target = event.getCurrentTarget();

            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);

            if (cc.rectContainsPoint(rect, locationInNode)) {
                cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                return true;
            }
            return false;
        },
        onTouchMoved: function (touch, event) {

        },
        onTouchEnded: function (touch, event) {
            cc.log("end");
        }
    });
    cc.eventManager.addListener(listener1, bg);

    //返回
    var spriteForreturnBtn=new cc.Scale9Sprite("com_btn_red.png");
    var returnBtn =new cc.ControlButton(spriteForreturnBtn);
    returnBtn.setPosition(cc.p(100, 100));
    returnBtn.setPreferredSize(cc.size(92, 98));
    bg.addChild(returnBtn, 1);
    var _level = level;
    returnBtn.addTargetWithActionForControlEvents(bg, function () {
        cc.log(_level+"level2");
        playEffect(res.BUTTON_SOUNDS);
//        yourScene.resumeTheGame();
        resumeAllNode();
//        resumeBackgroundMusic();
//        resumeAllEffect()
//        if(_level>0 && _level<=24){
//            playBackgroundMusic("res/music/music_level_"+(level<10?"0"+level:level)+".mp3",true);
//            cc.log("MUSIC_LEVEL:"+(level<10?"0"+level:level));
//        }
//        bg.removeFromParent();
        stopAllEffect();
        stopBackgroundMusic();
        var curLevel=0;
        for(var i=0;i<_arr.length;i++) {
            if (_arr[i][0] == _level) {
                curLevel=i+1;
            }
        }
        cc.log("current level1:"+curLevel + "another :"+_level);
        jumpToSceneByLevel(curLevel, _arr, 1);


    }, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
    var pauseButton = new cc.Sprite("#pause_btn_back.png");
    pauseButton.setPosition(cc.p(returnBtn.getContentSize().width / 2 - 5, returnBtn.getContentSize().height / 2 + 8));
    returnBtn.addChild(pauseButton, 2);

    //转盘
    var panel = new cc.Sprite("#normal_game_run.png");
    panel.setPosition(size.width / 2, size.height / 2);
    bg.addChild(panel, 5, 0);

    //各关卡评分
    var normal_key=[NORMAL_GAME_STATUS_1,NORMAL_GAME_STATUS_2,NORMAL_GAME_STATUS_3,NORMAL_GAME_STATUS_4];

    for(var i= 0,len=normal_key.length;i<len;i++){
        var normal_game_level=cc.sys.localStorage.getItem(normal_key[i]).split(",")[1] || false;

        if(normal_game_level){
            var normal_game_level_icon=new cc.Sprite("#normal_game_grade_"+normal_game_level.toLowerCase()+".png");
            if(i==0){
                normal_game_level_icon.attr({
                    x:panel.getBoundingBox().width/2+120,
                    y:panel.getBoundingBox().height/2-60,
                    rotation:90
                });
            }
            else if(i==1){
                normal_game_level_icon.attr({
                    x:panel.getBoundingBox().width/2-60,
                    y:panel.getBoundingBox().height/2-120,
                    rotation:180
                });
            }
            else if(i==2){
                normal_game_level_icon.attr({
                    x:panel.getBoundingBox().width/2-120,
                    y:panel.getBoundingBox().height/2+60,
                    rotation:-90
                });
            }
            else if(i==3){
                normal_game_level_icon.attr({
                    x:panel.getBoundingBox().width/2+60,
                    y:panel.getBoundingBox().height/2+120
                });
            }
            panel.addChild(normal_game_level_icon);
        }


    }

    //转盘顶部
    var onThePanel = new cc.Sprite("#lottery_man.png");
    onThePanel.setPosition(cc.p(panel.getPositionX() + 10, panel.getPositionY() + 170));
    bg.addChild(onThePanel, 4);

    //boy的眼睛
    var eye = new cc.Sprite("#lottery_man_eye_01.png");
    eye.setPosition(cc.p(size.width / 2 + 135, size.height / 2 + 220));
    bg.addChild(eye, 100);
    var arr=[];
    for(var i=2;i>0;i--)
    {
        var frame=cc.spriteFrameCache.getSpriteFrame("lottery_man_eye_0" + i + ".png");
        arr.push(frame);
    }
    var eyerun = cc.Animation.create(arr,0.1);
    eye.runAction(cc.Animate.create(eyerun).repeatForever());

    //指针
    var point = new cc.Sprite("#lottery_pointer.png");
    point.setPosition(size.width / 2, size.height / 2);
    bg.addChild(point, 10);

    //特效
    var gameBlink=new cc.Sprite("#normal_game_blink_01.png");
    gameBlink.setAnchorPoint(cc.p(0.5,0));
    gameBlink.setPosition(point.getPosition());
    bg.addChild(gameBlink,9);
    gameBlink.setVisible(false);
    var arr1=[];
    for(var i= 2;i>0;i--)
    {
        var frame=cc.spriteFrameCache.getSpriteFrame("normal_game_blink_0"+i+".png");
        arr1.push(frame);
    }
    gameBlink.runAction(cc.Animate.create(cc.Animation.create(arr1,0.2)).repeatForever());


    //转盘底部
    var underThePanel = new cc.Sprite("#lottery_bottom.png");
    underThePanel.setPosition(cc.p(panel.getPositionX(), panel.getPositionY() - 250));
    bg.addChild(underThePanel, 4);


    //测试四关的按钮
//1
//    var spriteWithmethodBtn1 =new cc.Sprite("#com_btn_blue.png");
//    var scale9SpriteWithmethodBtn1 = new cc.Scale9Sprite("com_btn_blue.png");
//    var methodBtn1 = new cc.ControlButton(scale9SpriteWithmethodBtn1);
//    methodBtn1.setPreferredSize(cc.size(spriteWithmethodBtn1.width, spriteWithmethodBtn1.height));
//    methodBtn1.addTargetWithActionForControlEvents(this, function()
//    {
//        var normalGameScene = new existScene(level);
//        cc.director.runScene(normalGameScene);
//    }.bind(methodBtn1), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
//    methodBtn1.x = size.width/2-300;
//    methodBtn1.y = size.height/2+150;
//    methodBtn1.setTag(1003);
//    bg.addChild(methodBtn1, 6);
//
//
//
//
//    //2
//    var spriteWithmethodBtn2 =new cc.Sprite("#com_btn_blue.png");
//    var scale9SpriteWithmethodBtn2 = new cc.Scale9Sprite("com_btn_blue.png");
//    var methodBtn2 = new cc.ControlButton(scale9SpriteWithmethodBtn2);
//    methodBtn2.setPreferredSize(cc.size(spriteWithmethodBtn2.width, spriteWithmethodBtn2.height));
//    methodBtn2.addTargetWithActionForControlEvents(this, function()
//    {
//        var normalGameScene = new StoneGameScene(level);
//        cc.director.runScene(normalGameScene);
//    }.bind(methodBtn2), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
//    methodBtn2.x = size.width/2-200;
//    methodBtn2.y = size.height/2+150;
//    methodBtn2.setTag(1003);
//    bg.addChild(methodBtn2, 6);
//
//    //3
//    var spriteWithmethodBtn3 =new cc.Sprite("#com_btn_blue.png");
//    var scale9SpriteWithmethodBtn3 = new cc.Scale9Sprite("com_btn_blue.png");
//    var methodBtn3 = new cc.ControlButton(scale9SpriteWithmethodBtn3);
//    methodBtn3.setPreferredSize(cc.size(spriteWithmethodBtn3.width, spriteWithmethodBtn3.height));
//    methodBtn3.addTargetWithActionForControlEvents(this, function()
//    {
//        var normalGameScene = new HelloWorldScene(level);
//        cc.director.runScene(normalGameScene);
//    }.bind(methodBtn3), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
//    methodBtn3.x = size.width/2-100;
//    methodBtn3.y = size.height/2+150;
//    methodBtn3.setTag(1003);
//    bg.addChild(methodBtn3, 6);
//
//    //4
//    var spriteWithmethodBtn4 =new cc.Sprite("#com_btn_blue.png");
//    var scale9SpriteWithmethodBtn4 = new cc.Scale9Sprite("com_btn_blue.png");
//    var methodBtn4 = new cc.ControlButton(scale9SpriteWithmethodBtn4);
//    methodBtn4.setPreferredSize(cc.size(spriteWithmethodBtn4.width, spriteWithmethodBtn4.height));
//    methodBtn4.addTargetWithActionForControlEvents(this, function()
//    {
//        var normalGameScene = new CutFoodScene(level);
//        cc.director.runScene(normalGameScene);
//    }.bind(methodBtn4), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
//    methodBtn4.x = size.width/2;
//    methodBtn4.y = size.height/2+150;
//    methodBtn4.setTag(1003);
//    bg.addChild(methodBtn4, 6);



    //开始按钮
    var startbtn = new cc.Scale9Sprite("com_CPM_btn_buy_frame.png");
    var start=cc.ControlButton.create(startbtn);
    start.setPreferredSize(cc.size(190, 76));
    start.setPosition(underThePanel.getPosition());
    bg.addChild(start, 19);
    start.addTargetWithActionForControlEvents(bg, function () {
        if(gameBlink.isVisible())
            gameBlink.setVisible(false);

        playEffect(res.BUTTON_SOUNDS);
//        cc.eventManager.resumeTarget(pauseThePanel);
        panel.runAction(cc.rotateBy(0.2, 360).repeatForever());
        start.setVisible(false);
        bg.runAction(cc.sequence(cc.callFunc(function () {
//            cc.eventManager.pauseTarget(pauseThePanel);
            panel.runAction(cc.rotateBy(0.2, 360).repeatForever());
        }), cc.delayTime(0.2), cc.callFunc(function () {
            panel.stopAllActions();
            panel.runAction(cc.rotateBy(0.2,360));
        }), cc.delayTime(0.2), cc.callFunc(function () {
            var randNum=Math.ceil(Math.random()*400);
//            var randNum=3;
            var panelRota;
            panel.stopAllActions();
            panelRota=panel.getRotation()%360;
            if(randNum<101)
            {
                panelRunForMoney(panelRota,0,panel);
            }
            else if(randNum<201)
            {
                panelRunForMoney(panelRota, 89, panel);
            }
            else if(randNum<301)
            {
                panelRunForMoney(panelRota, 179, panel);
            }
            else
            {
                panelRunForMoney(panelRota, 269, panel);
            }
            cc.log("随机数",randNum);
        }),cc.delayTime(0.2),cc.callFunc(function(){
            gameBlink.setVisible(true);
            var panelRR=panel.getRotation()%360;
            cc.log(panelRR);
            if(panelRR==359) panelRR=0;
            var normalGameScene = null;
            if(panelRR<45)
            {
                cc.log("坑爹厨房");
                normalGameScene = new CutFoodScene(level);
            }
            else if(panelRR<145)   //45
            {
                cc.log("惊现钢丝");
//                bg.addChild(new StoneGameScene(),100);
                normalGameScene = new HelloWorldScene(level);
            }
            else if(panelRR<230)   //145
            {
                cc.log("穿越火线");
//                bg.addChild(new HelloWorldScene(),100);
                normalGameScene = new StoneGameScene(level);
            }
            else  //230
            {

                cc.log("夹缝求生");
                normalGameScene = new existScene(level);

//            bg.addChild(new CutFoodScene(),100);
            }
            cc.director.runScene(normalGameScene);
            start.setVisible(true);
            t = 0;
        })));
    }, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
    var startWord = new cc.Sprite("#normal_game_btn_play.png");
    startWord.setPosition(cc.p(start.getContentSize().width / 2, start.getContentSize().height / 2));
    start.addChild(startWord, 1);
}


//幸运转转转
function ShowTurnplatePanel(yourScene)    //转转乐
{
    var times=getLottery();
    var touchPosi = null;
    var t = 0;
    var size = cc.winSize;
    var newMoney;
    var moneyPanel;
    var panelOut;
    var isPause=false;

    //加个背景
    var bg = new cc.LayerColor(cc.color(0, 0, 0, 150), size.width, size.height);
    setPanelAppearAnimation(bg);
    yourScene.addChild(bg, 1000);

    var listener1 = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            cc.log("begin");
            var target = event.getCurrentTarget();

            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);

            if (cc.rectContainsPoint(rect, locationInNode)) {
                cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                return true;
            }
            return false;
        },
        onTouchMoved: function (touch, event) {

        },
        onTouchEnded: function (touch, event) {
            cc.log("end");
        }
    });
    cc.eventManager.addListener(listener1, bg);

    if(times>0) {
        //返回按钮
        var spriteForReturnBtn=new cc.Scale9Sprite("com_btn_red.png");
        var  returnBtn=new cc.ControlButton(spriteForReturnBtn);
        returnBtn.setPosition(cc.p(100, 100));
        returnBtn.setPreferredSize(cc.size(92, 98));
        bg.addChild(returnBtn, 1);
        returnBtn.addTargetWithActionForControlEvents(bg, function () {
            playEffect(res.BUTTON_SOUNDS);
            bg.removeFromParent();
        }, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
        var pauseButton = new cc.Sprite("#pause_btn_back.png");
        pauseButton.setPosition(cc.p(returnBtn.getContentSize().width / 2 - 5, returnBtn.getContentSize().height / 2 + 8));
        returnBtn.addChild(pauseButton, 2);

        //转盘
        var panel = new cc.Sprite("#lottery_run.png");
        panel.setPosition(size.width / 2, size.height / 2);
        bg.addChild(panel, 5, 0);

        //转盘顶部
        var onThePanel = new cc.Sprite("#lottery_man.png");
        onThePanel.setPosition(cc.p(panel.getPositionX() + 10, panel.getPositionY() + 170));
        bg.addChild(onThePanel, 4);

        //boy的眼睛
        var eye = new cc.Sprite("#lottery_man_eye_01.png");
        eye.setPosition(cc.p(size.width / 2 + 135, size.height / 2 + 220));
        bg.addChild(eye, 100);
        var arr=[];
        for(var i=2;i>0;i--)
        {
            var frame=cc.spriteFrameCache.getSpriteFrame("lottery_man_eye_0" + i + ".png");
            arr.push(frame);
        }
        var eyerun = cc.Animation.create(arr,0.1);
        eye.runAction(cc.Animate.create(eyerun).repeatForever());

        //金额
        var moneybtn=new cc.Scale9Sprite("game_btn_gold.png");
        var money=cc.ControlButton.create(moneybtn);
        money.setPreferredSize(cc.size(167,76));
        money.setPosition(cc.p(150, size.height - 100));
        bg.addChild(money, 3);
        money.addTargetWithActionForControlEvents(bg, function () {
            playEffect(res.BUTTON_SOUNDS);
            //购买金币
            ShowQuickBuyPanel(bg);
        }, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
        var moneyCount = cc.LabelTTF.create((getGold() || "0"), getFONT_FZCY_M03SStr(), 27);
        moneyCount.setColor(cc.color(84, 43, 25));
        moneyCount.setAnchorPoint(cc.p(0.5,0.5));
        moneyCount.setPosition(cc.p(money.getContentSize().width/2+25, money.getContentSize().height / 2));
        money.addChild(moneyCount, 1);

        //剩余次数
        var lastPanel = new cc.Sprite("#lottery_dialog_box.png");
        lastPanel.setPosition(cc.p(eye.getPositionX() + 180, eye.getPositionY()));
        bg.addChild(lastPanel, 1);
        var tip = cc.LabelTTF.create("还有    次机会喔", getFONT_FZCY_M03SStr(), 26);
        tip.setColor(cc.color(84, 43, 25));
        tip.setPosition(cc.p(lastPanel.getContentSize().width / 2 + 8, lastPanel.getContentSize().height / 2 + 10));
        lastPanel.addChild(tip, 1);
        var tip1 = cc.LabelTTF.create(times, getFONT_FZCY_M03SStr(), 60);
        tip1.setColor(cc.color(211, 27, 37));
        tip1.setPosition(cc.p(tip.getContentSize().width / 2 - 29, tip.getContentSize().height / 2+8));
        tip.addChild(tip1, 1);

        //指针
        var point = new cc.Sprite("#lottery_pointer.png");
        point.setPosition(size.width / 2, size.height / 2);
        bg.addChild(point, 7);

        //转盘底部
        var underThePanel = new cc.Sprite("#lottery_bottom.png");
        underThePanel.setPosition(cc.p(panel.getPositionX(), panel.getPositionY() - 250));
        bg.addChild(underThePanel, 4);

        //暂停按钮
        var pauseThePanelbtn = new cc.Scale9Sprite("com_CPM_btn_buy_frame.png");
        var pauseThePanel=cc.ControlButton.create(pauseThePanelbtn);
        pauseThePanel.setPreferredSize(cc.size(190, 76));
        pauseThePanel.setPosition(underThePanel.getPosition());
        bg.addChild(pauseThePanel, 10);
        pauseThePanel.setVisible(false);
        pauseThePanel.addTargetWithActionForControlEvents(bg, function () {
            bg.runAction(cc.sequence(cc.callFunc(function () {
                playEffect(res.BUTTON_SOUNDS);
                isPause=true;
                cc.eventManager.pauseTarget(pauseThePanel);
                shake3.setVisible(false);
                panel.runAction(cc.rotateBy(0.6, 360).repeatForever());
            }), cc.delayTime(0.9), cc.callFunc(function () {
                panel.runAction(cc.rotateBy(0.8, 360).repeatForever());
            }), cc.delayTime(0.9), cc.callFunc(function () {
                panel.runAction(cc.rotateBy(1, 360).repeatForever());
            }), cc.delayTime(0.9), cc.callFunc(function () {
                panel.runAction(cc.rotateBy(1.2, 360).repeatForever());
            }), cc.delayTime(0.9), cc.callFunc(function () {
                panel.runAction(cc.rotateBy(1.4, 360).repeatForever());
            }), cc.delayTime(0.9), cc.callFunc(function () {
                panel.runAction(cc.rotateBy(1.6, 360).repeatForever());
            }), cc.delayTime(0.9), cc.callFunc(function () {
                panel.runAction(cc.rotateBy(1.8, 360).repeatForever());
            }), cc.delayTime(0.9), cc.callFunc(function () {
                panel.stopAllActions();
                panel.runAction(cc.rotateBy(2,360));
            }), cc.delayTime(2), cc.callFunc(function () {
                var randNum=Math.round(Math.random()*1000);
//                var randNum=555;
                var panelRota;
                panel.stopAllActions();
                panelRota=panel.getRotation()%360;
                if(randNum==500)
                {
                    panelRun(panelRota,176,panel);
                    newMoney=1000;
                }
                else if(randNum==501)
                {
                    if(panelRota<246&&panelRota>148) {
                        panelRun(panelRota, 124, panel);
                    }
                    if(panelRota>246||panelRota<148) {
                        panelRun(panelRota, 225, panel);
                    }
                    newMoney=100;
                }
                else if(randNum==502)
                {
                    if(panelRota<291&&panelRota>98) {
                        panelRun(panelRota, 82, panel);
                    }
                    if(panelRota>246||panelRota<98) {
                        panelRun(panelRota, 270, panel);
                    }
                    newMoney=20;
                }
                else if(randNum<500||randNum>670&&randNum<=1000)
                {
                    if(panelRota<337&&panelRota>62) {  //96.766
                        panelRun(panelRota,45, panel);
                    }
                    if(panelRota>337||panelRota<62) {
                        panelRun(panelRota, 315, panel);
                    }
                    newMoney=5;
                }
                else
                {
                    panelRun(panelRota, 360, panel);
                    newMoney=1;
                }
                cc.log(newMoney);
                cc.log(randNum);
                cc.log(panelRota);
            }),cc.delayTime(2),cc.callFunc(function() {
                if (newMoney == 1) {
                    moneyPanel = new cc.Sprite("#lottery_gold_1.png");
                }
                else if (newMoney == 5) {
                    moneyPanel = new cc.Sprite("#lottery_gold_5.png");
                }
                else if (newMoney == 20) {
                    moneyPanel = new cc.Sprite("#lottery_gold_20.png");
                }
                else if (newMoney == 100) {
                    moneyPanel = new cc.Sprite("#lottery_gold_100.png");
                }
                else {
                    moneyPanel = new cc.Sprite("#lottery_gold_1000.png");
                }
                moneyPanel.setPosition(cc.p(point.getPositionX(),point.getPositionY()-10));
                bg.addChild(moneyPanel, 1000);
                showMoneyTexiao(bg);
            }),cc.delayTime(1.5),cc.callFunc(function(){
                moneyPanel.runAction(cc.sequence(cc.scaleTo(0.5,1.5),cc.spawn(cc.moveTo(1,cc.p(160, size.height - 100)),cc.scaleTo(1,0))));
            }),cc.delayTime(1.5),cc.callFunc(function(){
                times--;
                setLottery(times);
                tip1.setString(times);
                setGold(parseInt(getGold() || 0) + parseInt(newMoney));
                moneyCount.setString(getGold());
                pauseThePanel.setVisible(false);
                start.setVisible(true);
                cc.eventManager.pauseTarget(panel);
                t = 0;
            })));
        }, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
        var pauseWord = new cc.Sprite("#lottery_btn_puase.png");
        pauseWord.setPosition(cc.p(pauseThePanel.getContentSize().width / 2, pauseThePanel.getContentSize().height / 2));
        pauseThePanel.addChild(pauseWord, 1);

        //灰色暂停
        var pauseThePanelBtn=new cc.Sprite("#com_CPM_btn_buy_frame_02.png");
        pauseThePanelBtn.setPosition(pauseThePanel.getPosition());
        bg.addChild(pauseThePanelBtn,20);
        pauseThePanelBtn.setVisible(false);
        var pauseWord1 = new cc.Sprite("#lottery_btn_puase.png");
        pauseWord1.setPosition(cc.p(pauseThePanelBtn.getContentSize().width / 2, pauseThePanelBtn.getContentSize().height / 2));
        pauseThePanelBtn.addChild(pauseWord1, 1);

        //开始按钮
        var startbtn = new cc.Scale9Sprite("com_CPM_btn_buy_frame.png");
        var start=cc.ControlButton.create(startbtn);
        start.setPreferredSize(cc.size(190, 76));
        start.setPosition(pauseThePanel.getPosition());
        bg.addChild(start, 19);
        start.addTargetWithActionForControlEvents(bg, function () {
            playEffect(res.BUTTON_SOUNDS);
            if (times > 0) {
                if(moneyPanel!=null)
                    moneyPanel.removeFromParent();
                panelOut=true;
                isPause=false;
                panel.runAction(cc.rotateBy(1, 360).repeatForever());
                cc.eventManager.resumeTarget(panel);
                start.setVisible(false);
                cc.eventManager.pauseTarget(pauseThePanel);
                pauseThePanelBtn.setVisible(true);
                shake2.setVisible(true);
            }
            else {
                cc.eventManager.pauseTarget(start);
                TimeOut(bg,start);
            }
        }, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
        var startWord = new cc.Sprite("#lottery_btn_star.png");
        startWord.setPosition(cc.p(start.getContentSize().width / 2, start.getContentSize().height / 2));
        start.addChild(startWord, 1);

        //再快点
        var shake1 = new cc.Sprite("#lottery_tip_03.png");
        shake1.setPosition(cc.p(panel.getPositionX() + 270, panel.getPositionY() - 50));
        bg.addChild(shake1, 100);
        shake1.runAction(cc.sequence(cc.rotateTo(0.2, 10), cc.rotateTo(0.4, -10)).repeatForever());
        shake1.setVisible(false);

        //快快快
        var shake2 = new cc.Sprite("#lottery_tip_02.png");
        shake2.setPosition(cc.p(panel.getPositionX() + 270, panel.getPositionY() - 50));
        bg.addChild(shake2, 100);
        shake2.runAction(cc.sequence(cc.rotateTo(0.15, 10), cc.rotateTo(0.3, -10)).repeatForever());
        shake2.setVisible(false);

        //疯狂快
        var shake3 = new cc.Sprite("#lottery_tip_01.png");
        shake3.setPosition(cc.p(panel.getPositionX() + 270, panel.getPositionY() - 50));
        bg.addChild(shake3, 100);
        shake3.runAction(cc.sequence(cc.rotateTo(0.1, 10), cc.rotateTo(0.2, -10)).repeatForever());
        shake3.setVisible(false);

        //单点
        var listenForMe = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                touchPosi = touch.getLocation();
                var s = target.getContentSize();
                var rec = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rec, locationInNode)) {
                    if (target.getTag() == 0) {
                        return true;
                    }
                }
                return false;
            },
            onTouchMoved: function (touch, event) {
                if (touchPosi.y - 50 >= touch.getLocationY()) {
                    t+=6;
                }
                cc.log("0" + t);

            },
            onTouchEnded: function (touch, event) {
            }
        });
        cc.eventManager.addListener(listenForMe, panel);
        bg.runAction(cc.callFunc(function () {
            cc.eventManager.pauseTarget(panel);
        }));

        //定时器
        bg.schedule(function (dt) {
//            cc.log(t);
            if (t == 1||t==2||t==3||t==4) {
                cc.log("1" + t);
                t+=4;
                panel.runAction(cc.rotateBy(0.9, 360).repeatForever());
            }
            else if (t >= 20 &&t<=30) {
                cc.log("3" + t);
                t+=11;
                shake2.setVisible(false);
                shake3.setVisible(true);
                var rota = cc.rotateBy(0.3, 360).repeatForever();
                panel.runAction(rota);
            }
            else if (t >60) {
                cc.log("4" + t);
                shake1.setVisible(false);
                shake2.setVisible(false);
                pauseThePanel.setVisible(true);
                pauseThePanelBtn.setVisible(false);
                panelOut=false;
                if(!isPause)
                    cc.eventManager.resumeTarget(pauseThePanel);
                cc.eventManager.pauseTarget(panel);
            }
//            else if(t>62&&panelOut)
//            {
//                bg.unscheduleAllCallbacks();
//                var panelForRemind=new cc.Sprite("#com_tip.png");
//                panelForRemind.setPosition(cc.p(size.width/2,size.height/2));
//                bg.addChild(panelForRemind,100);
//                setPanelAppearAnimation(panelForRemind);
//                var remind=cc.LabelTTF.create("\t\t转盘自己转晕啦！\n点击左下角的返回再来一次吧！",getFONT_FZCY_M03SStr(),29);
//                remind.setPosition(cc.p(panelForRemind.getContentSize().width/2,panelForRemind.getContentSize().height/2));
//                remind.setColor(cc.color(0,0,0,255));
//                panelForRemind.addChild(remind,1);
//            }
        }, 0.001);
    }
    else
    {
        TimeOut(bg);
    }
}

//显示钱的特效
function showMoneyTexiao(theScene)
{
    var size=cc.winSize;
    var kongbai=new cc.Sprite();
    kongbai.setPosition(cc.p(size.width/2,size.height/2));
    theScene.addChild(kongbai,10000);
    var arr=[];
    for(var i=1;i<9;i++)
    {
        var frame=cc.spriteFrameCache.getSpriteFrame("lottery_animtion_0"+i+".png");
        arr.push(frame);
    }
    kongbai.runAction(cc.Animate.create(cc.Animation.create(arr,0.15)));
    theScene.runAction(cc.sequence(cc.delayTime(1.5),cc.callFunc(function(){kongbai.removeFromParent();})));
}
//显示钱run的特效
function panelRunForMoney(panelRota,runRota,panel)
{
    if(panelRota>runRota)
        panelRota-=360;
    cc.log("减少后：",panelRota);
    panel.runAction(cc.rotateBy((runRota-panelRota)*0.2/360,(runRota-panelRota)));
}
//panel运行
function panelRun(panelRota,runRota,panel)
{
    if(panelRota>runRota)
        panelRota-=360;
    panel.runAction(cc.rotateBy((runRota-panelRota)/180,(runRota-panelRota)));
}
//延迟
function TimeOut(your,startbtn)
{
    var size=cc.winSize;
    //蓝色面板
    var bluePanel=new cc.Sprite("#lottery_CPM_frame.png");
    setPanelAppearAnimation(bluePanel);
    bluePanel.setPosition(cc.p(size.width/2,size.height/2));
    your.addChild(bluePanel,100);

    //文字说明
    var word=cc.LabelTTF.create("今天3次的抽奖机会已用完，\n明天再来吧～",getFONT_FZCY_M03SStr(),27);
    word.setColor(cc.color(84, 43, 25));
    word.setPosition(cc.p(bluePanel.getContentSize().width/2,bluePanel.getContentSize().height/2));
    bluePanel.addChild(word,1);

    //按钮
    var btn1=new cc.Scale9Sprite("com_CPM_btn_buy_frame.png");
    var btn=cc.ControlButton.create(btn1);
    btn.setPreferredSize(cc.size(190,76));
    btn.setPosition(cc.p(bluePanel.getContentSize().width/2,0));
    bluePanel.addChild(btn,1);
    btn.addTargetWithActionForControlEvents(your,function(){
        bluePanel.removeFromParent();
        if(startbtn!=null) {
            cc.eventManager.resumeTarget(startbtn);
        }
        else
        {
            your.removeFromParent();

        }
    },cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
    var yesSir=new cc.Sprite("#lottery_btn_ok.png");
    yesSir.setPosition(cc.p(btn.getContentSize().width/2,btn.getContentSize().height/2));
    btn.addChild(yesSir,1);
}

//显示提示界面
function ShowTipsPanel(yourScene, level) {  //提示

    var gold=5;
    if(tipsType==0){
        gold=5;
    }
    else if(tipsType==1){
        gold=20;
    }else{
        gold=30;
    }

    if(parseInt(getGold())>=gold){

        pauseAllNode();
        yourScene.pauseTheGame();
        var size = cc.director.getWinSize();
        var bg = new cc.LayerColor(cc.color(0, 0, 0,150), size.width, size.height);
        setPanelAppearAnimation(bg);
        yourScene.addChild(bg, 1000);

        var panelDec = new cc.Sprite("#tip_frame.png");
        panelDec.attr({
            anchorX:0,
            x:10,
            y:390
        });
        bg.addChild(panelDec,1000);


        var curLevel;
        for(var i=0;i<24;i++){
            if(_arr[i][0]==level){
                curLevel=i+1;
            }
        }

        var layers=cc.director.getRunningScene().getChildren();

        if(tipsType==0){
            setGold(parseInt(getGold())-gold);
            layers[1].tipsLabel.setString("20");
        }
        else if(tipsType==1){
            setGold(parseInt(getGold())-gold);
            layers[1].tipsLabel.setString("30");
        }else{
            setGold(parseInt(getGold())-gold);
        }
        layers[1].refreshWithGold();

        ShowGoldChange(yourScene,("-"+gold));



        var word=_arr[curLevel-1][(tipsType>=3?2:tipsType)+3];
        tipsType++;

        //提示前缀
        if(tipsType>3){
                word = "提示3/3:"+word;
        }else{
            word = "提示"+tipsType+"/3:"+word;
        }



        var panelDec_word = new cc.LabelTTF(word,getFONT_FZCY_M03SStr(),28,cc.size(260,100),cc.TEXT_ALIGNMENT_CENTER);
        panelDec_word.attr({
            x:340,
            y:panelDec.getBoundingBox().height/2
        });
        panelDec.addChild(panelDec_word);





        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                cc.log("begin");
                var target = event.getCurrentTarget();

                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);

                    return true;
                }
                return false;
            },
            onTouchMoved: function (touch, event) {

            },
            onTouchEnded: function (touch, event) {
                cc.log("end");

                var target = event.getCurrentTarget();

                resumeAllNode();
                yourScene.resumeTheGame();
                target.removeFromParent();
            }
        });
        cc.eventManager.addListener(listener1, bg);

    }else{

//        resumeAllNode();
        ShowQuickBuyPanel(yourScene,level,1);
        //测试中
//        setGold(10000);
    }

}
//显示跳过的界面
function ShowSecondComfirmPanel(yourScene, level) { //跳过
    cc.log("abcdefg:   " + level);



    if(cc.sys.os == "Android")
    {
        var size = cc.director.getWinSize();
        var bg = new cc.LayerColor(cc.color(0, 0, 0,150), size.width, size.height);
        setPanelAppearAnimation(bg);
        yourScene.addChild(bg, 1000);
        var spriteWithBg = new cc.Sprite("#com_CPM_frame_01.png");
        spriteWithBg.x = size.width/2;
        spriteWithBg.y = size.height/2;
        bg.addChild(spriteWithBg);

        var panelDec = new cc.Sprite("#skip_title.png");
        panelDec.x = spriteWithBg.getContentSize().width / 2;
        panelDec.y = spriteWithBg.getContentSize().height / 2+168;
        spriteWithBg.addChild(panelDec);

        //消息
        var panelWord=new cc.Sprite("#skip_word.png");
        panelWord.attr({
            x:spriteWithBg.getContentSize().width/2,
            y:spriteWithBg.getContentSize().height/2+20
        });
        spriteWithBg.addChild(panelWord);

        var rmbStr = "";
        var goldStr = "";
        if(cc.sys.os == "iOS"){
            rmbStr = "2";
            goldStr = "80";
        }else{
            rmbStr = "2";
            goldStr = "80";
        }


        var labelForRMB = new cc.LabelTTF(rmbStr, getFONT_FZCY_M03SStr(), 35);
        labelForRMB.x = 110;
        labelForRMB.y = 75;
        labelForRMB.color = cc.color(10, 72, 101);
        panelWord.addChild(labelForRMB);

        var labelForGold = new cc.LabelTTF(goldStr, getFONT_FZCY_M03SStr(), 48);
        labelForGold.x = 155;
        labelForGold.y = 20;
        labelForGold.color = cc.color(212, 63, 63);
        panelWord.addChild(labelForGold);



        //关闭按钮
        var closeBtn9Sprite=new cc.Scale9Sprite("com_CPM_btn_close.png");
        var closeBtn = new cc.ControlButton(closeBtn9Sprite);
        closeBtn.attr({
            x:spriteWithBg.getContentSize().width/2+262,
            y:spriteWithBg.getContentSize().height/2+138
        });
        closeBtn.setPreferredSize(cc.size(44, 44));
        closeBtn.addTargetWithActionForControlEvents(this, function(){
            playEffect(res.BUTTON_SOUNDS);
            resumeAllNode();
            this.getParent().getParent().removeFromParent();
        }.bind(closeBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
        spriteWithBg.addChild(closeBtn);


        //确认按钮
        var affirmBtn9Sprite=new cc.Scale9Sprite("com_CPM_btn_buy_frame.png");
        var affirmBtn = new cc.ControlButton(affirmBtn9Sprite);
        affirmBtn.attr({
            width:190,
            height:76,
            x:spriteWithBg.getContentSize().width/2,
            y:spriteWithBg.getContentSize().height/2-126
        });
        affirmBtn.setPreferredSize(cc.size(affirmBtn.width, affirmBtn.height));
        affirmBtn.addTargetWithActionForControlEvents(this, function(){
            playEffect(res.BUTTON_SOUNDS);



            var testJSB = new JSB.JSBinding();
            testJSB.retain();
            cc.log("跳过");
            testJSB.purchase(1007);
            testJSB.purchaseCallBack = function(i,j){
                resumeAllNode();
                           cc.log("跳过回调");
              setGold(parseInt(getGold() || 0)+parseInt(goldStr));
              cc.log("跳过回调2");
              var layers = cc.director.getRunningScene().getChildren();
              layers[1].refreshWithGold();
              cc.log("跳过回调3");

            ShowGoldChange(layers[1], parseInt(goldStr), 0.1);
                     cc.log("跳过回调4");

                ShowSuccessPanel(yourScene, level,1);
                testJSB.release();
            };
            testJSB.purchaseCallBack2 = function(i,j){
                bg.removeFromParent();
                resumeAllNode();
                testJSB.release();
            };

//            if(parseInt(getGold())>=100) {
//
//                setGold(parseInt(getGold()) - 100);
//                var layers = cc.director.getRunningScene().getChildren();
//                layers[1].refreshWithGold();
//                ShowSuccessPanel(yourScene, level,1);
//
//            }
////            else
////            {
////                ShowQuickBuyPanel(yourScene,level,1);
////            }

            resumeAllNode();
            this.getParent().getParent().removeFromParent();
        }.bind(affirmBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
        spriteWithBg.addChild(affirmBtn);

        var affirm_icon = new cc.Sprite("#skip_btn_buy_icon.png");
        affirm_icon.attr({
            x:affirmBtn.getBoundingBox().width/2,
            y:affirmBtn.getBoundingBox().height/2
        });
        affirmBtn.addChild(affirm_icon);



        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                cc.log("begin");
                var target = event.getCurrentTarget();

                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                    return true;
                }
                return false;
            },
            onTouchMoved: function (touch, event) {

            },
            onTouchEnded: function (touch, event) {
                cc.log("end");
            }
        });
        cc.eventManager.addListener(listener1, bg);


    }
    else {

        if(parseInt(getGold())>=100) {

            setGold(parseInt(getGold()) - 100);
            var layers = cc.director.getRunningScene().getChildren();
            layers[1].refreshWithGold();
            yourScene.pauseTheGame();

            ShowGoldChange(yourScene,"-100",1);

            ShowSuccessPanel(yourScene, level,1);


        }else{
            cc.log("end1");
            ShowQuickBuyPanel(yourScene,level,1);
        }

    }



}
//
function ShowThirdComfirmPanel(yourScene, level) {
    cc.log("abcdefg:   " + level);
    var size = cc.director.getWinSize();
    var bg = new cc.LayerColor(cc.color(0, 0, 0,150), size.width, size.height);
    setPanelAppearAnimation(bg);
    yourScene.addChild(bg, 1000);
    var spriteWithBg = new cc.Sprite("#com_CPM_frame_01.png");
    spriteWithBg.x = size.width/2;
    spriteWithBg.y = size.height/2;
    bg.addChild(spriteWithBg);

    var panelDec = new cc.LabelTTF("确认面板2", "", 38);
    panelDec.x = spriteWithBg.getContentSize().width / 2;
    panelDec.y = spriteWithBg.getContentSize().height / 2+100;
    spriteWithBg.addChild(panelDec);

    //关闭按钮
    var closeBtn9Sprite=new cc.Scale9Sprite("com_CPM_btn_close.png");
    var closeBtn = new cc.ControlButton(closeBtn9Sprite);
    closeBtn.attr({
        width:44,
        height:44,
        x:spriteWithBg.getContentSize().width/2+262,
        y:spriteWithBg.getContentSize().height/2+138
    });
    closeBtn.setPreferredSize(cc.size(closeBtn.width, closeBtn.height));
    closeBtn.addTargetWithActionForControlEvents(this, function(){

        playEffect(res.BUTTON_SOUNDS);
        resumeAllNode();
        this.getParent().getParent().removeFromParent();
    }.bind(closeBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
    spriteWithBg.addChild(closeBtn);



    var listener1 = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            cc.log("begin");
            var target = event.getCurrentTarget();

            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);

            if (cc.rectContainsPoint(rect, locationInNode)) {
                cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                return true;
            }
            return false;
        },
        onTouchMoved: function (touch, event) {

        },
        onTouchEnded: function (touch, event) {
            cc.log("end");
        }
    });
    cc.eventManager.addListener(listener1, bg);


}
//显示快捷购买的按钮
function ShowQuickBuyPanel(yourScene, level, type) {  //快捷购买
    cc.log("abcdefg:   " + level);
    if(level!=null)
        yourScene.pauseTheGame();
    var size = cc.director.getWinSize();
    var bg = new cc.LayerColor(cc.color(0, 0, 0,150), size.width, size.height);
    setPanelAppearAnimation(bg);
    yourScene.addChild(bg, 1000);
    var spriteWithBg = new cc.Sprite("#com_CPM_frame_01.png");
    spriteWithBg.x = size.width/2;
    spriteWithBg.y = size.height/2;
    bg.addChild(spriteWithBg);
    cc.log("abcdefg:   " );

    if(type){
        var panelDec = new cc.Sprite("#add_gold_title_02.png");
    }else{
        var panelDec = new cc.Sprite("#add_gold_title.png");
    }
    panelDec.x = spriteWithBg.getContentSize().width / 2;
    panelDec.y = spriteWithBg.getContentSize().height / 2+168;
    spriteWithBg.addChild(panelDec);
    cc.log("abcdefg:1   " );

    //消息
    var panelWord=new cc.Sprite("#add_gold_word.png");
    panelWord.attr({
        x:spriteWithBg.getContentSize().width/2,
        y:spriteWithBg.getContentSize().height/2+20
    });
    spriteWithBg.addChild(panelWord);
    cc.log("abcdefg:2   ");

    var rmbStr = "";
    var goldStr = "";
    var presentGoldStr = "";
    if(cc.sys.os == "iOS"){
        rmbStr = "1";
        goldStr = "100";
        presentGoldStr = "50";
    }else{
        rmbStr = "1";
        goldStr = "100";
        presentGoldStr = "50";
    }


    var labelForRMB = new cc.LabelTTF(rmbStr, getFONT_FZCY_M03SStr(), 35);
    labelForRMB.x = 45;
    labelForRMB.y = 75;
    labelForRMB.color = cc.color(10, 72, 101);
    panelWord.addChild(labelForRMB);

    var labelForGold = new cc.LabelTTF(goldStr, getFONT_FZCY_M03SStr(), 48);
    labelForGold.x = 255;
    labelForGold.y = 75;
    labelForGold.color = cc.color(212, 63, 63);
    panelWord.addChild(labelForGold);

    var labelForPresentGold = new cc.LabelTTF(presentGoldStr, getFONT_FZCY_M03SStr(), 48);
    labelForPresentGold.x = 130;
    labelForPresentGold.y = 20;
    labelForPresentGold.color = cc.color(212, 63, 63);
    panelWord.addChild(labelForPresentGold);

    if(type){

        var panelWord2=new cc.LabelTTF("您的金币已不足，请补充！",getFONT_FZCY_M03SStr(),36);
        panelWord2.attr({
            x:spriteWithBg.getContentSize().width/2,
            y:spriteWithBg.getContentSize().height/2+80
        });
        spriteWithBg.addChild(panelWord2);

        panelWord.attr({
            y:spriteWithBg.getContentSize().height/2-30
        });
    }

    //关闭按钮
    var closeBtn9Sprite=new cc.Scale9Sprite("com_CPM_btn_close.png");
    var closeBtn = new cc.ControlButton(closeBtn9Sprite);
    closeBtn.attr({
        x:spriteWithBg.getContentSize().width/2+262,
        y:spriteWithBg.getContentSize().height/2+138
    });
    closeBtn.setPreferredSize(cc.size(44, 44));
    closeBtn.addTargetWithActionForControlEvents(this, function(){
        playEffect(res.BUTTON_SOUNDS);
        if(level!=null) {
            resumeAllNode();
            yourScene.resumeTheGame();
        }
        this.getParent().getParent().removeFromParent();
    }.bind(closeBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
    spriteWithBg.addChild(closeBtn);



    //确认按钮
    var clickn=0;
    var affirmBtn9Sprite=new cc.Scale9Sprite("com_CPM_btn_buy_frame.png");
    var affirmBtn = new cc.ControlButton(affirmBtn9Sprite);
    affirmBtn.attr({
        width:190,
        height:76,
        x:spriteWithBg.getContentSize().width/2,
        y:spriteWithBg.getContentSize().height/2-126
    });
    affirmBtn.setPreferredSize(cc.size(affirmBtn.width, affirmBtn.height));
    affirmBtn.addTargetWithActionForControlEvents(this, function(){

        playEffect(res.BUTTON_SOUNDS);

        var size = cc.director.getWinSize();
        if(clickn!=1)
        {
            var bg = new cc.LayerColor(cc.color(0, 0, 0,10), size.width, size.height);
            this.getParent().addChild(bg, 1000);
            bg.setTag(1000);
            clickn=1;
        }


        var testJSB = new JSB.JSBinding();
        testJSB.retain();
        cc.log("快捷购买金币：%d",getGold());
        testJSB.purchase3();
        testJSB.purchaseCallBack = function(i,j){
            bg.removeFromParent();
            setGold(parseInt(getGold() || 0)+150);
            ShowGoldChange(yourScene,"+150");
            var layers=cc.director.getRunningScene().getChildren();
            layers[1].refreshWithGold();
            resumeAllNode();
            layers[2].removeFromParent();
            testJSB.release();
        };
        testJSB.purchaseCallBack2 = function(i,j){
            bg.removeFromParent();
            resumeAllNode();
            testJSB.release();
        };

    }.bind(affirmBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
    spriteWithBg.addChild(affirmBtn);

    var affirm_icon = new cc.Sprite("#add_gold_btn_buy_icon.png");
    affirm_icon.attr({
        x:affirmBtn.getBoundingBox().width/2,
        y:affirmBtn.getBoundingBox().height/2
    });
    affirmBtn.addChild(affirm_icon);


    var listener1 = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            cc.log("begin");
            var target = event.getCurrentTarget();

            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);

            if (cc.rectContainsPoint(rect, locationInNode)) {
                cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                return true;
            }
            return false;
        },
        onTouchMoved: function (touch, event) {

        },
        onTouchEnded: function (touch, event) {
            cc.log("end");
        }
    });
    cc.eventManager.addListener(listener1, bg);


}

//显示攻略的按钮
function ShowStrategyPanel(yourScene, level) {  //攻略
    cc.log("abcdefg:   " + level);
    var size = cc.director.getWinSize();
    var bg = new cc.LayerColor(cc.color(0, 0, 0,150), size.width, size.height);
    setPanelAppearAnimation(bg);
    yourScene.addChild(bg, 1000);
    var spriteWithBg = new cc.Sprite("#com_CPM_frame_01.png");
    spriteWithBg.x = size.width/2;
    spriteWithBg.y = size.height/2;
    bg.addChild(spriteWithBg);

    var panelDec = new cc.Sprite("#strategy_title.png");
    panelDec.x = spriteWithBg.getContentSize().width / 2;
    panelDec.y = spriteWithBg.getContentSize().height / 2+168;
    spriteWithBg.addChild(panelDec);

    //消息
    var panelWord=new cc.Sprite("#strategy_word.png");
    panelWord.attr({
        x:spriteWithBg.getContentSize().width/2,
        y:spriteWithBg.getContentSize().height/2+20
    });
    spriteWithBg.addChild(panelWord);

    var rmbStr = "";
    var goldStr = "";
    if(cc.sys.os == "iOS"){
        rmbStr = "6";
        goldStr = "200";
    }else{
        rmbStr = "4";
        goldStr = "150";
    }


    var labelForRMB = new cc.LabelTTF(rmbStr, getFONT_FZCY_M03SStr(), 35);

    labelForRMB.x = 25;
    labelForRMB.y = 75;
    labelForRMB.color = cc.color(10, 72, 101);
    panelWord.addChild(labelForRMB);

    var labelForGold = new cc.LabelTTF(goldStr, getFONT_FZCY_M03SStr(), 48);
    labelForGold.x = 155;
    labelForGold.y = 20;
    labelForGold.color = cc.color(212, 63, 63);
    panelWord.addChild(labelForGold);

    //关闭按钮
    var closeBtn9Sprite=new cc.Scale9Sprite("com_CPM_btn_close.png");
    var closeBtn = new cc.ControlButton(closeBtn9Sprite);
    closeBtn.attr({
        width:44,
        height:44,
        x:spriteWithBg.getContentSize().width/2+262,
        y:spriteWithBg.getContentSize().height/2+138
    });
    closeBtn.setPreferredSize(cc.size(closeBtn.width, closeBtn.height));
    closeBtn.addTargetWithActionForControlEvents(this, function(){
        playEffect(res.BUTTON_SOUNDS);
        resumeAllNode();
         yourScene.resumeTheGame();

        resumeAllEffect();
        resumeBackgroundMusic();
        cc.log("攻略恢复");
        this.getParent().getParent().removeFromParent();
    }.bind(closeBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
    spriteWithBg.addChild(closeBtn);


    //确认按钮
    var affirmBtn9Sprite=new cc.Scale9Sprite("com_CPM_btn_buy_frame.png");
    var affirmBtn = new cc.ControlButton(affirmBtn9Sprite);
    affirmBtn.attr({
        width:190,
        height:76,
        x:spriteWithBg.getContentSize().width/2,
        y:spriteWithBg.getContentSize().height/2-126
    });
    affirmBtn.setPreferredSize(cc.size(affirmBtn.width, affirmBtn.height));
    affirmBtn.addTargetWithActionForControlEvents(this, function(){//abcd
        playEffect(res.BUTTON_SOUNDS);
        var testJSB = new JSB.JSBinding();
        testJSB.retain();

        testJSB.purchaseCallBack = function(i,j){

          cc.log("攻略购买2");

          setGold(parseInt(getGold() || 0)+parseInt(goldStr));
          ShowGoldChange(affirmBtn.getParent().getParent().getParent(), parseInt(goldStr), 0.1);

            var layers=cc.director.getRunningScene().getChildren();
            layers[1].refreshWithGold();
            setIsBuyCheat(1);
            bg.removeFromParent(true);

            yourScene.resumeTheGame();
            resumeAllNode();
            resumeAllEffect();
            testJSB.release();
        };
        testJSB.purchaseCallBack2 = function(i,j){
            cc.log("shibai攻略purchase4()");
            testJSB.release();
            resumeAllNode();
            resumeAllEffect();
        };
        testJSB.purchase4();
    }.bind(affirmBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
    spriteWithBg.addChild(affirmBtn);

    var affirm_icon = new cc.Sprite("#strategy_buy_icon.png");
    affirm_icon.attr({
        x:affirmBtn.getBoundingBox().width/2,
        y:affirmBtn.getBoundingBox().height/2
    });
    affirmBtn.addChild(affirm_icon);


    var listener1 = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            cc.log("begin");
            var target = event.getCurrentTarget();

            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);

            if (cc.rectContainsPoint(rect, locationInNode)) {
                cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                return true;
            }
            return false;
        },
        onTouchMoved: function (touch, event) {

        },
        onTouchEnded: function (touch, event) {
            cc.log("end");
        }
    });
    cc.eventManager.addListener(listener1, bg);


}
//显示设置的按钮
function ShowSettingPanel(yourScene) {
    var size = cc.director.getWinSize();
    var bg = new cc.LayerColor(cc.color(0, 0, 0,150), size.width, size.height);
    setPanelAppearAnimation(bg);
    yourScene.addChild(bg, 1000);
    var spriteWithBg = new cc.Sprite("#setting_frame.png");
    spriteWithBg.x = size.width/2;
    spriteWithBg.y = size.height/2;
    bg.addChild(spriteWithBg);

    var panelDec = new cc.Sprite("#setting_title.png");
    panelDec.x = spriteWithBg.getContentSize().width / 2+5;
    panelDec.y = spriteWithBg.getContentSize().height / 2+173;
    spriteWithBg.addChild(panelDec);

    //关闭按钮
    var closeBtn9Sprite=new cc.Scale9Sprite("com_btn_purple.png");
    closeBtn = new cc.ControlButton(closeBtn9Sprite);
    closeBtn.attr({
        width:86,
        height:86,
        x:spriteWithBg.getContentSize().width/2+270,
        y:spriteWithBg.getContentSize().height/2+150
    });
    closeBtn.setPreferredSize(cc.size(closeBtn.width, closeBtn.height));
    closeBtn.addTargetWithActionForControlEvents(this, function(){
        playEffect(res.BUTTON_SOUNDS);
//        resumeAllNode();
        this.getParent().getParent().removeFromParent();
    }.bind(closeBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
    spriteWithBg.addChild(closeBtn);

    var close_icon=new cc.Sprite("#com_btn_purple_close.png");
    close_icon.attr({
        x:closeBtn.getBoundingBox().width/2-4,
        y:closeBtn.getBoundingBox().height/2+8
    });
    closeBtn.addChild(close_icon);

    var musicWord=new cc.Sprite("#setting_music_word.png");
    musicWord.attr({
        x:spriteWithBg.getContentSize().width/2-150,
        y:spriteWithBg.getContentSize().height/2+31
    });
    spriteWithBg.addChild(musicWord);

    var musicMan=new cc.Sprite("#setting_music_man.png");
    musicMan.attr({
        x:spriteWithBg.getContentSize().width/2+170,
        y:spriteWithBg.getContentSize().height/2+36
    });
    spriteWithBg.addChild(musicMan);

    //音乐按钮
    var musicBtn_close=new cc.MenuItemImage("#setting_music_btn_close.png");
    var musicBtn_open=new cc.MenuItemImage("#setting_music_btn_open.png");
    musicBtn=new cc.MenuItemToggle(musicBtn_close,musicBtn_open);

    if(getMusicIsOpen()==1){
        musicBtn.setSelectedIndex(1);
    }
    else{
        musicBtn.setSelectedIndex(0);
    }

    musicBtn.setCallback(function(){
        if(getMusicIsOpen()==1){
            setMusicIsOpen(0);
            setSoundOpenOrNot(0);
        }
        else{
            setMusicIsOpen(1);
            setSoundOpenOrNot(1);
        }
    },this);
    var Menu=new cc.Menu(musicBtn);
    Menu.attr({
        x:spriteWithBg.getContentSize().width/2,
        y:spriteWithBg.getContentSize().height/2+31
    });
    spriteWithBg.addChild(Menu);


    //点评按钮
    if(cc.sys.os!="Android"){
        var commentBtn9Sprite=new cc.Scale9Sprite('setting_btn_comment_frame.png');
        commentBtn = new cc.ControlButton(commentBtn9Sprite);
        commentBtn.attr({
            width:128,
            height:74,
            x:spriteWithBg.getContentSize().width/2-170,
            y:spriteWithBg.getContentSize().height/2-130
        });
        commentBtn.setPreferredSize(cc.size(commentBtn.width, commentBtn.height));
        commentBtn.addTargetWithActionForControlEvents(this, function(){
            playEffect(res.BUTTON_SOUNDS);
            var testJSB = new JSB.JSBinding();
            testJSB.retain();
            testJSB.openUrl(5,0,"");
            testJSB.release();

        }.bind(commentBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
        spriteWithBg.addChild(commentBtn);

        var comment_icon=new cc.Sprite("#setting_btn_comment_icon.png");
        comment_icon.attr({
            x:commentBtn.getBoundingBox().width/2-3,
            y:commentBtn.getBoundingBox().height/2+5
        });
        commentBtn.addChild(comment_icon);
    }

//基地单网要去掉
    //关于我们按钮
    var makeBtn9Sprite = new cc.Scale9Sprite('setting_btn_make_frame.png');
    makeBtn = new cc.ControlButton(makeBtn9Sprite);
    makeBtn.attr({
        width:194,
        height:104,
        x:spriteWithBg.getContentSize().width/2,
        y:spriteWithBg.getContentSize().height/2-121
    });
    makeBtn.setPreferredSize(cc.size(makeBtn.width, makeBtn.height));
    makeBtn.addTargetWithActionForControlEvents(this, function(){
        playEffect(res.BUTTON_SOUNDS);
        ShowAboutUsPanel(this.getParent().getParent(), 1);
        if(cc.sys.os!="Android"){
            commentBtn.setEnabled(false);
        }
        feedbackBtn.setEnabled(false);
        musicBtn.setEnabled(false);
        makeBtn.setEnabled(false);
        closeBtn.setEnabled(false);

    }.bind(makeBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
    spriteWithBg.addChild(makeBtn);

    var make_icon=new cc.Sprite("#setting_btn_make_icon.png");
    make_icon.attr({
        x:makeBtn.getBoundingBox().width/2,
        y:makeBtn.getBoundingBox().height/2-8
    });
    makeBtn.addChild(make_icon);

    //投诉按钮
    var feedbackBtn9Sprite=new cc.Scale9Sprite('setting_btn_comment_frame.png');
    feedbackBtn = new cc.ControlButton(feedbackBtn9Sprite);
    feedbackBtn.attr({
        width:128,
        height:74,
        x:spriteWithBg.getContentSize().width/2+170,
        y:spriteWithBg.getContentSize().height/2-130
    });
    feedbackBtn.setPreferredSize(cc.size(feedbackBtn.width, feedbackBtn.height));
    feedbackBtn.addTargetWithActionForControlEvents(this, function(){
        playEffect(res.BUTTON_SOUNDS);
        var testJSB = new JSB.JSBinding();
        testJSB.retain();
        testJSB.showFeedBack();
        testJSB.release();
    }.bind(feedbackBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
    spriteWithBg.addChild(feedbackBtn);

    var feedback_icon=new cc.Sprite("#setting_btn_complaint_icon.png");
    feedback_icon.attr({
        x:feedbackBtn.getBoundingBox().width/2-3,
        y:feedbackBtn.getBoundingBox().height/2+5
    });
    feedbackBtn.addChild(feedback_icon);

    if(cc.sys.os=="Android"){

        makeBtn.attr({
            x:spriteWithBg.getContentSize().width/2,
            y:spriteWithBg.getContentSize().height/2-65
        });


        feedbackBtn.attr({
            x:spriteWithBg.getContentSize().width/2,
            y:spriteWithBg.getContentSize().height/2-165
        });
    }

    //葫芦娃
    var setting_man=new cc.Sprite("#setting_man.png");
    setting_man.attr({
        x:spriteWithBg.getBoundingBox().width/2-55,
        y:spriteWithBg.getBoundingBox().height/2-94
    });
    spriteWithBg.addChild(setting_man);


    var listener1 = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            cc.log("begin");
            var target = event.getCurrentTarget();

            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);

            if (cc.rectContainsPoint(rect, locationInNode)) {
                cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                return true;
            }
            return false;
        },
        onTouchMoved: function (touch, event) {

        },
        onTouchEnded: function (touch, event) {
            cc.log("end");
        }
    });
    cc.eventManager.addListener(listener1, bg);


}
//主界面上面为0，设置界面上面为1
function ShowAboutUsPanel(yourScene, type) {
    var size = cc.director.getWinSize();
//    var bg = new cc.LayerColor(cc.color(0, 0, 0,150), size.width, size.height);
//    yourScene.addChild(bg, 1000);
    //背景
    var bg = new cc.Sprite("#make_bg.png");

    var listener1 = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function (touch, event) {
    cc.log("begin");
    var target = event.getCurrentTarget();

    var locationInNode = target.convertToNodeSpace(touch.getLocation());
    var s = target.getContentSize();
    var rect = cc.rect(0, 0, s.width, s.height);

    if (cc.rectContainsPoint(rect, locationInNode)) {
    cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
    return true;
    }
    return false;
    },
    onTouchMoved: function (touch, event) {

    },
    onTouchEnded: function (touch, event) {
    cc.log("end");
    }
    });
    cc.eventManager.addListener(listener1, bg);



    setPanelAppearAnimation(bg);
    bg.attr({
        x:size.width/2,
        y:size.height/2,
        anchorX:0.5,
        anchorY:0.5
    });
    //展示框
    yourScene.addChild(bg, 1000);
    var spriteWithBg = new cc.Sprite("#make_frame_01.png");
    spriteWithBg.attr({
        x:bg.getContentSize().width/2,
        y:bg.getContentSize().height/2,
        anchorX:0.5,
        anchorY:0.5
    });
    bg.addChild(spriteWithBg);
    //葫芦
    var gourd = new cc.Sprite("#make_title_calabash.png");
    gourd.attr({
        x:spriteWithBg.getContentSize().width/2 - 25,
        y:spriteWithBg.getContentSize().height + 4,
        anchorX:0.5,
        anchorY:0.5
    });
    spriteWithBg.addChild(gourd);
    //关于按钮-true
    var aboutBtn = new cc.Sprite("#make_title_01_frame.png");
    aboutBtn.attr({
        x:spriteWithBg.getContentSize().width/2 - 70,
        y:spriteWithBg.getContentSize().height - 45,
        anchorX:0.5,
        anchorY:0.5
    });
    spriteWithBg.addChild(aboutBtn);
    var abouttest = new cc.Sprite("#make_title_01_us.png");
    abouttest.attr({
        x:aboutBtn.getContentSize().width/2,
        y:aboutBtn.getContentSize().height/2,
        anchorX:0.5,
        anchorY:0.5
    });
    aboutBtn.addChild(abouttest);
    //关于按钮-false
    var aboutBtnF = new cc.Sprite("#make_title_02_frame.png");
    aboutBtnF.attr({
        x:spriteWithBg.getContentSize().width/2 - 70,
        y:spriteWithBg.getContentSize().height - 45,
        anchorX:0.5,
        anchorY:0.5
    });
    aboutBtnF.setVisible(false);
    spriteWithBg.addChild(aboutBtnF);
    var abouttestF = new cc.Sprite("#make_title_02_us.png");
    abouttestF.attr({
        x:aboutBtn.getContentSize().width/2,
        y:aboutBtn.getContentSize().height/2,
        anchorX:0.5,
        anchorY:0.5
    });
    aboutBtnF.addChild(abouttestF);
    //点子提供者-true
    var ideasBtn = new cc.Sprite("#make_title_01_frame.png");
    ideasBtn.attr({
        x:spriteWithBg.getContentSize().width/2 + 110,
        y:spriteWithBg.getContentSize().height - 45,
        anchorX:0.5,
        anchorY:0.5
    });
    ideasBtn.setVisible(false);
    spriteWithBg.addChild(ideasBtn);
    var ideastest = new cc.Sprite("#make_title_01_idea.png");
    ideastest.attr({
        x:ideasBtn.getContentSize().width/2,
        y:ideasBtn.getContentSize().height/2,
        anchorX:0.5,
        anchorY:0.5
    });
    ideasBtn.addChild(ideastest);
    //点子提供者-false
    var ideasBtnF = new cc.Sprite("#make_title_02_frame.png");
    ideasBtnF.attr({
        x:spriteWithBg.getContentSize().width/2 + 110,
        y:spriteWithBg.getContentSize().height - 45,
        anchorX:0.5,
        anchorY:0.5
    });
    spriteWithBg.addChild(ideasBtnF);
    var ideastestF = new cc.Sprite("#make_title_02_idea.png");
    ideastestF.attr({
        x:ideasBtn.getContentSize().width/2,
        y:ideasBtn.getContentSize().height/2,
        anchorX:0.5,
        anchorY:0.5
    });
    ideasBtnF.addChild(ideastestF);

    //关于文字
    var aboutframe;
    if(getLauchCheck()==0){
        aboutframe= new cc.Sprite("#make_about_us_word_02.png");
    }else{
        aboutframe= new cc.Sprite("#make_about_us_word_01.png");
    }
    aboutframe.attr({
        x:spriteWithBg.getContentSize().width/2,
        y:spriteWithBg.getContentSize().height/2 - 25,
        anchorX:0.5,
        anchorY:0.5
    });
    spriteWithBg.addChild(aboutframe);
    //关注按钮
    if(getLauchCheck()==0){
    var FocusBtn9Sprite=new cc.Scale9Sprite('make_about_us_btn_attention.png');
    var FocusBtn = new cc.ControlButton(FocusBtn9Sprite);
    FocusBtn.attr({
        width:128,
        height:74,
        x:aboutframe.getContentSize().width/2,
        y:aboutframe.getContentSize().height/2
    });
    FocusBtn.setPreferredSize(cc.size(FocusBtn.width, FocusBtn.height));
    FocusBtn.addTargetWithActionForControlEvents(this, function(){
        playEffect(res.BUTTON_SOUNDS);
        cc.log("关注");
         var testJSB = new JSB.JSBinding();
         testJSB.retain();
         testJSB.openUrl(7,1,"");
         testJSB.release();
    }.bind(FocusBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
    aboutframe.addChild(FocusBtn);
    }
    //点子背景
    var ideasframe = new cc.Sprite("#make_frame_02.png");
    ideasframe.attr({
        x:spriteWithBg.getContentSize().width/2,
        y:spriteWithBg.getContentSize().height/2 - 50,
        anchorX:0.5,
        anchorY:0.5
    });
    ideasframe.setVisible(false);
    spriteWithBg.addChild(ideasframe);

    var checkpoint = new cc.Sprite("#make_idea_word_level.png");
    checkpoint.attr({
        x:ideasframe.getContentSize().width/2 - 110,
        y:ideasframe.getContentSize().height/2 + 100,
        anchorX:0.5,
        anchorY:0.5
    });
    ideasframe.addChild(checkpoint);

    var name = new cc.Sprite("#make_idea_word_name.png");
    name.attr({
        x:ideasframe.getContentSize().width/2 + 100,
        y:ideasframe.getContentSize().height/2 + 100,
        anchorX:0.5,
        anchorY:0.5
    });
    ideasframe.addChild(name);

    var tableView = new cc.TableView(this, cc.size(450, 220));
    tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
    tableView.attr({
        x:ideasframe.getContentSize().width/2 - 200,
        y:10,
        anchorX:0.5,
        anchorY:0.5
    });
    tableView.setDelegate(this);
    tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
    ideasframe.addChild(tableView);
//    tableView.numberOfCellsInTableView(table);
//    tableView.reloadData();

    var ideascontent1 = new cc.Sprite("#make_idea_word_award.png");
    ideascontent1.attr({
        x:ideasframe.getContentSize().width/2,
        y:ideasframe.getContentSize().height/2 + 190,
        anchorX:0.5,
        anchorY:0.5
    });
    ideasframe.addChild(ideascontent1);

    var ideascontent2 = new cc.Sprite("#make_idea_word_contribute.png");
    ideascontent2.attr({
        x:ideasframe.getContentSize().width/2,
        y:ideasframe.getContentSize().height/2 - 220,
        anchorX:0.5,
        anchorY:0.5
    });
    ideasframe.addChild(ideascontent2);


//    var panelDec = new cc.LabelTTF("确认面板2", "", 38);
//    panelDec.x = spriteWithBg.getContentSize().width / 2;
//    panelDec.y = spriteWithBg.getContentSize().height / 2+100;
//    spriteWithBg.addChild(panelDec);

    //关闭按钮
    var closeBtn9Sprite=new cc.Scale9Sprite("com_btn_red.png");
    var closeBtn1 = new cc.ControlButton(closeBtn9Sprite);
    closeBtn1.attr({
        width:92,
        height:98,
        x:324-(cc.director.getWinSize().width/2-80),
        y:-10
    });
    closeBtn1.setPreferredSize(cc.size(closeBtn1.width, closeBtn1.height));
    closeBtn1.addTargetWithActionForControlEvents(this, function(){
//        resumeAllNode();
        playEffect(res.BUTTON_SOUNDS);
        if(type == 1){
            if(cc.sys.os!="Android"){
                commentBtn.setEnabled(true);
            }
            feedbackBtn.setEnabled(true);
            musicBtn.setEnabled(true);
            makeBtn.setEnabled(true);
            closeBtn.setEnabled(true);
        }
        this.getParent().getParent().removeFromParent();
    }.bind(closeBtn1), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
    spriteWithBg.addChild(closeBtn1);

    var closeBtnicon = new cc.Sprite("#pause_btn_back.png");
    closeBtnicon.attr({
        x:closeBtn1.getContentSize().width/2 - 1,
        y:closeBtn1.getContentSize().height/2 + 6,
        anchorX:0.5,
        anchorY:0.5
    });
    closeBtn1.addChild(closeBtnicon);
    //超人
    var superman = new cc.Sprite("#make_superman_01.png");
    superman.attr({
        x:spriteWithBg.getContentSize().width,
        y:40,
        anchorX:0.5,
        anchorY:0.5
    });
    spriteWithBg.addChild(superman);
    var animFrames=[];
    for(var i=1;i<=2;i++){
        var frame = cc.spriteFrameCache.getSpriteFrame("make_superman_0"+i+".png");
        animFrames.push(frame);
    }
    var animation = new cc.Animation(animFrames, 0.2);
    superman.runAction(cc.animate(animation).repeatForever());

    var listener1 = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            var target = event.getCurrentTarget();

            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);

            if (cc.rectContainsPoint(rect, locationInNode)) {
                if(target == aboutBtnF) {
                    playEffect(res.BUTTON_SOUNDS);
                    aboutBtnF.setVisible(false);
                    aboutBtn.setVisible(true);
                    ideasBtnF.setVisible(true);
                    ideasBtn.setVisible(false);
                    aboutframe.setVisible(true);
                    ideasframe.setVisible(false);
                    gourd.setPositionX(spriteWithBg.getContentSize().width/2 - 25);
                    return true;
                }
                if(target == ideasBtnF) {
                    playEffect(res.BUTTON_SOUNDS);
                    aboutBtnF.setVisible(true);
                    aboutBtn.setVisible(false);
                    ideasBtnF.setVisible(false);
                    ideasBtn.setVisible(true);
                    aboutframe.setVisible(false);
                    ideasframe.setVisible(true);
                    gourd.setPositionX(spriteWithBg.getContentSize().width/2 - 25 + 190);
                    return true;
                }
            }
            return false;
        },
        onTouchMoved: function (touch, event) {

        },
        onTouchEnded: function (touch, event) {
            cc.log("end");
        }
    });
    cc.eventManager.addListener(listener1, aboutBtnF);
    cc.eventManager.addListener(listener1.clone(), ideasBtnF);
}
var CustomTableViewCell = cc.TableViewCell.extend({
    draw:function (ctx) {
        this._super(ctx);
    }
});
function tableCellSizeForIndex(table, idx) {
    return cc.size(410, 42);
}
function tableCellAtIndex(table, idx) {
    var strValue = idx.toFixed(0);
    var checkpointlabel = ["《叫醒坑爹男》","《小人逃出》","《蓄钱罐》","《坑爹男变帅》","《独轮车》","《打败大只佬》","《追小偷》","《我要回家》","《我要睡觉》","《加油加油》","《愚公移山》","《坑爹填空题》","《冰桶挑战赛》","《坑爹马里奥》","《溺水坑爹男》","《拆炸弹》","《欲练此功》","《我要飞得更高》","《广场舞噪音》","《躲开炸弹》"];
    var namelabel = ["OoTAToO","张云涛","20121g040","流星$无情","飞车党。",".","小情绪反反复复作祟、つ","●ロǐ靖`",". ","愿。。。。","西门吹雪","坟上雪","Mr.Leon","蘅芷清芬","Kelly Yap","微笑——面对","樂淘淘","清","元某人","185****5735"];
    var cell = table.dequeueCell();
    if (!cell) {
        cell = new CustomTableViewCell();

        var label = new cc.LabelTTF(checkpointlabel[idx.toFixed(0)], getFONT_FZCY_M03SStr(), 25.0);
        label.x = 0;
        label.y = 0;
        label.anchorX = 0;
        label.anchorY = 0;
        label.tag = 123;
        cell.addChild(label);
        label.color = cc.color(194, 211, 203);

        var label2 = new cc.LabelTTF(namelabel[idx.toFixed(0)], getFONT_FZCY_M03SStr(), 25.0);
        label2.x = 220;
        label2.y = 0;
        label2.anchorX = 0;
        label2.anchorY = 0;
        label2.tag = 321;
        cell.addChild(label2);
        label2.color = cc.color(194, 211, 203);
    }else {
        label = cell.getChildByTag(123);
        label.setString(checkpointlabel[idx.toFixed(0)]);
        label = cell.getChildByTag(321);
        label.setString(namelabel[idx.toFixed(0)]);
    }

    return cell;
}

function numberOfCellsInTableView(table) {
    return 20;
}
var ShowMarketLayer=cc.Layer.extend({
    pauseMaskBg:null,
    pauseMaskBg2:null,
    selectnum:null,
    ctor:function()
    {
        this._super();
        this.init();


    },
    init:function()
    {
        var _this=this;


        selectnum=1;
        cc.spriteFrameCache.addSpriteFrames(res.marketios_plist);
        cc.spriteFrameCache.addSpriteFrames(res.marketandroid_plist);

        setPanelAppearAnimation(_this);

        var winsize=cc.director.getWinSize();
        pauseMaskBg = new cc.LayerColor(cc.color(0,0,0,150),winsize.width, winsize.height);
        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                cc.log("begin");
                var target = event.getCurrentTarget();

                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                    return true;
                }
                return false;
            },
            onTouchMoved: function (touch, event) {

            },
            onTouchEnded: function (touch, event) {
                cc.log("end");
            }
        });
        cc.eventManager.addListener(listener1, pauseMaskBg);

        this.addChild(pauseMaskBg,100);

        if(cc.sys.os == "Android")///android/i.test(navigator.userAgent)
        {

//            var frame=new cc.Sprite("#market_Android_frame.png");
//            frame.setPosition(winsize.width/2,winsize.height/2);
//            pauseMaskBg.addChild(frame);
//
//            var selectnum=0;
//
//            //closebtn
//            var spriteWithcloseBtn =new cc.Sprite("#com_CPM_btn_close.png");
//            var scale9SpriteWithcloseBtn =new cc.Scale9Sprite("com_CPM_btn_close.png");//market_Android_btn_close.png
//            var returnBtn = new cc.ControlButton(scale9SpriteWithcloseBtn);
//            returnBtn.setPreferredSize(cc.size(spriteWithcloseBtn.width, spriteWithcloseBtn.height));
//            returnBtn.addTargetWithActionForControlEvents(this, function(){
//                pauseMaskBg.removeFromParent();
//                cc.log("close");
//            }.bind(returnBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
//            returnBtn.x = frame.getPositionX()+frame.getContentSize().width*0.42;//
//            returnBtn.y = frame.getPositionY()+frame.getContentSize().height*0.38;//
//            returnBtn.setTag(1006);
//            pauseMaskBg.addChild(returnBtn);
//            //titleframe
//            var titleframe=new cc.Sprite("#market_Android_title_frame.png");
//            titleframe.setPosition(frame.getContentSize().width/2,frame.getContentSize().height*0.99);
//            frame.addChild(titleframe);
//            //titleframeword
//            var titleframeword=new cc.Sprite("#market_Android_title_word.png");
//            titleframeword.setPosition(titleframe.getContentSize().width/2,titleframe.getContentSize().height*0.4);
//            titleframe.addChild(titleframeword);
//
//
//            //money2bg
//            var money2bg=new cc.Sprite("#market_Android_selecte_01.png");
//            money2bg.setPosition(frame.getContentSize().width*0.14+140,frame.getContentSize().height*0.68);
//            frame.addChild(money2bg);
//
//            //money1
//            var spriteWithmoney1Btn =new cc.Sprite("#market_Android_gold_frame.png");
//            var scale9SpriteWithmoney1Btn =new cc.Scale9Sprite("market_Android_gold_frame.png");
//            var money1Btn = new cc.ControlButton(scale9SpriteWithmoney1Btn);
//            money1Btn.setPreferredSize(cc.size(spriteWithmoney1Btn.width, spriteWithmoney1Btn.height));
//            money1Btn.addTargetWithActionForControlEvents(this, function(){
//                money2bg.setPosition(money1Btn.getPosition());
//                selectnum=1;
//                cc.log("money1");
//            }.bind(money1Btn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
//            money1Btn.x = frame.getContentSize().width*0.14;
//            money1Btn.y = frame.getContentSize().height*0.68;
//            money1Btn.setTag(1006);
//            frame.addChild(money1Btn);
//            //money1sprite
//            var money1sprite=new cc.Sprite("#market_Android_gold_icon_100.png");
//            money1sprite.setPosition(spriteWithmoney1Btn.width*0.48, spriteWithmoney1Btn.height*0.7);
//            money1Btn.addChild(money1sprite);
//            //money1label
//            var money1label = cc.LabelTTF.create("100",getFONT_FZCY_M03SStr(),23);
//            money1label.setPosition(spriteWithmoney1Btn.width*0.26, spriteWithmoney1Btn.height*0.26);
//            money1label.setColor(cc.color(229,70,70));
//            money1Btn.addChild(money1label);
//            var money1label2 = cc.LabelTTF.create("金币",getFONT_FZCY_M03SStr(),23);
//            money1label2.setPosition(spriteWithmoney1Btn.width*0.64, spriteWithmoney1Btn.height*0.26);
//            money1label2.setColor(cc.color(99,21,1));
//            money1Btn.addChild(money1label2);
//            //rmblabel
//            var rmblabel = cc.LabelTTF.create("1元",getFONT_FZCY_M03SStr(),23);
//            rmblabel.setPosition(money1Btn.width*0.49, -money1Btn.height*0.1);
//            rmblabel.setColor(cc.color(99,21,1));
//            money1Btn.addChild(rmblabel);
//
//
//
//            var spriteWithmoney2Btn =new cc.Sprite("#market_Android_gold_frame.png");
//            var scale9SpriteWithmoney2Btn = new cc.Scale9Sprite("market_Android_gold_frame.png");
//            var money2Btn = new cc.ControlButton(scale9SpriteWithmoney2Btn);
//            money2Btn.setPreferredSize(cc.size(spriteWithmoney2Btn.width, spriteWithmoney2Btn.height));
//            money2Btn.addTargetWithActionForControlEvents(this, function(){
//                money2bg.setPosition(money2Btn.getPosition());
//                selectnum=2;
//                cc.log("money2");
//            }.bind(money2Btn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
//            money2Btn.x = money1Btn.getPositionX()+145;
//            money2Btn.y = money1Btn.getPositionY();
//            money2Btn.setTag(1006);
//            frame.addChild(money2Btn);
//            //money2sprite
//            var money2sprite=new cc.Sprite("#market_Android_gold_icon_100.png");
//            money2sprite.setPosition(spriteWithmoney2Btn.width*0.48, spriteWithmoney2Btn.height*0.7);
//            money2Btn.addChild(money2sprite);
//            //money2label
//            var money2label = cc.LabelTTF.create("300",getFONT_FZCY_M03SStr(),23);
//            money2label.setPosition(spriteWithmoney2Btn.width*0.28, spriteWithmoney2Btn.height*0.26);
//            money2label.setColor(cc.color(229,70,70));
//            money2Btn.addChild(money2label);
//            var money2label2 = cc.LabelTTF.create("金币",getFONT_FZCY_M03SStr(),23);
//            money2label2.setPosition(spriteWithmoney2Btn.width*0.625, spriteWithmoney2Btn.height*0.26);
//            money2label2.setColor(cc.color(99,21,1));
//            money2Btn.addChild(money2label2);
//            //rmblabel
//            var rmblabel2 = cc.LabelTTF.create("2元",getFONT_FZCY_M03SStr(),23);
//            rmblabel2.setPosition(money1Btn.width*0.49, -money1Btn.height*0.08);
//            rmblabel2.setColor(cc.color(99,21,1));
//            money2Btn.addChild(rmblabel2);
//            //money3
//            var spriteWithmoney3Btn =new cc.Sprite("#market_Android_gold_frame.png");
//            var scale9SpriteWithmoney3Btn = new cc.Scale9Sprite("market_Android_gold_frame.png");
//            var money3Btn = new cc.ControlButton(scale9SpriteWithmoney3Btn);
//            money3Btn.setPreferredSize(cc.size(spriteWithmoney3Btn.width, spriteWithmoney3Btn.height));
//            money3Btn.addTargetWithActionForControlEvents(this, function(){
//                money2bg.setPosition(money3Btn.getPosition());
//                selectnum=3;
//                cc.log("money3");
//            }.bind(money3Btn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
//            money3Btn.x = money2bg.getPositionX()+140;
//            money3Btn.y = frame.getContentSize().height*0.68;
//            money3Btn.setTag(1006);
//            frame.addChild(money3Btn);
//            //money3sprite
//            var money3sprite=new cc.Sprite("#market_Android_gold_icon_500.png");
//            money3sprite.setPosition(spriteWithmoney2Btn.width*0.48, spriteWithmoney2Btn.height*0.7);
//            money3Btn.addChild(money3sprite);
//            //money3label
//            var money3label = cc.LabelTTF.create("500",getFONT_FZCY_M03SStr(),23);
//            money3label.setPosition(spriteWithmoney3Btn.width*0.28, spriteWithmoney3Btn.height*0.26);
//            money3label.setColor(cc.color(229,70,70));
//            money3Btn.addChild(money3label);
//            var money3label2 = cc.LabelTTF.create("金币",getFONT_FZCY_M03SStr(),23);
//            money3label2.setPosition(spriteWithmoney3Btn.width*0.625, spriteWithmoney3Btn.height*0.26);
//            money3label2.setColor(cc.color(99,21,1));
//            money3Btn.addChild(money3label2);
//            //rmblabel3
//            var rmblabel3 = cc.LabelTTF.create("5元",getFONT_FZCY_M03SStr(),23);
//            rmblabel3.setPosition(money1Btn.width*0.49, -money1Btn.height*0.1);
//            rmblabel3.setColor(cc.color(99,21,1));
//            money3Btn.addChild(rmblabel3);
//            //money4
//            var spriteWithmoney4Btn =new cc.Sprite("#market_Android_gold_frame.png");
//            var scale9SpriteWithmoney4Btn =new cc.Scale9Sprite("market_Android_gold_frame.png");
//            var money4Btn = new cc.ControlButton(scale9SpriteWithmoney4Btn);
//            money4Btn.setPreferredSize(cc.size(spriteWithmoney4Btn.width, spriteWithmoney4Btn.height));
//            money4Btn.addTargetWithActionForControlEvents(this, function(){
//                money2bg.setPosition(money4Btn.getPosition());
//                selectnum=4;
//                cc.log("money4");
//            }.bind(money4Btn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
//            money4Btn.x = money3Btn.getPositionX()+140;
//            money4Btn.y = frame.getContentSize().height*0.68;
//            money4Btn.setTag(1006);
//            frame.addChild(money4Btn);
//            //money4sprite
////            var money4sprite=new cc.Sprite(res.market_Android_gold_icon_1000);
//            var money4sprite=new cc.Sprite("#market_Android_gold_icon_1000.png");
//            money4sprite.setPosition(spriteWithmoney4Btn.width*0.48, spriteWithmoney4Btn.height*0.7);
//            money4Btn.addChild(money4sprite);
//            //money4label
//            var money4label = cc.LabelTTF.create("1000",getFONT_FZCY_M03SStr(),23);
//            money4label.setPosition(spriteWithmoney4Btn.width*0.26, spriteWithmoney4Btn.height*0.26);
//            money4label.setColor(cc.color(229,70,70));
//            money4Btn.addChild(money4label);
//            var money4label2 = cc.LabelTTF.create("金币",getFONT_FZCY_M03SStr(),23);
//            money4label2.setPosition(spriteWithmoney4Btn.width*0.67, spriteWithmoney4Btn.height*0.26);
//            money4label2.setColor(cc.color(99,21,1));
//            money4Btn.addChild(money4label2);
//            //rmblabel
//            var rmblabel4 = cc.LabelTTF.create("10元",getFONT_FZCY_M03SStr(),23);
//            rmblabel4.setPosition(money1Btn.width*0.49, -money1Btn.height*0.11);
//            rmblabel4.setColor(cc.color(99,21,1));
//            money4Btn.addChild(rmblabel4);
//            //money5
//            var spriteWithmoney5Btn =new cc.Sprite("#market_Android_gold_frame.png");
//            var scale9SpriteWithmoney5Btn = new cc.Scale9Sprite("market_Android_gold_frame.png");
//            var money5Btn = new cc.ControlButton(scale9SpriteWithmoney5Btn);
//            money5Btn.setPreferredSize(cc.size(spriteWithmoney5Btn.width, spriteWithmoney5Btn.height));
//            money5Btn.addTargetWithActionForControlEvents(this, function(){
//                money2bg.setPosition(money5Btn.getPosition());
//                selectnum=5;
//                cc.log("money5");
//            }.bind(money5Btn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
//            money5Btn.x = money4Btn.getPositionX()+140;
//            money5Btn.y = frame.getContentSize().height*0.68;
//            money5Btn.setTag(1006);
//            frame.addChild(money5Btn);
//            //money5sprite
//            var money5sprite=new cc.Sprite("#market_Android_gold_icon_5000.png");
//            money5sprite.setPosition(spriteWithmoney5Btn.width*0.48, spriteWithmoney5Btn.height*0.7);
//            money5Btn.addChild(money5sprite);
//            //money5label
//            var money5label = cc.LabelTTF.create("5000",getFONT_FZCY_M03SStr(),23);
//            money5label.setPosition(spriteWithmoney5Btn.width*0.26, spriteWithmoney5Btn.height*0.26);
//            money5label.setColor(cc.color(229,70,70));
//            money5Btn.addChild(money5label);
//            var money5label2 = cc.LabelTTF.create("金币",getFONT_FZCY_M03SStr(),23);
//            money5label2.setPosition(spriteWithmoney5Btn.width*0.67, spriteWithmoney5Btn.height*0.26);
//            money5label2.setColor(cc.color(99,21,1));
//            money5Btn.addChild(money5label2);
//            //rmblabel
//            var rmblabel5 = cc.LabelTTF.create("20元",getFONT_FZCY_M03SStr(),23);
//            rmblabel5.setPosition(money1Btn.width*0.49, -money1Btn.height*0.11);
//            rmblabel5.setColor(cc.color(99,21,1));
//            money5Btn.addChild(rmblabel5);
//            //dzt
//            var spriteWithdztBtn =new cc.Sprite("#market_Android_cool_gold_frame.png");
//            var scale9SpriteWithdztBtn =new cc.Scale9Sprite("market_Android_cool_gold_frame.png");
//            var dztBtn = new cc.ControlButton(scale9SpriteWithdztBtn);
//            dztBtn.setPreferredSize(cc.size(spriteWithdztBtn.width, spriteWithdztBtn.height));
//            dztBtn.addTargetWithActionForControlEvents(this, function(){
//                money2bg.setPosition(dztBtn.getPosition());
//                selectnum=6;
//                cc.log("dzt");
//            }.bind(dztBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
//            dztBtn.x = money1Btn.getPositionX()+35;
//            dztBtn.y = frame.getContentSize().height*0.68-160;
//            dztBtn.setTag(1006);
//            frame.addChild(dztBtn);
//            //dztsprite
//            var dztsprite=new cc.Sprite("#market_Android_cool_gold_icon.png");
//            dztsprite.setPosition(spriteWithdztBtn.width*0.48, spriteWithdztBtn.height*0.7);
//            dztBtn.addChild(dztsprite);
//            //freesprite
//            var freesprite=new cc.Sprite("#market_Android_free.png");
//            freesprite.setPosition(spriteWithdztBtn.width*0.9, spriteWithdztBtn.height*0.98);
//            dztBtn.addChild(freesprite);
//            //dztlabel
//            var dztlabel2 = cc.LabelTTF.create("吊炸天金币",getFONT_FZCY_M03SStr(),22);
//            dztlabel2.setPosition(dztBtn.width*0.48, dztBtn.height*0.26);
//            dztlabel2.setColor(cc.color(99,21,1));
//            dztBtn.addChild(dztlabel2);
//            //jb
//            var spriteWithjbBtn = new cc.Sprite("#market_Android_cool_gold_frame.png");
//            var scale9SpriteWithjbBtn =new cc.Scale9Sprite("market_Android_cool_gold_frame.png");
//            var jbBtn = new cc.ControlButton(scale9SpriteWithjbBtn);
//            jbBtn.setPreferredSize(cc.size(spriteWithjbBtn.width, spriteWithjbBtn.height));
//            jbBtn.addTargetWithActionForControlEvents(this, function(){
//                money2bg.setPosition(jbBtn.getPosition());
//                selectnum=7;
//                cc.log("jb");
//            }.bind(jbBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
//            jbBtn.x = dztBtn.getPositionX()+165;
//            jbBtn.y = frame.getContentSize().height*0.68-160;
//            jbBtn.setTag(1006);
//            frame.addChild(jbBtn);
//            //jbsprite
//            var jbsprite=new cc.Sprite("#market_Android_handsome_gold_icon.png");
//            jbsprite.setPosition(spriteWithjbBtn.width*0.48, spriteWithjbBtn.height*0.7);
//            jbBtn.addChild(jbsprite);
//            //freesprite
//            var freesprite2=new cc.Sprite("#market_Android_free.png");
//            freesprite2.setPosition(spriteWithjbBtn.width*0.9, spriteWithjbBtn.height*0.98);
//            jbBtn.addChild(freesprite2);
//            //jblabel
//            var jblabel2 = cc.LabelTTF.create("高富帅金币",getFONT_FZCY_M03SStr(),24);
//            jblabel2.setPosition(jbBtn.width*0.48, jbBtn.height*0.26);
//            jblabel2.setColor(cc.color(99,21,1));
//            jbBtn.addChild(jblabel2);
//
//            //恢复购买
//            var spriteWithResBtn = new cc.Sprite("#market_Android_cool_gold_frame.png");
//            var scale9SpriteWithResBtn =new cc.Scale9Sprite("market_Android_cool_gold_frame.png");
//            var ResBtn = new cc.ControlButton(scale9SpriteWithResBtn);
//            ResBtn.setPreferredSize(cc.size(spriteWithResBtn.width, spriteWithResBtn.height));
//            ResBtn.addTargetWithActionForControlEvents(this, function(){
//                money2bg.setPosition(ResBtn.getPosition());
//                selectnum=8;
//                cc.log("hf");
//            }.bind(ResBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
//            ResBtn.x = jbBtn.getPositionX()+165;
//            ResBtn.y = frame.getContentSize().height*0.68-160;
//            ResBtn.setTag(1006);
//            frame.addChild(ResBtn);
//            //Resprite
//            var Ressprite=new cc.Sprite("#market_Android_return_icon.png");
//            Ressprite.setPosition(spriteWithResBtn.width*0.48, spriteWithResBtn.height*0.7);
//            ResBtn.addChild(Ressprite);
//            //freesprite
//            //jblabel
//            var jblabel2 = cc.LabelTTF.create("恢复购买",getFONT_FZCY_M03SStr(),24);
//            jblabel2.setPosition(ResBtn.width*0.48, ResBtn.height*0.26);
//            jblabel2.setColor(cc.color(99,21,1));
//            ResBtn.addChild(jblabel2);
//
//            //全关卡解锁
//            var spriteWithlevBtn = new cc.Sprite("#market_Android_btn_deblocking.png");
//            var scale9SpriteWithlevBtn =new cc.Scale9Sprite("market_Android_btn_deblocking.png");
//            var LevBtn = new cc.ControlButton(scale9SpriteWithlevBtn);
//            LevBtn.setPreferredSize(cc.size(spriteWithlevBtn.width, spriteWithlevBtn.height));
//            LevBtn.addTargetWithActionForControlEvents(this, function(){
//                money2bg.setPosition(LevBtn.getPosition());
//                selectnum=9;
//                cc.log("js");
//            }.bind(LevBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
//            LevBtn.x = ResBtn.getPositionX()+165;
//            LevBtn.y = frame.getContentSize().height*0.68-160;
//            LevBtn.setTag(1006);
//            frame.addChild(LevBtn);








//            var selectnum=1;
            var frame=new cc.Sprite("#market_Android_frame.png");
            frame.setPosition(winsize.width/2,winsize.height/2);
            pauseMaskBg.addChild(frame);
            cc.log("abc1");

            var spriteWithcloseBtn =new cc.Sprite("#market_Android_btn_close.png");//market_ios_btn_close.png
            cc.log("abc2");
            var scale9SpriteWithcloseBtn =new cc.Scale9Sprite("market_Android_btn_close.png");
            var returnBtn = new cc.ControlButton(scale9SpriteWithcloseBtn);
            returnBtn.setPreferredSize(cc.size(spriteWithcloseBtn.width, spriteWithcloseBtn.height));
            returnBtn.addTargetWithActionForControlEvents(this, function(){
                playEffect(res.BUTTON_SOUNDS);
                pauseMaskBg.removeFromParent();
                cc.log("close");
            }.bind(returnBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
            returnBtn.x = frame.getPositionX()+frame.getContentSize().width*0.42;//
            returnBtn.y = frame.getPositionY()+frame.getContentSize().height*0.38;//
            returnBtn.setTag(1006);
            pauseMaskBg.addChild(returnBtn);
            cc.log("abc2");
            //titleframe
            var titleframe=new cc.Sprite("#market_Android_title_frame.png");
            titleframe.setPosition(frame.getContentSize().width/2,frame.getContentSize().height*0.99);
            frame.addChild(titleframe);
            //titleframeword
//            var titleframeword=new cc.Sprite(res.market_ios_title_word);
            var titleframeword=new cc.Sprite("#market_Android_title_word.png");
            titleframeword.setPosition(titleframe.getContentSize().width/2,titleframe.getContentSize().height*0.4);
            titleframe.addChild(titleframeword);
            cc.log("abc3");
            //money2bg
            var money2bg=new cc.Sprite("#market_Android_selecte_01.png");
            money2bg.setPosition(frame.getContentSize().width*0.18,frame.getContentSize().height*0.68);
            frame.addChild(money2bg);



            //money100
            var spriteWithmoney100Btn =new cc.Sprite("#market_Android_gold_frame.png");
            var scale9SpriteWithmoney100Btn =new cc.Scale9Sprite("market_Android_gold_frame.png");
            var money100Btn = new cc.ControlButton(scale9SpriteWithmoney100Btn);
            money100Btn.setPreferredSize(cc.size(spriteWithmoney100Btn.width, spriteWithmoney100Btn.height));
            money100Btn.addTargetWithActionForControlEvents(this, function(){
                playEffect(res.BUTTON_SOUNDS);
//                selectnum=1;
                money2bg.setPosition(money100Btn.getPosition());
                var testJSB = new JSB.JSBinding();
                testJSB.retain();
                testJSB.purchase(1);
                testJSB.purchaseCallBack2 = function(i,j){
                    cc.log("failse 100");
//                    pauseMaskBg.removeFromParent();
                    testJSB.release();
                };
                testJSB.purchaseCallBack = function(i,j){
                    cc.log("market buy call back");
                    cc.log("selectnum---->");
                    setGold(parseInt(getGold() || 0)+100);
                    ShowGoldChange(_this,"+100");
//                    pauseMaskBg.removeFromParent();
                    testJSB.release();
                };
                cc.log("money100");
//                pauseMaskBg.removeFromParent();
            }.bind(money100Btn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
            money100Btn.x = frame.getContentSize().width*0.18;
            money100Btn.y = frame.getContentSize().height*0.68;
            money100Btn.setTag(1006);
            frame.addChild(money100Btn);
            cc.log("abc4");
            //money1sprite
            var money100sprite=new cc.Sprite("#market_Android_gold_icon_100.png");
            money100sprite.setPosition(spriteWithmoney100Btn.width*0.48, spriteWithmoney100Btn.height*0.7);
            money100Btn.addChild(money100sprite);
            //money1label
            var money100label = cc.LabelTTF.create("100",getFONT_FZCY_M03SStr(),24);
            money100label.setPosition(spriteWithmoney100Btn.width*0.26, spriteWithmoney100Btn.height*0.26);
            money100label.setColor(cc.color(229,70,70));
            money100Btn.addChild(money100label);
            var money100label2 = cc.LabelTTF.create("金币",getFONT_FZCY_M03SStr(),24);
            money100label2.setPosition(spriteWithmoney100Btn.width*0.66, spriteWithmoney100Btn.height*0.26);
            money100label2.setColor(cc.color(99,21,1));
            money100Btn.addChild(money100label2);
            //rmblabel
            var rmblabel100 = cc.LabelTTF.create("1元",getFONT_FZCY_M03SStr(),28);
            rmblabel100.setPosition(money100Btn.width*0.49, -money100Btn.height*0.11);
            rmblabel100.setColor(cc.color(99,21,1));
            money100Btn.addChild(rmblabel100);

            //money300
            var spriteWithmoney300Btn =new cc.Sprite("#market_Android_gold_frame.png");
            var scale9SpriteWithmoney300Btn =new cc.Scale9Sprite("market_Android_gold_frame.png");
            var money300Btn = new cc.ControlButton(scale9SpriteWithmoney300Btn);
            money300Btn.setPreferredSize(cc.size(spriteWithmoney300Btn.width, spriteWithmoney300Btn.height));
            money300Btn.addTargetWithActionForControlEvents(this, function(){
                playEffect(res.BUTTON_SOUNDS);
                money2bg.setPosition(money300Btn.getPosition());

                var testJSB = new JSB.JSBinding();
                testJSB.retain();
                testJSB.purchase(2);
                testJSB.purchaseCallBack2 = function(i,j){
                    cc.log("failse 100");
//                    pauseMaskBg.removeFromParent();
                    testJSB.release();
                };
                testJSB.purchaseCallBack = function(i,j){
                    cc.log("market buy call back");
                    cc.log("selectnum---->");
                    cc.log(2);
                    setGold(parseInt(getGold() || 0)+210);
                    ShowGoldChange(_this,"+210");
//                    pauseMaskBg.removeFromParent();
                    testJSB.release();
                };

                cc.log("money300");
            }.bind(money300Btn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
            money300Btn.x = frame.getContentSize().width*0.38;
            money300Btn.y = frame.getContentSize().height*0.68;
            money300Btn.setTag(1006);
            frame.addChild(money300Btn);

            var money2_word3=new cc.LabelTTF("赠10",getFONT_FZCY_M03SStr(),20);
            money2_word3.attr({
                x:money300Btn.width/2 - 30,
                y:110,
                color:cc.color(162,20,13)
            });
            money300Btn.addChild(money2_word3);

            cc.log("abc4");
            //money1sprite
            var money300sprite=new cc.Sprite("#market_Android_gold_icon_200.png");
            money300sprite.setPosition(spriteWithmoney300Btn.width*0.48, spriteWithmoney300Btn.height*0.7);
            money300Btn.addChild(money300sprite);
            //money1label
            var money300label = cc.LabelTTF.create("200",getFONT_FZCY_M03SStr(),24);
            money300label.setPosition(spriteWithmoney300Btn.width*0.26, spriteWithmoney300Btn.height*0.26);
            money300label.setColor(cc.color(229,70,70));
            money300Btn.addChild(money300label);
            var money300label2 = cc.LabelTTF.create("金币",getFONT_FZCY_M03SStr(),24);
            money300label2.setPosition(spriteWithmoney300Btn.width*0.66, spriteWithmoney300Btn.height*0.26);
            money300label2.setColor(cc.color(99,21,1));
            money300Btn.addChild(money300label2);
            //rmblabel
            var rmblabel300 = cc.LabelTTF.create("2元",getFONT_FZCY_M03SStr(),28);
            rmblabel300.setPosition(money300Btn.width*0.49, -money300Btn.height*0.11);
            rmblabel300.setColor(cc.color(99,21,1));
            money300Btn.addChild(rmblabel300);







            //money1
            var spriteWithmoney1Btn =new cc.Sprite("#market_Android_gold_frame.png");
            var scale9SpriteWithmoney1Btn =new cc.Scale9Sprite("market_Android_gold_frame.png");
            var money1Btn = new cc.ControlButton(scale9SpriteWithmoney1Btn);
            money1Btn.setPreferredSize(cc.size(spriteWithmoney1Btn.width, spriteWithmoney1Btn.height));
            money1Btn.addTargetWithActionForControlEvents(this, function(){
                playEffect(res.BUTTON_SOUNDS);
                money2bg.setPosition(money1Btn.getPosition());
                var testJSB = new JSB.JSBinding();
                testJSB.retain();
                testJSB.purchase(4);
                testJSB.purchaseCallBack2 = function(i,j){
                    cc.log("failse 100");
//                    pauseMaskBg.removeFromParent();
                    testJSB.release();
                };
                testJSB.purchaseCallBack = function(i,j){
                    cc.log("market buy call back");
                    cc.log("selectnum---->");
                    cc.log(4);
                    setGold(parseInt(getGold() || 0)+1100);
                    ShowGoldChange(_this,"+1100");
//                    pauseMaskBg.removeFromParent();
                    testJSB.release();
                };
                cc.log("money1  1000");
            }.bind(money1Btn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
            money1Btn.x = frame.getContentSize().width*0.82;
            money1Btn.y = frame.getContentSize().height*0.68;
            money1Btn.setTag(1006);
            frame.addChild(money1Btn);

            var money4_word3=new cc.LabelTTF("赠100",getFONT_FZCY_M03SStr(),20);
            money4_word3.attr({
                x:money1Btn.width/2 - 25,
                y:110,
                color:cc.color(162,20,13)
            });
            money1Btn.addChild(money4_word3,1);

            cc.log("abc4");
            //money1sprite
            var money1sprite=new cc.Sprite("#market_Android_gold_icon_1000.png");
            money1sprite.setPosition(spriteWithmoney1Btn.width*0.62, spriteWithmoney1Btn.height*0.68);
            money1Btn.addChild(money1sprite);
            //money1label
            var money1label = cc.LabelTTF.create("1000",getFONT_FZCY_M03SStr(),24);
            money1label.setPosition(spriteWithmoney1Btn.width*0.26, spriteWithmoney1Btn.height*0.26);
            money1label.setColor(cc.color(229,70,70));
            money1Btn.addChild(money1label);
            var money1label2 = cc.LabelTTF.create("金币",getFONT_FZCY_M03SStr(),24);
            money1label2.setPosition(spriteWithmoney1Btn.width*0.66, spriteWithmoney1Btn.height*0.26);
            money1label2.setColor(cc.color(99,21,1));
            money1Btn.addChild(money1label2);
            //rmblabel
            var rmblabel = cc.LabelTTF.create("10元",getFONT_FZCY_M03SStr(),28);
            rmblabel.setPosition(money1Btn.width*0.49, -money1Btn.height*0.11);
            rmblabel.setColor(cc.color(99,21,1));
            money1Btn.addChild(rmblabel);
            cc.log("abc5");
            //money2bg
            cc.log("abc6");
            var spriteWithmoney2Btn =new cc.Sprite("#market_Android_gold_frame.png");
            cc.log("abc62");
            var scale9SpriteWithmoney2Btn =new cc.Scale9Sprite("market_Android_gold_frame.png");
            var money2Btn = new cc.ControlButton(scale9SpriteWithmoney2Btn);
            money2Btn.setPreferredSize(cc.size(spriteWithmoney2Btn.width, spriteWithmoney2Btn.height));
            money2Btn.addTargetWithActionForControlEvents(this, function(){
                playEffect(res.BUTTON_SOUNDS);
                money2bg.setPosition(money2Btn.getPosition());
                var testJSB = new JSB.JSBinding();
                testJSB.retain();
                testJSB.purchase(3);
                testJSB.purchaseCallBack2 = function(i,j){
                    cc.log("failse 100");
//                    pauseMaskBg.removeFromParent();
                    testJSB.release();
                };
                testJSB.purchaseCallBack = function(i,j){
                    cc.log("market buy call back");
                    cc.log("selectnum---->");
                    cc.log(3);
                    setGold(parseInt(getGold() || 0)+440);
                    ShowGoldChange(_this,"+440");
//                    pauseMaskBg.removeFromParent();
                    testJSB.release();
                };
                cc.log("abc7");
//                  cc.log("abc");                                        testJSB.release();
                cc.log("money2 400");
            }.bind(money2Btn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
            money2Btn.x = frame.getContentSize().width*0.6;
            money2Btn.y = money1Btn.getPositionY();
            money2Btn.setTag(1006);
            frame.addChild(money2Btn,1);

            var money3_word3=new cc.LabelTTF("赠40",getFONT_FZCY_M03SStr(),20);
            money3_word3.attr({
                x:money2Btn.width/2 - 30,
                y:110,
                color:cc.color(162,20,13)
            });
            money2Btn.addChild(money3_word3);

            //money2sprite
            cc.log("abc612");
            var money2sprite=new cc.Sprite("#market_Android_gold_icon_400.png");
            money2sprite.setPosition(spriteWithmoney2Btn.width*0.52, spriteWithmoney2Btn.height*0.7);
            money2Btn.addChild(money2sprite);
            //money2label
            var money2label = cc.LabelTTF.create("400",getFONT_FZCY_M03SStr(),24);
            money2label.setPosition(spriteWithmoney2Btn.width*0.28, spriteWithmoney2Btn.height*0.26);
            money2label.setColor(cc.color(229,70,70));
            money2Btn.addChild(money2label);
            var money2label2 = cc.LabelTTF.create("金币",getFONT_FZCY_M03SStr(),24);
            money2label2.setPosition(spriteWithmoney2Btn.width*0.6, spriteWithmoney2Btn.height*0.26);
            money2label2.setColor(cc.color(99,21,1));
            money2Btn.addChild(money2label2);
            cc.log("abc622");
            //rmblabel
            var rmblabel2 = cc.LabelTTF.create("4元",getFONT_FZCY_M03SStr(),28);
            rmblabel2.setPosition(money2Btn.width*0.49, -money2Btn.height*0.08);
            rmblabel2.setColor(cc.color(99,21,1));
            money2Btn.addChild(rmblabel2);


//商店里面的解锁全部关卡
//            cc.log("abc621");
//            //解锁全部关卡
//            var spriteWithadBtn8 =new cc.Sprite("#market_ios_btn_deblocking.png");
//            cc.log("abc622");
//            var scale9SpriteWithadBtn8 =new cc.Scale9Sprite("market_ios_btn_deblocking.png");
//            cc.log("abc623");
//            var adBtn8 = new cc.ControlButton(scale9SpriteWithadBtn8);
//            adBtn8.setPreferredSize(cc.size(spriteWithadBtn8.width, spriteWithadBtn8.height));
//            adBtn8.addTargetWithActionForControlEvents(this, function(){
//                playEffect(res.BUTTON_SOUNDS);
//                money2bg.setPosition(adBtn8.getPosition());
//                var testJSB = new JSB.JSBinding();
//                testJSB.retain();
//                testJSB.purchase(7);
//                testJSB.purchaseCallBack2 = function(i,j){
//                    cc.log("failse 100");
//                    pauseMaskBg.removeFromParent();
//                    testJSB.release();
//                };
//                testJSB.purchaseCallBack = function(i,j){
//                    cc.log("market buy call back");
//                    cc.log("selectnum---->");
//                    cc.log(7);
//                    unclockAllPassion();
//                    pauseMaskBg.removeFromParent();
//                    testJSB.release();
//                };
//
//                cc.log("js");
//            }.bind(adBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
//            adBtn8.x = frame.getContentSize().width*0.5;
//            adBtn8.y = frame.getContentSize().height*0.68-180;
//            adBtn8.setTag(1006);
//            frame.addChild(adBtn8);
//
//            var rmblabel2222 = cc.LabelTTF.create("4元",getFONT_FZCY_M03SStr(),28);
//            rmblabel2222.setPosition(adBtn8.width*0.49, -adBtn8.height*0.02);
//            rmblabel2222.setColor(cc.color(99,21,1));
//            adBtn8.addChild(rmblabel2222);





            //dzt
//            var spriteWithadBtn = new cc.Sprite(res.market_ios_AD);
//            var scale9SpriteWithadBtn = new cc.Scale9Sprite(res.market_ios_AD);
//            cc.log("abc632");
//            var spriteWithadBtn =new cc.Sprite("#market_Android_cool_gold_frame.png");
//            cc.log("abc642");
//            var scale9SpriteWithadBtn =new cc.Scale9Sprite("market_Android_cool_gold_frame.png");
//            cc.log("abc652");
//            var adBtn = new cc.ControlButton(scale9SpriteWithadBtn);
//            adBtn.setPreferredSize(cc.size(spriteWithadBtn.width, spriteWithadBtn.height));
//            adBtn.addTargetWithActionForControlEvents(this, function(){
//                playEffect(res.BUTTON_SOUNDS);
////
//                selectnum=5;
//                money2bg.setPosition(adBtn.getPosition());
//
//                cc.log("dzt");
//            }.bind(adBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
//            adBtn.x = frame.getContentSize().width*0.18+100;
//            adBtn.y = frame.getContentSize().height*0.68-180;
//            adBtn.setTag(1006);
//            frame.addChild(adBtn);
//            var dztsprite=new cc.Sprite("#market_Android_cool_gold_icon.png");
//            dztsprite.setPosition(spriteWithmoney2Btn.width*0.48, spriteWithmoney2Btn.height*0.7);
//            adBtn.addChild(dztsprite);
//            //money2label
//            var dztlabel = cc.LabelTTF.create("吊炸天金币",getFONT_FZCY_M03SStr(),24);
//            dztlabel.setPosition(adBtn.width*0.5, adBtn.height*0.26);
//            dztlabel.setColor(cc.color(99,21,1));
//            adBtn.addChild(dztlabel);
//            //free
//            var dztfree=new cc.Sprite("#market_Android_free.png");
//            dztfree.setPosition(adBtn.width*0.95, adBtn.height);
//            adBtn.addChild(dztfree);
//
//
//
//            //高富帅金币
//            var spriteWithglBtn =new cc.Sprite("#market_Android_cool_gold_frame.png");
//            cc.log("abc642");
//            var scale9SpriteWithglBtn =new cc.Scale9Sprite("market_Android_cool_gold_frame.png");
//            cc.log("abc652");
//            var glBtn = new cc.ControlButton(scale9SpriteWithglBtn);
//            glBtn.setPreferredSize(cc.size(spriteWithglBtn.width, spriteWithglBtn.height));
//            glBtn.addTargetWithActionForControlEvents(this, function(){
//                playEffect(res.BUTTON_SOUNDS);
//
//                                                      selectnum=6;
//                money2bg.setPosition(glBtn.getPosition());
//                cc.log("gfs");
//            }.bind(glBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
//            glBtn.x = frame.getContentSize().width*0.38+100;
//            glBtn.y = frame.getContentSize().height*0.68-180;
//            glBtn.setTag(1006);
//            frame.addChild(glBtn);
//            var gfssprite=new cc.Sprite("#market_Android_handsome_gold_icon.png");
//            gfssprite.setPosition(spriteWithglBtn.width*0.48, spriteWithglBtn.height*0.7);
//            glBtn.addChild(gfssprite);
//            //money2label
//            var gfslabel = cc.LabelTTF.create("高富帅金币",getFONT_FZCY_M03SStr(),24);
//            gfslabel.setPosition(spriteWithglBtn.width*0.5, spriteWithglBtn.height*0.26);
//            gfslabel.setColor(cc.color(99,21,1));
//            glBtn.addChild(gfslabel);
//            //free
//            var gfsfree=new cc.Sprite("#market_Android_free.png");
//            gfsfree.setPosition(glBtn.width*0.95, glBtn.height);
//            glBtn.addChild(gfsfree);




//            var callbacknum=0;



            //buy
//            var spriteWithbuyBtn =new cc.Sprite("#market_Android_btn_buy_frame.png");
//            var scale9SpriteWithbuyBtn =new cc.Scale9Sprite("market_Android_btn_buy_frame.png");
//            var buyBtn = new cc.ControlButton(scale9SpriteWithbuyBtn);
//            buyBtn.setPreferredSize(cc.size(spriteWithbuyBtn.width, spriteWithbuyBtn.height));
//            buyBtn.addTargetWithActionForControlEvents(this, function(){
//                cc.log("selectnum");
//                cc.log(selectnum);
//                var testJSB = new JSB.JSBinding();
//                testJSB.retain();
//                testJSB.purchase(selectnum);
//                testJSB.purchaseCallBack2 = function(i,j){
//                    cc.log("failse 100");
//                    pauseMaskBg.removeFromParent();
//                    testJSB.release();
//                };
//                testJSB.purchaseCallBack = function(i,j){
//                    cc.log("market buy call back");
//                    cc.log("selectnum---->");
//                    cc.log(selectnum);
//                    if(selectnum==1)
//                    {
//                        setGold(parseInt(getGold() || 0)+100);
//                        ShowGoldChange(_this,"+100");
//                    }
//                    else if(selectnum==2)
//                    {
//
//                        setGold(parseInt(getGold() || 0)+200);
//                        ShowGoldChange(_this,"+200");
//                    }
//                    else if(selectnum==3)
//                    {
//
//                        setGold(parseInt(getGold() || 0)+400);
//                        ShowGoldChange(_this,"+400");
//                    }
//                    else if(selectnum==4)
//                    {
//                        setGold(parseInt(getGold() || 0)+1000);
//                        ShowGoldChange(_this,"+1000");
//                    }
//                    else if(selectnum==5)
//                    {
//                        cc.log("dzt");
//                    }
//                    else if(selectnum==6)
//                    {
//                        cc.log("gfs");
//                    }
//                    else if(selectnum==7)
//                    {
//                        cc.log("js");
//                        unclockAllPassion();
//                    }
//
//                    pauseMaskBg.removeFromParent();
//                    testJSB.release();
//                };
//
//                cc.log("buy");
//            }.bind(buyBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
//            buyBtn.x = frame.width/2;
//            buyBtn.y = adBtn8.getPositionY()-100;
//            buyBtn.setTag(1006);
//                                    cc.log("6");
//
//            frame.addChild(buyBtn);
//            //buysprite
//            var buysprite=new cc.Sprite("#market_Android_btn_buy_icon.png");
//            buysprite.setPosition(buyBtn.width*0.5, buyBtn.height*0.5);
//            buyBtn.addChild(buysprite);
            cc.log("android");
        }
        else// if(cc.sys.os == "iOS")///ipad|iphone|mac/i.test(navigator.userAgent)
        {
            cc.log("abc");
            //frame
            var frame=new cc.Sprite("#market_ios_frame.png");
            frame.setPosition(winsize.width/2,winsize.height/2);
            pauseMaskBg.addChild(frame);
            cc.log("abc1");

            var spriteWithcloseBtn =new cc.Sprite("#com_CPM_btn_close.png");//market_ios_btn_close.png
            cc.log("abc2");
            var scale9SpriteWithcloseBtn =new cc.Scale9Sprite("com_CPM_btn_close.png");
            var returnBtn = new cc.ControlButton(scale9SpriteWithcloseBtn);
            returnBtn.setPreferredSize(cc.size(spriteWithcloseBtn.width, spriteWithcloseBtn.height));
            returnBtn.addTargetWithActionForControlEvents(this, function(){
                playEffect(res.BUTTON_SOUNDS);
                pauseMaskBg.removeFromParent();
                cc.log("close");
            }.bind(returnBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
            returnBtn.x = frame.getPositionX()+frame.getContentSize().width*0.42;//
            returnBtn.y = frame.getPositionY()+frame.getContentSize().height*0.38;//
            returnBtn.setTag(1006);
            pauseMaskBg.addChild(returnBtn);
            cc.log("abc2");
            //titleframe
//            var titleframe=new cc.Sprite(res.market_ios_title_frame);
            var titleframe=new cc.Sprite("#market_ios_title_frame.png");
            titleframe.setPosition(frame.getContentSize().width/2,frame.getContentSize().height*0.99);
            frame.addChild(titleframe);
            //titleframeword
//            var titleframeword=new cc.Sprite(res.market_ios_title_word);
            var titleframeword=new cc.Sprite("#market_ios_title_word.png");
            titleframeword.setPosition(titleframe.getContentSize().width/2,titleframe.getContentSize().height*0.4);
            titleframe.addChild(titleframeword);
            cc.log("abc3");




            //money100
            var spriteWithmoney100Btn =new cc.Sprite("#market_ios_cool_gold_frame.png");
            var scale9SpriteWithmoney100Btn =new cc.Scale9Sprite("market_ios_cool_gold_frame.png");
            var money100Btn = new cc.ControlButton(scale9SpriteWithmoney100Btn);
            money100Btn.setPreferredSize(cc.size(spriteWithmoney100Btn.width, spriteWithmoney100Btn.height));
            money100Btn.addTargetWithActionForControlEvents(this, function(){
                playEffect(res.BUTTON_SOUNDS);

                var testJSB = new JSB.JSBinding();
                testJSB.retain();
                testJSB.purchase100();
                testJSB.purchaseCallBack2 = function(i,j){
                    cc.log("failse 100");
                    pauseMaskBg.removeFromParent();
                    testJSB.release();
                };
                testJSB.purchaseCallBack = function(i,j){
                    cc.log(" add gold :100");
                    setGold(parseInt(getGold() || 0)+100);
                    ShowGoldChange(_this,"+100");
                    pauseMaskBg.removeFromParent();
                    testJSB.release();
                };


                cc.log("money100");
            }.bind(money100Btn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
            money100Btn.x = frame.getContentSize().width*0.18;
            money100Btn.y = frame.getContentSize().height*0.68;
            money100Btn.setTag(1006);
            frame.addChild(money100Btn);
            cc.log("abc4");
            //money1sprite
            var money100sprite=new cc.Sprite("#market_ios_gold_icon_300.png");
            money100sprite.setPosition(spriteWithmoney100Btn.width*0.48, spriteWithmoney100Btn.height*0.7);
            money100Btn.addChild(money100sprite);
            //money1label
            var money100label = cc.LabelTTF.create("100",getFONT_FZCY_M03SStr(),24);
            money100label.setPosition(spriteWithmoney100Btn.width*0.26, spriteWithmoney100Btn.height*0.26);
            money100label.setColor(cc.color(229,70,70));
            money100Btn.addChild(money100label);
            var money100label2 = cc.LabelTTF.create("金币",getFONT_FZCY_M03SStr(),24);
            money100label2.setPosition(spriteWithmoney100Btn.width*0.66, spriteWithmoney100Btn.height*0.26);
            money100label2.setColor(cc.color(99,21,1));
            money100Btn.addChild(money100label2);
            //rmblabel
            var rmblabel100 = cc.LabelTTF.create("1元",getFONT_FZCY_M03SStr(),28);
            rmblabel100.setPosition(money100Btn.width*0.49, -money100Btn.height*0.11);
            rmblabel100.setColor(cc.color(99,21,1));
            money100Btn.addChild(rmblabel100);

            //money300
            var spriteWithmoney300Btn =new cc.Sprite("#market_ios_cool_gold_frame.png");
            var scale9SpriteWithmoney300Btn =new cc.Scale9Sprite("market_ios_cool_gold_frame.png");
            var money300Btn = new cc.ControlButton(scale9SpriteWithmoney300Btn);
            money300Btn.setPreferredSize(cc.size(spriteWithmoney300Btn.width, spriteWithmoney300Btn.height));
            money300Btn.addTargetWithActionForControlEvents(this, function(){
                playEffect(res.BUTTON_SOUNDS);

                var testJSB = new JSB.JSBinding();
                testJSB.retain();
                testJSB.purchase300();
                testJSB.purchaseCallBack2 = function(i,j){
                    cc.log("failse 300");
                    pauseMaskBg.removeFromParent();
                    testJSB.release();
                };
                testJSB.purchaseCallBack = function(i,j){
                    cc.log(" add gold :2000");
                    setGold(parseInt(getGold() || 0)+300);
                    ShowGoldChange(_this,"+300");
                    pauseMaskBg.removeFromParent();
                    testJSB.release();
                };


                cc.log("money300");
            }.bind(money300Btn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
            money300Btn.x = frame.getContentSize().width*0.38;
            money300Btn.y = frame.getContentSize().height*0.68;
            money300Btn.setTag(1006);
            frame.addChild(money300Btn);
            cc.log("abc4");
            //money1sprite
            var money300sprite=new cc.Sprite("#market_ios_gold_icon_300.png");
            money300sprite.setPosition(spriteWithmoney300Btn.width*0.48, spriteWithmoney300Btn.height*0.7);
            money300Btn.addChild(money300sprite);
            //money1label
            var money300label = cc.LabelTTF.create("300",getFONT_FZCY_M03SStr(),24);
            money300label.setPosition(spriteWithmoney300Btn.width*0.26, spriteWithmoney300Btn.height*0.26);
            money300label.setColor(cc.color(229,70,70));
            money300Btn.addChild(money300label);
            var money300label2 = cc.LabelTTF.create("金币",getFONT_FZCY_M03SStr(),24);
            money300label2.setPosition(spriteWithmoney300Btn.width*0.66, spriteWithmoney300Btn.height*0.26);
            money300label2.setColor(cc.color(99,21,1));
            money300Btn.addChild(money300label2);
            //rmblabel
            var rmblabel300 = cc.LabelTTF.create("3元",getFONT_FZCY_M03SStr(),28);
            rmblabel300.setPosition(money300Btn.width*0.49, -money300Btn.height*0.11);
            rmblabel300.setColor(cc.color(99,21,1));
            money300Btn.addChild(rmblabel300);







            //money1
            var spriteWithmoney1Btn =new cc.Sprite("#market_ios_cool_gold_frame.png");
            var scale9SpriteWithmoney1Btn =new cc.Scale9Sprite("market_ios_cool_gold_frame.png");
            var money1Btn = new cc.ControlButton(scale9SpriteWithmoney1Btn);
            money1Btn.setPreferredSize(cc.size(spriteWithmoney1Btn.width, spriteWithmoney1Btn.height));
            money1Btn.addTargetWithActionForControlEvents(this, function(){
                playEffect(res.BUTTON_SOUNDS);
//                maskPanel(this.getParent().getParent().getParent());
                var testJSB = new JSB.JSBinding();
                testJSB.retain();
                testJSB.purchase2();
                testJSB.purchaseCallBack2 = function(i,j){
                    cc.log("failse 2000");
                    pauseMaskBg.removeFromParent();
                    testJSB.release();
                };
                testJSB.purchaseCallBack = function(i,j){
                    cc.log(" add gold :2000");
                    setGold(parseInt(getGold() || 0)+2000);
                    ShowGoldChange(_this,"+2000");
                    pauseMaskBg.removeFromParent();
                    testJSB.release();
                };
                cc.log("money1");
            }.bind(money1Btn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
            money1Btn.x = frame.getContentSize().width*0.82;
            money1Btn.y = frame.getContentSize().height*0.68;
            money1Btn.setTag(1006);
            frame.addChild(money1Btn);
            cc.log("abc4");
            //money1sprite
            var money1sprite=new cc.Sprite("#market_ios_gold_icon_1000.png");
            money1sprite.setPosition(spriteWithmoney1Btn.width*0.48, spriteWithmoney1Btn.height*0.7);
            money1Btn.addChild(money1sprite);
            //money1label
            var money1label = cc.LabelTTF.create("2000",getFONT_FZCY_M03SStr(),24);
            money1label.setPosition(spriteWithmoney1Btn.width*0.26, spriteWithmoney1Btn.height*0.26);
            money1label.setColor(cc.color(229,70,70));
            money1Btn.addChild(money1label);
            var money1label2 = cc.LabelTTF.create("金币",getFONT_FZCY_M03SStr(),24);
            money1label2.setPosition(spriteWithmoney1Btn.width*0.66, spriteWithmoney1Btn.height*0.26);
            money1label2.setColor(cc.color(99,21,1));
            money1Btn.addChild(money1label2);
            //rmblabel
            var rmblabel = cc.LabelTTF.create("18元",getFONT_FZCY_M03SStr(),28);
            rmblabel.setPosition(money1Btn.width*0.49, -money1Btn.height*0.11);
            rmblabel.setColor(cc.color(99,21,1));
            money1Btn.addChild(rmblabel);
            cc.log("abc5");
            //money2bg
//            var money2bg=new cc.Sprite(res.market_ios_selecte_01);
//            var money2bg=new cc.Sprite("#market_ios_selecte_01.png");
//            money2bg.setPosition(money1Btn.getPositionX()+230,money1Btn.getPositionY());
//            frame.addChild(money2bg);
            cc.log("abc6");
//            var spriteWithmoney2Btn = new cc.Sprite(res.market_ios_gold_frame);
//            var scale9SpriteWithmoney2Btn = new cc.Scale9Sprite(res.market_ios_gold_frame);
            var spriteWithmoney2Btn =new cc.Sprite("#market_ios_cool_gold_frame.png");
            cc.log("abc62");
            var scale9SpriteWithmoney2Btn =new cc.Scale9Sprite("market_ios_cool_gold_frame.png");
            var money2Btn = new cc.ControlButton(scale9SpriteWithmoney2Btn);
            money2Btn.setPreferredSize(cc.size(spriteWithmoney2Btn.width, spriteWithmoney2Btn.height));
            money2Btn.addTargetWithActionForControlEvents(this, function(){
                playEffect(res.BUTTON_SOUNDS);
//                maskPanel(this.getParent().getParent().getParent());
                var testJSB = new JSB.JSBinding();
                testJSB.retain();
                testJSB.purchase1();
                testJSB.purchaseCallBack = function(i,j){
                                                          cc.log("add 600");
                    setGold(parseInt(getGold() || 0)+600);

                    ShowGoldChange(_this,"+600");
                    pauseMaskBg.removeFromParent();
//                    pauseMaskBg.getParent().removeFromParent(true);
                    testJSB.release();
//                    frame.getParent().getParent().getChildByTag(1000).removeFromParent();
                };
                testJSB.purchaseCallBack2 = function(i,j){
                                                          cc.log("failse 600");
//                    pauseMaskBg.getParent().removeFromParent(true);
                    pauseMaskBg.removeFromParent();
//                    frame.getParent().getParent().getChildByTag(1000).removeFromParent();
                    testJSB.release();
                    cc.log("remove");
                };
                cc.log("abc7");
//                  cc.log("abc");                                        testJSB.release();
                cc.log("money2");
            }.bind(money2Btn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
            money2Btn.x = frame.getContentSize().width*0.6;
            money2Btn.y = money1Btn.getPositionY();
            money2Btn.setTag(1006);
            frame.addChild(money2Btn);
            //money2sprite
//            var money2sprite=new cc.Sprite(res.market_ios_gold_icon_300);
            cc.log("abc612");
            var money2sprite=new cc.Sprite("#market_ios_gold_icon_300.png");
            money2sprite.setPosition(spriteWithmoney2Btn.width*0.48, spriteWithmoney2Btn.height*0.7);
            money2Btn.addChild(money2sprite);
            //money2label
            var money2label = cc.LabelTTF.create("600",getFONT_FZCY_M03SStr(),24);
            money2label.setPosition(spriteWithmoney2Btn.width*0.28, spriteWithmoney2Btn.height*0.26);
            money2label.setColor(cc.color(229,70,70));
            money2Btn.addChild(money2label);
            var money2label2 = cc.LabelTTF.create("金币",getFONT_FZCY_M03SStr(),24);
            money2label2.setPosition(spriteWithmoney2Btn.width*0.6, spriteWithmoney2Btn.height*0.26);
            money2label2.setColor(cc.color(99,21,1));
            money2Btn.addChild(money2label2);
            cc.log("abc622");



            //rmblabel
            var rmblabel2 = cc.LabelTTF.create("6元",getFONT_FZCY_M03SStr(),28);
            rmblabel2.setPosition(money2Btn.width*0.49, -money2Btn.height*0.08);
            rmblabel2.setColor(cc.color(99,21,1));
            money2Btn.addChild(rmblabel2);
            //ad
//            var spriteWithadBtn = new cc.Sprite(res.market_ios_AD);
//            var scale9SpriteWithadBtn = new cc.Scale9Sprite(res.market_ios_AD);
            cc.log("abc632");
            var spriteWithadBtn =new cc.Sprite("#market_ios_btn_AD.png");
            cc.log("abc642");
            var scale9SpriteWithadBtn =new cc.Scale9Sprite("market_ios_btn_AD.png");
            cc.log("abc652");
            var adBtn = new cc.ControlButton(scale9SpriteWithadBtn);
            adBtn.setPreferredSize(cc.size(spriteWithadBtn.width, spriteWithadBtn.height));
            adBtn.addTargetWithActionForControlEvents(this, function(){
                playEffect(res.BUTTON_SOUNDS);
//                maskPanel(this.getParent().getParent().getParent());
                var testJSB = new JSB.JSBinding();
                testJSB.retain();
                testJSB.purchase5();
                testJSB.purchaseCallBack = function(i,j){
                                                      cc.log("remove ad ");
//                    pauseMaskBg.getParent().removeFromParent(true);
                    pauseMaskBg.removeFromParent();
//                    frame.getParent().getParent().getChildByTag(1000).removeFromParent();
                    testJSB.release();
                };
                testJSB.purchaseCallBack2 = function(i,j){
                                                      cc.log("failse ad");
//                    pauseMaskBg.getParent().removeFromParent(true);
                    pauseMaskBg.removeFromParent();
//                    frame.getParent().getParent().getChildByTag(1000).removeFromParent();
                    testJSB.release();
                    cc.log("remove");
                };

                cc.log("ad");
            }.bind(adBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
            adBtn.x = frame.getContentSize().width*0.18;
            adBtn.y = frame.getContentSize().height*0.68-180;
            adBtn.setTag(1006);
            frame.addChild(adBtn);
            var rmblabel22 = cc.LabelTTF.create("3元",getFONT_FZCY_M03SStr(),28);
            rmblabel22.setPosition(adBtn.width*0.49, -adBtn.height*0.08);
            rmblabel22.setColor(cc.color(99,21,1));
            adBtn.addChild(rmblabel22);



            //攻略购买
            var spriteWithglBtn =new cc.Sprite("#market_ios_btn_strategy.png");
            cc.log("abc642");
            var scale9SpriteWithglBtn =new cc.Scale9Sprite("market_ios_btn_strategy.png");
            cc.log("abc652");
            var glBtn = new cc.ControlButton(scale9SpriteWithglBtn);
            glBtn.setPreferredSize(cc.size(spriteWithglBtn.width, spriteWithglBtn.height));
            glBtn.addTargetWithActionForControlEvents(this, function(){
                playEffect(res.BUTTON_SOUNDS);
//                maskPanel(this.getParent().getParent().getParent());
                var testJSB = new JSB.JSBinding();
                testJSB.retain();
                testJSB.purchase4();
                testJSB.purchaseCallBack = function(i,j){
                    setIsBuyCheat(1);
                                                      cc.log("gong lue unclockAllPassion();");
                    cc.log(getIsBuyCheats());
                    pauseMaskBg.removeFromParent();
//                    pauseMaskBg.getParent().removeFromParent(true);
//                    unclockAllPassion();
//                    frame.getParent().getParent().getChildByTag(1000).removeFromParent();
                    testJSB.release();
                };
                testJSB.purchaseCallBack2 = function(i,j){
                    pauseMaskBg.removeFromParent();
//                    pauseMaskBg.getParent().removeFromParent(true);
                                                      cc.log("failse gong lue unclockAllPassion();");
//                    frame.getParent().getParent().getChildByTag(1000).removeFromParent();
                    testJSB.release();
                    cc.log("remove");
                };

                cc.log("ad");
            }.bind(glBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
            glBtn.x = frame.getContentSize().width*0.38;
            glBtn.y = frame.getContentSize().height*0.68-180;
            glBtn.setTag(1006);
            frame.addChild(glBtn);
            var rmblabel222 = cc.LabelTTF.create("6元",getFONT_FZCY_M03SStr(),28);
            rmblabel222.setPosition(glBtn.width*0.49, -glBtn.height*0.08);
            rmblabel222.setColor(cc.color(99,21,1));
            glBtn.addChild(rmblabel222);





            //jb
//            var spriteWithjbBtn = new cc.Sprite(res.market_ios_cool_gold_frame);
//            var scale9SpriteWithjbBtn = new cc.Scale9Sprite(res.market_ios_cool_gold_frame);
            cc.log("abc662");
            var spriteWithjbBtn =new cc.Sprite("#market_ios_cool_gold_frame.png");
            cc.log("abc672");
            var scale9SpriteWithjbBtn =new cc.Scale9Sprite("market_ios_cool_gold_frame.png");
            cc.log("abc682");
            var jbBtn = new cc.ControlButton(scale9SpriteWithjbBtn);
            jbBtn.setPreferredSize(cc.size(spriteWithjbBtn.width, spriteWithjbBtn.height));
            jbBtn.addTargetWithActionForControlEvents(this, function(){
                playEffect(res.BUTTON_SOUNDS);
                var testJSB = new JSB.JSBinding();
                testJSB.retain();
                testJSB.restorePurchase();
                testJSB.purchaseCallBack = function(i,j){
                    cc.log("restorePurchase");
                    if(i == "1004"){
                        cc.log("1004");
                        unlockCheats();
                    }else if(i == "1005"){
                        cc.log("1005");
                        setIsRemoveAD(true);
                    }else if(i == "1006"){
                        cc.log("1006");
                        unclockAllPassion();
                    }
                    else
                    {
                        cc.log("0");
                    }
//                  pauseMaskBg.removeFromParent();

//                    testJSB.release();
//                    pauseMaskBg.removeFromParent(true);
                };
                testJSB.purchaseCallBack2 = function(i,j){
                                                      cc.log("failse restorePurchase");
                    pauseMaskBg.removeFromParent();
                    testJSB.release();
//                    pauseMaskBg.removeFromParent(true);
                };
                cc.log("jb");
            }.bind(jbBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
            jbBtn.x = frame.getContentSize().width*0.82;
            jbBtn.y = frame.getContentSize().height*0.68-180;
            jbBtn.setTag(1006);
            frame.addChild(jbBtn);
            //jbsprite
//            var jbsprite=new cc.Sprite(res.market_ios_return_word);
            cc.log("abc692");
            var jbsprite=new cc.Sprite("#market_ios_btn_return.png");
            jbsprite.setPosition(spriteWithjbBtn.width/2, spriteWithjbBtn.height/2);
            jbBtn.addChild(jbsprite);
            //jblabel
//            var jblabel2 = cc.LabelTTF.create("恢复购买",getFONT_FZCY_M03SStr(),24);
//            jblabel2.setPosition(jbBtn.width*0.48, jbBtn.height*0.26);
//            jblabel2.setColor(cc.color(99,21,1));
//            jbBtn.addChild(jblabel2);


            cc.log("abc621");
            //解锁全部关卡
//            var spriteWithadBtn8 = new cc.Sprite(res.market_ios_deblocking_word);
//            var scale9SpriteWithadBtn8 = new cc.Scale9Sprite(res.market_ios_deblocking_word);
            var spriteWithadBtn8 =new cc.Sprite("#market_ios_btn_deblocking.png");
            cc.log("abc622");
            var scale9SpriteWithadBtn8 =new cc.Scale9Sprite("market_ios_btn_deblocking.png");
            cc.log("abc623");
            var adBtn8 = new cc.ControlButton(scale9SpriteWithadBtn8);
            adBtn8.setPreferredSize(cc.size(spriteWithadBtn8.width, spriteWithadBtn8.height));
            adBtn8.addTargetWithActionForControlEvents(this, function(){
                playEffect(res.BUTTON_SOUNDS);
//                maskPanel(this.getParent().getParent().getParent());
                var testJSB = new JSB.JSBinding();
                testJSB.retain();
                testJSB.purchase6();
                testJSB.purchaseCallBack = function(i,j){
//                    pauseMaskBg.getParent().removeFromParent(true);
                    pauseMaskBg.getParent().removeFromParent(true);

//                    frame.getParent().getParent().getChildByTag(1000).removeFromParent();
                                                       cc.log("purchase6()unclockAllPassion();");
                    unclockAllPassion();
                    testJSB.release();
                };
                testJSB.purchaseCallBack2 = function(i,j){
                                                        cc.log("failse purchase6()unclockAllPassion();");
                    pauseMaskBg.getParent().removeFromParent(true);

//                    pauseMaskBg.getParent().removeFromParent(true);
//                    frame.getParent().getParent().getChildByTag(1000).removeFromParent();
                    testJSB.release();
                    cc.log("remove");
                };

                cc.log("ad");
            }.bind(adBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
            adBtn8.x = frame.getContentSize().width*0.6;
            adBtn8.y = frame.getContentSize().height*0.68-180;
            adBtn8.setTag(1006);
            frame.addChild(adBtn8);

            var rmblabel2222 = cc.LabelTTF.create("6元",getFONT_FZCY_M03SStr(),28);
            rmblabel2222.setPosition(adBtn8.width*0.49, -adBtn8.height*0.02);
            rmblabel2222.setColor(cc.color(99,21,1));
            adBtn8.addChild(rmblabel2222);

            //免费金币
            var spriteWithadFreegold =new cc.Sprite("res/k4_btn_free.png");
            var scale9SpriteWithadFreegold =new cc.Scale9Sprite("res/k4_btn_free.png");
            var Freegold = new cc.ControlButton(scale9SpriteWithadFreegold);
            Freegold.setPreferredSize(cc.size(spriteWithadFreegold.width, spriteWithadFreegold.height));
            Freegold.addTargetWithActionForControlEvents(this, function(){
                playEffect(res.BUTTON_SOUNDS);

                var testJSB = new JSB.JSBinding();
                testJSB.retain();
                testJSB.showVideo();
                testJSB.release();
                            }.bind(Freegold), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
            Freegold.x = frame.getContentSize().width - 5;
            Freegold.y = 70;
            Freegold.setTag(1007);
            frame.addChild(Freegold);

            cc.log("ios");
        }
        cc.log("market");
    }


});
//隐藏界面
function maskPanel(scene)
{
    var size = cc.director.getWinSize();
    var bg = new cc.LayerColor(cc.color(0, 0, 0,10), size.width, size.height);
    setPanelAppearAnimation(bg);
    scene.addChild(bg, 1000);
    bg.setTag(1000);

    var listener1 = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            cc.log("begin");
            var target = event.getCurrentTarget();

            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);

            if (cc.rectContainsPoint(rect, locationInNode)) {
                cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                return true;
            }
            return false;
        },
        onTouchMoved: function (touch, event) {

        },
        onTouchEnded: function (touch, event) {
            cc.log("end");
        }
    });
    cc.eventManager.addListener(listener1, bg);
}

//显示正常的游戏结束的界面
function showNormalGameOverPanel(scene, score, passionLevel,normalGameLevel)
{

    pauseAllNode();
    stopAllEffect();
    stopBackgroundMusic();
    playEffect("res/music/normal_success.mp3");

    var testJSB = new JSB.JSBinding();
    testJSB.retain();
    testJSB.showFullScreenAd();
    testJSB.release();

    var testJSB = new JSB.JSBinding();
    testJSB.retain();
    testJSB.uploadPassionLevelToUmeng(1,normalGameLevel,2);
    testJSB.release();


    cc.log("now score is:"+score +"now level is:"+normalGameLevel);

    var size = cc.director.getWinSize();
    var bg = new cc.LayerColor(cc.color(0, 0, 0,150), size.width, size.height);
    setPanelAppearAnimation(bg);
    scene.addChild(bg, 1000);
    bg.setTag(1000);


    var spriteWithBg = new cc.Sprite("#win_frame.png");
    spriteWithBg.x = size.width/2;
    spriteWithBg.y = size.height/2;
    bg.addChild(spriteWithBg);

    //评价
    var appraise=new cc.LabelTTF("您的评级：",getFONT_FZCY_M03SStr(),35);
    appraise.attr({
        anchorX:1,
        x:spriteWithBg.getBoundingBox().width/2-20,
        y:305,
        color:cc.color(160,200,238)
    });
    spriteWithBg.addChild(appraise);

    //赚得金币
    var earnCoins=new cc.LabelTTF("赚得金币：",getFONT_FZCY_M03SStr(),35);
    earnCoins.attr({
        anchorX:1,
        x:spriteWithBg.getBoundingBox().width/2-20,
        y:240,
        color:cc.color(160,200,238)
    });
    spriteWithBg.addChild(earnCoins);

    var normal_gold_icon=new cc.Sprite("#normal_game_win_gold_icon.png");
    normal_gold_icon.attr({
        anchorX:0,
        x:spriteWithBg.getBoundingBox().width/2-10,
        y:240
    });
    spriteWithBg.addChild(normal_gold_icon);

    var normal_X=new cc.Sprite("#normal_game_win_x.png");
    normal_X.attr({
        anchorX:0,
        x:spriteWithBg.getBoundingBox().width/2+40,
        y:240
    });
    spriteWithBg.addChild(normal_X);

    var lbGold=new cc.LabelTTF("0",getFONT_FZCY_M03SStr(),60);
    lbGold.attr({
        anchorX:0,
        x:spriteWithBg.getBoundingBox().width/2+65,
        y:245,
        color:cc.color(240,218,48)
    });
    spriteWithBg.addChild(lbGold);

    //下一等级所需分数
    var needScoreBg=new cc.Sprite("#normal_game_next_frame.png");
    needScoreBg.attr({
        x:spriteWithBg.getBoundingBox().width/2,
        y:180
    });
    spriteWithBg.addChild(needScoreBg);

    var lbNeedScore=new cc.LabelTTF("下一等级所需分数：",getFONT_FZCY_M03SStr(),30);
    lbNeedScore.attr({
        x:spriteWithBg.getBoundingBox().width/2,
        y:180,
        color:cc.color(36,180,218)
    });
    spriteWithBg.addChild(lbNeedScore);


    var normal_key=[NORMAL_GAME_STATUS_1,NORMAL_GAME_STATUS_2,NORMAL_GAME_STATUS_3,NORMAL_GAME_STATUS_4];

    //得到金币
    var goldArr=[1,2,3,5,8,10,15];
    var levelArr=["f","e","d","c","b","a","s"];
    cc.loader.loadTxt("res/normalGameConfig.csv",function(err,data){
        if(err)return;
        var gameLevel = CSVToArray(data, ",")[normalGameLevel],
            _gold= 0,
            curLevel,
            lbLevel;

        for(var i=2;i<gameLevel.length;i++){
            if(score==0){
                //评价
                curLevel=levelArr[i-2];
                lbLevel=new cc.Sprite("#normal_game_grade_"+curLevel+".png");

                //所需分数
                lbNeedScore.setString("下一等级所需分数："+gameLevel[i]);

                break;
            }
            else if(score<gameLevel[i]){
                cc.log("获得金币："+goldArr[i-2]);
                _gold=goldArr[i-2];

                //评价
                curLevel=levelArr[i-2];
                lbLevel=new cc.Sprite("#normal_game_grade_"+curLevel+".png");

                //所需分数
                lbNeedScore.setString("下一等级所需分数："+gameLevel[i]);


                break;
            }else if(score>=gameLevel[gameLevel.length-1]){
                cc.log("获得金币："+goldArr[goldArr.length-1]);
                _gold=goldArr[goldArr.length-1];

                //评价
                curLevel=levelArr[levelArr.length-1];
                lbLevel=new cc.Sprite("#normal_game_grade_"+curLevel+".png");

                //所需分数
                if(parseFloat(cc.sys.localStorage.getItem(normal_key[normalGameLevel-1]).split(",")[0] || 0)<score.toFixed(1)) {
                    lbNeedScore.setString("当前分数是最高分数");
                }else{
                    var differ=parseFloat(cc.sys.localStorage.getItem(normal_key[normalGameLevel-1]).split(",")[0] || 0)-score.toFixed(1);
                    lbNeedScore.setString("还差"+differ.toFixed(1)+"分就超越最高分数了");
                }


                break;
            }
        }

        lbLevel.attr({
            anchorX:0,
            x:spriteWithBg.getBoundingBox().width/2-5,
            y:305
        });
        spriteWithBg.addChild(lbLevel);

        lbGold.string=_gold;

        if(parseFloat(cc.sys.localStorage.getItem(normal_key[normalGameLevel-1]).split(",")[0] || 0)<score.toFixed(1)){
            cc.sys.localStorage.setItem(normal_key[normalGameLevel-1],score.toFixed(1)+","+curLevel);
        }

        if(parseInt(_gold)>0){
            setGold(parseInt(getGold() || 0) + _gold);

            ShowGoldChange(scene,("+"+_gold));
        }
    });

  //改包名去掉分享
//    //炫耀按钮
//    var flauntBtn9Sprite=new cc.Scale9Sprite("com_btn_blue.png");
//    var flauntBtn = new cc.ControlButton(flauntBtn9Sprite);
//    flauntBtn.attr({
//        width:92,
//        height:98,
//        x:spriteWithBg.getContentSize().width/2-150+50,
//        y:spriteWithBg.getContentSize().height/2-100
//    });
//    flauntBtn.setPreferredSize(cc.size(flauntBtn.width, flauntBtn.height));
//    flauntBtn.addTargetWithActionForControlEvents(this, function(){
//        playEffect(res.BUTTON_SOUNDS);
//
//        cc.log(normalGameLevel + " my passionLevel: ");
//        var shareWord = "";
//        if(normalGameLevel == 1){
//            shareWord = "咬死坑爹男，花样作死" + score + "次！";
//        }else if(normalGameLevel == 2){
//            shareWord = "真·穿越火线，是男人就超越" + score.toFixed(1) + "秒！";
//        }else if(normalGameLevel == 3){
//            shareWord = "钢丝诱惑，你们的手速能过" + score + "个吗？";
//        }else if(normalGameLevel == 4){
//            shareWord = "学厨师，到坑爹厨房！轻松切出" + score + "棵菜。";
//        }
//
//
//
//
//        var testJSB = new JSB.JSBinding();
//        testJSB.retain();
//        testJSB.showWCImageContent(_arr[passionLevel-1][0],5,shareWord,0);
//        testJSB.release();
//
//
//    }, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
//    spriteWithBg.addChild(flauntBtn);
//
//    var flaunt_icon = new cc.Sprite("#win_btn_flaunt_icon.png");
//    flaunt_icon.x = flauntBtn.width/2-5;
//    flaunt_icon.y = flauntBtn.height/2+5;
//    flauntBtn.addChild(flaunt_icon);




    //返回转盘
    var spriteWithhomeBtn = new cc.Sprite("#com_btn_blue.png");
    var scale9SpriteWithhomeBtn = new cc.Scale9Sprite("com_btn_blue.png");
    var homeBtn = new cc.ControlButton(scale9SpriteWithhomeBtn);
    homeBtn.setPreferredSize(cc.size(spriteWithhomeBtn.width, spriteWithhomeBtn.height));
    homeBtn.addTargetWithActionForControlEvents(this, function(){
        setIsPauseGame(0);
        pauseAllEffect();
        pauseBackgroundMusic();
        playEffect(res.BUTTON_SOUNDS);

//        resumeAllNode();
        pauseAllNode();

        ShowNormalGame(this.getParent().getParent().getParent(), passionLevel,_arr);

    }.bind(homeBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
    homeBtn.x = spriteWithBg.getContentSize().width/2-50+50;
    homeBtn.y = spriteWithBg.getContentSize().height/2-100;
    homeBtn.setTag(1006);
    spriteWithBg.addChild(homeBtn);

    var spriteWithhome = new cc.Sprite("res/normal_game/normal_game_pause_btn_back_icon.png");
    spriteWithhome.x = homeBtn.width/2-5;
    spriteWithhome.y = homeBtn.height/2+9;
    homeBtn.addChild(spriteWithhome);




//广告按钮
    if(getLauchCheck()==0&& getAd_Title5_Text() != "") {
        var spriteWithremoveAdBtn = new cc.Sprite("#com_btn_blue.png");
        var scale9SpriteWithremoveAdBtn = new cc.Scale9Sprite("com_btn_blue.png");
        var removeAdBtn = new cc.ControlButton(scale9SpriteWithremoveAdBtn);
        removeAdBtn.setPreferredSize(cc.size(spriteWithremoveAdBtn.width, spriteWithremoveAdBtn.height));
        removeAdBtn.addTargetWithActionForControlEvents(this, function () {
            playEffect(res.BUTTON_SOUNDS);
            var testJSB = new JSB.JSBinding();
            testJSB.retain();
            testJSB.openUrl(6,1,getAd_Title5_URL());
            testJSB.release();
//        var testJSB = new JSB.JSBinding();
//        testJSB.retain();
//        testJSB.purchase5();
//        testJSB.purchaseCallBack = function(i,j){
//            frame.getParent().getParent().getChildByTag(1000).removeFromParent();
//        };
//        testJSB.purchaseCallBack2 = function(i,j){
//            frame.getParent().getParent().getChildByTag(1000).removeFromParent();
//            cc.log("remove1111");
//        };

            //            this.parent.callOutremoveAdPanel();
        }.bind(removeAdBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
        removeAdBtn.x = spriteWithBg.getContentSize().width / 2 + 50 + 50;
        removeAdBtn.y = spriteWithBg.getContentSize().height / 2 - 100;
        removeAdBtn.setTag(1006);

        var failADTitle = new cc.LabelTTF(getAd_Title5_Text(),getFONT_FZCY_M03SStr(),30);
        failADTitle.x = removeAdBtn.width/2-5;
        failADTitle.y = removeAdBtn.height/2+7;
        removeAdBtn.addChild(failADTitle);


        spriteWithBg.addChild(removeAdBtn);
    }

//    var spriteWithremoveAd = new cc.Sprite("#pause_btn_AD.png");
//    spriteWithremoveAd.x = removeAdBtn.width/2-5;
//    spriteWithremoveAd.y = removeAdBtn.height/2+10;
//    removeAdBtn.addChild(spriteWithremoveAd);




//    var sendGold  = new cc.Sprite(res.game_send_gold);
//    sendGold.attr({
//        x:flauntBtn.width/2+30,
//        y:flauntBtn.height/2+40
//    });
//    flauntBtn.addChild(sendGold);
//    sendGold.runAction(cc.sequence(cc.scaleTo(0.3,1.15),cc.scaleTo(0.3,1)).repeatForever());


    //再玩一次按钮
//    var againBtn9Sprite=new cc.Scale9Sprite("com_btn_blue.png");
//    var againBtn = new cc.ControlButton(againBtn9Sprite);
//    againBtn.attr({
//        width:92,
//        height:98,
//        x:spriteWithBg.getContentSize().width/2-65,
//        y:spriteWithBg.getContentSize().height/2-100
//    });
//    againBtn.setPreferredSize(cc.size(againBtn.width, againBtn.height));
//    againBtn.addTargetWithActionForControlEvents(this, function(){
//        playEffect(res.BUTTON_SOUNDS);
//        this.getParent().getParent().getParent().removeFromParent();
//    }, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
//    spriteWithBg.addChild(againBtn);
//
//    var again_icon = new cc.Sprite("#win_btn_again_icon.png");
//    again_icon.x = againBtn.width/2-5;
//    again_icon.y = againBtn.height/2+5;
//    againBtn.addChild(again_icon);


    //下一关按钮
//    var resumeBtn9Sprite=new cc.Scale9Sprite("com_btn_blue.png");
//    var resumeBtn = new cc.ControlButton(resumeBtn9Sprite);
//    resumeBtn.attr({
//        width:92,
//        height:98,
//        x:spriteWithBg.getContentSize().width/2+40,
//        y:spriteWithBg.getContentSize().height/2-100
//    });
//    resumeBtn.setPreferredSize(cc.size(resumeBtn.width, resumeBtn.height));
//    resumeBtn.addTargetWithActionForControlEvents(this, function(){
//        playEffect(res.BUTTON_SOUNDS);
//
//        if(curLevel<24){
//            jumpToSceneByLevel(curLevel+1, _arr);
//        }else{
//            cc.director.runScene(new PassionScene(null, 24));
//        }
//
//    }, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
//    spriteWithBg.addChild(resumeBtn);
//
//    var resume_icon = new cc.Sprite("#win_btn_resume_icon.png");
//    resume_icon.x = resumeBtn.width/2;
//    resume_icon.y = resumeBtn.height/2+5;
//    resumeBtn.addChild(resume_icon);








    //关闭按钮
    var closeBtn9Sprite=new cc.Scale9Sprite("com_btn_purple.png");
    closeBtn = new cc.ControlButton(closeBtn9Sprite);
    closeBtn.attr({
        width:86,
        height:86,
        x:spriteWithBg.getContentSize().width/2+270,
        y:spriteWithBg.getContentSize().height/2+150
    });
    closeBtn.setPreferredSize(cc.size(closeBtn.width, closeBtn.height));
    closeBtn.addTargetWithActionForControlEvents(this, function(){
        playEffect(res.BUTTON_SOUNDS);
        cc.log("close the fail panel");
        resumeAllNode();
//        this.getParent().getParent().getParent().removeFromParent();

        var curLevel=0;
        for(var i=0;i<_arr.length;i++) {
            if (_arr[i][0] == passionLevel) {
                curLevel=i+1;
            }
        }

                                                 cc.log("current level2:"+passionLevel);
        jumpToSceneByLevel(curLevel, _arr, 1);

    }.bind(closeBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
    spriteWithBg.addChild(closeBtn);

    var close_icon=new cc.Sprite("#com_btn_purple_close.png");
    close_icon.attr({
        x:closeBtn.getBoundingBox().width/2-4,
        y:closeBtn.getBoundingBox().height/2+8
    });
    closeBtn.addChild(close_icon);




    var listener1 = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            cc.log("begin");
            var target = event.getCurrentTarget();

            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);

            if (cc.rectContainsPoint(rect, locationInNode)) {
                cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                return true;
            }
            return false;
        },
        onTouchMoved: function (touch, event) {

        },
        onTouchEnded: function (touch, event) {
            cc.log("end");
        }
    });
    cc.eventManager.addListener(listener1, bg);

}

//全部关卡都解锁
function UnlockBuyPanel(yourScene) {  //全关卡解锁

    var size=cc.director.getWinSize();
    var bg = new cc.LayerColor(cc.color(0, 0, 0,150), size.width, size.height);
    setPanelAppearAnimation(bg);
    yourScene.addChild(bg, 1000);
    var spriteWithBg = new cc.Sprite("res/jihuozhengban.png");
    spriteWithBg.x = size.width/2;
    spriteWithBg.y = size.height/2;
    bg.addChild(spriteWithBg);

//    var panelDec = new cc.Sprite("#unlock_title.png");
//    panelDec.x = spriteWithBg.getContentSize().width / 2;
//    panelDec.y = spriteWithBg.getContentSize().height / 2+168;
//    spriteWithBg.addChild(panelDec);

//    //消息
//    var panelWord=new cc.Sprite("#unlock_word.png");
//    panelWord.attr({
//        x:spriteWithBg.getContentSize().width/2,
//        y:spriteWithBg.getContentSize().height/2+20
//    });
//    spriteWithBg.addChild(panelWord);
//
//    var rmbStr = "";
//    if(cc.sys.os == "iOS"){
//        rmbStr = "6";
//    }else{
//        rmbStr = "4";
//    }
//    var labelForRMB = new cc.LabelTTF(rmbStr, getFONT_FZCY_M03SStr(), 30);
//    labelForRMB.x = 20;
//    labelForRMB.y = 75;
//    labelForRMB.color = cc.color(10, 72, 101);
//    panelWord.addChild(labelForRMB);



    //关闭按钮
    var closeBtn9Sprite=new cc.Scale9Sprite("com_CPM_btn_close.png");
    var closeBtn = new cc.ControlButton(closeBtn9Sprite);
    closeBtn.attr({
        x:spriteWithBg.getContentSize().width/2+262,
        y:spriteWithBg.getContentSize().height/2+138
    });
    closeBtn.setPreferredSize(cc.size(44, 44));
    closeBtn.addTargetWithActionForControlEvents(this, function(){
        playEffect(res.BUTTON_SOUNDS);

        this.getParent().getParent().removeFromParent();
    }.bind(closeBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
    spriteWithBg.addChild(closeBtn);



    //确认按钮
    var affirmBtn9Sprite=new cc.Scale9Sprite("res/jihuozhengban_buy.png");
    var affirmBtn = new cc.ControlButton(affirmBtn9Sprite);
    affirmBtn.attr({
        width:190,
        height:76,
        x:spriteWithBg.getContentSize().width/2,
        y:spriteWithBg.getContentSize().height/2-126
    });
    affirmBtn.setPreferredSize(cc.size(affirmBtn.width, affirmBtn.height));
    affirmBtn.addTargetWithActionForControlEvents(this, function(){
        playEffect(res.BUTTON_SOUNDS);
        //解锁全部关卡
        //坑5里面用不知道要不要加
//        if(cc.sys.os=="iOS" || cc.sys.os == cc.sys.OS_ANDROID){
//
//            var size = cc.director.getWinSize();
//            var bgForAffirm = new cc.Layer();
//            bgForAffirm.setContentSize(this.getParent().width, this.getParent().height);
//            this.getParent().addChild(bgForAffirm, 1000);
//            bgForAffirm.setTag(1000);
//
//            var listener1 = cc.EventListener.create({
//                event: cc.EventListener.TOUCH_ONE_BY_ONE,
//                swallowTouches: true,
//                onTouchBegan: function (touch, event) {
//                    cc.log("begin");
//                    var target = event.getCurrentTarget();
//
//                    var locationInNode = target.convertToNodeSpace(touch.getLocation());
//                    var s = target.getContentSize();
//                    var rect = cc.rect(0, 0, s.width, s.height);
//
//                    if (cc.rectContainsPoint(rect, locationInNode)) {
//                        cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
//                        return true;
//                    }
//                    return false;
//                },
//                onTouchMoved: function (touch, event) {
//
//                },
//                onTouchEnded: function (touch, event) {
//                    cc.log("end");
//                }
//            });
//            cc.eventManager.addListener(listener1, bgForAffirm);




        var testJSB = new JSB.JSBinding();
        testJSB.retain();
        testJSB.purchase6();
        testJSB.purchaseCallBack = function(i,j){
            cc.log("gong lue unclockAllPassion();");
            cc.log(getIsBuyCheats());
            bg.removeFromParent();

            if(cc.sys.os != "iOS") {
                cc.log("gonguepassion");
                setUnLockStatus(1);
            }else{
                unclockAllPassion();
            }
            cc.director.runScene(new PassionScene());
            testJSB.release();
        };
        testJSB.purchaseCallBack2 = function(i,j){
            cc.log("failse gong lue unclockAllPassion();");
//            bgForAffirm.removeFromParent();
            testJSB.release();
            cc.log("remove");
        };

    }.bind(affirmBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
    spriteWithBg.addChild(affirmBtn);

//    var affirm_icon = new cc.Sprite("#unlock_buy_icon.png");
//    affirm_icon.attr({
//        x:affirmBtn.getBoundingBox().width/2,
//        y:affirmBtn.getBoundingBox().height/2
//    });
//    affirmBtn.addChild(affirm_icon);


    var listener1 = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            cc.log("begin");
            var target = event.getCurrentTarget();

            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);

            if (cc.rectContainsPoint(rect, locationInNode)) {
                cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                return true;
            }
            return false;
        },
        onTouchMoved: function (touch, event) {

        },
        onTouchEnded: function (touch, event) {
            cc.log("end");
        }
    });
    cc.eventManager.addListener(listener1, bg);


}


function ShowGoldChange(yourScene,gold,delay){

    var winSize=cc.director.getWinSize();

    delay=delay?delay:0.0001;
    var word=new cc.LabelTTF(String(gold),getFONT_FZCY_M03SStr(),70);
    word.attr({
        x:winSize.width+100,
        y:-100,
        color:cc.color(220,220,0),
        scale:1.5
    });
    yourScene.addChild(word,1111);
    word.runAction(cc.sequence(
        cc.delayTime(delay),
        cc.spawn(
            cc.moveTo(0.7,cc.p(100,winSize.height-50)),
            cc.scaleTo(0.7,1)
        ),
        cc.delayTime(0.2),
        cc.fadeOut(0.6),
        cc.callFunc(function(){
            word.removeFromParent();
        },this)
    ));
}

var showAZL=cc.Layer.extend({
    pauseMaskBg:null,
    freenum:null,
    suoqu:null,
    ctor:function()
    {
        this._super();
        this.init();
    },
    init:function()
    {


        cc.spriteFrameCache.addSpriteFrames(res.marketios_plist);
        cc.spriteFrameCache.addSpriteFrames(res.marketandroid_plist);
        var winsize=cc.director.getWinSize();
        cc.log("begin1");



        if(getAZLauchCheck2()>0 | getAZLauchCheck()==0)
        {
            pauseMaskBg = new cc.LayerColor(cc.color(0,0,0,150),winsize.width, winsize.height);
            var listener1 = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: function (touch, event) {
                    cc.log("begin");
                    var target = event.getCurrentTarget();

                    var locationInNode = target.convertToNodeSpace(touch.getLocation());
                    var s = target.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);

                    if (cc.rectContainsPoint(rect, locationInNode)) {
                        cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                        return true;
                    }
                    return false;
                },
                onTouchMoved: function (touch, event) {

                },
                onTouchEnded: function (touch, event) {
                    cc.log("end");
                }
            });
            cc.eventManager.addListener(listener1, pauseMaskBg);
            this.addChild(pauseMaskBg,100);
        }





        if(getAZLauchCheck()!=0)
        {
            cc.log("审核状态，不显示索取金币");
//            testJSB6.release();
            if(getAZLauchCheck2()==1)
            {

                var frame=new cc.Sprite("#market_Android_frame.png");
                frame.setPosition(winsize.width/2,winsize.height/2);
                pauseMaskBg.addChild(frame);
                cc.log("begin3");
                var spriteWithcloseBtn =new cc.Sprite("#market_Android_btn_close.png");//market_ios_btn_close.png
                cc.log("abc2");
                var scale9SpriteWithcloseBtn =new cc.Scale9Sprite("market_Android_btn_close.png");
                var returnBtn = new cc.ControlButton(scale9SpriteWithcloseBtn);
                returnBtn.setPreferredSize(cc.size(spriteWithcloseBtn.width, spriteWithcloseBtn.height));
                returnBtn.addTargetWithActionForControlEvents(this, function(){
                    playEffect(res.BUTTON_SOUNDS);
                    pauseMaskBg.removeFromParent(true);
                    cc.log("close");
                }.bind(returnBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
                returnBtn.x = frame.getPositionX()+frame.getContentSize().width*0.42;//
                returnBtn.y = frame.getPositionY()+frame.getContentSize().height*0.38;//
                returnBtn.setTag(1006);
                pauseMaskBg.addChild(returnBtn);
                cc.log("abc2");
                //titleframe
                var titleframe=new cc.Sprite("#market_Android_title_frame.png");
                titleframe.setPosition(frame.getContentSize().width/2,frame.getContentSize().height*0.99);
                frame.addChild(titleframe);
                //framelabel
                var framelabel= cc.LabelTTF.create("免费金币",getFONT_FZCY_M03SStr(),30);
                framelabel.setPosition(titleframe.width*0.5, titleframe.height*0.5);
                framelabel.setColor(cc.color(255,255,255));
                titleframe.addChild(framelabel);
                //吊炸天金币
                cc.log("abc632");
                var spriteWithadBtn =new cc.Sprite("#market_Android_cool_gold_frame.png");
                cc.log("abc642");
                var scale9SpriteWithadBtn =new cc.Scale9Sprite("market_Android_cool_gold_frame.png");
                cc.log("abc652");
                var adBtn = new cc.ControlButton(scale9SpriteWithadBtn);
                adBtn.setPreferredSize(cc.size(spriteWithadBtn.width, spriteWithadBtn.height));
                adBtn.addTargetWithActionForControlEvents(this, function(){
                    playEffect(res.BUTTON_SOUNDS);

                    var testJSB = new JSB.JSBinding();
                    testJSB.retain();
                    testJSB.freePanel2(0);

                    cc.log("dzt");
                }.bind(adBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
                adBtn.x = frame.getContentSize().width*0.5;
                adBtn.y = frame.getContentSize().height*0.5;
                adBtn.setTag(1006);
                frame.addChild(adBtn);
                var dztsprite=new cc.Sprite("#market_Android_cool_gold_icon.png");
                dztsprite.setPosition(adBtn.width*0.5, adBtn.height*0.6);
                adBtn.addChild(dztsprite);
                //money2label
                var dztlabel = cc.LabelTTF.create("吊炸天金币",getFONT_FZCY_M03SStr(),24);
                dztlabel.setPosition(adBtn.width*0.5, adBtn.height*0.26);
                dztlabel.setColor(cc.color(99,21,1));
                adBtn.addChild(dztlabel);
                //free
                var dztfree=new cc.Sprite("#market_Android_free.png");
                dztfree.setPosition(adBtn.width*0.95, adBtn.height);
                adBtn.addChild(dztfree);
            }
            else if(getAZLauchCheck2()==2)
            {

                var frame=new cc.Sprite("#market_Android_frame.png");
                frame.setPosition(winsize.width/2,winsize.height/2);
                pauseMaskBg.addChild(frame);
                cc.log("begin3");
                var spriteWithcloseBtn =new cc.Sprite("#market_Android_btn_close.png");//market_ios_btn_close.png
                cc.log("abc2");
                var scale9SpriteWithcloseBtn =new cc.Scale9Sprite("market_Android_btn_close.png");
                var returnBtn = new cc.ControlButton(scale9SpriteWithcloseBtn);
                returnBtn.setPreferredSize(cc.size(spriteWithcloseBtn.width, spriteWithcloseBtn.height));
                returnBtn.addTargetWithActionForControlEvents(this, function(){
                    playEffect(res.BUTTON_SOUNDS);
                    pauseMaskBg.removeFromParent();
                    cc.log("close");
                }.bind(returnBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
                returnBtn.x = frame.getPositionX()+frame.getContentSize().width*0.42;//
                returnBtn.y = frame.getPositionY()+frame.getContentSize().height*0.38;//
                returnBtn.setTag(1006);
                pauseMaskBg.addChild(returnBtn);
                cc.log("abc2");
                //titleframe
                var titleframe=new cc.Sprite("#market_Android_title_frame.png");
                titleframe.setPosition(frame.getContentSize().width/2,frame.getContentSize().height*0.99);
                frame.addChild(titleframe);
                //framelabel
                var framelabel= cc.LabelTTF.create("免费金币",getFONT_FZCY_M03SStr(),30);
                framelabel.setPosition(titleframe.width*0.5, titleframe.height*0.5);
                framelabel.setColor(cc.color(255,255,255));
                titleframe.addChild(framelabel);
                //吊炸天金币
                cc.log("abc632");
                var spriteWithadBtn =new cc.Sprite("#market_Android_cool_gold_frame.png");
                cc.log("abc642");
                var scale9SpriteWithadBtn =new cc.Scale9Sprite("market_Android_cool_gold_frame.png");
                cc.log("abc652");
                var adBtn = new cc.ControlButton(scale9SpriteWithadBtn);
                adBtn.setPreferredSize(cc.size(spriteWithadBtn.width, spriteWithadBtn.height));
                adBtn.addTargetWithActionForControlEvents(this, function(){
                    playEffect(res.BUTTON_SOUNDS);

                    var testJSB = new JSB.JSBinding();
                    testJSB.retain();
                    testJSB.freePanel2(0);

                    cc.log("dzt");
                }.bind(adBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
                adBtn.x = frame.getContentSize().width*0.35;
                adBtn.y = frame.getContentSize().height*0.5;
                adBtn.setTag(1006);
                frame.addChild(adBtn);
                var dztsprite=new cc.Sprite("#market_Android_cool_gold_icon.png");
                dztsprite.setPosition(adBtn.width*0.5, adBtn.height*0.6);
                adBtn.addChild(dztsprite);
                //money2label
                var dztlabel = cc.LabelTTF.create("吊炸天金币",getFONT_FZCY_M03SStr(),24);
                dztlabel.setPosition(adBtn.width*0.5, adBtn.height*0.26);
                dztlabel.setColor(cc.color(99,21,1));
                adBtn.addChild(dztlabel);
                //free
                var dztfree=new cc.Sprite("#market_Android_free.png");
                dztfree.setPosition(adBtn.width*0.95, adBtn.height);
                adBtn.addChild(dztfree);


                //gfs
                cc.log("abc632");
                var spriteWithgfsBtn =new cc.Sprite("#market_Android_cool_gold_frame.png");
                cc.log("abc642");
                var scale9SpriteWithgfsBtn =new cc.Scale9Sprite("market_Android_cool_gold_frame.png");
                cc.log("abc652");
                var gfsBtn = new cc.ControlButton(scale9SpriteWithgfsBtn);
                gfsBtn.setPreferredSize(cc.size(spriteWithgfsBtn.width, spriteWithgfsBtn.height));
                gfsBtn.addTargetWithActionForControlEvents(this, function(){
                    playEffect(res.BUTTON_SOUNDS);

                    var testJSB = new JSB.JSBinding();
                    testJSB.retain();
                    testJSB.freePanel2(1);

                    cc.log("dzt");
                }.bind(gfsBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
                gfsBtn.x = frame.getContentSize().width*0.65;
                gfsBtn.y = frame.getContentSize().height*0.5;
                gfsBtn.setTag(1006);
                frame.addChild(gfsBtn);
                var gfssprite=new cc.Sprite("#market_Android_handsome_gold_icon.png");
                gfssprite.setPosition(gfsBtn.width*0.5, gfsBtn.height*0.6);
                gfsBtn.addChild(gfssprite);
                //money2label
                var gfslabel = cc.LabelTTF.create("高富帅金币",getFONT_FZCY_M03SStr(),24);
                gfslabel.setPosition(adBtn.width*0.5, adBtn.height*0.26);
                gfslabel.setColor(cc.color(99,21,1));
                gfsBtn.addChild(gfslabel);
                //free
                var gfsfree=new cc.Sprite("#market_Android_free.png");
                gfsfree.setPosition(adBtn.width*0.95, adBtn.height);
                gfsBtn.addChild(gfsfree);
            }
            else if(getAZLauchCheck2()==0)
            {

            }
        }
        else if(getAZLauchCheck()==0)
        {
            cc.log("不在审核状态，显示索取金币");
            cc.log(freenum);
            cc.log(getAZLauchCheck2());
//            testJSB6.release();
            if(getAZLauchCheck2()==1)
            {
                cc.log("begin2");
                var frame=new cc.Sprite("#market_Android_frame.png");
                frame.setPosition(winsize.width/2,winsize.height/2);
                pauseMaskBg.addChild(frame);
                cc.log("begin3");
                var spriteWithcloseBtn =new cc.Sprite("#market_Android_btn_close.png");//market_ios_btn_close.png
                cc.log("abc2");
                var scale9SpriteWithcloseBtn =new cc.Scale9Sprite("market_Android_btn_close.png");
                var returnBtn = new cc.ControlButton(scale9SpriteWithcloseBtn);
                returnBtn.setPreferredSize(cc.size(spriteWithcloseBtn.width, spriteWithcloseBtn.height));
                returnBtn.addTargetWithActionForControlEvents(this, function(){
                    playEffect(res.BUTTON_SOUNDS);
                    pauseMaskBg.removeFromParent(true);
                    cc.log("close");
                }.bind(returnBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
                returnBtn.x = frame.getPositionX()+frame.getContentSize().width*0.42;//
                returnBtn.y = frame.getPositionY()+frame.getContentSize().height*0.38;//
                returnBtn.setTag(1006);
                pauseMaskBg.addChild(returnBtn);
                cc.log("abc2");
                //titleframe
                var titleframe=new cc.Sprite("#market_Android_title_frame.png");
                titleframe.setPosition(frame.getContentSize().width/2,frame.getContentSize().height*0.99);
                frame.addChild(titleframe);
                //framelabel
                var framelabel= cc.LabelTTF.create("免费金币",getFONT_FZCY_M03SStr(),30);
                framelabel.setPosition(titleframe.width*0.5, titleframe.height*0.5);
                framelabel.setColor(cc.color(255,255,255));
                titleframe.addChild(framelabel);
                //吊炸天金币
                cc.log("abc632");
                var spriteWithadBtn =new cc.Sprite("#market_Android_cool_gold_frame.png");
                cc.log("abc642");
                var scale9SpriteWithadBtn =new cc.Scale9Sprite("market_Android_cool_gold_frame.png");
                cc.log("abc652");
                var adBtn = new cc.ControlButton(scale9SpriteWithadBtn);
                adBtn.setPreferredSize(cc.size(spriteWithadBtn.width, spriteWithadBtn.height));
                adBtn.addTargetWithActionForControlEvents(this, function(){
                    playEffect(res.BUTTON_SOUNDS);

                    var testJSB = new JSB.JSBinding();
                    testJSB.retain();
                    testJSB.freePanel2(0);

                    cc.log("dzt");
                }.bind(adBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
                adBtn.x = frame.getContentSize().width*0.35;
                adBtn.y = frame.getContentSize().height*0.5;
                adBtn.setTag(1006);
                frame.addChild(adBtn);
                var dztsprite=new cc.Sprite("#market_Android_cool_gold_icon.png");
                dztsprite.setPosition(adBtn.width*0.5, adBtn.height*0.6);
                adBtn.addChild(dztsprite);
                //money2label
                var dztlabel = cc.LabelTTF.create("吊炸天金币",getFONT_FZCY_M03SStr(),24);
                dztlabel.setPosition(adBtn.width*0.5, adBtn.height*0.26);
                dztlabel.setColor(cc.color(99,21,1));
                adBtn.addChild(dztlabel);
                //free
                var dztfree=new cc.Sprite("#market_Android_free.png");
                dztfree.setPosition(adBtn.width*0.95, adBtn.height);
                adBtn.addChild(dztfree);
                //索取金币
                cc.log("abc632");
                var spriteWithadBtn2 =new cc.Sprite("#market_Android_cool_gold_frame.png");
                cc.log("abc642");
                var scale9SpriteWithadBtn2 =new cc.Scale9Sprite("market_Android_cool_gold_frame.png");
                cc.log("abc652");
                var adBtn2 = new cc.ControlButton(scale9SpriteWithadBtn2);
                adBtn2.setPreferredSize(cc.size(spriteWithadBtn2.width, spriteWithadBtn2.height));
                adBtn2.addTargetWithActionForControlEvents(this, function(){
                    playEffect(res.BUTTON_SOUNDS);


                                         cc.log("add gold for android3");
                    var testJSB = new JSB.JSBinding();
                    testJSB.retain();
//                    testJSB.freePanel2(1);  WEIXI_IN_FRIEND_COIN  (int id , int type , string content ,int level)
                    testJSB.showWCImageContent(0,7,"",0);

                   testJSB.addGold = function (i,j) {
                   cc.log("add gold for android2");
                   setGold((parseInt(getGold()) || 0) + i);
                   testJSB.release();
                   }




                    cc.log("dzt");
                }.bind(adBtn2), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
                adBtn2.x = frame.getContentSize().width*0.65;
                adBtn2.y = frame.getContentSize().height*0.5;
                adBtn2.setTag(1006);
                frame.addChild(adBtn2);
                var dztsprite2=new cc.Sprite("#market_Android_get_gold_icon.png");
                dztsprite2.setPosition(adBtn2.width*0.5, adBtn2.height*0.6);
                adBtn2.addChild(dztsprite2);
                //money2label
                var dztlabel2 = cc.LabelTTF.create("索取金币",getFONT_FZCY_M03SStr(),24);
                dztlabel2.setPosition(adBtn2.width*0.5, adBtn2.height*0.26);
                dztlabel2.setColor(cc.color(99,21,1));
                adBtn2.addChild(dztlabel2);
                //free
                var dztfree2=new cc.Sprite("#market_Android_free.png");
                dztfree2.setPosition(adBtn2.width*0.95, adBtn2.height);
                adBtn2.addChild(dztfree2);
            }
            else if(getAZLauchCheck2()==2)
            {
                var frame=new cc.Sprite("#market_Android_frame.png");
                frame.setPosition(winsize.width/2,winsize.height/2);
                pauseMaskBg.addChild(frame);
                cc.log("begin3");
                var spriteWithcloseBtn =new cc.Sprite("#market_Android_btn_close.png");//market_ios_btn_close.png
                cc.log("abc2");
                var scale9SpriteWithcloseBtn =new cc.Scale9Sprite("market_Android_btn_close.png");
                var returnBtn = new cc.ControlButton(scale9SpriteWithcloseBtn);
                returnBtn.setPreferredSize(cc.size(spriteWithcloseBtn.width, spriteWithcloseBtn.height));
                returnBtn.addTargetWithActionForControlEvents(this, function(){
                    playEffect(res.BUTTON_SOUNDS);
                    pauseMaskBg.removeFromParent();
                    cc.log("close");
                }.bind(returnBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
                returnBtn.x = frame.getPositionX()+frame.getContentSize().width*0.42;//
                returnBtn.y = frame.getPositionY()+frame.getContentSize().height*0.38;//
                returnBtn.setTag(1006);
                pauseMaskBg.addChild(returnBtn);
                cc.log("abc2");
                //titleframe
                var titleframe=new cc.Sprite("#market_Android_title_frame.png");
                titleframe.setPosition(frame.getContentSize().width/2,frame.getContentSize().height*0.99);
                frame.addChild(titleframe);
                //framelabel
                var framelabel= cc.LabelTTF.create("免费金币",getFONT_FZCY_M03SStr(),30);
                framelabel.setPosition(titleframe.width*0.5, titleframe.height*0.5);
                framelabel.setColor(cc.color(255,255,255));
                titleframe.addChild(framelabel);
                //吊炸天金币
                cc.log("abc632");
                var spriteWithadBtn =new cc.Sprite("#market_Android_cool_gold_frame.png");
                cc.log("abc642");
                var scale9SpriteWithadBtn =new cc.Scale9Sprite("market_Android_cool_gold_frame.png");
                cc.log("abc652");
                var adBtn = new cc.ControlButton(scale9SpriteWithadBtn);
                adBtn.setPreferredSize(cc.size(spriteWithadBtn.width, spriteWithadBtn.height));
                adBtn.addTargetWithActionForControlEvents(this, function(){
                    playEffect(res.BUTTON_SOUNDS);

                    var testJSB = new JSB.JSBinding();
                    testJSB.retain();
                    testJSB.freePanel2(0);

                    cc.log("dzt");
                }.bind(adBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
                adBtn.x = frame.width*0.5-150;
                adBtn.y = frame.getContentSize().height*0.5;
                adBtn.setTag(1006);
                frame.addChild(adBtn);
                var dztsprite=new cc.Sprite("#market_Android_cool_gold_icon.png");
                dztsprite.setPosition(adBtn.width*0.5, adBtn.height*0.6);
                adBtn.addChild(dztsprite);
                //money2label
                var dztlabel = cc.LabelTTF.create("吊炸天金币",getFONT_FZCY_M03SStr(),24);
                dztlabel.setPosition(adBtn.width*0.5, adBtn.height*0.26);
                dztlabel.setColor(cc.color(99,21,1));
                adBtn.addChild(dztlabel);
                //free
                var dztfree=new cc.Sprite("#market_Android_free.png");
                dztfree.setPosition(adBtn.width*0.95, adBtn.height);
                adBtn.addChild(dztfree);


                //gfs
                cc.log("abc632");
                var spriteWithgfsBtn =new cc.Sprite("#market_Android_cool_gold_frame.png");
                cc.log("abc642");
                var scale9SpriteWithgfsBtn =new cc.Scale9Sprite("market_Android_cool_gold_frame.png");
                cc.log("abc652");
                var gfsBtn = new cc.ControlButton(scale9SpriteWithgfsBtn);
                gfsBtn.setPreferredSize(cc.size(spriteWithgfsBtn.width, spriteWithgfsBtn.height));
                gfsBtn.addTargetWithActionForControlEvents(this, function(){
                    playEffect(res.BUTTON_SOUNDS);

                    var testJSB = new JSB.JSBinding();
                    testJSB.retain();
                    testJSB.freePanel2(1);

                    cc.log("dzt");
                }.bind(gfsBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
                gfsBtn.x = frame.getContentSize().width*0.5;
                gfsBtn.y = frame.getContentSize().height*0.5;
                gfsBtn.setTag(1006);
                frame.addChild(gfsBtn);
                var gfssprite=new cc.Sprite("#market_Android_handsome_gold_icon.png");
                gfssprite.setPosition(gfsBtn.width*0.5, gfsBtn.height*0.6);
                gfsBtn.addChild(gfssprite);
                //money2label
                var gfslabel = cc.LabelTTF.create("高富帅金币",getFONT_FZCY_M03SStr(),24);
                gfslabel.setPosition(adBtn.width*0.5, adBtn.height*0.26);
                gfslabel.setColor(cc.color(99,21,1));
                gfsBtn.addChild(gfslabel);
                //free
                var gfsfree=new cc.Sprite("#market_Android_free.png");
                gfsfree.setPosition(adBtn.width*0.95, adBtn.height);
                gfsBtn.addChild(gfsfree);


                //索取金币
                cc.log("abc632");
                var spriteWithadBtn2 =new cc.Sprite("#market_Android_cool_gold_frame.png");
                cc.log("abc642");
                var scale9SpriteWithadBtn2 =new cc.Scale9Sprite("market_Android_cool_gold_frame.png");
                cc.log("abc652");
                var adBtn2 = new cc.ControlButton(scale9SpriteWithadBtn2);
                adBtn2.setPreferredSize(cc.size(spriteWithadBtn2.width, spriteWithadBtn2.height));
                adBtn2.addTargetWithActionForControlEvents(this, function(){
                    playEffect(res.BUTTON_SOUNDS);
                    var testJSB = new JSB.JSBinding();
                    testJSB.retain();
                    testJSB.showWCImageContent(3,7,"",0);

                   testJSB.addGold = function (i,j) {
                   cc.log("add gold for android2");
                   setGold((parseInt(getGold()) || 0) + i);
                   testJSB.release();
                   }


                    cc.log("dzt");
                }.bind(adBtn2), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
                adBtn2.x = gfsBtn.getPositionX()+150;
                adBtn2.y = frame.getContentSize().height*0.5;
                adBtn2.setTag(1006);
                frame.addChild(adBtn2);
                var dztsprite2=new cc.Sprite("#market_Android_get_gold_icon.png");
                dztsprite2.setPosition(adBtn2.width*0.5, adBtn2.height*0.6);
                adBtn2.addChild(dztsprite2);
                //money2label
                var dztlabel2 = cc.LabelTTF.create("索取金币",getFONT_FZCY_M03SStr(),24);
                dztlabel2.setPosition(adBtn2.width*0.5, adBtn2.height*0.26);
                dztlabel2.setColor(cc.color(99,21,1));
                adBtn2.addChild(dztlabel2);
                //free
                var dztfree2=new cc.Sprite("#market_Android_free.png");
                dztfree2.setPosition(adBtn2.width*0.95, adBtn2.height);
                adBtn2.addChild(dztfree2);
            }
            else if(getAZLauchCheck2()==0)
            {

                var frame=new cc.Sprite("#market_Android_frame.png");
                frame.setPosition(winsize.width/2,winsize.height/2);
                pauseMaskBg.addChild(frame);






                var spriteWithcloseBtn =new cc.Sprite("#market_Android_btn_close.png");//market_ios_btn_close.png
                cc.log("abc2");
                var scale9SpriteWithcloseBtn =new cc.Scale9Sprite("market_Android_btn_close.png");
                var returnBtn = new cc.ControlButton(scale9SpriteWithcloseBtn);
                returnBtn.setPreferredSize(cc.size(spriteWithcloseBtn.width, spriteWithcloseBtn.height));
                returnBtn.addTargetWithActionForControlEvents(this, function(){
                    playEffect(res.BUTTON_SOUNDS);
                    pauseMaskBg.removeFromParent();
                    cc.log("close");
                }.bind(returnBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
                returnBtn.x = frame.getPositionX()+frame.getContentSize().width*0.42;//
                returnBtn.y = frame.getPositionY()+frame.getContentSize().height*0.38;//
                returnBtn.setTag(1006);
                pauseMaskBg.addChild(returnBtn);


                //titleframe
                var titleframe=new cc.Sprite("#market_Android_title_frame.png");
                titleframe.setPosition(frame.getContentSize().width/2,frame.getContentSize().height*0.99);
                frame.addChild(titleframe);
                //framelabel
                var framelabel= cc.LabelTTF.create("免费金币",getFONT_FZCY_M03SStr(),30);
                framelabel.setPosition(titleframe.width*0.5, titleframe.height*0.5);
                framelabel.setColor(cc.color(255,255,255));
                titleframe.addChild(framelabel);


                //索取金币
                cc.log("abc632");
                var spriteWithadBtn2 =new cc.Sprite("#market_Android_cool_gold_frame.png");
                cc.log("abc642");
                var scale9SpriteWithadBtn2 =new cc.Scale9Sprite("market_Android_cool_gold_frame.png");
                cc.log("abc652");
                var adBtn2 = new cc.ControlButton(scale9SpriteWithadBtn2);
                adBtn2.setPreferredSize(cc.size(spriteWithadBtn2.width, spriteWithadBtn2.height));
                adBtn2.addTargetWithActionForControlEvents(this, function(){
                    playEffect(res.BUTTON_SOUNDS);

                    var testJSB = new JSB.JSBinding();
                    testJSB.retain();
                    testJSB.showWCImageContent(3,7,"",0);
                       testJSB.addGold = function (i,j) {
                       cc.log("add gold for android2");
                       setGold((parseInt(getGold()) || 0) + i);
                       testJSB.release();
                       }

                    cc.log("dzt");
                }.bind(adBtn2), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
                adBtn2.x = frame.getContentSize().width/2;
                adBtn2.y = frame.getContentSize().height*0.5;
                adBtn2.setTag(1006);
                frame.addChild(adBtn2);
                var dztsprite2=new cc.Sprite("#market_Android_get_gold_icon.png");
                dztsprite2.setPosition(adBtn2.width*0.5, adBtn2.height*0.6);
                adBtn2.addChild(dztsprite2);




                //money2label
                var dztlabel2 = cc.LabelTTF.create("索取金币",getFONT_FZCY_M03SStr(),24);
                dztlabel2.setPosition(adBtn2.width*0.5, adBtn2.height*0.26);
                dztlabel2.setColor(cc.color(99,21,1));
                adBtn2.addChild(dztlabel2);
                //free
                var dztfree2=new cc.Sprite("#market_Android_free.png");
                dztfree2.setPosition(adBtn2.width*0.95, adBtn2.height);
                adBtn2.addChild(dztfree2);
            }
        }


        cc.log("abc1");
        cc.log("showAZL");
    }
});
