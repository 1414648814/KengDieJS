/**
 * Created by George on 16/5/12.
 */
var winSize=null;
var HomeLayer=cc.Layer.extend({
//    time:50,
    man:null,
    man2:null,
    aa:null,
    nervous:null,
    isfailse:false,
    isbaby:false,
    headr1:null,
    headr2:null,
    headl1:null,
    headl2:null,
    headl3:null,
    bird:null,
    bird2:null,
    people:null,
    house:null,
    hou:null,
    ist:false,
    isw:null,
    ctor: function () {
        this._super();
        winSize = cc.director.getWinSize();
        cc.log("ctor");
        this.init();

    },
    init: function () {
        ist=false;
        isw=false;
        cc.log("init");

//        this.schedule(this.step);
        var ses=new cc.Sequence(new cc.CallFunc(function(){
            playEffect(res.F01_2_SOUNDS);
        }),new cc.DelayTime(7));
        ses.setTag(11);
        var ses1=new cc.Sequence(new cc.CallFunc(function(){
            playEffect(res.F01_2_CRY);
        }),new cc.DelayTime(7));
        ses1.setTag(12);
        var ses2=new cc.Sequence(new cc.CallFunc(function(){
            playEffect(res.F01_GRIG_SOUNDS);
        }),new cc.DelayTime(6));
        ses2.setTag(13);
//
        if(getMusicIsOpen())
        {


            this.runAction(ses.repeatForever());


        }
        if(getMusicIsOpen()) {

            this.runAction(ses1.repeatForever());
        }
        if(getMusicIsOpen()) {

            this.runAction(ses2.repeatForever());
        }






//                              var bg=cc.Sprite.create("#com_bg_02.png");
//        bg.setPosition(winSize.width/2,winSize.height/2);
//        this.addChild(bg,0);
        aa=cc.Sprite.create();
        aa.setPosition(winSize.width/2,winSize.height/2);
        this.addChild(aa,1);
        //bg2   ground
        var bg2=cc.Sprite.create("#k_01_bg.png");
        bg2.setPosition(winSize.width/2,winSize.height/2);
        this.addChild(bg2,1);
        //bg3  house
        var bg3=cc.Sprite.create("#k_01_bg_house.png");
        bg3.setPosition(winSize.width/2,winSize.height/2);
        this.addChild(bg3,1);
        //eye
        var eye1=cc.Sprite.create("#k_01_eye1.png");
        eye1.setTag(9);
        eye1.setPosition(winSize.width/2-260,365);        this.addChild(eye1,2);
        var eye2=cc.Sprite.create("#k_01_eye2.png");
        eye2.setTag(9);
        eye2.setPosition(winSize.width/2-350,160);
        this.addChild(eye2,2);
        var eye3=cc.Sprite.create("#k_01_eye3.png");
        eye3.setTag(9);
        eye3.setPosition(winSize.width/2-430,460);
        this.addChild(eye3,2);
        var blink=new cc.Blink(0.5,1);
        var repeat= new cc.RepeatForever(new cc.Sequence(blink,new cc.DelayTime(0.5)));
        eye1.runAction(new cc.RepeatForever(new cc.Sequence(new cc.DelayTime(0.25),blink,new cc.DelayTime(0.25))));
        eye2.runAction(repeat.clone());
        eye3.runAction(repeat.clone());
        //spider
        var spider=cc.Sprite.create("#k_01_spider.png");
        spider.setTag(4);
        spider.setPosition(winSize.width/2-240,winSize.height*0.33);
        this.addChild(spider,6);
            //colorlayer
        var color=new cc.LayerColor(cc.color(7, 10, 11, 225), 4, 67);
        color.setAnchorPoint(0.5,1);
        color.setPosition(41,75);
        spider.addChild(color);
            //scale
//        var scale=new cc.ScaleBy(0.3,1,0.8);
        var jump=new cc.JumpBy(0.8,cc.p(0,0),40,1);
        spider.runAction(new cc.RepeatForever(new cc.Sequence(jump,jump.reverse())));
        //man
        man2=cc.Sprite.create("#k_01_man1.png");
        man2.setTag(1);
        man2.setPosition(winSize.width*0.53,winSize.height*0.36);
        this.addChild(man2,2);

            //animation
         var animFrames=[];
        for(var i=1;i<=3;i++)
        {
            var frame=cc.spriteFrameCache.getSpriteFrame("k_01_man"+i+".png");
            animFrames.push(frame);
        }
        var mananimation=new cc.Animation(animFrames,0.15);
//        mananimation.setDelayPerUnit(0.15);
        var mananimate=new cc.Animate(mananimation);
        mananimate.setTag(99);
        man2.runAction(new cc.RepeatForever(mananimate));
        //麻麻，我要回家
        var word=cc.Sprite.create("#k_01_go-home.png");
        word.setPosition(man2.getPositionX()-man2.getContentSize().width/2,man2.getPositionY());
        this.addChild(word,7);

        //bird
        bird=cc.Sprite.create("#k_01_bird1.png");
        bird.setPosition(winSize.width*0.6,winSize.height);
        bird.setTag(1);
        this.addChild(bird,4);
        var animFramesbird=[];
        for(var i=1;i<=2;i++)
        {
            var frame=cc.spriteFrameCache.getSpriteFrame("k_01_bird"+i+".png");
            animFramesbird.push(frame);
        }
        var birdanimation=new cc.Animation(animFramesbird,0.15);
        var birdanimate=new cc.Animate(birdanimation);
        bird.runAction(birdanimate.repeatForever());
        this.schedule(this.moveBird);


//        var move=new cc.MoveTo(0.8,cc.p(winSize.width*0.45,winSize.height*0.83));
//        var move2=new cc.MoveTo(1,cc.p(winSize.width*0.3,winSize.height));
//        var sequence=new cc.Sequence(move,move2);
//        bird.runAction(new cc.Sequence(new cc.Spawn(birdanimate,sequence).repeatForever(),new cc.DelayTime(0.2)));

        //bird2
        bird2=cc.Sprite.create("#k_01_bird3.png");
        bird2.setPosition(winSize.width*0.25,winSize.height);
        bird2.setTag(2);
        this.addChild(bird2,4);
        var animFramesbird2=[];
        for(var i=3;i<=4;i++)
        {
            var frame=cc.spriteFrameCache.getSpriteFrame("k_01_bird"+i+".png");
            animFramesbird2.push(frame);
        }
        var birdanimation2=new cc.Animation(animFramesbird2,0.15);
        var birdanimate2=new cc.Animate(birdanimation2);
        bird2.runAction(new cc.RepeatForever(birdanimate2));
        this.schedule(this.moveBird2,0.05);

        //gui
        var baby=cc.Sprite.create("#k_01_skeleton.png");
        baby.setScale(0.3);
        baby.setTag(3);
        baby.setPosition(winSize.width*0.74,winSize.height*0.5);
        this.addChild(baby,2);

        //鬼手
        var babyleft=cc.Sprite.create("#k_01_skeleton_lift.png");
//        babyleft.setAnchorPoint(1,0);
        babyleft.setPosition(baby.width/2,baby.height*0.5);
        baby.addChild(babyleft,2);


        var babyright=cc.Sprite.create("#k_01_skeleton_right.png");
//        babyright.setAnchorPoint(0,0);
        babyright.setPosition(baby.width/2,baby.height*0.5);
        baby.addChild(babyright,2);

        //手动
        var rotatel1=new cc.RotateTo(0.2,20);
        var rotatel2=new cc.RotateTo(0.2,-20);
        var rotateSeq=new cc.Sequence(rotatel1,rotatel2);
        babyleft.runAction(new cc.RepeatForever(rotateSeq));
        babyright.runAction(new cc.RepeatForever(rotateSeq.clone()));


        //骷髅
        headr1=cc.Sprite.create("#k_01_head.png");
        headr1.setTag(5);
        headr1.setScale(0.85);
        headr1.setRotation(40);
        headr1.setPosition(winSize.width*0.92,winSize.height*0.15);
        this.addChild(headr1,2);
        headr2=cc.Sprite.create("#k_01_head.png");
        headr2.setTag(6);
//        headr2.setScale(0.75);
        headr2.setPosition(winSize.width*0.97,winSize.height*0.12);
        this.addChild(headr2,2);

        headl1=cc.Sprite.create("#k_01_head.png");
        headl1.setTag(7);
        headl1.setScale(0.5);
        headl1.setRotation(-120);
        headl1.setPosition(winSize.width*0.1,winSize.height*0.163);
        this.addChild(headl1,2);

        headl2=cc.Sprite.create("#k_01_head.png");
        headl2.setTag(7);
        headl2.setScale(0.7);
        headl2.setRotation(90);
        headl2.setPosition(winSize.width*0.17,winSize.height*0.14);
        this.addChild(headl2,2);

        headl3=cc.Sprite.create("#k_01_head.png");
        headl3.setTag(8);
        headl3.setRotation(180);
        headl3.setPosition(winSize.width*0.13,winSize.height*0.125);
        this.addChild(headl3,2);





        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan: function(touch, event){
                var target = event.getCurrentTarget();

                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    cc.log("sprite began... x = %f, y = %f", locationInNode.x, locationInNode.y);
//                    target.setOpacity(180);
                    return true;
                }
                return false;
            },
            onTouchMoved: function(touch, event){
//                var target = event.getCurrentTarget(), delta = touch.getDelta();
//                target.x += delta.x;
//                target.y += delta.y;
            },
            onTouchEnded: function(touch, event){
                var target = event.getCurrentTarget();
                if(ist)return;
                if(target.getTag()==1)
                {
                    //画眼睛
                    ist=true;
                    cc.log("1画眼睛");
                    target.getParent().unschedule(target.getParent().moveBird);
                    var draw1 = new cc.DrawNode();
                    target.getParent().addChild(draw1, 10);
                    draw1.drawDot( cc.p(target.getPositionX()-target.width*0.04,target.getPositionY()-target.height*0.15), 1.5, cc.color( 255,255, 113, 255) );

                    var draw2 = new cc.DrawNode();
                    target.getParent().addChild(draw2, 10);
                    draw1.drawDot( cc.p(target.getPositionX()+target.width*0.01,target.getPositionY()-target.height*0.1), 1.5, cc.color( 255,255, 113, 255) );

                    target.getParent().runAction(new cc.Sequence(new cc.DelayTime(0.5),
                    new cc.CallFunc(function(){
                        draw1.removeFromParent(true);
                        draw2.removeFromParent(true);
                        target.getParent().schedule(target.getParent().moveBird);
                        ist=false;
//                        var draw11 = new cc.DrawNode();
//                        target.getParent().addChild(draw11, 10);
//                        draw11.drawDot( cc.p(target.getPositionX()-target.width*0.04,target.getPositionY()-target.height*0.15), 1.5, cc.color( 0,0, 0, 255) );
//
//                        var draw21 = new cc.DrawNode();
//                        target.getParent().addChild(draw21, 10);
//                        draw11.drawDot( cc.p(target.getPositionX()+target.width*0.01,target.getPositionY()-target.height*0.1), 1.5, cc.color( 0,0, 0, 255) );
                    })
                    ));
                }
                else if(target.getTag()==2)
                {
                    //画眼睛
                    ist=true;
                    target.getParent().unschedule(target.getParent().moveBird2);

                    var draw = new cc.DrawNode();
                    target.getParent().addChild(draw, 10);
                    draw.drawDot( cc.p(target.getPositionX()-target.width*0.04,target.getPositionY()-target.height*0.15), 0.55, cc.color( 255,255, 113, 255) );

                    var draw2 = new cc.DrawNode();
                    target.getParent().addChild(draw2, 10);
                    draw2.drawDot( cc.p(target.getPositionX()+target.width*0.01,target.getPositionY()-target.height*0.1), 0.55, cc.color( 255,255, 113, 255) );

                    target.getParent().runAction(new cc.Sequence(new cc.DelayTime(1),
                        new cc.CallFunc(function(){

                            draw.removeFromParent(true);
                            draw2.removeFromParent(true);
                            target.getParent().schedule(target.getParent().moveBird2);
                            ist=false;
//                            var draw1 = new cc.DrawNode();
//                            target.getParent().addChild(draw1, 10);
//                            draw1.drawDot( cc.p(winSize.width*0.543,winSize.height*0.7), 0.55, cc.color( 0,0, 0, 255) );
//
//                            var draw21 = new cc.DrawNode();
//                            target.getParent().addChild(draw21, 10);
//                            draw21.drawDot( cc.p(winSize.width*0.55,winSize.height*0.7), 0.55, cc.color( 0,0, 0, 255) );
                        })
                    ));
                    cc.log("2画眼睛");
                }
                else if(target.getTag()==3)
                {
                    //鬼  放大吓死男 失败
//                    new cc.CallFunc(function(){
//                        baby.setVisible(false);man2.setVisible(false);
//                        man=cc.Sprite.create("#K_01_man-die.png");
//                        man.setPosition(winSize.width*0.53,winSize.height*0.36);
//                        baby.getParent().addChild(man,2);
//                    }),
//                    new cc.DelayTime(1.5),
//                        new cc.CallFunc(function(){ShowFaildPPanel(baby.getParent().getParent(),1);})));
                    ist=true;
                    if(target.getParent().isbaby)
                        return;
                    target.getParent().isbaby=true;
                    cc.log("鬼  放大吓死男");
                    var scale=new cc.ScaleTo(0.5,1);
                    baby.runAction(new cc.Sequence(scale,
                            new cc.CallFunc(function(){
                                man2.setVisible(false);
//                                baby.setVisible(false);
                                nervous= cc.Sprite.create("#k_01_man_nervous1.png");
                                nervous.setPosition(winSize.width*0.53,winSize.height*0.36);
                                man2.getParent().addChild(nervous,2);
                                var nervousFrames=[];
                                var framen1=cc.spriteFrameCache.getSpriteFrame("k_01_man_nervous1.png");
                                nervousFrames.push(framen1);
                                var framen2=cc.spriteFrameCache.getSpriteFrame("k_01_man_nervous2.png");
                                nervousFrames.push(framen2);
                                var framen3=cc.spriteFrameCache.getSpriteFrame("k_01_man_nervous1.png");
                                nervousFrames.push(framen3);
                                var framen4=cc.spriteFrameCache.getSpriteFrame("k_01_man_nervous2.png");
                                nervousFrames.push(framen4);
                                var animationn = new cc.Animation(nervousFrames,0.2);
                                animationn.setLoops(2);
                                var actionn = cc.animate(animationn);
                                nervous.runAction(actionn);
                                playEffect(res.F01_CRY);
                                cc.log("dddd");
                            }),new cc.DelayTime(1)
                    ,new cc.CallFunc(function(){
                        nervous.setVisible(false);word.setVisible(false);
                        man=cc.Sprite.create("#k_01_man-die.png");
                        man.setPosition(winSize.width*0.53,winSize.height*0.36);
                        baby.getParent().addChild(man,2);
                            var animFrames2=[];
                            var frame21=cc.spriteFrameCache.getSpriteFrame("k_01_man-die.png");
                            animFrames2.push(frame21);
                            var frame22=cc.spriteFrameCache.getSpriteFrame("k_01_man-die2.png");
                            animFrames2.push(frame22);
                            var animation2 = new cc.Animation(animFrames2,0.3);
                            var action2 = cc.animate(animation2);
                            man.runAction(action2.repeatForever());
                            cc.log("dddd2");
                    }),
                    new cc.DelayTime(1.5),
                    new cc.CallFunc(function(){
                        man.getParent().stopAllActions();
                        ShowFaildPPanel(baby.getParent().getParent(),1,1);
                    })
                    ));
                }
                else if(target.getTag()==4)
                {
                    //蜘蛛  跳到坑爹难身上咬死，然后爆炸
                    cc.log("蜘蛛  跳到坑爹难身上咬死，然后爆炸");
//

                    ist=true;

                    color.runAction(new cc.FadeOut(0.1));
                    spider.runAction(new cc.Sequence(new cc.JumpTo(0.4,cc.p(winSize.width*0.53,winSize.height*0.36),40,1),new cc.DelayTime(0.2)
                     ,cc.CallFunc(function(){
                            man2.runAction(new cc.Sequence(
                                new cc.CallFunc(function(){ man2.setVisible(false);spider.setVisible(false);word.setVisible(false);})
                                ,new cc.CallFunc(function(){
                                    var animFrames22=[];
                                    var frame221=cc.spriteFrameCache.getSpriteFrame("k_01_man_zhongdu1.png");
                                    animFrames22.push(frame221);
                                    var frame222=cc.spriteFrameCache.getSpriteFrame("k_01_man_zhongdu2.png");
                                    animFrames22.push(frame222);
                                    var frame23=cc.spriteFrameCache.getSpriteFrame("k_01_man_zhongdu3.png");
                                    animFrames22.push(frame23);
                                    var animation22 = new cc.Animation(animFrames22,0.3);
                                    playEffect(res.F09_JINGXIA);

                                    var action22 = cc.animate(animation22);
                                    man=cc.Sprite.create("#k_01_man_zhongdu1.png");
                                    man.setPosition(winSize.width*0.53,winSize.height*0.36);
                                    man2.getParent().addChild(man,2);
                                    man.runAction(action22);
                                    cc.log("蜘蛛  跳到坑爹难身上咬死，然后爆炸2");
                                    man.runAction(new cc.Sequence(action22,new cc.DelayTime(0.3),new cc.CallFunc(function(){man.setSpriteFrame("k_01_man-die.png")})));


                                })
                                ,new cc.DelayTime(2),
                                new cc.CallFunc(function(){
                                    man.getParent().stopAllActions();
                                    ShowFaildPPanel(man.getParent().getParent(),1,0);
                                })));



                        })
                    ));
//                    color.runAction(new cc.FadeOut(0.1));
//                    man2.runAction(new cc.Sequence(
//                        new cc.CallFunc(function(){ man2.setVisible(false);spider.setVisible(false);})
//
//                        ,new cc.CallFunc(function(){
//                            var blood=cc.Sprite.create("#k_01_blood.png");
//                            blood.setPosition(winSize.width*0.53,winSize.height*0.1);
//                            man2.getParent().addChild(blood,2);
//
//                            man=cc.Sprite.create("#k_01_man-die.png");
//                            man.setPosition(winSize.width*0.53,winSize.height*0.36);
//                            man2.getParent().addChild(man,2);
//                            var animFrames2=[];
//                            var frame21=cc.spriteFrameCache.getSpriteFrame("k_01_man-die.png");
//                            animFrames2.push(frame21);
//                            var frame22=cc.spriteFrameCache.getSpriteFrame("k_01_man-die2.png");
//                            animFrames2.push(frame22);
//                            var animation2 = new cc.Animation(animFrames2,0.3);
//                            var action2 = cc.animate(animation2);
//                            man.runAction(action2.repeatForever());
//
//                        })
//                    ,new cc.DelayTime(1),
//                    new cc.CallFunc(function(){ShowFaildPPanel(man.getParent().getParent(),1);})));
                }
                else if(target.getTag()==6)
                {
                    //gulu
                    ist=true;
                    cc.log("gulur");
                    var light=new cc.Sprite("#k_01_headlight.png");
                    light.setPosition(headr1.width/2,headr1.height/2);
                    headr1.addChild(light,2);
//                    var seq=new cc.Sequence(new cc.FadeIn(0.1),new cc.DelayTime(1),new cc.FadeOut(0.1));
                    var move=new cc.MoveBy(0.1,cc.p(3,3));
                    var move2=new cc.MoveBy(0.1,cc.p(-3,-3));
                    var seq=new cc.Sequence(move,move2);
                    var sca=new cc.ScaleTo(0.1,0.9);
                    var sca2=new cc.ScaleTo(0.1,1.1);
                    var seq2=new cc.Sequence(sca,sca2);
                    light.runAction(new cc.Sequence(new cc.FadeIn(0.1),new cc.DelayTime(1)));
                    headr1.runAction(new cc.Spawn(seq,seq2).repeatForever());


                    var light2=new cc.Sprite("#k_01_headlight.png");
                    light2.setPosition(headr2.width/2,headr2.height/2);
                    headr2.addChild(light2,2);
                    light2.runAction(new cc.Sequence(new cc.FadeIn(0.1),new cc.DelayTime(1)));
                    headr2.runAction(new cc.Spawn(seq.clone(),seq2.clone()).repeatForever());

                    baby.runAction(new cc.Sequence(
                        new cc.CallFunc(function(){
                            man2.setVisible(false);
//                                baby.setVisible(false);
                            nervous= cc.Sprite.create("#k_01_man_nervous1.png");
                            nervous.setPosition(winSize.width*0.53,winSize.height*0.36);
                            man2.getParent().addChild(nervous,2);
                            var nervousFrames=[];
                            var framen1=cc.spriteFrameCache.getSpriteFrame("k_01_man_nervous1.png");
                            nervousFrames.push(framen1);
                            var framen2=cc.spriteFrameCache.getSpriteFrame("k_01_man_nervous2.png");
                            nervousFrames.push(framen2);
                            var framen3=cc.spriteFrameCache.getSpriteFrame("k_01_man_nervous1.png");
                            nervousFrames.push(framen3);
                            var framen4=cc.spriteFrameCache.getSpriteFrame("k_01_man_nervous2.png");
                            nervousFrames.push(framen4);
                            var animationn = new cc.Animation(nervousFrames,0.2);
                            var actionn = cc.animate(animationn);
                            nervous.runAction(actionn);
                            playEffect(res.F01_CRY);
                            cc.log("dddd");
                        }),new cc.DelayTime(1)
                        ,new cc.CallFunc(function(){
                            nervous.setVisible(false);word.setVisible(false);
                            man=cc.Sprite.create("#k_01_man-die.png");
                            man.setPosition(winSize.width*0.53,winSize.height*0.36);
                            baby.getParent().addChild(man,2);
                            var animFrames2=[];
                            var frame21=cc.spriteFrameCache.getSpriteFrame("k_01_man-die.png");
                            animFrames2.push(frame21);
                            var frame22=cc.spriteFrameCache.getSpriteFrame("k_01_man-die2.png");
                            animFrames2.push(frame22);
                            var animation2 = new cc.Animation(animFrames2,0.3);
                            var action2 = cc.animate(animation2);
                            man.runAction(action2.repeatForever());
                            cc.log("dddd2");
                        }),
                        new cc.DelayTime(1.5),
                        new cc.CallFunc(function(){
                            man.getParent().stopAllActions();
                            ShowFaildPPanel(baby.getParent().getParent(),1,1);
                        })
                    ));
                    cc.log("ghj");
                }
                else if(target.getTag()==8)
                {
                    //gulu
                    ist=true;
                    var light=new cc.Sprite("#k_01_headlight.png");
                    light.setPosition(target.width/2,target.height/2);
                    target.addChild(light,2);
                    light.runAction(new cc.Sequence(new cc.FadeIn(0.1),new cc.DelayTime(1)));

                    var move=new cc.MoveBy(0.1,cc.p(3,3));
                    var move2=new cc.MoveBy(0.1,cc.p(-3,-3));
                    var seq=new cc.Sequence(move,move2);
                    var sca=new cc.ScaleTo(0.1,0.9);
                    var sca2=new cc.ScaleTo(0.1,1.1);
                    var seq2=new cc.Sequence(sca,sca2);

                    var light2=new cc.Sprite("#k_01_headlight.png");
                    light2.setPosition(headl1.width/2,headl1.height/2);
                    headl1.addChild(light2,4);
                    light2.runAction(new cc.Sequence(new cc.FadeIn(0.3),new cc.DelayTime(1)));
                    headl1.runAction(new cc.Spawn(seq,seq2).repeatForever());

                    var light3=new cc.Sprite("#k_01_headlight.png");
                    light3.setPosition(headl2.width/2,headl2.height/2);
                    headl2.addChild(light3,4);
                    light3.runAction(new cc.Sequence(new cc.FadeIn(0.3),new cc.DelayTime(1)));
                    headl2.runAction(new cc.Spawn(seq.clone(),seq2.clone()).repeatForever());
                    target.runAction(new cc.Spawn(seq.clone(),seq2.clone()).repeatForever());

                    baby.runAction(new cc.Sequence(
                        new cc.CallFunc(function(){
                            man2.setVisible(false);
//                                baby.setVisible(false);
                            nervous= cc.Sprite.create("#k_01_man_nervous1.png");
                            nervous.setPosition(winSize.width*0.53,winSize.height*0.36);
                            man2.getParent().addChild(nervous,2);
                            var nervousFrames=[];
                            var framen1=cc.spriteFrameCache.getSpriteFrame("k_01_man_nervous1.png");
                            nervousFrames.push(framen1);
                            var framen2=cc.spriteFrameCache.getSpriteFrame("k_01_man_nervous2.png");
                            nervousFrames.push(framen2);
                            var framen3=cc.spriteFrameCache.getSpriteFrame("k_01_man_nervous1.png");
                            nervousFrames.push(framen3);
                            var framen4=cc.spriteFrameCache.getSpriteFrame("k_01_man_nervous2.png");
                            nervousFrames.push(framen4);
                            var animationn = new cc.Animation(nervousFrames,0.2);
                            var actionn = cc.animate(animationn);
                            nervous.runAction(actionn);
                            playEffect(res.F05_MANAMAZED_SOUNDS);
                            cc.log("dddd");
                        }),new cc.DelayTime(1)
                        ,new cc.CallFunc(function(){
                            nervous.setVisible(false);word.setVisible(false);
                            man=cc.Sprite.create("#k_01_man-die.png");
                            man.setPosition(winSize.width*0.53,winSize.height*0.36);
                            baby.getParent().addChild(man,2);
                            var animFrames2=[];
                            var frame21=cc.spriteFrameCache.getSpriteFrame("k_01_man-die.png");
                            animFrames2.push(frame21);
                            var frame22=cc.spriteFrameCache.getSpriteFrame("k_01_man-die2.png");
                            animFrames2.push(frame22);
                            var animation2 = new cc.Animation(animFrames2,0.3);
                            var action2 = cc.animate(animation2);
                            man.runAction(action2.repeatForever());
                            cc.log("dddd2");
                        }),
                        new cc.DelayTime(1.5),
                        new cc.CallFunc(function(){
                            man.getParent().stopAllActions();
                            ShowFaildPPanel(baby.getParent().getParent(),1,1);
                        })
                    ));



                    cc.log("gulul");
                }
                else if(target.getTag()==9)
                {
                    //鬼眼
                    cc.log("鬼眼");

                    var light=new cc.Sprite("#k_06_linghun.png");
                    light.setPosition(target.width/2,target.height/2);
                    target.addChild(light,4);
                    light.runAction(new cc.Sequence(new cc.FadeIn(0.3),new cc.DelayTime(1),new cc.FadeOut(0.1)));


                }


                cc.log("sprite onTouchesEnded.. ");
                event.getCurrentTarget().setOpacity(255);
            }
        });

        cc.eventManager.addListener(listener, bird);
        cc.eventManager.addListener(listener.clone(), bird2);
        cc.eventManager.addListener(listener.clone(), baby);
        cc.eventManager.addListener(listener.clone(), spider);
        cc.eventManager.addListener(listener.clone(), eye1);
        cc.eventManager.addListener(listener.clone(), eye2);
        cc.eventManager.addListener(listener.clone(), eye3);
        cc.eventManager.addListener(listener.clone(), headl3);
        cc.eventManager.addListener(listener.clone(), headr2);
        cc.log("fp01");
    },
    moveBird:function(sebder)
    {
        bird.setPosition(bird.getPositionX()-1,bird.getPositionY());
        if(bird.getPositionX()>=winSize.width*0.45)
        {
            bird.setPosition(bird.getPositionX()-1,bird.getPositionY()-2);
        }
        else if(bird.getPositionX()>=winSize.width*0.18)
        {
            bird.setPosition(bird.getPositionX()-1,bird.getPositionY()+1);
        }
        else
        {
            bird.setPosition(winSize.width*0.6,winSize.height);
        }

//        cc.log("agcd");
    },
    moveBird2:function(sebder)
    {
        if(bird2.getPositionX()>0)
        {
            bird2.setPosition(bird2.getPositionX()-2,bird.getPositionY()-1);
        }
        else
        {
            var x=winSize.width*0.25+cc.random0To1(winSize.width*2.35-winSize.width*1.25);
            bird2.setPosition(x,winSize.height);
        }

//        cc.log("agcd");
    },
    faleCall:function()
    {
        ShowFaildPPanel(man.getParent().getParent(),1);
    },
    winCall:function()//过关调用方法
    {
        //跳出一个房子，再过关




//        this.stopActionByTag(11);
//        this.stopActionByTag(12);
//        this.stopActionByTag(13);

        cc.log(ist);
        if(ist)
        {
            this.getParent().getChildByTag(2).getChildByTag(199).removeFromParent();
        }
        else
        {
            cc.eventManager.removeAllListeners();

            this.getParent().getChildByTag(2).removeFromParent(true);
        }





        if(ist)return;
        if(isw)return;
        this.stopAllActions();


        isw=true;
        if(!this.isfailse) {
            stopAllEffect();
//            this.unschedule(this.step);
            //bg
            var bg2=cc.Sprite.create("#k_01_bg.png");
            bg2.setPosition(winSize.width/2,winSize.height/2);
            this.addChild(bg2,9);
            house=cc.Sprite.create("#k_01_bg_house_win.png");
//            house.setTag(4);
            house.setPosition(winSize.width*0.4,winSize.height*0.5);
            this.addChild(house,10);

            var moon = new cc.Sprite("#k_19_moon.png");
            moon.attr({
                x:winSize.width- 270,
                y:winSize.height/2 + 220,
                anchorX:0.5,
                anchorY:0.5
            });
            this.addChild(moon,10);

            //添加云
            var cloud=new cc.Sprite("#com_cloud.png");
            cloud.attr({
                x:winSize.width/2-250,
                y:550
            });
            cloud.runAction(cc.sequence(cc.moveTo(80,cc.p(-cloud.getBoundingBox().width/2,550)),cc.place(cc.p(winSize.width+cloud.getBoundingBox().width/2,550))).repeatForever());
            this.addChild(cloud,10);

            people=new cc.Sprite("#k_01_man_gun.png");
//            people.setAnchorPoint(1,0.5);
            people.setTag(99);
            people.setPosition(winSize.width+people.width/2,house.getPositionY()-house.height*0.35);
            this.addChild(people,10);


            var mama=new cc.Sprite("#k_01_comeback.png");
            mama.setPosition(winSize.width,house.getPositionY());
            this.addChild(mama,10);
            var mo=new cc.MoveBy(0.5,cc.p(-80,-45));
            var mo2=new cc.MoveBy(0.5,cc.p(-80,45));
            var ss=new cc.Sequence(mo,mo2);
            mama.runAction(new cc.Sequence(new cc.DelayTime(0.5),ss,ss.clone(),ss.clone(),new cc.FadeOut(0.2)));
            this.runAction(new cc.Sequence(new cc.DelayTime(0.3),new cc.CallFunc(function(){playEffect(res.F01_WIN);})));


            hou=new cc.Sprite("#k_01_bg_house_win2.png");
            hou.setPosition(winSize.width*0.4,winSize.height*0.5);
            this.addChild(hou,12);

            this.schedule(this.step2,0.5);
            cc.log("win");
        }
    },
    step2:function(dt)
    {
        if(people.getPositionX()>house.getPositionX())
        {
            var rotate=new cc.RotateBy(0.5,-180);
            var move=new cc.MoveBy(0.5,cc.p(-77,0));

            var seq1=new cc.Sequence(rotate,rotate.clone());
            var seq2=new cc.Sequence(move,move.clone());
            people.runAction(new cc.Spawn(seq1,seq2));

            cc.log("win2222222222");

        }
        else
        {
            this.unschedule(this.step2);
            this.runAction(new cc.Sequence(new cc.DelayTime(0.1),new cc.CallFunc(function(){
                    playEffect(res.F01_LAUGHT);
                people.setVisible(false);
                hou.setVisible(false);
            }),new cc.DelayTime(0.3),
                new cc.CallFunc(function(){
                    var se=new cc.Sequence(new cc.MoveBy(0.05,cc.p(13,15)),new cc.MoveBy(0.05,cc.p(-13,-15))
                        ,new cc.MoveBy(0.05,cc.p(-24,-16)),new cc.MoveBy(0.05,cc.p(24,16)))
                    house.runAction(new cc.Sequence(se,se.clone(),se.clone(),se.clone(),new cc.CallFunc(function(){
                            ShowSuccessPanel(man2.getParent().getParent(),1);
                    })
                    ));
                })
//                ,new cc.DelayTime(1)
//                ,new cc.CallFunc(function(){
//                    ShowSuccessPanel(people.getParent().getParent(),1);
//                })
            ));

            cc.log("win22233333");

        }


    }
