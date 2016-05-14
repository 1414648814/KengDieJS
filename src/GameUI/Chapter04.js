/**
 * Created by George on 16/5/12.
 */
var NotwifiLayer = cc.Layer.extend({

    Godfoot:null,
//    die:null,
    man:null,
    face:null,
    Godgirl:null,
    hill:null,
    God:null,
    wenzi:null,
    cloudmove1:null,
    cloudmove2:null,
    cloudmove3:null,
    cloudmove4:null,
    bg:null,
    house:null,
    housewifi:null,

    ctor : function()
    {
        this._super();

        this.size = cc.director.getWinSize();


        //初始化
        this.init();
        //添加背景
        var bg = new cc.Sprite("#com_bg_01.png");
        bg.attr({
            x:this.size.width/2,
            y:this.size.height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        this.addChild(bg);
        this.bg = bg;
        var overbg = new cc.Sprite("#com_bg_01.png");
        overbg.attr({
            x:this.size.width/2,
            y:this.size.height * 1.5 - 1,
            anchorX:0.5,
            anchorY:0.5,
            scaleY:-1
        });

        this.addChild(overbg);
        //很多云1
        var  cloud1X= [this.size.width/2 - 203, this.size.width/2 + 300, this.size.width/2 - 120];
        var  cloud1Y= [this.size.height/2 +430, this.size.height/2 +624, this.size.height/2 + 460];
        for (var i = 0; i < cloud1X.length; i++) {
            var cloud1 = new cc.Sprite("#k_04_cloud1.png");
            cloud1.attr({
                x:cloud1X[i],
                y:cloud1Y[i],
                anchorX:0.5,
                anchorY:0.5
            });
            this.addChild(cloud1);
        }
        //很多云2
        var  cloud2X= [this.size.width/2 - 360, this.size.width/2 - 82, this.size.width/2 + 304];
        var  cloud2Y= [this.size.height/2 + 460, this.size.height/2 + 422, this.size.height/2 + 373];
        for (var i = 0; i < cloud2X.length; i++) {
            var cloud2 = new cc.Sprite("#k_04_cloud2.png");
            cloud2.attr({
                x:cloud2X[i],
                y:cloud2Y[i],
                anchorX:0.5,
                anchorY:0.5
            });
            this.addChild(cloud2);
        }
        //很多云3
        var  cloud3X= [this.size.width/2 - 347, this.size.width/2 + 170, this.size.width/2 + 257];
        var  cloud3Y= [this.size.height/2 + 381, this.size.height/2 + 600, this.size.height/2 + 480];
        var  cloud3scale = [1, 0.6, 0.6];
        for (var i = 0; i < cloud3X.length; i++) {
            var cloud3 = new cc.Sprite("#k_04_cloud3.png");
            cloud3.attr({
                x:cloud3X[i],
                y:cloud3Y[i],
                anchorX:0.5,
                anchorY:0.5,
                scale:cloud3scale[i]
            });
            this.addChild(cloud3);
        }
        //很多云4
        var  cloud4X= [this.size.width/2 + 320, this.size.width/2 + 260, this.size.width/2 - 300];
        var  cloud4Y= [this.size.height/2 + 720, this.size.height/2 + 520, this.size.height/2 + 372];
        for (var i = 0; i < cloud4X.length; i++) {
            var cloud4 = new cc.Sprite("#k_04_cloud4.png");
            cloud4.attr({
                x:cloud4X[i],
                y:cloud4Y[i],
                anchorX:0.5,
                anchorY:0.5
            });
            this.addChild(cloud4);
        }
        //后山
        var hill = new cc.Sprite("#k_04_hill.png");
        hill.attr({
            x:this.size.width/2 + 90,
            y:this.size.height/2 - 22,
            anchorX:0.5,
            anchorY:0.5
        });
        this.addChild(hill);
        this.hill = hill;
        //移动的云
        var cloudmove1 = new cc.Sprite("#k_04_cloud1.png");
        cloudmove1.attr({
            x:this.size.width/2 + 60,
            y:this.size.height/2 + 160,
            anchorX:0.5,
            anchorY:0.5
        });
        this.addChild(cloudmove1);
        this.cloudmove1 = cloudmove1;
        var cloudmove2 = new cc.Sprite("#k_04_cloud2.png");
        cloudmove2.attr({
            x:this.size.width/2 - 180,
            y:this.size.height/2 + 120,
            anchorX:0.5,
            anchorY:0.5
        });
        this.addChild(cloudmove2);
        this.cloudmove2 = cloudmove2;
        var cloudmove3 = new cc.Sprite("#k_04_cloud3.png");
        cloudmove3.attr({
            x:this.size.width/2 + 200,
            y:this.size.height/2 + 180,
            anchorX:0.5,
            anchorY:0.5
        });
        this.addChild(cloudmove3);
        this.cloudmove3 = cloudmove3;
        var cloudmove4 = new cc.Sprite("#k_04_cloud4.png");
        cloudmove4.attr({
            x:this.size.width/2 - 200,
            y:this.size.height/2 + 80,
            anchorX:0.5,
            anchorY:0.5
        });
        this.addChild(cloudmove4);
        this.cloudmove4 = cloudmove4;
        //wifi发射塔
        var town = new cc.Sprite("#k_04_town.png");
        town.attr({
            x:this.size.width/2 + 380,
            y:this.size.height/2 - 120,
            anchorX:0.5,
            anchorY:0.5
        });
        this.addChild(town);
        var wifi = new cc.Sprite("#k_04_town_wifi1.png");
        wifi.attr({
            x:25,
            y:150,
            anchorX:0.5,
            anchorY:0.5
        });
        town.addChild(wifi);
        //wifi动画
        var _wifi=["k_04_town_wifi1.png","k_04_town_wifi2.png","k_04_town_wifi3.png"];
        var wifianimFrames=[];
        for(var i=0;i<_wifi.length;i++){
            var wififrame = cc.spriteFrameCache.getSpriteFrame(_wifi[i]);
            wifianimFrames.push(wififrame);
        }
        var wifianimation=new cc.Animation(wifianimFrames,0.2);
        var wifianimate=new cc.Animate(wifianimation);
        wifi.runAction(wifianimate.repeatForever());
        //地面
        var land = new cc.Sprite("#k_04_land.png");
        land.attr({
            x:this.size.width/2,
            y:this.size.height/2 - 225,
            anchorX:0.5,
            anchorY:0.5
        });
        this.addChild(land);
        //家
        var house = new cc.Sprite("#k_04_house.png");
        house.attr({
            x:this.size.width/2 - 340,
            y:this.size.height/2 - 170,
            anchorX:0.5,
            anchorY:0.5
        });
        this.addChild(house, 10);
        this.house = house;
        //家的wifi
        var housewifi = new cc.Sprite("#k_04_house_wifi1.png");
        housewifi.attr({
            x:200,
            y:230,
            anchorX:0.5,
            anchorY:0.5
        });
        house.addChild(housewifi);
        this.housewifi = housewifi;
        //家的装饰1
        var grass1 = new cc.Sprite("#k_04_grass.png");
        grass1.attr({
            x:210,
            y:10,
            anchorX:0.5,
            anchorY:0.5
        });
        house.addChild(grass1);
        //家的装饰2
        var grass2 = new cc.Sprite("#k_04_grass2.png");
        grass2.attr({
            x:-10,
            y:20,
            anchorX:0.5,
            anchorY:0.5
        });
        house.addChild(grass2);
        //烟雾
        var yan = new cc.Sprite("#k_04_house_yan.png");
        yan.attr({
            x:60,
            y:200,
            anchorX:0.5,
            anchorY:0.5
        });
        house.addChild(yan);
        //烟雾动画
        var _yan=["k_04_house_yan.png","k_04_house_yan2.png"];
        var animFrames=[];
        for(var i=0;i<_yan.length;i++){
            var frame = cc.spriteFrameCache.getSpriteFrame(_yan[i]);
            animFrames.push(frame);
        }
        var yananimation=new cc.Animation(animFrames,0.2);
        var yananimate=new cc.Animate(yananimation);
        yan.runAction(yananimate.repeatForever());
        //坑爹男
        var man = new cc.Sprite("#k_04_man.png");
        man.attr({
            x:this.size.width/2 - 160,
            y:this.size.height/2 - 175,
            anchorX:0.5,
            anchorY:0.5
        });
        this.addChild(man);
        this.man = man;
        //坑爹男的脸
        var face = new cc.Sprite("#k_04_man_1.png");
        face.attr({
            x:52,
            y:100,
            anchorX:0.5,
            anchorY:0.5
        });
        man.addChild(face);
        this.face = face;
        //坑爹男叫声
        var wenzi = new cc.Sprite("#k_04_wenzi.png");
        wenzi.attr({
            x:100,
            y:160,
            anchorX:0.5,
            anchorY:0.5
        });
        man.addChild(wenzi);
        this.wenzi = wenzi;
//        //坑爹男死了
//        var die = new cc.Sprite("#k_04_die.png");
//        die.attr({
//            x:this.size.width/2 - 120,
//            y:this.size.height/2 - 175,
//            anchorX:0.5,
//            anchorY:0.5
//        });
//        die.visible = false;
//        this.addChild(die);
//        this.die=die;
        //神仙
        var God = new cc.Sprite("#k_04_shenxian.png");
        God.attr({
            x:this.size.width/2 - 20,
            y:this.size.height/2 + 40,
            anchorX:0.5,
            anchorY:0.5
        });
        this.addChild(God);
        this.God = God;
        //神仙脚
        var Godfoot = new cc.Sprite("#k_04_foot.png");
        Godfoot.attr({
            x:-31,
            y:-87,
            anchorX:0.5,
            anchorY:0.5
        });
        Godfoot.visible = false;
        this.Godfoot=Godfoot;
        God.addChild(Godfoot);
        //闪电
        var lighting = new cc.Sprite("#k_04_lighting.png");
        lighting.attr({
            x:this.size.width/2 - 110,
            y:this.size.height/2 + 70,
            anchorX:0.5,
            anchorY:0.5
        });
        lighting.visible = false;
        this.addChild(lighting);
        //仙女
        var Godgirl = new cc.Sprite("#k_04_xiannv.png");
        Godgirl.attr({
            x:this.size.width - 160,
            y:this.size.height + 225,
            anchorX:0.5,
            anchorY:0.5
        });
        this.addChild(Godgirl, 1);
        this.Godgirl = Godgirl;


        //设置触摸事件,创建一个事件监听器 OneByOne 为单点触摸
        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    if (target == bg && target.parent.All_Touch == true) {
                        target.parent.BegantouchX = locationInNode.x;
                        target.parent.BegantouchY = locationInNode.y;
                    } else if (target == hill && target.parent.All_Touch == true) {
                        wenzi.visible = false;
                        cc.log("Game Over");
                        target.parent.All_Touch = false;
                        target.parent.face.visible = false;
                        man.runAction(cc.sequence(cc.spawn(cc.moveBy(0.6,cc.p(200, 40)),cc.callFunc(function(){
                            //man走路
                            var _walking=["k_04_man_walk1.png","k_04_man_walk2.png"];
                            var walkanimFrames=[];
                            for(var i=0;i<_walking.length;i++){
                                var frame = cc.spriteFrameCache.getSpriteFrame(_walking[i]);
                                walkanimFrames.push(frame);
                            }
                            var walkanimation=new cc.Animation(walkanimFrames,0.1);
                            var walkanimate=new cc.Animate(walkanimation);
                            man.runAction(walkanimate.repeat(3));
                        },this)),cc.callFunc(function(){
                            //man挖
                            var _dig=["k_04_man_wa1.png","k_04_man_wa2.png"];
                            var diganimFrames=[];
                            for(var i=0;i<_dig.length;i++){
                                var frame = cc.spriteFrameCache.getSpriteFrame(_dig[i]);
                                diganimFrames.push(frame);
                            }
                            var diganimation=new cc.Animation(diganimFrames,0.1);
                            var diganimate=new cc.Animate(diganimation);
                            man.runAction(diganimate.repeat(5));
                        }),cc.delayTime(1),cc.callFunc(function(){
                            target.parent.God.setScaleX(-1);
                            man.setScaleX(-1);
                            target.parent.Godfoot.visible = true;
                            playEffect(res.F04_Die,false);
                            target.parent.ManDie1();
//                        target.parent.unschedule(target.parent.Die);
                        })));
                    } else if (target == God && target.parent.All_Touch == true) {
                        wenzi.visible = false;
                        target.parent.All_Touch = false;
                        target.parent.face.visible = false;
                        cc.log("Game Over");
                        target.parent.Godfoot.visible = true;
                        playEffect(res.F04_Die,false);
                        target.parent.ManDie1();
//                        target.parent.unschedule(target.parent.Die);
                    } else if (target == man && target.parent.All_Touch == true) {
                        wenzi.visible = false;
                        target.parent.All_Touch = false;
                        target.parent.face.visible = false;
                        cc.log("Game Over");
                        target.parent.Godfoot.visible = true;
                        playEffect(res.F04_Die, false);
                        target.parent.ManDie1();
//                        target.parent.unschedule(target.parent.Die);
                    } else if (target == Godgirl && target.parent.bg_Touch == false && target.parent.GodgirlTouch == true) {
                        target.parent.GameWin();
                    } else if ((target == cloudmove1 || target == cloudmove2 || target == cloudmove3 || target == cloudmove4) && target.parent.All_Touch == true){
                        wenzi.visible = false;
                        target.parent.All_Touch = false;
                        cc.log("Game Over");
                        lighting.visible = true;
                        var lightlayer = new cc.LayerColor(cc.color(255, 255, 255, 200), target.parent.size.width, target.parent.size.height);
                        lightlayer.visible = false;
                        target.parent.addChild(lightlayer, 10);
                        lightlayer.runAction(cc.blink(1,5));
                        //闪电动画
                        var _light=["k_04_lighting.png","k_04_lighting2.png"];
                        var animFrames=[];
                        for(var i=0;i<_light.length;i++){
                            var frame = cc.spriteFrameCache.getSpriteFrame(_light[i]);
                            animFrames.push(frame);
                        }
                        var _lightanimation=new cc.Animation(animFrames,0.2);
                        var _lightanimate=new cc.Animate(_lightanimation);
                        playEffect(res.F04_thunder,false);
                        target.parent.runAction(cc.sequence(cc.sequence(cc.moveBy(0.05, cc.p(-10,0)),cc.moveBy(0.1, cc.p(20,0)), cc.moveBy(0.05, cc.p(-10, 0))).repeat(3)));
                        lighting.runAction(cc.sequence(_lightanimate,cc.delayTime(0.2),cc.callFunc(function(){
                            lighting.visible = false;
                            target.parent.ManDie2();
                        }, this)));
                    }
                    return true;
                }
                return false;
            },
            onTouchEnded: function (touch, event) {            // 点击事件结束处理
                var target = event.getCurrentTarget();
                var locationOutNode = target.convertToNodeSpace(touch.getLocation());
                if (target == bg && target.parent.bg_Touch == true) {
                    if(target.parent.BegantouchY - locationOutNode.y > 50 && Math.abs(target.parent.BegantouchX - locationOutNode.x) < 100) {
                        target.parent.runAction(cc.sequence(cc.moveBy(1,cc.p(0, - target.parent.winheight)),cc.callFunc(function(){
                            playEffect(res.F04_airy,false);
                            cc.log("音效");
                        }, this)));
                        target.parent.bg_Touch = false;
                        target.parent.All_Touch = false;
                    }
                }
            }
        });
        // 添加监听器到管理器
        cc.eventManager.addListener(listener1, God);
        cc.eventManager.addListener(listener1.clone(), Godgirl);
        cc.eventManager.addListener(listener1.clone(), man);
        cc.eventManager.addListener(listener1.clone(), bg);
        cc.eventManager.addListener(listener1.clone(), hill);
        cc.eventManager.addListener(listener1.clone(), cloudmove1);
        cc.eventManager.addListener(listener1.clone(), cloudmove2);
        cc.eventManager.addListener(listener1.clone(), cloudmove3);
        cc.eventManager.addListener(listener1.clone(), cloudmove4);

//        this.schedule(this.Die, 1);
        this.schedule(this.CloudMove);
    },
    init:function(){
        this.bg_Touch = true;
        this.All_Touch = true;
        this.winheight = cc.director.getWinSize().height;
        this.BegantouchX = 0;
        this.BegantouchY = 0;
        this.Time = 0;
        this.childNum = 0;
        this.Move1 = 5;
        this.Move2 = 4;
        this.Move3 = 3;
        this.Move4 = 2;
        this.plusminus1 = 1;
        this.plusminus2 = 1;
        this.plusminus3 = 1;
        this.plusminus4 = 1;
        this.childrensAtion = false;
        this.GodgirlTouch = true;
    },
    ManDie1:function () {
        this.man.setSpriteFrame("k_04_die.png");
//        this.man.visible = false;
        this.man.runAction(cc.sequence(cc.delayTime(1.5),cc.callFunc(function(){
            ShowFaildPPanel(this.getParent(), 4, 0);
        },this)));
    },
    ManDie2:function () {
        this.face.visible = false;
        this.man.setSpriteFrame("k_04_die.png");
//        this.man.visible = false;
        this.man.runAction(cc.sequence(cc.delayTime(1.5),cc.callFunc(function(){
            ShowFaildPPanel(this.getParent(), 4, 1);
        },this)));
    },
    CloudMove:function (dt) {
        var posX1 = this.cloudmove1.getPositionX();
        var posX2 = this.cloudmove2.getPositionX();
        var posX3 = this.cloudmove3.getPositionX();
        var posX4 = this.cloudmove4.getPositionX();
        posX1 -= (this.Move1 * this.plusminus1);
        posX2 += (this.Move2 * this.plusminus2);
        posX3 -= (this.Move3 * this.plusminus3);
        posX4 += (this.Move4 * this.plusminus4);
        if (posX1 < 0 || posX1 > this.bg.getContentSize().width) {
            this.plusminus1 = -this.plusminus1;
        }
        if (posX2 < 0 || posX2 > this.bg.getContentSize().width) {
            this.plusminus2 = -this.plusminus2;
        }
        if (posX3 < 0 || posX3 > this.bg.getContentSize().width) {
            this.plusminus3 = -this.plusminus3;
        }
        if (posX4 < 0 || posX4 > this.bg.getContentSize().width) {
            this.plusminus4 = -this.plusminus4;
        }
        this.cloudmove1.x = posX1;
        this.cloudmove2.x = posX2;
        this.cloudmove3.x = posX3;
        this.cloudmove4.x = posX4;
    },
    GameWin:function(){
        this.wenzi.visible = false;
        this.All_Touch = false;
        this.GodgirlTouch = false;
//        this.unschedule(this.Die);
        this.runAction(cc.moveBy(1,cc.p(0, this.winheight)));
        this.removeChild(this.man);
        //坑爹男
        var man = new cc.Sprite("#k_04_man.png");
        man.attr({
            x:this.size.width/2 - 90,
            y:this.size.height/2 - 175,
            anchorX:0.5,
            anchorY:0.5
        });
        this.addChild(man);
        //坑爹男的脸
        var face = new cc.Sprite("#k_04_man_3.png");
        face.attr({
            x:52,
            y:100,
            anchorX:0.5,
            anchorY:0.5
        });
        man.addChild(face);
        this.Godgirl.runAction(cc.sequence(cc.moveTo(1, cc.p(man.getPositionX() + 30, man.getPositionY())),
            cc.callFunc(function(){
                playEffect(res.F04_Kiss,false);
            var heart1 = new cc.Sprite("#k_04_heart.png");
            heart1.attr({
                x:10,
                y:120,
                anchorX:0.5,
                anchorY:0.5
            });
            this.Godgirl.addChild(heart1);
            }, this),cc.delayTime(0.3),
            cc.callFunc(function(){
            var heart2 = new cc.Sprite("#k_04_heart.png");
            heart2.attr({
                x:40,
                y:140,
                anchorX:0.5,
                anchorY:0.5
            });
            this.Godgirl.addChild(heart2);
        }, this),cc.callFunc(function(){
                this.Godgirl.runAction(cc.sequence(cc.moveTo(1, cc.p(this.size.width/2 - 310,this.size.height/2 - 190)),cc.callFunc(function(){
                    this.removeChild(this.Godgirl);
                }, this)));
                man.runAction(cc.sequence(cc.moveTo(1, cc.p(this.size.width/2 - 340,this.size.height/2 - 190)),cc.callFunc(function(){
                    this.removeChild(man);
                }, this)));
            }, this),
            cc.callFunc(function(){
                playEffect(res.F04_house,false);
                this.house.runAction(cc.sequence(cc.delayTime(1),cc.sequence(cc.moveBy(0.1,cc.p(-30,30)),cc.moveBy(0.1,cc.p(30,-30)),cc.moveBy(0.1,cc.p(30,30)),cc.moveBy(0.1,cc.p(-30,-30))).repeat(5)));
            }, this),
            cc.callFunc(function(){
                //家wifi动画
                var _wifi=["k_04_house_wifi1.png","k_04_house_wifi2.png","k_04_house_wifi3.png"];
                var wifianimFrames=[];
                for(var i=0;i<_wifi.length;i++){
                    var wififrame = cc.spriteFrameCache.getSpriteFrame(_wifi[i]);
                    wifianimFrames.push(wififrame);
                }
                var wifianimation=new cc.Animation(wifianimFrames,3);
                var wifianimate=new cc.Animate(wifianimation);
                this.housewifi.runAction(cc.sequence(cc.delayTime(4),wifianimate));
                this.hill.runAction(cc.sequence(cc.delayTime(4), cc.moveBy(7,cc.p(0, -320))));
                this.God.runAction(cc.sequence(cc.delayTime(4), cc.spawn(cc.moveTo(1, cc.p(1000,1000)), cc.rotateTo(1, 180))));
                this.house.runAction(cc.sequence(cc.delayTime(3),cc.callFunc(function(){
                    this.schedule(this.childrens);
                }, this)));
                this.childrensAtion = true;
        }, this)));
        this.house.runAction(cc.sequence(cc.delayTime(12),cc.callFunc(function(){
            cc.log("Game Win");
            ShowSuccessPanel(this.getParent(), 4);
        },this)));
    },
    childrens:function (dt) {
        this.childNum++;
        if (this.childNum == 5) {
            this.unschedule(this.childrens);
        }
//小孩子
        var childwalk = new cc.Sprite("#k_04_child_walk.png");
        childwalk.attr({
            x:this.size.width/2 - 340,
            y:this.size.height/2 - 190,
            anchorX:0.5,
            anchorY:0.5
        });
        this.addChild(childwalk);
        childwalk.runAction(cc.sequence(cc.moveTo(1,cc.p(this.size.width/2 + 240 - (this.childNum * 50),this.size.height/2 - 135)),cc.callFunc(function(){
            childwalk.setSpriteFrame("k_04_child.png");
            //小孩子的手
            var childhand = new cc.Sprite("#k_04_child_hand2.png");
            childhand.attr({
                x:25,
                y:40,
                anchorX:0.5,
                anchorY:0.5
            });
            childwalk.addChild(childhand);
            var _waiting=["k_04_child_hand1.png","k_04_child_hand2.png"];
            var animFrames=[];
            for(var i=0;i<_waiting.length;i++){
                var frame = cc.spriteFrameCache.getSpriteFrame(_waiting[i]);
                animFrames.push(frame);
            }
            var animation=new cc.Animation(animFrames,0.1);
            var animate=new cc.Animate(animation);
            childhand.runAction(animate.repeatForever());
        },this)));
        //小孩走路
        var _walking=["k_04_child_walk.png","k_04_child_walk02.png"];
        var walkanimFrames=[];
        for(var i=0;i<_walking.length;i++){
            var frame = cc.spriteFrameCache.getSpriteFrame(_walking[i]);
            walkanimFrames.push(frame);
        }
        var walkanimation=new cc.Animation(walkanimFrames,0.1);
        var walkanimate=new cc.Animate(walkanimation);
        childwalk.runAction(walkanimate.repeat(5));
    }

});

var NotwifiScene = cc.Scene.extend({
    layer:null,
    onEnter : function() {
        this._super();
        this.layer = new NotwifiLayer();
        this.addChild(this.layer);

        var level = 4;
        var mainUILayer = new MainUILayer(level);
        this.addChild(mainUILayer, 2);
    },
    pauseTheGame : function () {
        //pause the game
        this.layer.unschedule(this.layer.CloudMove);
        if (this.layer.childrensAtion == true){
            this.layer.unschedule(this.layer.childrens);
        }
        cc.log("pause the game");
    },
    resumeTheGame :function () {
        //resume the game
        this.layer.schedule(this.layer.CloudMove);
        if (this.layer.childrensAtion == true){
            this.layer.schedule(this.layer.childrens,1);
        }
        cc.log("resume the game");
    }

});