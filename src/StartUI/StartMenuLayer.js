/**
 * Created by George on 16/5/12.
 */


var MainSceneLayer = cc.Layer.extend({
    sprite:null,
    spriteWithMountain1 : null,
    spriteWithMountain2 : null,
    spriteWithGrassland1 : null,
    spriteWithGrassland2 : null,
    spriteWithCloudLayer1 : null,
    spriteWithCloudLayer2 : null,
    freenum:null,
    suoqu:null,
    count:null,

    onEnter:function(){

        this._super();


        var Caches=[
            res.select_plist,
            res.icon_plist
        ];

        for(var i= 0,len=Caches.length;i<len;i++){
            cc.spriteFrameCache.addSpriteFrames(Caches[i]);
        }


     //返回键退出游戏,按两次退出游戏
     var isExist = "0";
     var _this = this;
     cc.eventManager.addListener({
                                 event: cc.EventListener.KEYBOARD,
                                 onKeyReleased: function(keyCode, event) {
                                 if (keyCode == cc.KEY.back) {
                                 if(isExist == "1"){
                                 cc.director.end();
                                 }
                                 var testJSB = new JSB.JSBinding();
                                 testJSB.retain();
                                 testJSB.showToast("3秒内再按一次 返回按键 将退出游戏");
                                 testJSB.release();

                                 isExist = "1";
                                 cc.log("i am exist now1");
                                 _this.runAction(cc.sequence(cc.delayTime(3),new cc.CallFunc(function(){
                                                                                             isExist = "0";
                                                                                             cc.log("i am exist now2");
                                                                                             })));

                                 }
                                 }}, this);


//         cc.audioEngine.preloadBackgroundMusic("res/music/music_main_1.mp3");
        playBackgroundMusic("res/music/music_main_1.mp3",true);
        cc.log("AssetsManager::onenter");
        var testJSB = new JSB.JSBinding();
        testJSB.retain();
        testJSB.showBanner();
//         testJSB.selfADCALLBACK = function(str1){
//             cc.log("qweqwe");
//            cc.log(str1);
//         };
//         cc.log("qweqwe");
//         cc.log(str1);
//         if(str1 != null){
//         var size = cc.winSize;
//
//         }

        testJSB.release();
        cc.log("testshow");

        if(getSelfAD_Title() && getSelfAD_Show() == 0){
            cc.log("open");
            setSelfAD_Show(1);
            var size = cc.winSize;
            var selfADPanel = new SelfADPanel("open");
            this.addChild(selfADPanel,1000);
        }

//         var testJSB2 = new JSB.JSBinding();
//         testJSB2.retain();
//
//
//
//         };


    },
    onExit:function(){
        this._super();
        cc.log("AssetsManager::onExit");

        var testJSB = new JSB.JSBinding();
        testJSB.retain();
        testJSB.closeBanner(1);
        testJSB.release();
//
    },

    ctor:function () {

        this._super();





        freenum=0;
        suoqu=0;
        count=1;
        //是否第一次在此设备上面安装
        cc.log("是否增加金币");
        if(getIsUsedDisplayOnDevice()==0){
            cc.log("是否增加金币"+getIsUsedDisplayOnDevice());
            setGold(parseInt(getGold() || 0)+100);
            setIsUsedDisplayOnDevice(1);
//            ShowGoldChange(this.getParent(),"+100");
            cc.log("增加金币");
        }




//        var url = 'http://neoimaging.beareyes.com.cn/png2/ni_png_2_1518.png';
//        var params = [
//            'id=934875',
//            'limit=20'
//        ];
//        var req = new XMLHttpRequest();
//        req.onerror = function() {
//            // Error.
//            cc.log(req.readyState+ " "+req.status+ "ready state request error");
//        };
//        req.onreadystatechange = function() {
//            cc.log(req.readyState+ " "+req.status+ "ready state  ");
//            if (req.readyState== 4) {
//
//                if(req.status == 200){
//
//                }
//                // Success.
//                cc.log(req.readyState+ " "+req.status+"ready state  request success");
//            }
//        };
//        req.open('Get','http://app.kdyx.cn/api/ad/get_ad?channelId=3&width=960&height=640&isFull=1', false);
//        req.setRequestHeader('Content-Type', 'application/x-www-Form-urlencoded');
//        req.setRequestHeader('Content-Length', params.length);
//        req.send(null);
//        req.send(params.join('&'));



        cc.log("getGold()");
        cc.log(getGold());


//        testJSB23.addGold = function (i,j) {
//
//            setGold((parseInt(getGold()) || 0) + i);
////            cc.log
//        }
        cc.log(getGold());



        var num=0;
        if(cc.sys.os == "Android") {

            var testJSB6 = new JSB.JSBinding();
            testJSB6.retain();
            testJSB6.freePanel();
            testJSB6.freeCallback = function (i, j) {
                cc.log("abchhh");
                cc.log("freeCallback");
                cc.log(i);
                num=i;

            }
            testJSB6.suoquback=function(i,j){

                cc.log("suoquCallback");
                cc.log(i);
                if(i==1)//在审核
                {
                    cc.log("在审核");
                    setAZLauchCheck(1);
                }
                else if(i==0)
                {
                    cc.log("不在审核");
                    setAZLauchCheck(0);
                }





                if(getAZLauchCheck()==0)
                {
                    setAZLauchCheck2(num);
                    cc.log(getAZLauchCheck2());
                    cc.log("getAZLauchCheck2()");
                    var spritefree = new cc.Sprite("#game_btn_free_gold.png");
                    var scale9Spritefree = new cc.Scale9Sprite("game_btn_free_gold.png");
                    var moneyfree = new cc.ControlButton(scale9Spritefree);
                    moneyfree.setPreferredSize(cc.size(spritefree.width, spritefree.height));
                    moneyfree.addTargetWithActionForControlEvents(this, function () {
                        playEffect(res.BUTTON_SOUNDS);
                        var azl = new showAZL();
                        cc.log("showAZL.freenum");
                        cc.log(showAZL.freenum);
                        showAZL.suoqu = suoqu;
                        spriteWithCloudLayer1.getParent().addChild(azl, 10);
                        cc.log("free");
                    }.bind(moneyfree), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);

                    moneyfree.x = moneyfree.width / 2;
                    moneyfree.y = cc.winSize.height / 2;
                    spriteWithCloudLayer1.getParent().addChild(moneyfree, 3);
                }
                suoqu=i;
                testJSB6.release();
            }

        }

        var size = cc.winSize;

        var spriteWithSky1 = new cc.Sprite("#home_bg_sky.png");
        spriteWithSky1.x = size.width/2;
        spriteWithSky1.y = size.height/2;
        this.addChild(spriteWithSky1, 1);

        spriteWithCloudLayer1 = new cc.Sprite();
        spriteWithCloudLayer1.setContentSize(1200, 640);
        spriteWithCloudLayer1.setAnchorPoint(0,0.5);
        spriteWithCloudLayer1.x = 0;
        spriteWithCloudLayer1.y = size.height/2;
        this.addChild(spriteWithCloudLayer1, 2);

        var spriteWithCloud1 = new cc.Sprite("#home_cloud.png");
        spriteWithCloud1.setPosition(400,400);
        spriteWithCloudLayer1.addChild(spriteWithCloud1);
        var spriteWithCloud2 = new cc.Sprite("#home_cloud.png");
        spriteWithCloud2.setPosition(800,500);
        spriteWithCloudLayer1.addChild(spriteWithCloud2);
        var spriteWithCloud3 = new cc.Sprite("#home_cloud.png");
        spriteWithCloud3.setPosition(1000,600);
        spriteWithCloudLayer1.addChild(spriteWithCloud3);

        spriteWithCloudLayer2 = new cc.Sprite();
        spriteWithCloudLayer2.setContentSize(1200, 640);
        spriteWithCloudLayer2.setAnchorPoint(0,0.5);
        spriteWithCloudLayer2.x = spriteWithCloudLayer2.getContentSize().width;
        spriteWithCloudLayer2.y = size.height/2;
        this.addChild(spriteWithCloudLayer2, 2);

        var spriteWithCloud4 = new cc.Sprite("#home_cloud.png");
        spriteWithCloud1.setPosition(400,500);
        spriteWithCloudLayer2.addChild(spriteWithCloud4);
        var spriteWithCloud5 = new cc.Sprite("#home_cloud.png");
        spriteWithCloud2.setPosition(800,400);
        spriteWithCloudLayer2.addChild(spriteWithCloud5);
        var spriteWithCloud6 = new cc.Sprite("#home_cloud.png");
        spriteWithCloud3.setPosition(1000,600);
        spriteWithCloudLayer2.addChild(spriteWithCloud6);


        spriteWithMountain1 = new cc.Sprite("#home_bg_mountain.png");
        spriteWithMountain1.setAnchorPoint(0,0.5);
        spriteWithMountain1.x = 0;
        spriteWithMountain1.y = size.height/2;
        this.addChild(spriteWithMountain1, 3);
        spriteWithMountain2 = new cc.Sprite("#home_bg_mountain.png");
        spriteWithMountain2.setAnchorPoint(0,0.5);
        spriteWithMountain2.x = spriteWithMountain1.getContentSize().width;
        spriteWithMountain2.y = size.height/2;
        this.addChild(spriteWithMountain2, 3);

        spriteWithGrassland1 = new cc.Sprite("#home_bg_grassland.png");
        spriteWithGrassland1.setAnchorPoint(0,0);
        spriteWithGrassland1.x = 0;
        spriteWithGrassland1.y = 0;
        this.addChild(spriteWithGrassland1, 4);

        spriteWithGrassland2 = new cc.Sprite("#home_bg_grassland.png");
        spriteWithGrassland2.setAnchorPoint(0,0);
        spriteWithGrassland2.x = spriteWithGrassland2.getContentSize().width;
        spriteWithGrassland2.y = 0;
        this.addChild(spriteWithGrassland2, 4);


        var goblin1=cc.Sprite.create();
        goblin1.setPosition(size.width/2-300,200);
        this.addChild(goblin1,4);
        //animation
        var animFrames1=[];
        for(var i=1;i<=3;i++){
            var frame=cc.spriteFrameCache.getSpriteFrame("home_goblins_0"+i+".png");
            animFrames1.push(frame);
        }
        var animation1=new cc.Animation(animFrames1,0.15);
        var animate1=new cc.Animate(animation1);
        goblin1.runAction(animate1.repeatForever());

        var goblin2=cc.Sprite.create();
        goblin2.setPosition(size.width/2+200,200);
        this.addChild(goblin2,5);
        //animation
        var animFrames2=[];
        for(var i=1;i<=4;i++){
            var frame=cc.spriteFrameCache.getSpriteFrame("home_person_red_0"+i+".png");
            animFrames2.push(frame);
        }
        var animation2=new cc.Animation(animFrames2,0.15);
        var animate2=new cc.Animate(animation2);
        goblin2.runAction(animate2.repeatForever());

        var goblin3=cc.Sprite.create();
        goblin3.setPosition(size.width/2+280,210);
        this.addChild(goblin3,5);
        //animation
        var animFrames3=[];
        for(var i=1;i<=3;i++){
            var frame=cc.spriteFrameCache.getSpriteFrame("home_person_yellow_0"+i+".png");
            animFrames3.push(frame);
        }
        var animation3=new cc.Animation(animFrames3,0.15);
        var animate3=new cc.Animate(animation3);
        goblin3.runAction(animate3.repeatForever());

        var goblin4=cc.Sprite.create();
        goblin4.setPosition(size.width/2+350,200);
        this.addChild(goblin4,5);
        //animation
        var animFrames4=[];
        for(var i=1;i<=2;i++){
            var frame=cc.spriteFrameCache.getSpriteFrame("home_person_old_0"+i+".png");
            animFrames4.push(frame);
        }
        var animation4=new cc.Animation(animFrames4,0.15);
        var animate4=new cc.Animate(animation4);
        goblin4.runAction(animate4.repeatForever());



        var spriteWithTitleWord = new cc.Sprite("#home_title_word.png");
        spriteWithTitleWord.x = size.width/2-20;
        spriteWithTitleWord.y = size.height/2+100;
        this.addChild(spriteWithTitleWord, 6);

        var titleWord=cc.Sprite.create();
        titleWord.setPosition(77,-35);
        spriteWithTitleWord.addChild(titleWord);
        //animation
        var animFrames5=[];
        for(var i=1;i<=2;i++){
            var frame=cc.spriteFrameCache.getSpriteFrame("home_title_hand_0"+i+".png");
            animFrames5.push(frame);
        }
        var animation5=new cc.Animation(animFrames5,0.15);
        var animate5=new cc.Animate(animation5);
        titleWord.runAction(animate5.repeatForever());



        //开始按钮
        var spriteWithStartBtn =new cc.Sprite("#home_btn_start.png");
        var scale9SpriteWithStartBtn =new cc.Scale9Sprite("home_btn_start.png");
        var startBtn = new cc.ControlButton(scale9SpriteWithStartBtn);
        startBtn.setPreferredSize(cc.size(spriteWithStartBtn.width, spriteWithStartBtn.height));
        startBtn.addTargetWithActionForControlEvents(this, function(){
            playEffect(res.BUTTON_SOUNDS);
            setDeadTime(0);
            cc.loader.loadTxt("res/passionConf.csv", function(err, data){
                if(err) return console.log("load failed");

                var csvArray = CSVToArray(data, ",");
                var arr=[];
                //success
                for(var i=1;i<=24;i++){
                    var index=csvArray[i+1][0];
                    var title=csvArray[i+1][1];
                    var loadWord=csvArray[i+1][2];
                    var tips1=csvArray[i+1][3];
                    var tips2=csvArray[i+1][4];
                    var tips3=csvArray[i+1][5];
                    var passWord=csvArray[i+1][6];
                    var failWord=csvArray[i+1][7];
                    var shareWord=csvArray[i+1][8];
                    var failWord1=csvArray[i+1][9];
                    var failWord2=csvArray[i+1][10];
                    var failWord3=csvArray[i+1][11];
                    var failWord4=csvArray[i+1][12];
                    var failWord5=csvArray[i+1][13];
                    var failWord6=csvArray[i+1][14];
                    var failWord7=csvArray[i+1][15];
                    var failWord8=csvArray[i+1][16];
//                    var index=CSVAnalyser(data, i, "index");
//                    var title=CSVAnalyser(data, i, "title");
//                    var loadWord=CSVAnalyser(data, i, "loadWord");
//                    var tips1=CSVAnalyser(data, i, "tips1");
//                    var tips2=CSVAnalyser(data, i, "tips2");
//                    var tips3=CSVAnalyser(data, i, "tips3");
//                    var passWord=CSVAnalyser(data, i, "passWord");
//                    var failWord=CSVAnalyser(data, i, "failWord");
//                    var shareWord=CSVAnalyser(data, i, "shareWord");
//                    var failWord1=CSVAnalyser(data, i, "failWord1");
//                    var failWord2=CSVAnalyser(data, i, "failWord2");
//                    var failWord3=CSVAnalyser(data, i, "failWord3");
//                    var failWord4=CSVAnalyser(data, i, "failWord4");
//                    var failWord5=CSVAnalyser(data, i, "failWord5");

                    arr.push([index,title,loadWord,tips1,tips2,tips3,passWord,failWord,shareWord,failWord1,failWord2,failWord3,failWord4,failWord5,failWord6,failWord7,failWord8]);
                }
                cc.director.runScene(new PassionScene(arr));
            });
        }.bind(startBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);

        startBtn.x = size.width/2;
        startBtn.y = size.height/2-100;
        startBtn.setTag(1001);
        this.addChild(startBtn, 6);


        //更多游戏
//            var spriteWithfindBtn =new cc.Sprite("#com_btn_blue.png");
//            var scale9SpriteWithfindBtn = new cc.Scale9Sprite("com_btn_blue.png");
//            var findBtn = new cc.ControlButton(scale9SpriteWithfindBtn);
//            findBtn.setPreferredSize(cc.size(spriteWithfindBtn.width, spriteWithfindBtn.height));
//            findBtn.addTargetWithActionForControlEvents(this,function(){
//                playEffect(res.BUTTON_SOUNDS);
//
//                var testJSB = new JSB.JSBinding();
//                testJSB.retain();
//                testJSB.openMoreGameForAndroid();
//                testJSB.release();
//
//
//            }.bind(findBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
//            findBtn.x = size.width/2-320;
//            findBtn.y = size.height/2+150;
//            findBtn.setTag(1002);
//            this.addChild(findBtn, 6);

//            var spriteWithFind = new cc.Sprite("#home_btn_game_icon.png");
//            spriteWithFind.x = findBtn.width/2-5;
//            spriteWithFind.y = findBtn.height/2+10;
//            findBtn.addChild(spriteWithFind);

//            var spriteWithcrown = new cc.Sprite("res/main/home_btn_more.png");
//            spriteWithcrown.x = findBtn.width/2-5;
//            spriteWithcrown.y = findBtn.height/2+5;
//            findBtn.addChild(spriteWithcrown);

//                                     //发现按钮
                                     if(getLauchCheck()==0){
                                     var spriteWithfindBtn =new cc.Sprite("#com_btn_blue.png");
                                     var scale9SpriteWithfindBtn = new cc.Scale9Sprite("com_btn_blue.png");
                                     var findBtn = new cc.ControlButton(scale9SpriteWithfindBtn);
                                     findBtn.setPreferredSize(cc.size(spriteWithfindBtn.width, spriteWithfindBtn.height));
                                     findBtn.addTargetWithActionForControlEvents(this,function(){
                                                                                 playEffect(res.BUTTON_SOUNDS);

                                                                                 var testJSB = new JSB.JSBinding();
                                                                                 testJSB.retain();
                                                                                 testJSB.openUrl(5,0,"");
                                                                                 testJSB.release();

                                                                                 }.bind(findBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
                                     findBtn.x = size.width/2-320;
                                     findBtn.y = size.height/2+150;
                                     findBtn.setTag(1002);
                                     this.addChild(findBtn, 6);

                                     var spriteWithFind = new cc.Sprite("#home_btn_game_icon.png");
                                     spriteWithFind.x = findBtn.width/2-5;
                                     spriteWithFind.y = findBtn.height/2+10;
                                     findBtn.addChild(spriteWithFind);

                                     var spriteWithcrown = new cc.Sprite("#home_btn_game_crown.png");
                                     spriteWithcrown.x = findBtn.width/2+20;
                                     spriteWithcrown.y = findBtn.height/2+55;
                                     findBtn.addChild(spriteWithcrown);
                                     }


        //社区
        if(getCommunityAvailable()==1){
            var spriteWithcommunityBtn =new cc.Sprite("res/k4_btn_community.png");
            var scale9SpriteWithcommunityBtn = new cc.Scale9Sprite("res/k4_btn_community.png");
            var communityBtn = new cc.ControlButton(scale9SpriteWithcommunityBtn);
            communityBtn.setPreferredSize(cc.size(spriteWithcommunityBtn.width, spriteWithcommunityBtn.height));
            communityBtn.addTargetWithActionForControlEvents(this,function(){
                playEffect(res.BUTTON_SOUNDS);

                var testJSB = new JSB.JSBinding();
                testJSB.retain();
                testJSB.showCommunity();
                testJSB.release();


            }.bind(communityBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
            communityBtn.x = size.width/2-320;
            communityBtn.y = size.height/2+50;
            communityBtn.setTag(1002);
            this.addChild(communityBtn, 6);

        }



//             电信三网关于
//                                     var spriteWithmethodBtn =new cc.Sprite("#com_btn_blue.png");
//                                     var scale9SpriteWithmethodBtn = new cc.Scale9Sprite("com_btn_blue.png");
//                                     var methodBtn = new cc.ControlButton(scale9SpriteWithmethodBtn);
//                                     methodBtn.setPreferredSize(cc.size(spriteWithmethodBtn.width, spriteWithmethodBtn.height));
//                                     methodBtn.addTargetWithActionForControlEvents(this, function()
//                                                                                   {
//                                                                                   playEffect(res.BUTTON_SOUNDS);
//                                                                                   var bg=null;
//                                                                                   var testJSB = new JSB.JSBinding();
//                                                                                   testJSB.retain();
//
//                                                                                   testJSB.openFile("disclaimer");
//
//
//                                                                                   testJSB.release();
//                                                                                   }.bind(methodBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
//                                     methodBtn.x = size.width/2+300;
//                                     methodBtn.y =  size.height/2+150;
//                                     methodBtn.setTag(1003);
//                                     this.addChild(methodBtn, 6);
//
//                                     var spriteWithmethod = new cc.Sprite("res/main/home_btn_icon_about.png");
//                                     spriteWithmethod.x = methodBtn.width/2-5;
//                                     spriteWithmethod.y = methodBtn.height/2;
//                                     methodBtn.addChild(spriteWithmethod);
//
//                                     var mainADTitle = new cc.LabelTTF(getAd_Title1_Text(),getFONT_FZCY_M03SStr(),20);
//                                     mainADTitle.x = methodBtn.width/2;
//                                     mainADTitle.y = methodBtn.height/2;
//                                     methodBtn.addChild(mainADTitle);
//
//
//                                     var spriteWithmethoddemon = new cc.Sprite("#home_btn_strategy_demon.png");
//                                     spriteWithmethoddemon.x = methodBtn.width/2-5;
//                                     spriteWithmethoddemon.y = methodBtn.height/2+52;
//                                     methodBtn.addChild(spriteWithmethoddemon);


        //首页广告位按钮
        if(getLauchCheck()==0 && getAd_Title1_Text() != ""){
            var spriteWithmethodBtn =new cc.Sprite("#com_btn_blue.png");
            var scale9SpriteWithmethodBtn = new cc.Scale9Sprite("com_btn_blue.png");
            var methodBtn = new cc.ControlButton(scale9SpriteWithmethodBtn);
            methodBtn.setPreferredSize(cc.size(spriteWithmethodBtn.width, spriteWithmethodBtn.height));
            methodBtn.addTargetWithActionForControlEvents(this, function()
            {
                playEffect(res.BUTTON_SOUNDS);
                var bg=null;
                var testJSB = new JSB.JSBinding();
                testJSB.retain();
                testJSB.openUrl(1,1,getAd_Title1_URL());
                testJSB.release();
            }.bind(methodBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
            methodBtn.x = size.width/2+300;
            methodBtn.y =  size.height/2+150;
            methodBtn.setTag(1003);
            this.addChild(methodBtn, 6);

            var spriteWithmethod = new cc.Sprite("#home_btn_AD_icon.png");
            spriteWithmethod.x = methodBtn.width/2-5;
            spriteWithmethod.y = methodBtn.height/2+20;
            methodBtn.addChild(spriteWithmethod);

            var mainADTitle = new cc.LabelTTF(getAd_Title1_Text(),getFONT_FZCY_M03SStr(),20);
            mainADTitle.x = methodBtn.width/2-3;
            mainADTitle.y = methodBtn.height/2-15;
            methodBtn.addChild(mainADTitle);


            var spriteWithmethoddemon = new cc.Sprite("#home_btn_strategy_demon.png");
            spriteWithmethoddemon.x = methodBtn.width/2-5;
            spriteWithmethoddemon.y = methodBtn.height/2+52;
            methodBtn.addChild(spriteWithmethoddemon);
        }




        var spriteWithLand = new cc.Sprite("#home_bg_land.png");
        spriteWithLand.x = size.width/2;
        spriteWithLand.y = 0;
        spriteWithLand.anchorY = 0;
        this.addChild(spriteWithLand, 4);

        //投诉
        var spriteWithcomplainBtn =new cc.Sprite("#home_btn_complaint.png");
        var scale9SpriteWithcomplainBtn =new cc.Scale9Sprite("home_btn_complaint.png");
        var complainBtn = new cc.ControlButton(scale9SpriteWithcomplainBtn);
        complainBtn.setPreferredSize(cc.size(spriteWithcomplainBtn.width, spriteWithcomplainBtn.height));
        complainBtn.addTargetWithActionForControlEvents(this,function()
        {
            playEffect(res.BUTTON_SOUNDS);
            var testJSB = new JSB.JSBinding();
            testJSB.retain();
            testJSB.showFeedBack();
            testJSB.release();
        }.bind(complainBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
        complainBtn.x = size.width/2-65;
        complainBtn.y = size.height/2-240;
        complainBtn.setTag(1004);
        this.addChild(complainBtn, 6);


        //商店按钮


        var spriteWithmarketBtn =new cc.Sprite("#home_btn_market.png");
        var scale9SpriteWithmarketBtn =new cc.Scale9Sprite("home_btn_market.png");
        var marketBtn = new cc.ControlButton(scale9SpriteWithmarketBtn);
        marketBtn.setPreferredSize(cc.size(spriteWithmarketBtn.width, spriteWithmarketBtn.height));
        marketBtn.addTargetWithActionForControlEvents(this,function()
        {
            playEffect(res.BUTTON_SOUNDS);
            var market=new ShowMarketLayer();
            this.getParent().addChild(market,100);
        }.bind(marketBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
        marketBtn.x = size.width/2+75;
        marketBtn.y = size.height/2-240;
        marketBtn.setTag(1004);
        this.addChild(marketBtn, 6);
//基地要修改的

        //点子征集按钮
        if(getLauchCheck()==0){
            var spriteWithideaBtn =new cc.Sprite("#home_btn_idea.png");
            var scale9SpriteWithideaBtn =new cc.Scale9Sprite("home_btn_idea.png");
            var ideaBtn = new cc.ControlButton(scale9SpriteWithideaBtn);
            ideaBtn.setPreferredSize(cc.size(spriteWithideaBtn.width, spriteWithideaBtn.height));

            ideaBtn.addTargetWithActionForControlEvents(this,
                function(){
                    playEffect(res.BUTTON_SOUNDS);
                    cc.log("aaaaccc");
                    var testJSB = new JSB.JSBinding();
                    testJSB.retain();
                    testJSB.openUrl(8,0,"");
                    testJSB.release();
                }
                , cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
            ideaBtn.x = size.width/2-270;
            ideaBtn.y = size.height/2-240;
            ideaBtn.setTag(1005);
            this.addChild(ideaBtn, 6);
        }else{

            var spriteWithideaBtn =new cc.Sprite("#home_btn_about.png");
            var scale9SpriteWithideaBtn =new cc.Scale9Sprite("home_btn_about.png");
            var ideaBtn = new cc.ControlButton(scale9SpriteWithideaBtn);
            ideaBtn.setPreferredSize(cc.size(spriteWithideaBtn.width, spriteWithideaBtn.height));

            ideaBtn.addTargetWithActionForControlEvents(this,
                function(){
                    playEffect(res.BUTTON_SOUNDS);
                    ShowAboutUsPanel(ideaBtn.getParent().getParent(),0);
                }
                , cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
            ideaBtn.x = size.width/2-270;
            ideaBtn.y = size.height/2-240;
            ideaBtn.setTag(1005);
            this.addChild(ideaBtn, 6);
        }


        //设置按钮

        var spriteWithsettingBtn =new cc.Sprite("#home_btn_setting.png");
        var scale9SpriteWithsettingBtn =new cc.Scale9Sprite("home_btn_setting.png");
        var settingBtn = new cc.ControlButton(scale9SpriteWithsettingBtn);
        settingBtn.setPreferredSize(cc.size(spriteWithsettingBtn.width, spriteWithsettingBtn.height));
        settingBtn.addTargetWithActionForControlEvents(this, function(){
            playEffect(res.BUTTON_SOUNDS);
            ShowSettingPanel(this.getParent());
        }.bind(settingBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
        settingBtn.x = size.width/2+270;
        settingBtn.y = size.height/2-240;
        settingBtn.setTag(1006);
        this.addChild(settingBtn, 6);

        //免费金币，积分墙

//        if(cc.sys.os == "Android")
//        {
//            var spriteWithfreeGoldBtn =new cc.Sprite("#game_btn_free_gold.png");
//            var scale9SpriteWithfreeGoldBtn =new cc.Scale9Sprite("game_btn_free_gold.png");
//            var freeGoldBtn = new cc.ControlButton(scale9SpriteWithfreeGoldBtn);
//            freeGoldBtn.setPreferredSize(cc.size(spriteWithfreeGoldBtn.width, spriteWithfreeGoldBtn.height));
//            freeGoldBtn.addTargetWithActionForControlEvents(this,  function(){
//                playEffect(res.BUTTON_SOUNDS);
//                var testJSB = new JSB.JSBinding();
//                testJSB.retain();
//                testJSB.showListWallViewController();
//                testJSB.release();
//            }, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
//            freeGoldBtn.setAnchorPoint(0, 0.5);
//            freeGoldBtn.x = 0;
//            freeGoldBtn.y = size.height/2;
//            freeGoldBtn.setTag(1001);
//            this.addChild(freeGoldBtn, 6);
//        }




        this.runAction(new cc.Sequence(new cc.DelayTime(2),new cc.CallFunc(function(){
            var testJSB23 = new JSB.JSBinding();
            testJSB23.retain();
            testJSB23.coin();
            testJSB23.release();
        })));


//        this.runAction(new cc.Sequence(new cc.DelayTime(0.5),new cc.CallFunc(function(){
//            var testJSB16 = new JSB.JSBinding();
//            testJSB16.retain();
//            testJSB16.initInterstitialAd();
////            PlatformHandler::getInstance()->initAll();
//            testJSB16.release();
//        })));








        //-------------//

        this.scheduleOnce(this.timeCallBack, 2);
        this.scheduleUpdate();
    },
    update:function(dt){
        if(spriteWithMountain1.x<=-spriteWithMountain1.getContentSize().width){
//                console.log("abc2");
            spriteWithMountain1.x = spriteWithMountain1.getContentSize().width;
        }
        if(spriteWithMountain2.x<=-spriteWithMountain2.getContentSize().width){
            spriteWithMountain2.x = spriteWithMountain2.getContentSize().width;
//                console.log("abc3");
        }
        if(spriteWithGrassland1.x<=-spriteWithGrassland1.getContentSize().width){
//                console.log("abc2");
            spriteWithGrassland1.x = spriteWithGrassland1.getContentSize().width;
        }
        if(spriteWithGrassland2.x<=-spriteWithGrassland2.getContentSize().width){
            spriteWithGrassland2.x = spriteWithGrassland2.getContentSize().width;
//                console.log("abc3");
        }
        if(spriteWithCloudLayer1.x<=-spriteWithCloudLayer1.getContentSize().width){
//                console.log("abc2");
            spriteWithCloudLayer1.x = spriteWithCloudLayer1.getContentSize().width;
        }
        if(spriteWithCloudLayer2.x<=-spriteWithCloudLayer2.getContentSize().width){
            spriteWithCloudLayer2.x = spriteWithCloudLayer2.getContentSize().width;
//                console.log("abc3");
        }

        spriteWithMountain1.x = spriteWithMountain1.x-1;
        spriteWithMountain2.x = spriteWithMountain2.x-1;

        spriteWithGrassland1.x = spriteWithGrassland1.x-2;
        spriteWithGrassland2.x = spriteWithGrassland2.x-2;

        spriteWithCloudLayer1.x = spriteWithCloudLayer1.x-1.5;
        spriteWithCloudLayer2.x = spriteWithCloudLayer2.x-1.5;
//            console.log("abc");
    },


    timeCallBack:function(dt) {

        /*
         cc.loader.loadTxt("res/passionConf.csv", function(err, data){
         if(err) return console.log("load failed");

         var arr=[];
         //success
         for(var i=1;i<=24;i++){
         //                console.log(CSVAnalyser(data, i, "title"));
         var index=CSVAnalyser(data, i, "index");
         var title=CSVAnalyser(data, i, "title");
         arr.push([index,title]);
         }

         cc.director.runScene(new PassionScene(arr));
         });
         */

//        cc.director.runScene(new PassionScene());
    }
});

var MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainSceneLayer();
        this.addChild(layer);
    }
});