//    ,sound1:function()
//    {
//        playEffect(res.F01_GRIG_SOUNDS);
//
//    }
//    ,sound2:function()
//    {
//        playEffect(res.F01_2_SOUNDS);
//        playEffect(res.F01_2_CRY);
//        playEffect(res.F01_GRIG_SOUNDS);
//
//    }


});
var HomeScene=cc.Scene.extend({
    layer:null,
    onEnter : function() {
        this._super();
        layer =new HomeLayer();
        layer.setTag(1);
        this.addChild(layer);

        var level = 1;
        var mainUILayer = new MainUILayer(level);
        mainUILayer.setTag(2);
        this.addChild(mainUILayer, 2);

//                              alert(_arr);
    },
    pauseTheGame : function () {
        //pause the game
//        layer.unschedule(layer.step2);
//        if()
//        if(getMusicIsOpen()) {
//            layer.unschedule(layer.sound2);
//            layer.unschedule(layer.sound1);
//        }

                      pauseAllEffect();
//        stopAllEffect();
//        cc.director.sharedDirector.getActionManager().pauseTarget(layer.people);
//        cc.Director.getActionManager().pauseTarget();


//        layer.stopAllActions();
//        layer.unschedule(layer.step);
        cc.log("pause the game");
    },
    resumeTheGame :function () {
        //resume the game
//        layer.schedule(layer.step2);
//        layer.schedule(layer.step);
//        if(getMusicIsOpen())
//        {
//            layer.schedule(layer.sound2);
//            layer.schedule(layer.sound1);
//        }

//        cc.director.sharedDirector.getActionManager().resumeTarget(layer.people);

        cc.log("resume the game");
    }
});


