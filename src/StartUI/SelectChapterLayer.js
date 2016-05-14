/**
 * Created by George on 16/5/12.
 */
var unLock_KEY="unLock_key";
function getUnLockStatus(){
    var unlockStatus=cc.sys.localStorage.getItem(unLock_KEY);
    if(unlockStatus==null || unlockStatus==""){
        unlockStatus=0;
        setUnLockStatus(0);
    }

    cc.log("~~~~1~~~"+cc.sys.localStorage.getItem(unLock_KEY));
    return unlockStatus;
}
function setUnLockStatus(bool){
    cc.sys.localStorage.setItem(unLock_KEY,bool);

    unLock = cc.sys.localStorage.getItem(unLock_KEY);
    cc.log("~~~~2~~~"+cc.sys.localStorage.getItem(unLock_KEY));
}




var unLock=getUnLockStatus()==1?true:false;

var PassionSceneLayer = cc.Layer.extend({
    sprite:null,
    curIndex:0,
    maxIndex:6,
    curX:0,
    moveX:0,
    size:null,
    scrollView:null,
    _points:[],
    click_flag:true,
    preBtn:null,
    nextBtn:null,
    touch_flag:false,
//    iconUrlStr:[],
//    downloadUrlStr:[],

    onEnter:function(){
        this._super();

    },


    ctor:function (arr) {
        this._super();

        var Caches=[
            res.bomb_plist,
            res.normal_plist,
            res.CutFood_plist
        ];

        for(var i= 0,len=Caches.length;i<len;i++){
            cc.spriteFrameCache.addSpriteFrames(Caches[i]);
        }

        playBackgroundMusic("res/music/music_passion_1.mp3",true);

        cc.log("~~~~~arrUpdate.length:"+arrUpdate.length);

        if(arrUpdate.length>0){
            this.maxIndex+=Math.ceil(arrUpdate.length/4);
        }
//        else{
//            this.maxIndex=7;
//        }

        var size = cc.winSize,
            _this=this;
        this.size=cc.winSize;

        //背景
        var mainframe = new cc.Sprite("#select_level_bg.png");
        mainframe.x = size.width/2;
        mainframe.y = size.height/2;
        this.addChild(mainframe, -1);

//UC渠道要改的
//        //文字
//        var work=new cc.Sprite("#select_level_work.png");
//        work.attr({
//            x:size.width/2,
//            y:70
//        });
//        this.addChild(work);

        //云
        var leftCloud=new cc.Sprite("#select_level_left_cloud.png");
        leftCloud.attr({
            anchorX:1,
            anchorY:0,
            x:size.width/2-335,
            y:-35
        });
        this.addChild(leftCloud);

        var rightCloud=new cc.Sprite("#select_level_right_cloud.png");
        rightCloud.attr({
            anchorX:0,
            anchorY:0,
            x:size.width/2+335,
            y:-35
        });
        this.addChild(rightCloud,1);

        var cloud1=new cc.Sprite("#home_cloud.png");
        cloud1.attr({
            x:size.width/2-500,
            y:420
        });
        this.addChild(cloud1);

        var cloud2=new cc.Sprite("#home_cloud.png");
        cloud2.attr({
            x:size.width/2+520,
            y:340
        });
        this.addChild(cloud2);

        //波浪
        for(var i=0;i<2;i++){
            var sea=new cc.Sprite("#select_level_sea.png");
            sea.attr({
                anchorX:0,
                anchorY:0,
                x:i*1200,
                y:0
            });
            this.addChild(sea,2);
            sea.runAction(cc.sequence(cc.moveBy(20,cc.p(-1200,0)),cc.place(i*1200,0)).repeatForever());
        }

        //返回按钮
        var backBtn9Sprite = new cc.Scale9Sprite('select_level_btn_back.png');
        var backBtn = new cc.ControlButton(backBtn9Sprite);
        backBtn.attr({
            width:170,
            height:158,
            x:size.width/2-320,
            y:100
        });
        backBtn.setPreferredSize(cc.size(backBtn.width, backBtn.height));
        backBtn.addTargetWithActionForControlEvents(this, function(){
            playEffect(res.BUTTON_SOUNDS);
            cc.director.runScene(new MainScene());
        }, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
        this.addChild(backBtn);
        var move1=cc.moveBy(1,cc.p(0,5));
        var sequence1=cc.sequence(move1,move1.reverse()).repeatForever();
        backBtn.runAction(sequence1);


        //关卡选择广告位
        if(getLauchCheck()==0 && getAd_Title2_Text() != ""){
            var shareBtn9Sprite=new cc.Scale9Sprite('select_level_btn_AD_frame.png');
            var shareBtn = new cc.ControlButton(shareBtn9Sprite);
            shareBtn.attr({
                width:180,
                height:128,
                x:size.width/2+310,
                y:90
            });
            shareBtn.setPreferredSize(cc.size(shareBtn.width, shareBtn.height));
            shareBtn.addTargetWithActionForControlEvents(this, function(){
                playEffect(res.BUTTON_SOUNDS);

                var testJSB = new JSB.JSBinding();
                testJSB.retain();
                testJSB.openUrl(2,1,getAd_Title2_URL());
                testJSB.release();

            }, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
            this.addChild(shareBtn);
            shareBtn.runAction(sequence1.clone());

            var shareADTitle = new cc.LabelTTF(getAd_Title2_Text(),getFONT_FZCY_M03SStr(),20);
            shareADTitle.x = shareBtn.width/2-15;
            shareADTitle.y = shareBtn.height/2-25;
            shareBtn.addChild(shareADTitle);
        }



        //抽奖
        var lottery9Sprite=new cc.Scale9Sprite("com_btn_red.png");
        var lottery = new cc.ControlButton(lottery9Sprite);
        lottery.attr({
            width:92,
            height:98,
            x:size.width/2-370,
            y:580
        });
        lottery.setPreferredSize(cc.size(lottery.width, lottery.height));
        lottery.addTargetWithActionForControlEvents(this, function(){
            playEffect(res.BUTTON_SOUNDS);
            var data=getTime();
            cc.log(data);
            var hour=data.substring(16,18);
            var day=data.substring(8,10);
            cc.log(day);
            var dataNow=new Date();
            cc.log(day);
            cc.log(dataNow.getDate());
            if(day!=dataNow.getDate())
            {
                setLottery(3);
                setTime();
            }
            ShowTurnplatePanel(this.getParent());
        }, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
        this.addChild(lottery,6);

        var line=new cc.Sprite("#select_level_btn_community_line.png");
        line.attr({
            x:43,
            y:-41
        });
        lottery.addChild(line);

        var lottery_icon=new cc.Sprite("#select_level_btn_lottery_icon.png");
        lottery_icon.attr({
            x:41,
            y:60
        });
        lottery.addChild(lottery_icon);

  //改包名去掉分享
//        //分享
//        var community9Sprite=new cc.Scale9Sprite("com_btn_red.png");
//        var community = new cc.ControlButton(community9Sprite);
//        community.attr({
//            width:92,
//            height:98,
//            x:size.width/2+370,
//            y:580
//        });
//        community.setPreferredSize(cc.size(community.width, community.height));
//        community.addTargetWithActionForControlEvents(this, function(){
//            playEffect(res.BUTTON_SOUNDS);
//            var testJSB = new JSB.JSBinding();
//            testJSB.retain();
//            testJSB.showWCImageContent(0,1,"",0);
//            testJSB.release();
//        }, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
//        this.addChild(community,6);
//
//        var line2=new cc.Sprite("#select_level_btn_community_line.png");
//        line2.attr({
//            x:43,
//            y:-41
//        });
//        community.addChild(line2);
//
//        var community_icon=new cc.Sprite("#select_level_btn_share_icon.png");
//        community_icon.attr({
//            x:41,
//            y:60
//        });
//        community.addChild(community_icon);


        //关卡按钮
        var scrollView=new ccui.ScrollView();
        scrollView.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        scrollView.setTouchEnabled(true);
        scrollView.setInertiaScrollEnabled(false);
        scrollView.setBounceEnabled(true);
        scrollView.setContentSize(cc.size(size.width,size.height));
        scrollView.setInnerContainerSize(cc.size(size.width*this.maxIndex,size.height));

        scrollView.attr({
            anchorX:0.5,
            anchorY:0.5,
            x:size.width/2,
            y:size.height/2+30
        });

        this.addChild(scrollView,5,1000);

        scrollView.addTouchEventListener(this.onTouchEvent,this);

        this.scrollView=scrollView;


//        var img = new Image();
//        img.src = url;
//        if(img.complete){
//            cc.log("图片有缓存");
//        }
//        else {
//            alert('开始获取图片');
//            img.onload = function() {
//                cc.log("图片获取成功");
//            };
//        }
        //获得url图片和下载地址
//        var iconUrlStr=[];
//        var downloadUrlStr=[];
//        var testJSB2 = new JSB.JSBinding();
//        testJSB2.retain();
//        testJSB2.getDownloadUrl();
//        testJSB2.setDownloadUrl = function(str1){
//            cc.log("+++++++++++");
//            cc.log(str1);
//            var strSrc = str1;
//            var strArray = new Array();
//            strArray = strSrc.split('|');
//            cc.log(strArray[0]);//picture
//            cc.log(strArray[1]);//loadurl
//            cc.log("+++++++++++");
//            iconUrlStr.push(strArray[0]);
//            downloadUrlStr.push(strArray[1]);
//
//        }


        var icon_num,
            levelTag,
            level_icon,
            level_lock;
        //更新地址
        var storagePath = jsb.fileUtils.getWritablePath();

        for(var k=0;k<this.maxIndex;k++){

            for(var j=0;j<4;j++){
                var i=k*4+j+1;

                var level9Sprite;

                if(i<=24){
                    level9Sprite=new cc.Scale9Sprite('select_level_frame.png');
                }
                else{
                    icon_num=i-25;
                    if(icon_num==arrUpdate.length)break;
                    if(jsb.fileUtils.isFileExist(storagePath+arrUpdate[icon_num][1])){

                        level9Sprite=new cc.Scale9Sprite(storagePath+arrUpdate[icon_num][1]);
                    }else{
                        level9Sprite=new cc.Scale9Sprite(res.newgame_normal);
                    }
                }
                var level = new cc.ControlButton(level9Sprite);
                level.attr({
                    width:284,
                    height:222,
                    x:size.width*k+size.width/2+(j%2==0?-152:152),
                    y:size.height/(j<2?1.4:2.9)
                });
                level.setPreferredSize(cc.size(level.width, level.height));
                level.addTargetWithActionForControlEvents(this, function(){
                    playEffect(res.BUTTON_SOUNDS);

                    if(parseInt(getPassionStatusByLevel(this.getTag()-1))!=1 && this.getTag()>1 && this.getTag()<=24 || (this.getTag()>9 && !unLock && cc.sys.os=="Android") && (cc.sys.os=="Android" || cc.sys.os=="iOS")) {

                        if(cc.sys.os=="iOS"){
                            UnlockBuyPanel(_this.parent);
                        }else{

                            if (this.getTag() == 10 && getPassionStatusByLevel(9) == "1") {
                                UnlockBuyPanel(_this.parent);
                            }
                        }

                    }else{

                        if (this.getTag() <= 24) {
//                        var scene=sceneList[_arr[this.getTag()-1][0]-1].sceneName();
                            cc.log("_arr[this.getTag()-1][0] " + _arr[this.getTag() - 1][0]);
                            jumpToSceneByLevel(this.getTag(), _arr, 0);

                            cc.log(this.getTag());
//                        cc.director.runScene(scene);
                        } else {
                            cc.log(this.getTag());
                            var testJSB = new JSB.JSBinding();
                            testJSB.retain();
                            testJSB.openUrl(this.getTag(), 1, "");
                            testJSB.release();


                        }
                    }

                }.bind(level), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
                level.setTag(i);
                scrollView.addChild(level);

                //关卡图
                if(i<=24){
                    levelTag=(_arr[level.getTag()-1][0]);
                    icon_num=levelTag<10?"0"+levelTag:levelTag;
                    level_icon=new cc.Sprite("#k_icon_"+icon_num+".png");
                    level_icon.attr({
                        anchorX:0,
                        anchorY:0,
                        x:12,
                        y:18
                    });
                    level.addChild(level_icon,-1);
                }else{

                    cc.log("i am coming");
//                    var xmlhttp = null;
//                    xmlhttp = new XMLHttpRequest();
//
//                    xmlhttp.open("get", "http://neoimaging.beareyes.com.cn/png2/ni_png_2_1518.png", false);
//                    xmlhttp.send(null);
//                    xmlhttp.responseType =
//                    xmlhttp.onreadystatechange = callback()


//                    var http1 =  new cc.getXMLHttpRequest();
//                    ge
//                                        cc.log("i am coming");
//                                        var pSprite = cc.Spr
//                    var img = new cc.Image();
//
////                    var img = new Image();
//                    img.src = "http://neoimaging.beareyes.com.cn/png2/ni_png_2_1518.png";
////                        this.iconUrlStr.at[i-25];
//                    if(img.complete){
//                        cc.log("图片有缓存");
//                    }
//                    else {
////                    alert('开始获取图片');
//                    img.onload = function() {
//                        cc.log("图片获取成功");
//                        }
//                    }

                    if(arrUpdate.length==0){
//                        if(i<=28){
//                            icon_num="0"+(i-24);
//                            level_icon=new cc.Sprite("#select_level_more_"+icon_num+".png");
//                            level_icon.attr({
//                                anchorX:0,
//                                anchorY:0
//                            });
//                            level.addChild(level_icon);
//                        }

                    }else{
                        //文字
                        icon_num=i-25;
                        if(icon_num<arrUpdate.length){

                            var newgame_title='';

                            switch(arrUpdate[icon_num][4]){
                                case "0":
                                    newgame_title="未安装";
                                    break;
                                case "1":
                                    newgame_title="立即体验";
                                    break;
                                default :
                                    break;
                            }
                            var game_flag;
                            switch(arrUpdate[icon_num][3]){
                                case "1":
                                    game_flag=new cc.Sprite(res.newgame_new);
                                    game_flag.attr({
                                        anchorX:1,
                                        anchorY:1,
                                        x:level.getBoundingBox().width,
                                        y:level.getBoundingBox().height
                                    });
                                    level.addChild(game_flag);
                                    break;
                                case "2":
                                    game_flag=new cc.Sprite(res.newgame_hot);
                                    game_flag.attr({
                                        anchorX:1,
                                        anchorY:1,
                                        x:level.getBoundingBox().width,
                                        y:level.getBoundingBox().height
                                    });
                                    level.addChild(game_flag);
                                    break;
                                case "3":
                                    newgame_title="即将上线";
                                    break;
                                case "4":
                                    newgame_title="正在使用";
                                    break;
                                default :
                                    break;
                            }

                            cc.log("newgame_title:"+newgame_title);

                            var game_title = new cc.LabelTTF(newgame_title,getFONT_FZCY_M03SStr(),28);

                            game_title.attr({
                                x:level.width/2,
                                y:45,
                                color:cc.color(75,31,4),
                                strokeStyle:cc.color(75,31,4)
                            });
                            level.addChild(game_title);
                        }

                    }


                }

                //关卡名

//                var req = new XMLHttpRequest();
//                req.open('get', 'res/font/Roboto-Black.ttf', true);
//                req.responseType = 'arraybuffer';
//                req.onload = function () {
//                    var arrayBuffer = req.response;
//
//                    var ab = new ArrayBuffer(arrayBuffer.length);
//                    var view = new Uint8Array(ab);
//                    for (var i = 0; i < buffer.length; ++i) {
//                        view[i] = buffer[i];
//                    }
//
//                    var font = opentype.parseFont(ab);
//                    if (!font.supported) {
//                        alert('This font is not supported.');
//                    }
//                    var ctx = document.getElementById('canvas').getContext('2d');
//                    // The path is always placed on the baseline, so move it down to make it visible.
//                    var path = font.getPath('Hello, World!', {x: 0, y: 150, fontSize: 72});
//                    path.draw(ctx);
//                };
//                req.send(null);


//                var font = new Font();
//                font.onload = loaded;
//                font.onerror = function(err) { alert(err); }
//                font.fontFamily ="FZSEJW--GB1-0";
//                font.src = "res/font/FZSEJW--GB1-0.ttf";

                if(i<=24){
                    var level_title = new cc.LabelTTF(arr[i-1][1],getFONT_FZCY_M03SStr(),28);

                    level_title.attr({
                        x:level.width/2+15,
                        y:45,
                        color:cc.color(173,199,179),
                        strokeStyle:cc.color(173,199,179)
                    });
                    level.addChild(level_title);

                    //关卡编号
                    var level_number_bg=new cc.Sprite("#select_level_feces.png");
                    level_number_bg.attr({
                        x:42,
                        y:50
                    });
                    level.addChild(level_number_bg);

                    var level_number=new cc.LabelAtlas(i,res.select_level_figure,18,28,'0');
                    level_number.attr({
                        x:i<10?31:21,
                        y:31
                    });
                    level.addChild(level_number);

                }


                //判断关卡是否开启
                if(parseInt(getPassionStatusByLevel(i-1))!=1 && i>1 && i<=24){
//                    level.setEnabled(false);

                    level_lock=new cc.Sprite("#select_level_deblocking.png");
                    level_lock.attr({
                        x:level.getBoundingBox().width/2,
                        y:level.getBoundingBox().height/2
                    });
                    level.addChild(level_lock);
                }


            }

        }


        cc.log("_preSelectLevel:"+_preSelectLevel);

        var pageIndex=0;
        if(_preSelectLevel<=4){
            pageIndex=0;
            this.curIndex=0;
        }else if(_preSelectLevel<=8){
            pageIndex=1;
            this.curIndex=1;
        }else if(_preSelectLevel<=12){
            pageIndex=2;
            this.curIndex=2;
        }else if(_preSelectLevel<=16){
            pageIndex=3;
            this.curIndex=3;
        }else if(_preSelectLevel<=20){
            pageIndex=4;
            this.curIndex=4;
        }else if(_preSelectLevel<24){
            pageIndex=5;
            this.curIndex=5;
        }else if(_preSelectLevel==24){
            pageIndex=6;
            this.curIndex=6;
        }

        scrollView.getInnerContainer().runAction(cc.place(cc.p(-size.width*pageIndex,0)));

        //页数指示
        this._points=[];
        for(var i=0;i<this.maxIndex;i++){
            var point=new cc.Sprite("#select_level_point_01.png");
            point.attr({
                x:size.width/2-33*(this.maxIndex/2)+i*35,
                y:115
            });
            this.addChild(point);
            this._points.push(point);
        }
        this._points[this.curIndex].setSpriteFrame("select_level_point_02.png");

        //换页按钮
        var preBtn9Sprite=new cc.Scale9Sprite("select_level_next_page_left.png");
        this.preBtn = new cc.ControlButton(preBtn9Sprite);
        this.preBtn.attr({
            width:48,
            height:62,
            x:size.width/2-370,
            y:370
        });
        this.preBtn.setPreferredSize(cc.size(this.preBtn.width, this.preBtn.height));
        this.preBtn.addTargetWithActionForControlEvents(this, function(){
            playEffect(res.BUTTON_SOUNDS);
            if(this.click_flag==true) {
                this.click_flag=false;
                this.pagePre();
            }
        }, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
        this.addChild(this.preBtn,10);

        var nextBtn9Sprite=new cc.Scale9Sprite("select_level_next_page_right.png");
        this.nextBtn = new cc.ControlButton(nextBtn9Sprite);
        this.nextBtn.attr({
            width:48,
            height:62,
            x:size.width/2+370,
            y:370
        });
        this.nextBtn.setPreferredSize(cc.size(this.nextBtn.width, this.nextBtn.height));
        this.nextBtn.addTargetWithActionForControlEvents(this, function(){
            playEffect(res.BUTTON_SOUNDS);
            if(this.click_flag==true){
                this.click_flag=false;
                this.pageNext();
            }
        }, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
        this.addChild(this.nextBtn,10);

        this.setPoint();

    },
    onTouchEvent:function(sender,type){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                this.touch_flag=true;
                this.curX=sender.getInnerContainer().getPositionX();
                this.moveX=0;
                break;
            case ccui.Widget.TOUCH_MOVED:
                this.moveX=sender.getInnerContainer().getPositionX()-this.curX;
                break;
            case ccui.Widget.TOUCH_ENDED:
                if(this.touch_flag==true){
                    this.touch_flag=false;
                    this.unscheduleAllCallbacks();
                    if(this.moveX!=0){
                        if(this.moveX<-50){
                            this.pageNext();
                        }else if(this.moveX>50){
                            this.pagePre();
                        }else{
                            this.scheduleOnce(function(){sender.getInnerContainer().runAction(cc.moveTo(0.15,cc.p(-this.size.width*this.curIndex,0)))},0.25);
                        }
                    }
                }

                break;
            case ccui.Widget.TOUCH_CANCELED:    //当触摸在触摸的按钮外结束时
                if(this.touch_flag==true) {
                    this.touch_flag=false;
                    this.unscheduleAllCallbacks();
                    if (this.moveX != 0) {
                        if (this.moveX < -50) {
                            this.pageNext();
                        } else if (this.moveX > 50) {
                            this.pagePre();
                        } else {
                            this.scheduleOnce(function () {
                                sender.getInnerContainer().runAction(cc.moveTo(0.15, cc.p(-this.size.width * this.curIndex, 0)))
                            }, 0.25);
                        }
                    }
                }
                break;
            default:
                break;
        }
    },


    pageNext:function(){
        this.unscheduleAllCallbacks();

        if(this.curIndex<(this.maxIndex-1)){
            this.curIndex++;
            if(this.curIndex>(this.maxIndex-1))this.curIndex=this.maxIndex-1;
            this.scrollView.getInnerContainer().runAction(cc.moveTo(0.15,cc.p(-this.size.width*this.curIndex,0)));
            this.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function(){
                this.click_flag=true;
            },this)));
        }else{
            this.click_flag=true;
        }

        this.setPoint();
    },
    pagePre:function(){
        this.unscheduleAllCallbacks();

        if(this.curIndex>0){
            this.curIndex--;
            if(this.curIndex<0)this.curIndex=0;
            this.scrollView.getInnerContainer().runAction(cc.moveTo(0.15,cc.p(-this.size.width*this.curIndex,0)));
            this.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function(){
                this.click_flag=true;
            },this)));
        }else{
            this.click_flag=true;
        }
        this.setPoint();
    },
    setPoint:function(){
        for(var i=0;i<this._points.length;i++){
            this._points[i].setSpriteFrame("select_level_point_01.png");
        }
        this._points[this.curIndex].setSpriteFrame("select_level_point_02.png");

        if(this.curIndex>=(this.maxIndex-1)){
            this.nextBtn.visible=false;
        }else{
            this.nextBtn.visible=true;
        }

        if(this.curIndex==0){
            this.preBtn.visible=false;
        }else{
            this.preBtn.visible=true;
        }
    }
});

