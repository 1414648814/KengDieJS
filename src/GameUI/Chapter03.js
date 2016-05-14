/**
 * Created by George on 16/5/12.
 */
var BirdLayer = cc.Layer.extend({
    size : null,
    state : null,
    bird : null,
    rect2 : null,
    sp_split_egg1 : null,
    sp_split_egg2 : null,
    end : null,
    eggid : null,
    moving : null,
    timeCount :null,
    totalTime :null,
    label :null,
    left_egg :null,
    right_egg : null,

    ctor : function(){
        idd = 0;
        this._super();
//
        this.size = cc.director.getWinSize();
        var bg = cc.Sprite.create("#com_bg_01.png");
        bg.setPosition(cc.p(this.size.width/2,this.size.height/2));
        this.addChild(bg,1);


        var bg_bottom = cc.Sprite.create("#com_grassland2.png");
        bg_bottom.setAnchorPoint(cc.p(0.5,0));
        bg_bottom.setPosition(cc.p(this.size.width/2,0));
        this.addChild(bg_bottom,2);


        bg_hill2 = cc.Sprite.create("#k_04_hill.png");
        bg_hill2.setPosition(cc.p(this.size.width,0));
        bg_hill2.setAnchorPoint(cc.p(0.7,0.3));
        this.addChild(bg_hill2,9);

        sp_egg = cc.Sprite.create("#k_03_egg.png");
        sp_egg.setPosition(cc.p(this.size.width/2+180,320-140));

        var sp_house = cc.Sprite.create("#k_03_house.png");
        sp_house.setPosition(cc.p(this.size.width/2+180,320-150));

        sp_title  =  cc.Sprite("#k_03_kuangpng.png");
        sp_title.setPosition(cc.p(this.size.width/2-200,380));


        sp_man = cc.Sprite.create("#k_03_man.png");
        sp_man.setPosition(cc.p(this.size.width/2-270,320-100));

        sp_pig2 = cc.Sprite.create("#k_03_pig_son_bignose.png");
        sp_pig2.setPosition(cc.p(this.size.width/2-150,320-100));

        ly = cc.Sprite.create("#k_03_pig_son_bignose2.png");
        ly.setPosition(cc.p(65,48));
//        ly.setOpacity(0);
        sp_pig2.addChild(ly,1,998);
//        ly = cc.LayerColor.create(cc.color(255,255,255),40,30);
//        ly.setPosition(cc.p(50,40));
//        ly.setOpacity(0);
//        sp_pig2.addChild(ly,1,998);

        sp_sun = cc.Sprite.create("#k_03_sun1.png");
        sp_sun.setPosition(cc.p(this.size.width/2-300,320+200));
        sun2 = cc.Sprite.create("#k_03_sun2.png");
        sun2.setPosition(cc.p(this.size.width/2-300,320+200));

        sp_cloud = cc.Sprite.create("#com_cloud.png");
        sp_cloud.setScale(0.6);
        sp_cloud.setPosition(cc.p(this.size.width-200,320+200));

        sp_cloud2 = cc.Sprite.create("#com_cloud.png");
        sp_cloud2.setScale(1);
        sp_cloud2.setPosition(cc.p(this.size.width+500,320+100));

        sp_cloud3 = cc.Sprite.create("#com_cloud.png");
        sp_cloud3.setScale(0.7);
        sp_cloud3.setPosition(cc.p(this.size.width-800,320+150));

        sp_cloud4 = cc.Sprite.create("#com_cloud.png");
        sp_cloud4.setScale(1);
        sp_cloud4.setPosition(cc.p(this.size.width/2+200,320+135));
        sp_cloud4.setVisible(false);

        sp_cloud5 = cc.Sprite.create("#com_cloud.png");
        sp_cloud5.setScale(0.5);
        sp_cloud5.setPosition(cc.p(this.size.width-500,320+185));

        sp_bird = cc.Sprite.create("#k_03_bird_sleep1.png");
        sp_bird.setPosition(cc.p(this.size.width/2+300,320));

        this.addChild(sp_house,3);
        this.addChild(sp_egg,3,77);

        this.addChild(sp_pig2,4);

        this.addChild(sp_man,4,999);
        this.addChild(sp_title,4,999);
        this.addChild(sp_cloud,2);
        this.addChild(sp_cloud2,2);
        this.addChild(sp_cloud3,2);
        this.addChild(sp_cloud4,2);
        this.addChild(sp_cloud5,2);
        this.addChild(sun2,2);
        this.addChild(sp_sun,2,66);
        this.addChild(sp_bird,2,997);

        var animFrames=[];
        for(var i=1;i<=2;i++){
        var frame=cc.spriteFrameCache.getSpriteFrame("k_03_bird_sleep"+i+".png");
        animFrames.push(frame);
        }
        var animation=new cc.Animation(animFrames,0.3);
        var animate=new cc.Animate(animation);
        sp_bird.runAction(cc.RepeatForever.create(animate));


        var animFrame1 = ["k_03_man_ca1.png","k_03_man_ca2.png","k_03_man_ca.png"];
        var animFrames1 = [];
        for (var i = 0; i < animFrame1.length; i++) {
            var Emenyframe1 = cc.spriteFrameCache.getSpriteFrame(animFrame1[i]);
            animFrames1.push(Emenyframe1)
        }
        var animation1 = new cc.Animation(animFrames1, 0.4);
        var animate1 = new cc.Animate(animation1);
        sp_man.runAction(cc.RepeatForever.create(animate1));


        listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();

                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                    cc.log(target.getTag());
                    if(target.getTag() == 998){
                        target.setScale(1.3);
                    }

                    return true;
                }
                return false;
            },
            onTouchMoved: function (touch, event) {

                var target = event.getCurrentTarget();

            },





            onTouchEnded: function (touch, event) {
               var target = event.getCurrentTarget();
                ly.setScale(1);

                //sun coperation
                if(target.getTag() == 66)
                {
                    playEffect(res.BUTTON_SOUNDS);
                    if(target.isFlippedX())
                    {
                        target.setFlippedX(false);
                        sun2.setFlippedX(false);
                    }else{
                        target.setFlippedX(true);
                        sun2.setFlippedX(true);
                    }

                    return;

                }

                //egg
                if(target.getTag() == 77 && target.parent.state <1)
                {
                    playEffect(res.BUTTON_SOUNDS);
                    var rt1 = cc.RotateTo.create(0.1,-20);
                    var rt2 = cc.RotateTo.create(0.1,20);
                    var seq = cc.Sequence.create(rt1,rt2);
                    target.runAction(cc.Repeat.create(seq,3));
                    target.runAction(cc.sequence(cc.delayTime(0.7),cc.callFunc(function(){
                        target.setRotation(0);
                    },this)));
                    return;
                }



                //bird coperation
                if(target.getTag() == 997) {
                    sp_title.setVisible(false);
                    playEffect(res.F03_BIRDWALK_SOUNDS,true);
                    sp_man.stopAllActions();
                    sp_man.setSpriteFrame("k_03_man.png");
                    cc.eventManager.removeListeners(sp_man);
                    cc.eventManager.removeListeners(sp_egg);
                    cc.eventManager.removeListeners(sp_sun);
                    cc.eventManager.removeListeners(ly);
                    cc.eventManager.removeListeners(sp_bird);
                    sp_bird.stopAllActions();

                    sp_bird.setSpriteFrame("k_03_bird_stand.png");
                    var animFrame = ["k_03_bird_run1.png", "k_03_bird_run2.png","k_03_bird_run1.png", "k_03_bird_run2.png","k_03_bird_run1.png", "k_03_bird_run2.png"];
                    var animFrames = [];
                    for (var i = 0; i < animFrame.length; i++) {
                        var Emenyframe = cc.spriteFrameCache.getSpriteFrame(animFrame[i]);
                        animFrames.push(Emenyframe)
                    }

                    var animation = new cc.Animation(animFrames, 0.3);
                    var animate = new cc.Animate(animation);
                    var mt  = cc.MoveTo.create(1.8,cc.p(sp_man.getPositionX()+100,sp_bird.getPositionY()- 20));
                    sp_bird.runAction(cc.Sequence.create(cc.Spawn.create(animate,mt),cc.CallFunc.create(function(){
                        stopAllEffect();
                        playEffect(res.F03_BIT_SOUNDS,true);
                        sp_bird.setZOrder(88);
                        sp_man.setSpriteFrame("k_03_man_cry1.png");
                        //bird action
                        var animFrame = ["k_03_bird_peck1.png", "k_03_bird_peck2.png","k_03_bird_peck1.png", "k_03_bird_peck2.png","k_03_bird_peck1.png", "k_03_bird_peck2.png","k_03_bird_run1.png"];
                        var animFrames = [];
                        for (var i = 0; i < animFrame.length; i++) {
                            var Emenyframe = cc.spriteFrameCache.getSpriteFrame(animFrame[i]);
                            animFrames.push(Emenyframe)
                        }

                        var animation = new cc.Animation(animFrames, 0.3);
                        var animate = new cc.Animate(animation);
                        sp_bird.runAction(cc.Sequence.create(animate,cc.CallFunc.create(function(){
                             stopAllEffect();
                        })));

                        //man action
                        sp_man.setPosition(cc.p(this.size.width/2-270,320-90));
                        var animFrame1 = ["k_03_man_cry1.png", "k_03_man_cry2.png","k_03_man_cry1.png", "k_03_man_cry2.png","k_03_man_cry1.png", "k_03_man_cry2.png","k_03_man_cry1.png"];
                        var animFrames1 = [];
                        for (var i = 0; i < animFrame1.length; i++) {
                            var Emenyframe1 = cc.spriteFrameCache.getSpriteFrame(animFrame1[i]);
                            animFrames1.push(Emenyframe1)
                        }

                        var animation1 = new cc.Animation(animFrames1, 0.3);
                        var animate1 = new cc.Animate(animation1);
                        sp_man.runAction(cc.Sequence.create(animate1,cc.CallFunc.create(function(){
                                                                                        cc.log("f3 failed 1");
                            ShowFaildPPanel(_this.getParent(),3,0);
                        })));

                    })));
                }
                //pig coperation
                if(target.getTag() == 998 ){


                    ly.setVisible(false);
                    cc.log("qwewq");
                    stealed = true;
                    cc.eventManager.removeListeners(ly);
                    cc.eventManager.removeListeners(sp_bird);
                    sp_pig2.setPosition(cc.p(_this.size.width/2-60,320-100));
                    var animFrame = ["k_03_pig_son_penti1.png", "k_03_pig_son_penti2.png","k_03_pig_son_penti3.png", "k_03_pig_son_penti4.png"];
                    var animFrames = [];
                    for (var i = 0; i < animFrame.length; i++) {
                        var Emenyframe = cc.spriteFrameCache.getSpriteFrame(animFrame[i]);
                        animFrames.push(Emenyframe)
                    }

                    var animation = new cc.Animation(animFrames, 0.3);
                    var animate = new cc.Animate(animation);
                    _this.runAction(cc.Sequence.create(cc.DelayTime.create(0.7),cc.CallFunc.create(function(){
                        playEffect(res.F03_SNEEZE_SOUNDS);
                    })));
                    sp_pig2.runAction(cc.Sequence.create(animate,cc.CallFunc.create(function(){
                        sp_pig2.setPosition(cc.p(_this.size.width/2-150,320-100));
                        sp_bird.stopAllActions();
                        playEffect(res.F03_WIND_SOUNDS);
                         sp_pig2.setSpriteFrame("k_03_pig_son_bignose.png");
                        ly.setVisible(true);
                         sp_bird.setSpriteFrame("k_03_bird_wind.png");
                    }),cc.DelayTime.create(0.5),cc.CallFunc.create(function(){
                        sp_egg.setZOrder(90);
                        sp_bird.setZOrder(88);
                        bg_hill2.setZOrder(89);
                        sp_bird.setSpriteFrame("k_03_bird_wind_stand.png");


                    }),cc.DelayTime.create(0.5),cc.CallFunc.create(function(){
                        sp_bird.setSpriteFrame("k_03_bird_shy1.png");

                    }),cc.DelayTime.create(0.5),cc.CallFunc.create(function(){
                        stopAllEffect();
                        sp_bird.setSpriteFrame("k_03_bird_shy2.png");
                        var sp = cc.Sprite.create("#k_03_bird_shy2_cry1.png");
                        sp.setPosition(cc.p(140,160));
                        sp_bird.addChild(sp);

                        var animFrame = ["k_03_bird_shy2_cry2.png", "k_03_bird_shy2_cry3.png","k_03_bird_shy2_cry1.png"];
                        var animFrames = [];
                        for (var i = 0; i < animFrame.length; i++) {
                            var Emenyframe = cc.spriteFrameCache.getSpriteFrame(animFrame[i]);
                            animFrames.push(Emenyframe)
                        }

                        var animation = new cc.Animation(animFrames, 0.2);
                        var animate = new cc.Animate(animation);
                        sp.runAction(cc.RepeatForever.create(animate));
                    })));
                }

                //man coperation
                if(target.getTag() == 999 && stealed){
                    playEffect(res.F03_MANWALK_SOUNDS,true);
                    sp_title.setVisible(false);
                    sp_man.stopAllActions();
                    sp_man.setSpriteFrame("k_03_man.png");
                    cc.eventManager.removeListeners(sp_man);
                    cc.eventManager.removeListeners(sp_egg);
                    cc.eventManager.removeListeners(sp_sun);
                    sp_man.setPosition(cc.p(_this.size.width/2-270,320-150));
                    var animFrame = ["k_03_man_climb1.png", "k_03_man_climb2.png","k_03_man_climb1.png", "k_03_man_climb2.png","k_03_man_climb1.png", "k_03_man_climb3.png"];
                    var animFrames = [];
                    for (var i = 0; i < animFrame.length; i++) {
                        var Emenyframe = cc.spriteFrameCache.getSpriteFrame(animFrame[i]);
                        animFrames.push(Emenyframe)
                    }

                    var animation = new cc.Animation(animFrames, 0.4);
                    var animate = new cc.Animate(animation);
                    var mt = cc.MoveTo.create(2.4,cc.p(_this.size.width/2+30,170));

                    var animFrame1 = ["k_03_man_climb_win.png", "k_03_man_climb_win2.png","k_03_man_climb_win.png", "k_03_man_climb_win2.png","k_03_man_climb_win.png", "k_03_man_climb_win2.png"];
                    var animFrames1 = [];
                    for (var i = 0; i < animFrame1.length; i++) {
                        var Emenyframe1 = cc.spriteFrameCache.getSpriteFrame(animFrame1[i]);
                        animFrames1.push(Emenyframe1)
                    }

                    var animation1 = new cc.Animation(animFrames1, 0.4);
                    var animate1 = new cc.Animate(animation1);
                    var mt1 = cc.MoveTo.create(2.4,cc.p(-100,170));

                    _this.runAction(cc.Sequence.create(cc.DelayTime.create(2.1),cc.CallFunc.create(function(){
                        playEffect(res.BUTTON_SOUNDS);
                    })));
                    sp_man.runAction(cc.Sequence.create(cc.Spawn.create(animate,mt),cc.CallFunc.create(function(){
                        sp_egg.setVisible(false);
                        //pigmove

                        ly.setVisible(false);
                        var animFrame = ["k_03_pig_son_go1.png", "k_03_pig_son_go2.png","k_03_pig_son_go1.png", "k_03_pig_son_go2.png","k_03_pig_son_go1.png", "k_03_pig_son_go2.png","k_03_pig_son_go1.png", "k_03_pig_son_go2.png"];
                        var animFrames = [];
                        for (var i = 0; i < animFrame.length; i++) {
                            var Emenyframe = cc.spriteFrameCache.getSpriteFrame(animFrame[i]);
                            animFrames.push(Emenyframe)
                        }

                        var animation = new cc.Animation(animFrames, 0.3);
                        var animate = new cc.Animate(animation);
                        var mt = cc.MoveTo.create(2,cc.p(-100,170));

                        sp_pig2.runAction(cc.Sequence.create(cc.DelayTime.create(0.4),cc.Spawn.create(animate,mt)));

                    }),cc.Spawn.create(animate1,mt1),cc.CallFunc.create(function(){

                        ShowSuccessPanel(_this.getParent(),3);
                    })));
                }else if(target.getTag() == 999){
                    playEffect(res.F03_MANWALK_SOUNDS,true);
                    sp_title.setVisible(false);
                    sp_man.stopAllActions();
                    sp_man.setSpriteFrame("k_03_man.png");
                    cc.eventManager.removeListeners(sp_man);
                    cc.eventManager.removeListeners(sp_egg);
                    cc.eventManager.removeListeners(sp_sun);
                    cc.eventManager.removeListeners(ly);
                    cc.eventManager.removeListeners(sp_bird);
                    var animFrame = ["k_03_man_climb1.png", "k_03_man_climb2.png","k_03_man_climb1.png", "k_03_man_climb2.png"];
                    var animFrames = [];
                    for (var i = 0; i < animFrame.length; i++) {
                        var Emenyframe = cc.spriteFrameCache.getSpriteFrame(animFrame[i]);
                        animFrames.push(Emenyframe)
                    }
                    var animation = new cc.Animation(animFrames, 0.4);
                    var animate = new cc.Animate(animation);
                    var mt = cc.MoveTo.create(1.6,cc.p(_this.size.width/2,170));

                    sp_man.runAction(cc.Sequence.create(cc.Spawn.create(animate,mt),cc.CallFunc.create(function(){
                        stopAllEffect();

                        sp_bird.stopAllActions();
                        sp_bird.setZOrder(88);
                        bg_hill2.setZOrder(89);
                        sp_man.setSpriteFrame("k_03_man_climb3.png");
                        var animFrame = ["k_03_bird_run1.png", "k_03_bird_run2.png"];
                        var animFrames = [];
                        for (var i = 0; i < animFrame.length; i++) {
                            var Emenyframe = cc.spriteFrameCache.getSpriteFrame(animFrame[i]);
                            animFrames.push(Emenyframe)
                        }
                        var animation = new cc.Animation(animFrames, 0.3);
                        var animate = new cc.Animate(animation);
                        var mt  = cc.MoveTo.create(0.6,cc.p(sp_man.getPositionX()+150,sp_bird.getPositionY()-80));

                        var animFrame2 = ["k_03_bird_peck1.png", "k_03_bird_peck2.png","k_03_bird_peck1.png", "k_03_bird_peck2.png","k_03_bird_peck1.png", "k_03_bird_peck2.png","k_03_bird_run1.png"];
                        var animFrames2 = [];
                        for (var i = 0; i < animFrame2.length; i++) {
                            var Emenyframe2 = cc.spriteFrameCache.getSpriteFrame(animFrame2[i]);
                            animFrames2.push(Emenyframe2)
                        }
                        var animation2 = new cc.Animation(animFrames2, 0.3);
                        var animate2 = new cc.Animate(animation2);

                        sp_bird.runAction(cc.Sequence.create(cc.Spawn.create(animate,mt),cc.CallFunc.create(function(){
                            playEffect(res.F03_BIT_SOUNDS,true);
                        }),animate2,cc.CallFunc.create(function(){
                            stopAllEffect();
                        })));

                        var animFrame1 = ["k_03_man_climb4.png", "k_03_man_climb5.png","k_03_man_climb4.png", "k_03_man_climb5.png","k_03_man_climb4.png", "k_03_man_climb5.png","k_03_man_climb4.png"];
                        var animFrames1 = [];
                        for (var i = 0; i < animFrame1.length; i++) {
                            var Emenyframe1 = cc.spriteFrameCache.getSpriteFrame(animFrame1[i]);
                            animFrames1.push(Emenyframe1)
                        }
                        var animation1 = new cc.Animation(animFrames1, 0.3);
                        var animate1 = new cc.Animate(animation1);
                        sp_man.runAction(cc.Sequence.create(cc.DelayTime.create(0.6),animate1,cc.DelayTime.create(0.3),cc.CallFunc.create(function(){
                            stopAllEffect();
                            ShowFaildPPanel(_this.getParent(),3,0);
                        })));
                    })));

                }


            }
        });

        cc.eventManager.addListener(listener1, sp_man);
        cc.eventManager.addListener(listener1.clone(), sp_egg);
        cc.eventManager.addListener(listener1.clone(), sp_sun);
        cc.eventManager.addListener(listener1.clone(), ly);
        cc.eventManager.addListener(listener1.clone(), sp_bird);


        this.schedule(this.sunblik,1);
        this.schedule(this.cloudMove);

        this.init();
    },

    init : function(){
        _this = this;
        this.state = 0;
        this.end = false;
        this.eggid = 0;
        this.moving = false;
        this.timeCount = 0;
        this.totalTime = 10;
        cloud_Left_Position = true;
        stealed = false;
    },

    updateTime : function(dt){
        this.timeCount++;
        if(this.timeCount == this.totalTime){
            this.scheduleOnce(this.openEyes,0.1);
            this.unschedule(this.updateTime);
            this.unschedule(this.sunblik);
        }

//        this.label.setString(this.timeCount);

    },

    sunblik : function(dt){
        if(sun2.isVisible())
        {
            sun2.setVisible(false);
        }else{
            sun2.setVisible(true);
        }
    },
    cloudMove :function(dt)
    {

             sp_cloud.setPositionX(sp_cloud.getPositionX()-1);
             if(sp_cloud.getPositionX() <= 0) {
                sp_cloud.setPositionX(_this.size.width);
             }
        sp_cloud2.setPositionX(sp_cloud2.getPositionX()-1);
        if(sp_cloud2.getPositionX() <= 0) {
            sp_cloud2.setPositionX(_this.size.width);
        }
        sp_cloud3.setPositionX(sp_cloud3.getPositionX()-1);
        if(sp_cloud3.getPositionX() <= 0) {
            sp_cloud3.setPositionX(_this.size.width);
        }

        sp_cloud4.setPositionX(sp_cloud4.getPositionX()-1);
        if(sp_cloud4.getPositionX() <= 0) {
            sp_cloud4.setPositionX(_this.size.width);
        }

        sp_cloud5.setPositionX(sp_cloud5.getPositionX()-1);
        if(sp_cloud5.getPositionX() <= 0) {
            sp_cloud5.setPositionX(_this.size.width);
        }



    },

    openEyes : function(dt){


    },

    stealEgg : function(){
//        playEffect(res.F03_BIGERMOVE_SOUNDS,true);
//        var sta = this.state;
//        var egg = this.sp_egg;
//
//        var animFrame=["k_03_pig_go1.png","k_03_pig_go2.png","k_03_pig_go1.png","k_03_pig_go2.png","k_03_pig_go1.png"];
//        var animFrames=[];
//        for(var i=0;i<animFrame.length;i++){
//        var Emenyframe=cc.spriteFrameCache.getSpriteFrame(animFrame[i]);
//        animFrames.push(Emenyframe)
//        }
//
//        var animation=new cc.Animation(animFrames,0.3);
//        var animate=new cc.Animate(animation);
//
//        var mt = cc.MoveTo.create(1.5,cc.p(this.size.width/2+120,220));
//        var spawn = cc.Spawn.create(animate,mt);
//        var animFrame2=["k_03_pig_run1.png","k_03_pig_run2.png","k_03_pig_run1.png","k_03_pig_run2.png","k_03_pig_run1.png","k_03_pig_run2.png","k_03_pig_run1.png"];
//        var animFrames2=[];
//        for(var i=0;i<animFrame2.length;i++){
//        var Emenyframe2=cc.spriteFrameCache.getSpriteFrame(animFrame2[i]);
//        animFrames2.push(Emenyframe2)
//        }
//        var animation2=new cc.Animation(animFrames2,0.3);
//        var animate2=new cc.Animate(animation2);
//
//
//        var mt2 = cc.MoveTo.create(2,cc.p(-100,220));
//        var spawn2 = cc.Spawn.create(animate2,mt2);
//        var seq = cc.Sequence.create(spawn,cc.CallFunc.create(function(){
//                egg.setOpacity(0);
//        }),spawn2,cc.CallFunc.create(function(){
//            stopAllEffect();
//        }));
//        this.sp_pig1.runAction(seq);
    }

});


var BirdScene = cc.Scene.extend({

   onEnter : function(){
       this._super();
       layer = new BirdLayer();
       this.addChild(layer);

       var level = 3;
       var mainUILayer = new MainUILayer(level);
       this.addChild(mainUILayer, 3);
   },
    pauseTheGame : function () {
        //pause the game
        cc.log("pause the game");
//        stopAllEffect();
        layer.unschedule(layer.sunblik);
        layer.unschedule(layer.updateTime);
    },
    resumeTheGame :function () {
        //resume the game
        cc.log("resume the game");
        layer.schedule(layer.sunblik,1);
        layer.schedule(layer.updateTime,1);
    }

});