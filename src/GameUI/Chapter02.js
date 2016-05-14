/**
 * Created by George on 16/5/12.
 */

var FlyLayer=cc.Layer.extend({
    die_type:0,
    size:null,
    man:null,
    mz:null,
    mz_shadow:null,
    qiqiu1:null,
    qiqiu2:null,
    click_flag:true,
    shakeCnt:0,
    rotate_flag:false,
    shake_flag:true,
    shakeCount:0,
    Time:0,
    _lines:[],
    talk1:null,
    talk2:null,
    talk3:null,
    plane:null,
    bird:null,
    ctor:function(){

        this._super();

        var testJSB = new JSB.JSBinding();
        testJSB.retain();
        testJSB.setSreenRotae(0);
        testJSB.release();

        this.size=cc.director.getWinSize();

        //添加背景
        for(var i=0;i<3;i++){
            var bg=new cc.Sprite("#com_bg_01.png");
            bg.attr({
                x:this.size.width/2,
                y:this.size.height/2+(this.size.height-1)*i
            });
            if(i==1){
                bg.scaleY=-1;
            }
            this.addChild(bg,-1);
        }

        var bg2=new cc.Sprite("#com_grassland1.png");
        bg2.attr({
            anchorX:0.5,
            anchorY:0,
            x:this.size.width/2,
            y:0
        });
        this.addChild(bg2,-1);

        //添加树
        var tree=new cc.Sprite("#k_02_tree.png");
        tree.attr({
            anchorY:0,
            x:this.size.width/2-450,
            y:0
        });
        this.addChild(tree,10);

        var tree2=new cc.Sprite("#k_02_tree.png");
        tree2.attr({
            anchorY:0,
            x:this.size.width/2+450,
            y:0,
            scaleX:-1
        });
        this.addChild(tree2,10);

        //添加屎
        var shit=new cc.Sprite("#k_02_shit.png");
        shit.attr({
            x:this.size.width/2-220,
            y:105
        });
        this.addChild(shit,0);

        //添加仙人掌
        var cactus=new cc.Sprite("#k_02_cactus.png");
        cactus.attr({
            x:this.size.width/2+20,
            y:120
        });
        this.addChild(cactus,0);

        //添加云
        var cloud=new cc.Sprite("#com_cloud.png");
        cloud.attr({
            x:this.size.width/2-250,
            y:550
        });
        cloud.runAction(cc.sequence(cc.moveTo(80,cc.p(-cloud.getBoundingBox().width/2,550)),cc.place(cc.p(this.size.width+cloud.getBoundingBox().width/2,550))).repeatForever());
        this.addChild(cloud,0);

        var cloud2=new cc.Sprite("#com_cloud.png");
        cloud2.attr({
            x:this.size.width/2+250,
            y:500
        });
        cloud2.runAction(cc.sequence(cc.moveTo(90,cc.p(-cloud2.getBoundingBox().width/2,500)),cc.place(cc.p(this.size.width+cloud2.getBoundingBox().width/2,500))).repeatForever());
        this.addChild(cloud2,0);

        var cloud3=new cc.Sprite("#com_cloud.png");
        cloud3.attr({
            x:this.size.width/2+180,
            y:700
        });
        cloud3.runAction(cc.sequence(cc.moveTo(90,cc.p(-cloud3.getBoundingBox().width/2,700)),cc.place(cc.p(this.size.width+cloud3.getBoundingBox().width/2,700))).repeatForever());
        this.addChild(cloud3,0);

        var cloud4=new cc.Sprite("#com_cloud.png");
        cloud4.attr({
            x:this.size.width/2+300,
            y:900
        });
        cloud4.runAction(cc.sequence(cc.moveTo(90,cc.p(-cloud4.getBoundingBox().width/2,900)),cc.place(cc.p(this.size.width+cloud4.getBoundingBox().width/2,900))).repeatForever());
        this.addChild(cloud4,0);

        var cloud5=new cc.Sprite("#com_cloud.png");
        cloud5.attr({
            x:this.size.width/2-180,
            y:1200
        });
        cloud5.runAction(cc.sequence(cc.moveTo(90,cc.p(-cloud5.getBoundingBox().width/2,1200)),cc.place(cc.p(this.size.width+cloud5.getBoundingBox().width/2,1200))).repeatForever());
        this.addChild(cloud5,0);

        //初始化
        this.init();

        //添加人物
        this.man=new cc.Sprite("#k_02_man_stand_1.png");
        this.man.attr({
            x:this.size.width/2-160,
            y:60,
            anchorX:0,
            anchorY:0
        });
        this.addChild(this.man,2);


        //添加说明
        this.talk1=new cc.Sprite("#k_02_talk1.png");
        this.talk1.attr({
            x:5,
            y:160,
            opacity:0
        });
        this.man.addChild(this.talk1);

        this.talk2=new cc.Sprite("#k_02_talk2.png");
        this.talk2.attr({
            x:-10,
            y:175,
            opacity:0
        });
        this.man.addChild(this.talk2);

        this.talk3=new cc.Sprite("#k_02_talk3.png");
        this.talk3.attr({
            x:-60,
            y:220,
            opacity:0
        });
        this.man.addChild(this.talk3);
        this.manStand();

        //添加气球1
        this.qiqiu1=new cc.Sprite("#k_02_balloon1.png");
        this.qiqiu1.attr({
            x:this.size.width/2+88,
            y:115,
            anchorX:0,
            anchorY:0
        });
        this.qiqiu1.setTag(2);
        this.addChild(this.qiqiu1,2);

        //添加气球2
        this.qiqiu2=new cc.Sprite("#k_02_balloon2.png");
        this.qiqiu2.attr({
            x:this.size.width/2+220,
            y:125,
            anchorX:1,
            anchorY:0
        });
        this.qiqiu2.setTag(3);
        this.addChild(this.qiqiu2,2);

        var rotate=cc.rotateBy(1.2 ,-5);
        var rotate2=rotate.reverse();
        var repeatRotate=cc.sequence(rotate,rotate2).repeatForever();
        this.qiqiu1.runAction(repeatRotate);
        this.qiqiu2.runAction(repeatRotate.clone());

        //添加木桩
        this.mz=new cc.Sprite("#k_02_wood.png");
        this.mz.attr({
            x:this.size.width/2+150,
            y:100,
            scale:0.8
        });
        this.mz.setTag(1);
        this.addChild(this.mz,2);

        //木桩阴影
        this.mz_shadow=new cc.Sprite("#k_02_wood_shadow.png");
        this.mz_shadow.attr({
            x:this.size.width/2+150,
            y:80,
            scale:0.8
        });
        this.addChild(this.mz_shadow,0);

        //添加线
        for(var i=0;i<2;i++){
            var line=new cc.Sprite("#k_02_line.png");
            line.attr({
                x:this.size.width/2+145,
                y:100+i*7,
                scale:0.8
            });
            this.addChild(line,2);
            this._lines.push(line);
        }

        var _this=this;

        //定义事件
        var listener=cc.EventListener.create({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan:function(touch,event){
                var target=event.getCurrentTarget();
                var location=target.convertToNodeSpace(touch.getLocation());
                var s=target.getBoundingBox();
                var rect=cc.rect(0,0, s.width, s.height);


                if(_this.click_flag==true){
                    if(cc.rectContainsPoint(rect,location)){
                        return true;
                    }
                }


                return false;

            },
            onTouchMoved:function(touch,event){
                var target=event.getCurrentTarget();
                var delta=touch.getDelta();
                target.x+=delta.x;
                target.y+=delta.y;

                if(target.getTag()==1){
                    _this.mz_shadow.setVisible(false);
                    if(_this.die_type!=1){
                        _this.qiqiu1.x+=delta.x;
                        _this.qiqiu1.y+=delta.y;
                    }
                    if(_this.die_type!=2){
                        _this.qiqiu2.x+=delta.x;
                        _this.qiqiu2.y+=delta.y;
                    }
                    _this._lines[0].x+=delta.x;
                    _this._lines[0].y+=delta.y;
                    _this._lines[1].x+=delta.x;
                    _this._lines[1].y+=delta.y;
                }
            },
            onTouchEnded:function(touch,event){
                cc.log("touch end in f02!");
                var target=event.getCurrentTarget();
                var rect=_this.man.getBoundingBox();

                if(target.getTag()==1){
                    if(cc.rectIntersectsRect(rect,target.getBoundingBox()) && _this.click_flag==true){
                        _this.click_flag=false;
                        target.setVisible(false);
                        _this._lines[0].setVisible(false);
                        _this._lines[1].setVisible(false);
                        _this.qiqiu1.stopAllActions();
                        _this.qiqiu2.stopAllActions();

                        _this.qiqiu1.runAction(cc.moveTo(0.1, cc.p(_this.size.width/2 -134, 180)));
                        _this.qiqiu2.runAction(cc.moveTo(0.1, cc.p(_this.size.width/2 -12, 190)));
                        _this.manUp_2();
                    }else {
                        target.stopAllActions();
                        _this._lines[0].stopAllActions();
                        _this._lines[1].stopAllActions();

                        target.runAction(cc.sequence(cc.moveTo(0.2, cc.p(_this.size.width/2 +150, 100)),cc.callFunc(function(){
                            _this.mz_shadow.setVisible(true);
                        },target)));
                        _this._lines[0].runAction(cc.moveTo(0.2, cc.p(_this.size.width/2 + 145, 100)));
                        _this._lines[1].runAction(cc.moveTo(0.2, cc.p(_this.size.width/2 + 145, 107)));
                        if(_this.die_type!=1){
                            _this.qiqiu1.stopAllActions();
                            _this.qiqiu1.runAction(cc.moveTo(0.2, cc.p(_this.size.width/2 + 88, 115)));
                        }

                        if(_this.die_type!=2){
                            _this.qiqiu2.stopAllActions();
                            _this.qiqiu2.runAction(cc.moveTo(0.2, cc.p(_this.size.width/2 + 220, 125)));
                        }
                    }
                }else if(target.getTag()==2){
                    if(cc.rectIntersectsRect(rect,target.getBoundingBox()) && _this.click_flag==true){
                        _this.click_flag=false;
                        _this.die_type=1;
                        target.stopAllActions();

                        target.runAction(cc.spawn(cc.moveTo(0.2, cc.p(_this.size.width/2 -135, 210)),cc.rotateTo(0.2,30)));
                        _this.manUp_1(1);
                    }else {
                        target.stopAllActions();

                        target.runAction(cc.moveTo(0.2, cc.p(_this.size.width/2 + 88, 115)));
                    }
                }else if(target.getTag()==3){
                    if(cc.rectIntersectsRect(rect,target.getBoundingBox()) && _this.click_flag==true){
                        _this.click_flag=false;
                        _this.die_type=2;
                        target.stopAllActions();

                        target.runAction(cc.moveTo(0.2, cc.p(_this.size.width/2 -14, 195)));
                        _this.manUp_1(2);
                    }else {
                        target.stopAllActions();

                        target.runAction(cc.moveTo(0.2, cc.p(_this.size.width/2 + 220, 125)));
                    }
                }

            }
        });

        //添加事件管理器
        cc.eventManager.addListener(listener,this.mz);
        cc.eventManager.addListener(listener.clone(),this.qiqiu1);
        cc.eventManager.addListener(listener.clone(),this.qiqiu2);

        //添加加速计事件
        cc.inputManager.setAccelerometerInterval(1/30);
        cc.inputManager.setAccelerometerEnabled(true);
        cc.eventManager.addListener({
            event:cc.EventListener.ACCELERATION,
            callback:function(acc,event){
                var target=event.getCurrentTarget();
                var x=acc.x;
                var y=acc.y;
                var z=acc.z;
                var all=x*x+y*y+z*z;



                //当Y轴大于0.9的时候，一般处于反转状态
                //当Y轴大于0.9且达到一定时间后，从而达到旋转，否则把等待过的时间清零

                if(y>0.75){
                    target.unscheduleAllCallbacks();
                    target.Time++;
                    if(target.Time>=8){
                        target.rotate_flag=true;
                    }
                }else if(y<0.1){
                    if(target.rotate_flag==true){
                        target.schedule(function(){
                            target.Time=0;
                            target.shakeCount=0;
                            target.rotate_flag=false;
                        },0.2);
                    }
                }else{
                    target.Time=0;
                }

                //判断当前是否达成了旋转和是否能摇动
                if(target.rotate_flag==true && target.shake_flag==true){
                    if(all<1.2){
                        if(target.shakeCnt>2){
                            target.shakeCount++;
                            if(target.shakeCount>=2){    //摇动次数达到3次或以上就胜利
                                target.gameWin();
                                return;
                            }
                        }
                        target.shakeCnt=0;
                    }else if(all>1.65){
                        target.shakeCnt++;
                    }
                }else{
                    target.shakeCnt=0
                }
            }
        },this);

        this.showTalk();

    },
    init:function(){
        this._lines=[];
        this.click_flag=true;
        this.shakeCnt= 0;
        this.rotate_flag=false;
        this.shake_flag=true;
        this.shakeCount= 0;
        this.Time=0 ;
    },
    showTalk:function(){
        this.talk1.runAction(cc.sequence(cc.fadeIn(0.2),cc.callFunc(function(){
            this.talk2.runAction(cc.sequence(cc.fadeIn(0.2),cc.callFunc(function(){
                this.talk3.runAction(cc.fadeIn(0.2));
            },this)));
        },this)));
    },
    manUp:function(){

        //对话框消失
        this.talk1.stopAllActions();
        this.talk2.stopAllActions();
        this.talk3.stopAllActions();
        this.talk1.runAction(cc.fadeOut(0.15));
        this.talk2.runAction(cc.fadeOut(0.15));
        this.talk3.runAction(cc.fadeOut(0.15));
        this.man.stopAllActions();
        this.man.setSpriteFrame("k_02_man_up.png");
    },
    manStand:function(){
        var animFrames=[];
        for(var i=1;i<=2;i++){
            var frame=cc.spriteFrameCache.getSpriteFrame("k_02_man_stand_"+i+".png");
            animFrames.push(frame)
        }
        var animation=new cc.Animation(animFrames,0.3);
        var animate=new cc.Animate(animation);
        this.man.runAction(animate.repeatForever());
    },
    manUp_1:function(num){
        this.manUp();
        var move=cc.moveBy(2,cc.p(140,230));
        if(num==1){
            this.man.runAction(cc.sequence(move,cc.callFunc(function(){this.lost_1(1);},this)));
            this.qiqiu1.runAction(move.clone());
        }else if(num==2){
            this.man.runAction(cc.sequence(move,cc.callFunc(function(){this.lost_1(2);},this)));
            this.qiqiu2.runAction(move.clone());
        }
        this.addBird();
        this.bird.runAction(cc.sequence(cc.moveBy(5.5,cc.p(-(this.size.width+this.bird.width*2),0)),cc.callFunc(function(){
            this.bird.removeFromParent();
        },this)));
    },
    manUp_2:function(){
        this.manUp();
        var move=cc.moveBy(2,cc.p(-110,500));
        this.man.runAction(cc.sequence(move,cc.callFunc(this.lost_2,this)));
        this.qiqiu1.runAction(move.clone());
        this.qiqiu2.runAction(move.clone());
        this.runAction(cc.moveBy(2,cc.p(0,-350)));

        this.addPlane();
        this.runAction(cc.sequence(cc.delayTime(0.65),cc.callFunc(function(){
            playEffect(res.F02_PLANE_SOUNDS);
        },this)));
        this.plane.runAction(cc.sequence(cc.moveBy(4.3,cc.p(-(this.size.width+this.plane.width*2),0)),cc.callFunc(function(){
            this.plane.removeFromParent();
        },this)));
    },
    addBird:function(){
        //添加乌鸦
        this.bird=new cc.Sprite("#k_02_bird_01.png");
        this.bird.attr({
            x:this.size.width+this.bird.width,
            y:530
        });
        this.addChild(this.bird,1);

        var animFrames=[];
        for(var i=1;i<=6;i++){
            var frame=cc.spriteFrameCache.getSpriteFrame("k_02_bird_0"+i+".png");
            animFrames.push(frame);
        }
        var animation=new cc.Animation(animFrames,0.3);
        var animate=new cc.Animate(animation);
        this.bird.runAction(animate.repeatForever());
    },
    addPlane:function(){
        this.plane=new cc.Sprite("#k_02_plane.png");
        this.plane.attr({
            x:this.size.width+this.plane.width,
            y:820
        });
        this.addChild(this.plane,1);

        var thief=new cc.Sprite("#k_15_progress_thief.png");
        thief.attr({
            x:110,
            y:115
        });
        thief.runAction(cc.sequence(cc.rotateBy(0.25,-30), cc.rotateBy(0.25,30)).repeatForever());
        this.plane.addChild(thief);
    },
    lost_1:function(num){
        this.rotate_flag=false;
        this.shake_flag=false;
        this.click_flag=false;
        var animFrames=[];
        for(var i=1;i<=2;i++){
            var frame=cc.spriteFrameCache.getSpriteFrame("com_boom_0"+i+".png");
            animFrames.push(frame);
        }
        var animation=new cc.Animation(animFrames,0.2);
        var animate=new cc.Animate(animation);

        var position;

        if(num==1){
            this.qiqiu1.setSpriteFrame("com_boom_01.png");
            position=cc.pAdd(this.qiqiu1.getBoundingBox(),cc.p(-55,288));
            this.qiqiu1.attr({
                x:position.x,
                y:position.y,
                scale:0.5
            });
            this.qiqiu1.runAction(new cc.Sequence(animate,new cc.CallFunc(function(){
                this.qiqiu1.setVisible(false);
            },this)));
        }else if(num==2){
            this.qiqiu2.setSpriteFrame("com_boom_01.png");
            position=cc.pAdd(this.qiqiu2.getBoundingBox(),cc.p(0,10));
            this.qiqiu2.attr({
                x:this.size.width/2+220,
                y:position.y,
                scale:0.5
            });
            this.qiqiu2.runAction(new cc.Sequence(animate,new cc.CallFunc(function(){
                this.qiqiu2.setVisible(false);
            },this)));
        }

        playEffect(res.F02_QIQIU_SOUNDS);

        playEffect(res.F09_JINGXIA);
        this.man.setSpriteFrame("k_02_man_down.png");
        this.man.attr({
            x:this.man.getBoundingBox().x-30,
            y:this.man.getBoundingBox().y+25
        });
        this.man.runAction(cc.sequence(cc.delayTime(0.3),cc.moveBy(0.5,cc.p(0,-200)),cc.callFunc(function(){
            this.man.setSpriteFrame("k_02_man_down2.png");
            playEffect(res.F02_SCREAM_SOUNDS);
        },this),cc.delayTime(1),cc.callFunc(function(){
            ShowFaildPPanel(this.getParent(),2);
        },this)));
    },
    lost_2:function(){
        this.rotate_flag=false;
        this.shake_flag=false;
        this.click_flag=false;
        var animFrames=[];
        for(var i=1;i<=2;i++){
            var frame=cc.spriteFrameCache.getSpriteFrame("com_boom_0"+i+".png");
            animFrames.push(frame);
        }
        var animation=new cc.Animation(animFrames,0.2);
        var animate=new cc.Animate(animation);

        this.qiqiu1.setSpriteFrame("com_boom_01.png");
        this.qiqiu1.scale=0.5;
        this.qiqiu1.runAction(cc.sequence(animate,cc.callFunc(function(){
            this.qiqiu1.setVisible(false);
        },this)));


        this.qiqiu2.setSpriteFrame("com_boom_01.png");
        this.qiqiu2.scale=0.5;
        this.qiqiu2.runAction(cc.sequence(animate.clone(),cc.callFunc(function(){
            this.qiqiu2.setVisible(false);
        },this)));



        playEffect(res.F02_QIQIU_SOUNDS);

        playEffect(res.F09_JINGXIA);
        this.runAction(cc.sequence(cc.delayTime(0.1),cc.callFunc(function(){
            playEffect(res.F02_QIQIU_SOUNDS);
        },this)));


        this.man.setSpriteFrame("k_02_man_down.png");
        this.man.attr({
            x:this.man.getBoundingBox().x-35,
            y:this.man.getBoundingBox().y+28
        });
        this.man.runAction(cc.sequence(cc.delayTime(0.3),cc.moveBy(0.6,cc.p(0,-490)),cc.callFunc(function(){
            this.man.setSpriteFrame("k_02_man_down2.png");
            playEffect(res.F02_SCREAM_SOUNDS);
        },this),cc.delayTime(1),cc.callFunc(function(){
            ShowFaildPPanel(this.getParent(),2,1);
        },this)));
        this.runAction(cc.sequence(cc.delayTime(0.3),cc.moveBy(0.6,cc.p(0,350))));
    },
    gameWin:function(){

        //对话框消失
        this.talk1.stopAllActions();
        this.talk2.stopAllActions();
        this.talk3.stopAllActions();
        this.talk1.runAction(cc.fadeOut(0.15));
        this.talk2.runAction(cc.fadeOut(0.15));
        this.talk3.runAction(cc.fadeOut(0.15));

        this.rotate_flag=false;
        this.shake_flag=false;
        this.click_flag=false;
        this.man.stopAllActions();

        playEffect(res.F22_XIAO,true);

        this.man.runAction(cc.sequence(cc.moveBy(2,cc.p(0,1050)),cc.callFunc(function(){
            ShowSuccessPanel(this.getParent(),2);
        },this)));
        this.runAction(cc.moveBy(2,cc.p(0,-900)));

        //添加动画
        var animFrames=[];
        for(var i=1;i<=2;i++){
            var frame=cc.spriteFrameCache.getSpriteFrame("k_02_man_fly_"+i+".png");
            animFrames.push(frame)
        }
        var animation=new cc.Animation(animFrames,0.1);
        var animate=new cc.Animate(animation);
        this.man.runAction(animate.repeatForever());

    }
});

var FlyScene=cc.Scene.extend({
    _level : null,
    ctor:function() {
        this._super();
        var layer = new FlyLayer();
        this.addChild(layer);
        //by torney
        var level = 2;
        var mainUILayer = new MainUILayer(level);
        this.addChild(mainUILayer, 2);
    },
    pauseTheGame : function () {
        //pause the game
        cc.log("pause the game");
    },
    resumeTheGame :function () {
        //resume the game
        cc.log("resume the game");
    }
});