var _arr=[];
var _preSelectLevel = null;
var PassionScene = cc.Scene.extend({
    ctor:function(arr,preSelectLevel){
        this._super();
        console.log("page: " + preSelectLevel);
        if(_arr.length == 0)
            _arr=arr;
        _preSelectLevel = preSelectLevel;

    },
    onEnter:function () {
        this._super();

        var layer = new PassionSceneLayer(_arr);
        this.addChild(layer);
    }
});

function jumpToSceneByLevel(level,_arr, isNoPreScene){

    var _level = level-1;
    cc.log("测试"+_level+"测试");

    var curLevel=(_arr[_level][0])<10?"0"+(_arr[_level][0]):(_arr[_level][0]);
//    var curLevel=_arr[level-1][0]<10?"0"+_arr[level-1][0]:_arr[level-1][0];


    cc.log("add spriteframe now");
    cc.log("level loading: " + "res/k"+curLevel+"/k_"+curLevel+".plist");
    cc.spriteFrameCache.addSpriteFrames("res/k"+curLevel+"/k_"+curLevel+".plist");

    cc.log("~~level:"+curLevel);


    switch(_arr[level-1][0]){
        case "1":
            cc.spriteFrameCache.addSpriteFrames(res.k_06_plist);
            cc.spriteFrameCache.addSpriteFrames(res.k_09_plist);
            cc.spriteFrameCache.addSpriteFrames(res.k_16_plist);
            cc.spriteFrameCache.addSpriteFrames(res.k_19_plist);
            break;
        case "2":
            cc.spriteFrameCache.addSpriteFrames(res.k_15_plist);
            break;
        case "3":
            cc.spriteFrameCache.addSpriteFrames(res.k_04_plist);
            break;
        case "7":
            cc.spriteFrameCache.addSpriteFrames(res.k_11_plist);
            cc.spriteFrameCache.addSpriteFrames(res.k_21_plist);
            cc.spriteFrameCache.addSpriteFrames(res.k_23_plist);
            break;
        case "8":
            cc.spriteFrameCache.addSpriteFrames(res.k_19_plist);
            break;
        case "9":
            cc.spriteFrameCache.addSpriteFrames(res.k_14_plist);
            cc.spriteFrameCache.addSpriteFrames(res.k_19_plist);
            break;
        case "10":
            cc.spriteFrameCache.addSpriteFrames(res.k_13_plist);
            cc.spriteFrameCache.addSpriteFrames(res.k_24_plist);
            break;
        case "14":
            cc.spriteFrameCache.addSpriteFrames(res.k_02_plist);
            cc.spriteFrameCache.addSpriteFrames(res.k_15_plist);
            cc.spriteFrameCache.addSpriteFrames(res.k_16_plist);
            break;
        case "16":
            cc.spriteFrameCache.addSpriteFrames(res.k_07_plist);
            break;
        case "21":
            cc.spriteFrameCache.addSpriteFrames(res.k_07_plist);
            cc.spriteFrameCache.addSpriteFrames(res.k_11_plist);
            cc.spriteFrameCache.addSpriteFrames(res.k_24_plist);
            break;
        case "23":
            cc.spriteFrameCache.addSpriteFrames(res.k_21_plist);
            cc.spriteFrameCache.addSpriteFrames(res.k_09_plist);
            break;
        case "22":
            cc.spriteFrameCache.addSpriteFrames(res.k_09_plist);
            break;
        case "24":
            cc.spriteFrameCache.addSpriteFrames(res.k_12_plist);
            break;
        default:
            break;

    }

    var scene=sceneList[_arr[level-1][0]-1].sceneName();
    cc.director.runScene(new passionPreScene(scene, level, _arr, isNoPreScene));
//    cc.director.runScene(scene);
}

