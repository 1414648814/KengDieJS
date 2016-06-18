/**
 * Created by langchenglai on 14-9-17.
 */

var AwakeLayer = cc.Layer.extend({
    sp_man : null,   //人物角色
    sp_face1 : null,  //人物的脸
    sp_hammer : null,  //锤子
    sp_hammer2 : null,  //锤子2
    sp_bucket : null,   //水桶
    sp_bucket2 : null,   //水桶2
    sp_tv : null,  //电视
    pre_Tag : null,
    water1 : null,   //水
    water2 : null,   //水
    isMoving : null,
    man_Position : null,   //角色位置
    hammer2_Position : null,  //锤子2的位置
    z1 : null,
    z2 : null,
    z3 : null,
    lighting1 : null,   //灯光1
    lighting2 : null,  //灯光2

    ctor : function()
    {
        this._super();
        this.init();
        pre_Tag = 0;
        slide_len1 = 0;
        slide_len2 = 0;
        slide_len3 = 0;
        slide_len4 = 0;
        isMoving = false;
        _this = this;
    },

    init : function()
    {
        playEffect(res.F12_ZZ_SOUNDS,true);
        cc.log("qq");
        var size =  cc.director.getWinSize();

        var sp_bg = cc.Sprite.create("#com_bg_02.png");
        sp_bg.setPosition(cc.p(size.width/2,size.height/2));
        this.addChild(sp_bg);

        var sp_land = cc.Sprite.create("#com_tudi2.png");
        sp_land.setAnchorPoint(cc.p(0.5,0));
        sp_land.setPosition(cc.p(size.width/2,0));
        this.addChild(sp_land);

        var sp_bed = cc.Sprite.create("#k_12_bed.png");
        sp_bed.setPosition(cc.p(size.width/2,250));
        this.addChild(sp_bed,2);

        var sp_desk = cc.Sprite.create("#k_12_desk.png");
        sp_desk.setPosition(cc.p(336+170,200));
        sp_bed.addChild(sp_desk);

        sp_man = cc.Sprite.create("#k_12_man.png");
        sp_man.setPosition(cc.p(336/2,235));

        sp_bed.addChild(sp_man,0,999);

        sp_face1 = cc.Sprite.create("#k_12_man_face1.png");
        sp_face1.setPosition(cc.p(85,180));
        sp_man.addChild(sp_face1);

        //坑爹男口
        sp_face3 = cc.Sprite.create("#k_12_man_face1_1.png");
        sp_face3.setScale(0.8);
        sp_face3.setPosition(cc.p(85,180));
        sp_man.addChild(sp_face3);

        var st = cc.ScaleBy.create(1,0.7);
        var seq_face3 = cc.Sequence.create(st,st.reverse());
        sp_face3.runAction(cc.RepeatForever.create(seq_face3));






        //坑爹男泡
        sp_face4 = cc.Sprite.create("#k_12_man_bipao.png");
        sp_face4.setAnchorPoint(cc.p(0,0.2));
        sp_face4.setPosition(cc.p(87,185));
        sp_face4.setScale(0.5);
        sp_man.addChild(sp_face4);


        sp_face5 = cc.Sprite.create("#k_12_man_face3.png");
//        sp_face5.setScale(0.8);
        sp_face5.setPosition(cc.p(85,170));
        sp_face5.setVisible(false);
        sp_man.addChild(sp_face5);

        var st4 = cc.ScaleBy.create(1,2);
        var seq_face4 = cc.Sequence.create(st4,st4.reverse());
        sp_face4.runAction(cc.RepeatForever.create(seq_face4));

        sp_face2 = cc.Sprite.create("#k_12_man_face2.png");
        sp_face2.setPosition(cc.p(85,185));
        sp_face2.setOpacity(0);
        sp_man.addChild(sp_face2);


        sp_Clock = cc.Sprite.create("#k_12_clock.png");
        sp_Clock2 = cc.Sprite.create("#k_12_clock2.png");
        sp_bucket = cc.Sprite.create("#k_12_tong.png");
        sp_hammer = cc.Sprite.create("#k_12_chuizi.png");
        sp_tv = cc.Sprite.create("#k_12_tv.png");
        sp_hammer2 = cc.Sprite.create("#k_12_chuizi.png");
        z1 = cc.Sprite.create("#k_12_z.png");
        z2 = cc.Sprite.create("#k_12_z.png");
        z3 = cc.Sprite.create("#k_12_z.png");


        z1.setPosition(cc.p(240,365));
        z1.setScale(1);
        z2.setPosition(cc.p(270,390));
        z2.setScale(1.1);
        z3.setPosition(cc.p(300,415));
        z1.setAnchorPoint(cc.p(0,0));
        z2.setAnchorPoint(cc.p(0,0));
        z3.setAnchorPoint(cc.p(0,0));
        z3.setScale(1.3);
        var z1_rt1 = cc.RotateTo.create(1.5,-20);
        var z1_rt2 = cc.RotateTo.create(1.5,30);
        var z1_mt1 = cc.MoveTo.create(1.5,cc.p(z1.getPositionX()-10,z1.getPositionY()-10));
        var z1_mt2 = cc.MoveTo.create(1.5,cc.p(z1.getPositionX()+10,z1.getPositionY()+10));
        var z1_dy = cc.ScaleBy.create(1.5,0.3);
        var z1_seq_rt = cc.Sequence.create(z1_rt1,z1_rt2);
        var z1_seq_dy = cc.Sequence.create(z1_dy,z1_dy.reverse());
        var z1_seq_mt = cc.Sequence.create(z1_mt1,z1_mt2);
        var z1_spawn = cc.Spawn.create(z1_seq_mt,z1_seq_dy,z1_seq_rt);
//        var seq = cc.Sequence.create(rt,rt2);
//        var spawn = cc.Spawn.create(seq,seq2);
        var z2_rt1 = cc.RotateTo.create(1.5,30);
        var z2_rt2 = cc.RotateTo.create(1.5,-20);
        var z2_seq_rt = cc.Sequence.create(z2_rt1,z2_rt2);
        var z2_mt1 = cc.MoveTo.create(1.5,cc.p(z2.getPositionX()-25,z2.getPositionY()-20));
        var z2_mt2 = cc.MoveTo.create(1.5,cc.p(z2.getPositionX()+10,z2.getPositionY()+10));
        var z2_seq_mt = cc.Sequence.create(z2_mt1,z2_mt2);
        var z2_dy = cc.ScaleBy.create(1.5,0.4);
        var z2_seq_dy = cc.Sequence.create(z2_dy,z2_dy.reverse());
        var z2_spawn = cc.Spawn.create(z2_seq_mt,z2_seq_dy,z2_seq_rt);

        var z3_rt1 = cc.RotateTo.create(1.5,-20);
        var z3_rt2 = cc.RotateTo.create(1.5,30);
        var z3_seq_rt = cc.Sequence.create(z3_rt1,z3_rt2);
        var z3_mt1 = cc.MoveTo.create(1.5,cc.p(z3.getPositionX()-40,z3.getPositionY()-30));
        var z3_mt2 = cc.MoveTo.create(1.5,cc.p(z3.getPositionX()+20,z3.getPositionY()+10));
        var z3_seq_mt = cc.Sequence.create(z3_mt1,z3_mt2);
        var z3_dy = cc.ScaleBy.create(1.5,0.5);
        var z3_seq_dy = cc.Sequence.create(z3_dy,z3_dy.reverse());
        var z3_spawn = cc.Spawn.create(z3_seq_mt,z3_seq_dy,z3_seq_rt);
        z1.runAction(cc.RepeatForever.create(z1_spawn));
        z2.runAction(cc.RepeatForever.create(z2_spawn));
        z3.runAction(cc.RepeatForever.create(z3_spawn));


        sp_Clock.setPosition(cc.p(size.width/2+335,350));
        sp_Clock2.setPosition(cc.p(size.width/2+335,350));
        sp_bucket.setPosition(cc.p(size.width/2+335,220));
        sp_hammer.setPosition(cc.p(size.width/2-187,150));
        sp_hammer2.setPosition(cc.p(size.width/2-107,380));
        sp_tv.setPosition(cc.p(size.width/2-287,280));

        sp_Clock2.setOpacity(0);
        sp_hammer2.setOpacity(0);
        sp_hammer2.setRotation(-40);
        sp_hammer2.setAnchorPoint(cc.p(0.3,0.5));
        sp_hammer2.setFlippedX(1);

        sp_bed.addChild(z1,1,991);
        sp_bed.addChild(z2,1,992);
        sp_bed.addChild(z3,1,993);

        this.addChild(sp_Clock,3,1);
        this.addChild(sp_Clock2,3);
        this.addChild(sp_bucket,3,2);
        this.addChild(sp_hammer,1,3);
        this.addChild(sp_hammer2,3);
        this.addChild(sp_tv,3,4);


        wire = new cc.Sprite("#k_12_tv_1.png");
        wire.setPosition(cc.p(57,-17));
        sp_tv.addChild(wire);



        clock_needles1=new cc.Sprite("#k_12_clock_shizhen.png");
        clock_needles1.attr({
            x:sp_Clock.getBoundingBox().width/2,
            y:sp_Clock.getBoundingBox().height/2
        });

        sp_Clock.addChild(clock_needles1);
        clock_needles1.runAction(cc.rotateBy(1,6).repeatForever());

        clock_needles2=new cc.Sprite("#k_12_clock_miaozhen.png");
        clock_needles2.attr({
            x:sp_Clock.getBoundingBox().width/2,
            y:sp_Clock.getBoundingBox().height/2
        });

        sp_Clock.addChild(clock_needles2);
        clock_needles2.runAction(cc.rotateBy(1,60).repeatForever());







        man_Position = sp_man.getPosition();
        hammer2_Position = sp_hammer2.getPosition();

        var listener1 = cc.EventListener.create({
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


                    return true;
                }
                return false;
            },
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();

                var locationMoveNode = target.convertToNodeSpace(touch.getLocation());
                cc.log("x:",locationMoveNode.x);
                cc.log("y:",locationMoveNode.y);
                cc.log(slide_len1);

            },





            onTouchEnded: function (touch, event) {


                var target = event.getCurrentTarget();



                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (target == z1 || target == z2 || target == z3 ) {
                    playEffect(res.BUTTON_SOUNDS);
                    target.setVisible(false);
                    cc.eventManager.removeListeners(target);


                }



                if(!z1.isVisible() && !z2.isVisible() && !z3.isVisible() ){
                    cc.log("you win!");
                    sp_face3.setVisible(false);
                    sp_face4.setVisible(false);
                    sp_face3.stopAllActions();
                    sp_face4.stopAllActions();
                    sp_face3.setOpacity(0);
                    sp_face4.setOpacity(0);
                    sp_face1.stopAllActions();
                    stopAllEffect();
                    playEffect(res.F12_WIN_SOUNDS);
                    cc.eventManager.removeListeners(sp_bucket);
                    cc.eventManager.removeListeners(sp_hammer);
                    cc.eventManager.removeListeners(sp_tv);
                    cc.eventManager.removeListeners(sp_Clock);
                    cc.eventManager.removeListeners(z1);
                    cc.eventManager.removeListeners(z2);
                    cc.eventManager.removeListeners(z3);
                    cc.eventManager.removeListeners(sp_man);
//                    var frame = cc.SpriteFrame.create(res.k_12_man_face2_png,cc.rect(0,0,92,72));
                    sp_face1.setSpriteFrame("k_12_man_face2.png");


                    var seq = cc.Sequence.create(cc.DelayTime.create(0.8),cc.CallFunc.create(function(){
                        sp_face1.setVisible(false);
                        var animFrame=["k_12_man_wake1.png","k_12_man_wake2.png","k_12_man_wake1.png","k_12_man_wake2.png","k_12_man_wake1.png","k_12_man_wake2.png"];
                        var animFrames=[];
                        for(var i=0;i<animFrame.length;i++){
                            var Emenyframe=cc.spriteFrameCache.getSpriteFrame(animFrame[i]);
                            animFrames.push(Emenyframe)
                        }
                        var animation=new cc.Animation(animFrames,0.2);
                        var animate=new cc.Animate(animation);
                        sp_man.runAction(animate);

                    },this),cc.DelayTime.create(2),cc.CallFunc.create(function(){
                        sp_man.stopAllActions();
                        ShowSuccessedPanel(target.parent.parent.getParent(),12);
                    },this));
                    target.runAction(seq);
                    return;

                }


                if(target.getTag() == 999)
                {
                    playEffect(res.BUTTON_SOUNDS);
                    if(sp_face3.isVisible()){
                        sp_face1.setSpriteFrame("k_12_man_face3.png");
                        sp_face3.setVisible(false);
                        sp_face4.setVisible(false);
//                        sp_face5.setVisible(true);
                        sp_face1.stopAllActions();
                        sp_face1.runAction(cc.Sequence.create(cc.DelayTime.create(1),cc.CallFunc.create(function(){
                            sp_face1.setSpriteFrame("k_12_man_face1.png");
                            sp_face3.setVisible(true);
                            sp_face4.setVisible(true);
                        })));

                    }else{
                        sp_face1.setSpriteFrame("k_12_man_face1.png");
//                        sp_face1.setVisible(true);
                        sp_face3.setVisible(true);
                        sp_face4.setVisible(true);
//                        sp_face5.setVisible(false);
                    }
                    return;
                }

                if(target.getTag() == 991 || target.getTag() == 992 || target.getTag() == 993 || target.getTag() == 994)
                {
                    return false;
                }

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    if(isMoving){
                        return;
                    }
                    sp_face3.stopAllActions();
                    sp_face4.stopAllActions();
                    isMoving = true;
                    z1.setVisible(false);
                    z2.setVisible(false);
                    z3.setVisible(false);
                    cc.eventManager.removeListeners(sp_bucket);
                    cc.eventManager.removeListeners(sp_hammer);
                    cc.eventManager.removeListeners(sp_tv);
                    cc.eventManager.removeListeners(sp_Clock);
                    cc.eventManager.removeListeners(z1);
                    cc.eventManager.removeListeners(z2);
                    cc.eventManager.removeListeners(z3);
                    cc.eventManager.removeListeners(sp_man);
                    pre_Tag = target.getTag();
                    if(target.getTag() == 1){
                        sp_face3.setVisible(false);
                        sp_face4.setVisible(false);
                        //Clock's operation
                        clock_needles2.stopAllActions();
                        clock_needles1.stopAllActions();
                        stopAllEffect();
                        playEffect(res.F12_CLOCK_SOUNDS);
                        sp_face1.setOpacity(0);
                        sp_Clock.setOpacity(0);
                        var n1 = clock_needles1.getRotation();
                        var n2 = clock_needles2.getRotation();

                        sp_Clock2.setOpacity(255);


                        clock_needles11=new cc.Sprite("#k_12_clock_shizhen.png");
                        clock_needles11.attr({
                            x:sp_Clock2.getBoundingBox().width/2,
                            y:sp_Clock2.getBoundingBox().height/2
                        });

                        clock_needles22=new cc.Sprite("#k_12_clock_miaozhen.png");
                        clock_needles22.attr({
                            x:sp_Clock2.getBoundingBox().width/2,
                            y:sp_Clock2.getBoundingBox().height/2
                        });
                        clock_needles22.setRotation(n2);
                        clock_needles11.setRotation(n1);



                        sp_Clock2.addChild(clock_needles11);
                        sp_Clock2.addChild(clock_needles22);
                        var rt1 = cc.RotateTo.create(0.1,-20);
                        var rt2 = cc.RotateTo.create(0.1,20);
                        var seq = cc.Sequence.create(rt1,rt2);
                        sp_Clock2.runAction(cc.Repeat.create(seq,6));


                        var action = cc.Sequence.create(cc.DelayTime.create(0.1  * 6 +0.1),cc.CallFunc.create(function(){


                            playEffect(res.F16_FallDown);

                        }.bind(this),this),cc.DelayTime.create(0.1  * 6 +0.1),cc.CallFunc.create(function(){
                            target.parent.def_State();

                            sp_Clock2.setRotation(0);

                        }.bind(this),this));
                        sp_Clock2.runAction(action);


                        //man's operation
//                        var frame = cc.SpriteFrame.create(res.k_12_man3_png,cc.rect(0,0,148,228));
                        sp_man.setSpriteFrame("k_12_man3.png");

                        var mt1 = cc.MoveTo.create(0.1,cc.p(man_Position.x-10,man_Position.y));
                        var mt2 = cc.MoveTo.create(0.1,cc.p(man_Position.x+10,man_Position.y));
                        var seq2 = cc.Sequence.create(mt1,mt2);
                        sp_man.runAction(cc.Repeat.create(seq2,6));

                    }else if(target.getTag() == 2){
                        //water's operation
                        stopAllEffect();

                        sp_bucket.setOpacity(0);
                        water1 = cc.Sprite.create("#k_12_water.png");
                        water1.setPosition(cc.p(size.width/2+150,400));
                        water1.setOpacity(0);
                        target.parent.addChild(water1,4);

                        water2 = cc.Sprite.create("#k_12_water2.png");
                        water2.setPosition(cc.p(size.width/2+20,300));
                        water2.setOpacity(0);
                        target.parent.addChild(water2,4);


                        sp_bucket2 = cc.Sprite.create("#k_12_tong.png");
                        sp_bucket2.setPosition(cc.p(size.width/2+250,500));
                        sp_bucket2.setOpacity(255);
                        target.parent.addChild(sp_bucket2,4);


                        var seq = cc.Sequence.create(cc.CallFunc.create(function(){
                                var rt = cc.RotateTo.create(0.4,-90);
                                sp_bucket2.runAction(rt);
                            }),  cc.DelayTime.create(0.3),cc.CallFunc.create(function(){
                                playEffect(res.F12_WATER_SOUNDS);

                                water1.setOpacity(255);
                                water2.setOpacity(0);
                                sp_bucket2.setOpacity(0);


                            }.bind(this),this),
                            cc.DelayTime.create(0.5),cc.CallFunc.create(function(){
                                sp_face3.setVisible(false);
                                sp_face4.setVisible(false);
                                water1.setOpacity(0);
                                water2.setOpacity(255);
                                var tt = cc.FadeOut.create(3);
                                water2.runAction(tt);
                                sp_face1.setOpacity(0);
                                //man's operation
//                                var frame = cc.SpriteFrame.create(k_12_man2_png,cc.rect(0,0,148,228));
                                sp_man.setSpriteFrame("k_12_man7.png");

                            }.bind(this),this),
                            cc.DelayTime.create(0.3),cc.CallFunc.create(function(){
                                playEffect(res.F16_FallDown);
                                var mt1 = cc.MoveTo.create(0.1,cc.p(man_Position.x-5,man_Position.y));
                                var mt2 = cc.MoveTo.create(0.1,cc.p(man_Position.x+5,man_Position.y));
                                var seq2 = cc.Sequence.create(mt1,mt2);
                                sp_man.runAction(cc.Repeat.create(seq2,6));
                            }.bind(this),this)
                        );
                        water1.runAction(seq);


                        var seq1 = cc.Sequence.create(cc.DelayTime.create(0.1 * 2 * 6 +1.3 +0.1),cc.CallFunc.create(function(){
                            target.parent.def_State();
                        }.bind(this),this));
                        sp_man.runAction(seq1);
                    }else if(pre_Tag == 3){
                        stopAllEffect();

                        sp_hammer.setOpacity(0);
                        sp_hammer2.setOpacity(255);
                        var mb = cc.MoveTo.create(0.2,cc.p(hammer2_Position.x+40,hammer2_Position.y));
                        var rt = cc.RotateBy.create(0.2,30);
                        var spawn = cc.Spawn.create(mb,rt);
                        var seq = cc.Sequence.create(cc.DelayTime.create(0.1),cc.CallFunc.create(function(){

                        }),spawn,cc.DelayTime.create(0.1),cc.CallFunc.create(function(){
                            sp_hammer2.setOpacity(0);
                            sp_face1.setOpacity(0);
                            playEffect(res.F12_HIT_SOUNDS);
                            sp_face3.setVisible(false);
                            sp_face4.setVisible(false);
//                            var frame = cc.SpriteFrame.create(res.k_12_man4_png,cc.rect(0,0,148,228));
                            sp_man.setSpriteFrame("k_12_man4.png");
                        }),cc.DelayTime.create(0.3),cc.CallFunc.create(function(){
                            var sp = cc.Sprite.create("#k_12_man4_yun1.png");
                            sp.setPosition(cc.p(87,240));
                            sp_man.addChild(sp);
                            playEffect(res.F12_DIZZY_SOUNDS);
                            var animFrames=[];
                            for(var i=1;i<=2;i++){
                                var frame=cc.spriteFrameCache.getSpriteFrame("k_12_man4_yun"+i+".png");
                                animFrames.push(frame)
                            }
                            var animation=new cc.Animation(animFrames,0.2);
                            var animate=new cc.Animate(animation);
                            sp.runAction(cc.Repeat.create(animate,3));
                        }),cc.DelayTime.create(0.5),cc.CallFunc.create(function(){
                            target.parent.def_State();
                            sp_hammer2.setPosition(hammer2_Position);
                            sp_hammer2.setRotation(-40);
                        }));
                        sp_hammer2.runAction(seq);
                    }else if(pre_Tag == 4){
                        stopAllEffect();
                        playEffect(res.F12_GHOST_SOUNDS);


                        wire.setSpriteFrame("k_12_tv_2.png")
                        var lighting = new cc.Sprite("#k_12_tv_3.png");
                        lighting.setPosition(cc.p(80,35));
                        wire.addChild(lighting);

                        var seq = cc.Sequence.create(cc.DelayTime.create(0.4),cc.CallFunc.create(function(){
                            lighting.setVisible(false);
                            var tv_Content = new cc.Sprite("#k_12_tv_4.png");
                            tv_Content.setPosition(cc.p(75,85));
                            sp_tv.addChild(tv_Content);
                            var animFrame=["k_12_tv_4.png","k_12_tv_5.png","k_12_tv_4.png","k_12_tv_5.png","k_12_tv_6.png","k_12_tv_7.png","k_12_tv_6.png","k_12_tv_7.png","k_12_tv_6.png","k_12_tv_7.png"];
                            var animFrames=[];
                            for(var i=0;i<animFrame.length;i++){
                                var Emenyframe=cc.spriteFrameCache.getSpriteFrame(animFrame[i]);
                                animFrames.push(Emenyframe)
                            }
                            var animation=new cc.Animation(animFrames,0.2);
                            var animate=new cc.Animate(animation);
                            tv_Content.runAction(animate);

                        },this),cc.DelayTime.create(1),cc.CallFunc.create(function(){
                            sp_man.setSpriteFrame("k_12_man3.png");
                            sp_face3.setVisible(false);
                            sp_face4.setVisible(false);
                            playEffect(res.F16_FallDown);
                            var mt1 = cc.MoveTo.create(0.1,cc.p(man_Position.x-10,man_Position.y));
                            var mt2 = cc.MoveTo.create(0.1,cc.p(man_Position.x+10,man_Position.y));
                            var seq2 = cc.Sequence.create(mt1,mt2);
                            sp_man.runAction(cc.Repeat.create(seq2,6));
                        },this),cc.DelayTime.create(0.1*2*6+0.5),cc.CallFunc.create(function(){
                            target.parent.def_State();
                        },this));
                        sp_man.runAction(seq);

                    };


                }

            }
        });

        cc.eventManager.addListener(listener1, sp_Clock);
        cc.eventManager.addListener(listener1.clone(), sp_bucket);
        cc.eventManager.addListener(listener1.clone(), sp_hammer);
        cc.eventManager.addListener(listener1.clone(), sp_tv);
        cc.eventManager.addListener(listener1.clone(), z1);
        cc.eventManager.addListener(listener1.clone(), z2);
        cc.eventManager.addListener(listener1.clone(), z3);
        cc.eventManager.addListener(listener1.clone(), sp_man);

    },

    //显示界面
    def_State : function (){


        if (pre_Tag == 1){
            sp_man.setPosition(man_Position);
            isMoving = false;
            sp_Clock2.setOpacity(0);
            sp_Clock.setOpacity(255);
            var seq = cc.Sequence.create(cc.DelayTime.create(1),cc.CallFunc.create(function(){

                ShowFailedPanel(this.getParent(),12,3);
            },this));
            this.runAction(seq);
        }else if(pre_Tag == 2){
            sp_man.setPosition(man_Position);
            isMoving = false;
//            sp_bucket.setOpacity(255);
//            water1.removeFromParent();
//            water2.removeFromParent();
            var seq = cc.Sequence.create(cc.DelayTime.create(1),cc.CallFunc.create(function(){

                ShowFailedPanel(this.getParent(),12,2);
            },this));
            this.runAction(seq);
        }
        else if(pre_Tag == 3){
            sp_man.setPosition(man_Position);
            isMoving = false;
//            sp_hammer.setOpacity(255);
            sp_hammer2.setOpacity(0);
            var seq = cc.Sequence.create(cc.DelayTime.create(1),cc.CallFunc.create(function(){

                ShowFaildPPanel(this.getParent(),12,0);
            },this));
            this.runAction(seq);
        }else if(pre_Tag == 4){

            isMoving = false;
            var seq = cc.Sequence.create(cc.DelayTime.create(1),cc.CallFunc.create(function(){
                //显示失败的界面
                ShowFailedPanel(this.getParent(),12,1);

            },this));
            this.runAction(seq);
        };

    }


});

var AwakeScene = cc.Scene.extend({

    onEnter : function() {
        this._super();
        var layer = new AwakeLayer();
        this.addChild(layer);


        var level = 12;
        var mainUILayer = new MainUILayer(level);
        this.addChild(mainUILayer, 12);
    },
    pauseTheGame : function () {
        //pause the game
//        stopAllEffect();

        cc.log("pause the game");
    },
    resumeTheGame :function () {
        //resume the game
        cc.log("resume the game");
    }

});