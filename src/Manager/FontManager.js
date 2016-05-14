/**
 * Created by George on 16/5/14.
 */

//获取方正粗圆字体

function getFONT_FZCY_M03SStr (){
    return "res/font/FZSEJW--GB1-0.ttf";
}




function CSVAnalyser (str, row, key){
    var abc = getStrByRowAndKeyFromCSV(str,",", row, key);
//    console.log("what is abc: " + abc);
    return abc;

}
function getStrByRowAndKeyFromCSV( strData, strDelimiter, row, key ) {
    strDelimiter = (strDelimiter || ",");

    var objPattern = new RegExp(
        (
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
        "gi"
    );

    var arrData = [[]];

    var arrMatches = null;


    while (arrMatches = objPattern.exec( strData )){

        var strMatchedDelimiter = arrMatches[ 1 ];

        if (
            strMatchedDelimiter.length &&
            (strMatchedDelimiter != strDelimiter)
            ){

            arrData.push( [] );

        }


        if (arrMatches[ 2 ]){

            var strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
            );

        } else {

            var strMatchedValue = arrMatches[ 3 ];

        }


        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

//       console.log("arraydata size " + arrData[1].length);
    for(var i = 0; i<arrData[1].length; i++){
//        console.log("array data: " + arrData[1][i]);
//        console.log("key:"+ key);
//            console.log(i);

        if (arrData[1][i] == key){

//                console.log("yes it's me! " + arrData[row+1][i]);
            return  arrData[row+1][i]
        }
    }
    return  "";
//    return( arrData );

}

function CSVToArray( strData, strDelimiter ) {
    strDelimiter = (strDelimiter || ",");

    var objPattern = new RegExp(
        (
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
        "gi"
    );

    var arrData = [[]];

    var arrMatches = null;


    while (arrMatches = objPattern.exec( strData )){

        var strMatchedDelimiter = arrMatches[ 1 ];

        if (
            strMatchedDelimiter.length &&
            (strMatchedDelimiter != strDelimiter)
            ){

            arrData.push( [] );

        }


        if (arrMatches[ 2 ]){

            var strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
            );

        } else {

            var strMatchedValue = arrMatches[ 3 ];

        }


        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

//    cc.log(arrData);
    return arrData;

}


function getCSVValueByKeyAndIndex(strData, index, key) {
    var strDelimiter = ",";
    var objPattern = new RegExp(
        (
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
        "gi"
    );

    var arrData = [[]];

    var arrMatches = null;


    while (arrMatches = objPattern.exec( strData )){

        var strMatchedDelimiter = arrMatches[ 1 ];

        if (
            strMatchedDelimiter.length &&
            (strMatchedDelimiter != strDelimiter)
            ){

            arrData.push( [] );

        }


        if (arrMatches[ 2 ]){

            var strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
            );

        } else {

            var strMatchedValue = arrMatches[ 3 ];

        }


        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    var keyIndex = null;
    for(var i = 0; i <arrData[0].length;i++){
        if(arrData[1][i] == key){
            keyIndex = i;
        }
    }
    console.log("keyindex: "+ keyIndex);

    for(var i = 0; i<arrData.length; i++){
        if (arrData[i][0] == index){
            return  arrData[i][keyIndex];
        }
    }
    return  "";

}

function resumeAllNode() {
    var allArray = cc.director.getRunningScene().getChildren();

    var object = null;
    for(var i = 0; i<allArray.length; i++)
    {
        cc.log("i am here1 " + i);
        var layer = allArray[i];
        layer.onEnter();
    }
}
function pauseAllNode() {
    var allArray = cc.director.getRunningScene().getChildren();
    var object = null;
    for(var i = 0; i<allArray.length; i++)
    {
        cc.log("i am here2 " + i);
        var layer = allArray[i];
        layer.onExit();
    }
}
function unclockAllPassion() {
    for(var i = 1; i<=24; i++){
        setPassionStatusByLevel(i, 1);
    }
}
function unlockCheats(){
    setIsBuyCheat(1);
}

function setPanelAppearAnimation(panel)
{
    var sb = cc.ScaleBy(0.05, 1.2);
    panel.runAction(cc.sequence(sb,sb.reverse()));

}
function earthQuake(panel)
{
    panel.runAction(cc.sequence(cc.callFunc(function(){
        panel.setPositionY(panel.getPositionY()+10);
    }),cc.delayTime(0.1),cc.callFunc(function(){
        panel.setPositionY(panel.getPositionY()-20);
    }),cc.delayTime(0.1),cc.callFunc(function(){
        panel.setPositionY(panel.getPositionY()+10);
    })));
}