function passionPreScene(scene, level, _arr, isNoPreScene){


    if(isNoPreScene == 1){
        cc.log("is director jumpfff"+ level);

        var scene2=sceneList[_arr[level-1][0]-1].sceneName();
        cc.director.runScene(scene2);
        cc.log("is director jumpfff"+ level);

        return;
    }else{
        cc.log("isn't director jump");
    }


    var preScene = new cc.Scene();
    var layer = new cc.LayerColor(cc.color(255, 0, 0, 255), 1200, cc.director.getWinSize().height);

    var spriteWithBg = new cc.Sprite("#loading_bg.png");
//    spriteWithBg.setVisible(false);
    spriteWithBg.setAnchorPoint(0,0.5);
//    spriteWithBg.x = spriteWithBg.getContentSize().width/2;
    spriteWithBg.y = spriteWithBg.getContentSize().height/2;
    layer.addChild(spriteWithBg,1);


    var spriteWithframe = new cc.Sprite("#loading_frame.png");
    spriteWithframe.x = spriteWithBg.getContentSize().width/2;
    spriteWithframe.y = spriteWithBg.getContentSize().height/2+80;
    layer.addChild(spriteWithframe,2);

    //标题文字
    var loadTitle=new cc.LabelTTF(level+"、"+_arr[level-1][1],getFONT_FZCY_M03SStr(),30);
    loadTitle.attr({
        anchorY:1,
        x:spriteWithframe.getBoundingBox().width/2-12,
        y:spriteWithframe.getBoundingBox().height-50,
        color:cc.color(27,131,115)
    });
    spriteWithframe.addChild(loadTitle);

    //提示文字
    var loadWord=new cc.LabelTTF(_arr[level-1][2],getFONT_FZCY_M03SStr(),26,cc.size(300,140),cc.TEXT_ALIGNMENT_CENTER);
    loadWord.attr({
        x:spriteWithframe.getBoundingBox().width/2-90,
        y:spriteWithframe.getBoundingBox().height/2-50
    });
    spriteWithframe.addChild(loadWord);

    //关卡图框
    var loadPicture=new cc.Sprite("#loading_level_picture.png");
    loadPicture.attr({
        x:spriteWithframe.getBoundingBox().width/2+160,
        y:spriteWithframe.getBoundingBox().height/2-32
    });
    spriteWithframe.addChild(loadPicture);

    //关卡图
    var picture=new cc.Sprite("#k_icon_"+(_arr[level-1][0]<10?"0"+_arr[level-1][0]:_arr[level-1][0])+".png");
    picture.attr({
        x:loadPicture.getBoundingBox().width/2-2,
        y:loadPicture.getBoundingBox().height/2+15,
        scale:0.6
    });
    loadPicture.addChild(picture);

    var spriteWithman = new cc.Sprite("#loading_man_body.png");
    spriteWithman.x = spriteWithBg.getContentSize().width/2;
    spriteWithman.y = spriteWithBg.getContentSize().height/2-180;
    layer.addChild(spriteWithman,3);

    var manEye = new cc.Sprite();
    manEye.x = spriteWithman.getContentSize().width/2-5;
    manEye.y = spriteWithman.getContentSize().height/2+70;
    spriteWithman.addChild(manEye);
    var animFrames1=[];
    for(var i=1;i<=2;i++){
        var frame=cc.spriteFrameCache.getSpriteFrame("loading_man_eyes_0"+i+".png");
        animFrames1.push(frame);
    }
    var animation1=new cc.Animation(animFrames1,0.15);
    var animate1=new cc.Animate(animation1);
    manEye.runAction(new cc.RepeatForever(animate1));


    //开玩按钮`

    var spriteWithstartPlayBtn =new cc.Sprite("#loading_btn_play.png");
    var scale9SpriteWithstartPlayBtn =new cc.Scale9Sprite("loading_btn_play.png");
    var startPlayBtn = new cc.ControlButton(scale9SpriteWithstartPlayBtn);
    startPlayBtn.setPreferredSize(cc.size(spriteWithstartPlayBtn.width, spriteWithstartPlayBtn.height));
    startPlayBtn.addTargetWithActionForControlEvents(this, function(){
        playEffect(res.BUTTON_SOUNDS);
        var scene2=sceneList[_arr[level-1][0]-1].sceneName();
        cc.director.runScene(scene2);

    }.bind(startPlayBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
    startPlayBtn.x = spriteWithman.getContentSize().width/2-10;
    startPlayBtn.y = spriteWithman.getContentSize().height/2-50;
    spriteWithman.addChild(startPlayBtn);




    //关卡加载广告位
    if(getLauchCheck()==0 && getAd_Title3_Text() != ""){
        var spriteWithADBtn =new cc.Sprite("#loading_btn_AD_frame.png");
        var scale9SpriteWithADBtn =new cc.Scale9Sprite("loading_btn_AD_frame.png");
        var ADBtn = new cc.ControlButton(scale9SpriteWithADBtn);
        ADBtn.setPreferredSize(cc.size(spriteWithADBtn.width, spriteWithADBtn.height));
        ADBtn.addTargetWithActionForControlEvents(this, function(){
            playEffect(res.BUTTON_SOUNDS);
            var testJSB = new JSB.JSBinding();
            testJSB.retain();
            testJSB.openUrl(3,1,getAd_Title3_URL());
            testJSB.release();

        }.bind(ADBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
        ADBtn.x = layer.getContentSize().width/2-336;
        ADBtn.y = 250;
        layer.addChild(ADBtn, 3);

        var ADTitle = new cc.LabelTTF(getAd_Title3_Text(),getFONT_FZCY_M03SStr(),20);
        ADTitle.x = ADBtn.width/2-10;
        ADTitle.y = ADBtn.height/2;
        ADBtn.addChild(ADTitle);
        ADTitle.setDimensions(cc.size(20,0));

        var spriteWithADStick =new cc.Sprite("#loading_handrail.png");
        spriteWithADStick.x = layer.getContentSize().width/2-325;
        spriteWithADStick.y = 250-50-50-30;
        layer.addChild(spriteWithADStick, 2);

    }


//    var spriteWithAD = new cc.Sprite("#pause_btn_back.png");
//    spriteWithAD.x = ADBtn.width/2-5;
//    spriteWithAD.y = ADBtn.height/2+10;
//    ADBtn.addChild(spriteWithAD);







    //返回按钮
    var spriteWithreturnBtn = new cc.Sprite("#com_btn_red.png");
    var scale9SpriteWithreturnBtn = new cc.Scale9Sprite("com_btn_red.png");
    var returnBtn = new cc.ControlButton(scale9SpriteWithreturnBtn);
    returnBtn.setPreferredSize(cc.size(spriteWithreturnBtn.width, spriteWithreturnBtn.height));
    returnBtn.addTargetWithActionForControlEvents(this, function(){
        playEffect(res.BUTTON_SOUNDS);
        cc.director.runScene(new PassionScene(null,level));
    }.bind(returnBtn), cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
    returnBtn.x = 600-(cc.director.getWinSize().width/2-80);
    returnBtn.y = 50;
    layer.addChild(returnBtn, 2);

    var spriteWithreturn = new cc.Sprite("#pause_btn_back.png");
    spriteWithreturn.x = returnBtn.width/2-5;
    spriteWithreturn.y = returnBtn.height/2+10;
    returnBtn.addChild(spriteWithreturn);


    layer.x = -(1200-cc.director.getWinSize().width)/2;
    preScene.addChild(layer);

    return preScene;
}






var sceneList=[
    {   //第一关场景
        sceneName:function(){
            return new HomeScene();
        }
    },
    {   //第二关场景
        sceneName:function(){

            return new FlyScene();
        }
    },
    {   //第三关场景
        sceneName:function(){
            return new BirdScene();
        }
    },
    {   //第四关场景
        sceneName:function(){
            return new NotwifiScene();
        }
    }
];