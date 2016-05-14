var arrUpdate=[];
//    ImgArr=[];

cc.game.onStart = function(){
    var winSize=cc.director.getVisibleSize();
//    if(winSize.width/winSize.height==1024/768){
    cc.view.setDesignResolutionSize(1024, 640, cc.ResolutionPolicy.FIXED_HEIGHT);
//    }else{
//        cc.view.setDesignResolutionSize(1136, 640, cc.ResolutionPolicy.FIXED_WIDTH);
//    }
    getMusicIsOpen();

    cc.director.setDisplayStats(false);








    //初始展示自售广告
    setSelfAD_Show(0);
    setAd_Title1_Text("");
    setAd_Title2_Text("");
    setAd_Title3_Text("");
    setAd_Title4_Text("");
    setAd_Title5_Text("");
    setLauchCheck(1);
    var testJSB = new JSB.JSBinding();
    testJSB.retain();
    testJSB.initFullScreenAd();
    testJSB.initBanner();
    testJSB.release();

    //test c++ to js
    var testJSB2 = new JSB.JSBinding();
    testJSB2.retain();
    testJSB2.getLauchCheck();
    testJSB2.getTitleText();
    testJSB2.CallBackLauchCheck = function(i,j){
        setLauchCheck(i);
    };
    testJSB2.postCommunityAvailable = function (i, j) {
        cc.log("ktplay按钮是否显示"+i);
        setCommunityAvailable(i);
    };
    testJSB2.selfADCALLBACK = function(str1){
        cc.log("qweqwe");
        cc.log(str1);
        var strSrc = str1;
        var strArray = new Array();
        strArray = strSrc.split('|');
        setSelfAD_Title(strArray[1]);
        setSelfAD_Content(strArray[2]);
        setSelfAD_URL(strArray[3]);
        cc.log(getSelfAD_URL());

    };
    
    testJSB2.setTitleText = function(str1){
        cc.log(str1);
        var strSrc = str1;
        var strArray = new Array();
        strArray = strSrc.split('|');
        cc.log("testtest");
        cc.log(strArray.length);

        for(var i = 0 ;i < strArray.length-1;i++){
            var str2Array = new Array();
            str2Array = strArray[i].split(",");
            switch(str2Array[0]){
                case "Home":setAd_Title1_Text(str2Array[1]);setAd_Title1_URL(str2Array[2]);break;
                case "GameSelectBottomLeft":setAd_Title2_Text(str2Array[1]);setAd_Title2_URL(str2Array[2]);break;
                case "GameLoddingPage":setAd_Title3_Text(str2Array[1]);setAd_Title3_URL(str2Array[2]);break;
                case "GamePageLeft":setAd_Title4_Text(str2Array[1]);setAd_Title4_URL(str2Array[2]);break;
                case "GameOverButton3":setAd_Title5_Text(str2Array[1]);setAd_Title5_URL(str2Array[2]);break;
            }
        }

        
//        setAd_Title1_Text(strArray[0]);
//        setAd_Title2_Text(strArray[1]);
//        setAd_Title3_Text(strArray[2]);
//        setAd_Title4_Text(strArray[3]);
//        setAd_Title5_Text(strArray[4]);

    };

    //绑定回到主界面，以及主界面返回游戏方法
    var testJSB3 = new JSB.JSBinding();
    testJSB3.retain();
    testJSB3.createForEnterOrForEnter();
    testJSB3.enterBackgroud = function(){
        cc.log("enterBackgroud");
        //音效


    };
    testJSB3.forEnterBackgroud = function(){
        cc.log("forEnterBackgroud" + getMusicIsOpen());
        if(getMusicIsOpen() == "0"){
            cc.log("am i in?");
            if(getIsPauseGame()=="0"){
                setSoundOpenOrNot(0);
            }
        }else{
            cc.log("am i not in?");
            if(getIsPauseGame()=="0") {
                setSoundOpenOrNot(1);
            }
        }
    };


    var testJSB4 = new JSB.JSBinding();
    testJSB4.retain();
    testJSB4.getDownloadUrl();
    testJSB4.setDownloadUrl = function(str1){
        cc.log("download data:"+str1);
        var strSrc = str1;
        var strArray = strSrc.split('|');
        var arrSize = (strArray.length-1)/5;
        cc.log(arrSize);
        var _arrUpdate = [];   //先声明一维
        for(var k=0;k<arrSize;k++){        //一维长度为i,i为变量，可以根据实际情况改变
            _arrUpdate[k]=[];    //声明二维，每一个一维数组里面的一个元素都是一个数组；
            for(var j=0;j<5;j++){      //一维数组里面每个元素数组可以包含的数量p，p也是一个变量；
                _arrUpdate[k][j]="";       //这里将变量初始化，我这边统一初始化为空，后面在用所需的值覆盖里面的值
            }
        }
        var arr_index = 0;
        for(var i = 0 ; i < arrSize;i++)
        {
            for(var j = 0 ; j < 5 ; j++)
            {
                if(strArray[arr_index] != null){
                    _arrUpdate[i][j] = strArray[arr_index];
                }
                arr_index++;
            }
        }



        cc.log("origin");
        for(var i=0 ; i < arrSize; i++)
        {

            for(var j = 0 ; j < 5 ; j++)
            {
                cc.log(_arrUpdate[i][j]);//picture
            }

        }


        var testJSB5 = new JSB.JSBinding();
        testJSB5.retain();
        testJSB5.addGold = function (i,j) {

            setGold((parseInt(getGold()) || 0) + i);
            var goldStr = "+"+i;
            ShowGoldChange(cc.director.getRunningScene(), goldStr);

        }
        



        arrUpdate=_arrUpdate;
//        if(arrUpdate.length>0){
//            setTimeout(function(){
//                for(var i=0;i<arrUpdate.length;i++){
//                    cc.loader.loadImg(arrUpdate[i][1], function (res, tex) {
//                        ImgArr.push(tex);
//                    });
//                }
//            },10);
//        }
    };
    
//    //(::)基地声音控制
//    var testJSB_music=new JSB.JSBinding();
//    testJSB_music.retain();
//    testJSB_music.gameVoiceCallBack = function (i){
//        cc.log("(::)in now------->在js中得数值"+ i);
//        if (i != 2) {
//            setSoundOpenOrNot(i);
//        }
//        testJSB_music.release();
//    };
//    testJSB_music.gameVoiceCallBack();

//    var testJSB6 = new JSB.JSBinding();
//    testJSB6.retain();
//    testJSB6.freePanel();
//    testJSB6.freeCallback=function(i,j){
//        cc.log("abchhh");
//        cc.log("freeCallback");
//        cc.log(i);
//        freenum=i;
//        testJSB6.release();
//    }




    cc.view.adjustViewPort(true);
    cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.director.runScene(new LoadingScene());

//    cc.LoaderScene.preload(g_resources, function () {
//
//
//        cc.director.runScene(new LoadingScene());
//
//    }, this);
};
cc.game.run();