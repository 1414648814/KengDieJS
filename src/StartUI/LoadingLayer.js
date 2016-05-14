/**
 * Created by George on 16/5/12.
 */

var LoadingSceneLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var size = cc.winSize;

        cc.spriteFrameCache.addSpriteFrames(res.main_plist);

        var mainBg = new cc.Sprite("#loading.png");

        mainBg.x = size.width/2;
        mainBg.y = size.height/2;
        this.addChild(mainBg, 1);

        var loading_word=new cc.Sprite("#loading_word.png");
        loading_word.attr({
            x:mainBg.getBoundingBox().width/2-30,
            y:62
        });
        mainBg.addChild(loading_word);

        for(var i=0;i<3;i++){
            var point=new cc.Sprite("#point.png");
            point.attr({
                x:mainBg.getBoundingBox().width/2+50+i*15,
                y:55,
                visible:false
            });
            mainBg.addChild(point);
            this._pointArr.push(point);
        }

        var delayTime=cc.delayTime(0.15);

        this.runAction(cc.sequence(
            cc.callFunc(function(){
                this._pointArr[0].visible=true;
            },this),
            delayTime,
            cc.callFunc(function(){
                this._pointArr[1].visible=true;
            },this),
            delayTime,
            cc.callFunc(function(){
                this._pointArr[2].visible=true;
            },this),
            delayTime,
            cc.callFunc(function(){
                for(var i=0; i<this._pointArr.length;i++){
                    this._pointArr[i].visible=false;
                }
            },this),
            delayTime
        ).repeatForever());


        //getMusicIsOpen();

                                        cc.log("loading begin");

//        this.timeCallBack(0.1);
        //添加图片资源缓存


                                        cc.log("add spriteframe now");
//        cc.spriteFrameCache.addSpriteFrames(res.com_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.make_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.select_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.icon_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.turnplate_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.panel_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.marketios_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.marketandroid_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.CutFood_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.k_01_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.k_02_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.k_03_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.k_04_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.k_05_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.k_06_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.k_07_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.k_08_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.k_09_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.k_11_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.k_10_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.k_12_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.k_13_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.k_14_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.k_15_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.k_16_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.k_17_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.k_18_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.k_19_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.k_20_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.k_21_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.k_22_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.k_24_plist);
//        cc.spriteFrameCache.addSpriteFrames(res.k_23_plist);

                                        cc.log("loading end");

//        this.scheduleOnce(this.timeCallBack, 2);

//        setTimeout(function(){
//            cc.spriteFrameCache.addSpriteFrames(res.com_plist);
//            cc.spriteFrameCache.addSpriteFrames(res.make_plist);
//            cc.spriteFrameCache.addSpriteFrames(res.select_plist);
//            cc.spriteFrameCache.addSpriteFrames(res.icon_plist);
//            cc.spriteFrameCache.addSpriteFrames(res.turnplate_plist);
//            cc.spriteFrameCache.addSpriteFrames(res.panel_plist);
//            cc.spriteFrameCache.addSpriteFrames(res.main_plist);
//            cc.spriteFrameCache.addSpriteFrames(res.normal_plist);
//            cc.spriteFrameCache.addSpriteFrames(res.bomb_plist);
//            cc.director.runScene(new MainScene());
//        },3000);


        var Caches=[
            res.com_plist,
            res.make_plist,
            res.turnplate_plist,
            res.panel_plist
        ];

        var LoadProgress=0;

        this.schedule(function(){

            if(LoadProgress<Caches.length){
                cc.spriteFrameCache.addSpriteFrames(Caches[LoadProgress]);
                LoadProgress++;
            }else{
                this.unscheduleAllCallbacks();
                cc.director.runScene(new MainScene());
            }
        },0.3);


    },

    timeCallBack:function(dt) {

//        cc.LoaderScene.preload(g_resources, function () {
//            cc.spriteFrameCache.addSpriteFrames(res.com_plist);
//            cc.spriteFrameCache.addSpriteFrames(res.make_plist);
//            cc.spriteFrameCache.addSpriteFrames(res.select_plist);
//            cc.spriteFrameCache.addSpriteFrames(res.icon_plist);
//            cc.spriteFrameCache.addSpriteFrames(res.turnplate_plist);
//            cc.spriteFrameCache.addSpriteFrames(res.panel_plist);
//
//            cc.director.runScene(new MainScene());
//
//        }, this);
//        cc.director.runScene(new MainScene());
    },

    sprite : null,
    _pointArr : []
});