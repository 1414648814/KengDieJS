/**
 * Created by George on 16/5/12.
 */

var KD_KEY_GOLD_STR = "kd_key_gold_str";
var KD_KEY_PASSION_STATUS_STR = "kd_key_passion_status_str";
var MUSIC_STATUS_STR = "music_status_str";
var USER_IS_REMOVEAD = "user_is_removead";
var USER_ADD_MONEY="user_add_money";
var USER_LOTTERY="user_lottery";
var KD_KEY_TIME_STR="kd_key_time_str";
var IS_BUY_CHEATS = "is_buy_cheats";
var CLICK_NUMBER = "click_number";
var AD_TITLE1_TEXT = "ad_title1_text";
var AD_TITLE2_TEXT = "ad_title2_text";
var AD_TITLE3_TEXT = "ad_title3_text";
var AD_TITLE4_TEXT = "ad_title4_text";
var IS_PAUSE_GAME = "is_pause_game";
var F16_DeadTime="f16_deadtime";
var AD_TITLE5_TEXT = "ad_title5_text";
var LAUCHCHECK= "lauchcheck";
var COMMUNITYAVAILABLE = "communityAvailable";
var AZLAUCHCHECK2= "azlauchcheck2";
var AZLAUCHCHECK= "azlauchcheck";
var NORMAL_GAME_STATUS_1="normal_game_status_1";
var NORMAL_GAME_STATUS_2="normal_game_status_2";
var NORMAL_GAME_STATUS_3="normal_game_status_3";
var NORMAL_GAME_STATUS_4="normal_game_status_4";
var SELFAD_TITLE_TEXT = "selfad_title_text";
var SELFAD_CONTENT_TEXT = "selfad_content_text";
var SELFAD_URL_TEXT = "selfad_url_text";
var SELFAD_SHOW = "selfad_show";
var AD_TITLE1_URL = "ad_title1_url";
var AD_TITLE2_URL = "ad_title2_url";
var AD_TITLE3_URL = "ad_title3_url";
var AD_TITLE4_URL = "ad_title4_url";
var AD_TITLE5_URL = "ad_title5_url";
var IS_FIRST_DISPLAY_ON_DEVICE = "is_first_display_on_device";
var GAME_VOICE  = "game_voice";

function getGame_Voice(){
    if(cc.sys.localStorage.getItem(GAME_VOICE) == null)
    {
        setGame_Voice(0);
    }
    return cc.sys.localStorage.getItem(GAME_VOICE);
}
function setGame_Voice(i){
    cc.sys.localStorage.setItem(GAME_VOICE,i);
}


function getIsUsedDisplayOnDevice(){
    if(cc.sys.localStorage.getItem(IS_FIRST_DISPLAY_ON_DEVICE)==null)
    {
        setAd_Title1_URL(0);
    }
    return cc.sys.localStorage.getItem(IS_FIRST_DISPLAY_ON_DEVICE);
}
function setIsUsedDisplayOnDevice(isFirstDisplay){
    cc.sys.localStorage.setItem(IS_FIRST_DISPLAY_ON_DEVICE,isFirstDisplay);
}


function getAd_Title1_URL(){
    if(cc.sys.localStorage.getItem(AD_TITLE1_URL)==null)
    {
        setAd_Title1_URL("");
    }
    return cc.sys.localStorage.getItem(AD_TITLE1_URL);
}
function setAd_Title1_URL(i){
    cc.sys.localStorage.setItem(AD_TITLE1_URL,i);
}
function getAd_Title2_URL(){
    if(cc.sys.localStorage.getItem(AD_TITLE2_URL)==null)
    {
        setAd_Title2_URL("");
    }
    return cc.sys.localStorage.getItem(AD_TITLE2_URL);
}
function setAd_Title2_URL(i){
    cc.sys.localStorage.setItem(AD_TITLE2_URL,i);
}

function getAd_Title3_URL(){
    if(cc.sys.localStorage.getItem(AD_TITLE3_URL)==null)
    {
        setAd_Title3_URL("");
    }
    return cc.sys.localStorage.getItem(AD_TITLE3_URL);
}
function setAd_Title3_URL(i){
    cc.sys.localStorage.setItem(AD_TITLE3_URL,i);
}

function getAd_Title4_URL(){
    if(cc.sys.localStorage.getItem(AD_TITLE4_URL)==null)
    {
        setAd_Title4_URL("");
    }
    return cc.sys.localStorage.getItem(AD_TITLE4_URL);
}
function setAd_Title4_URL(i){
    cc.sys.localStorage.setItem(AD_TITLE4_URL,i);
}

function getAd_Title5_URL(){
    if(cc.sys.localStorage.getItem(AD_TITLE5_URL)==null)
    {
        setAd_Title5_URL("");
    }
    return cc.sys.localStorage.getItem(AD_TITLE5_URL);
}
function setAd_Title5_URL(i){
    cc.sys.localStorage.setItem(AD_TITLE5_URL,i);
}

function getSelfAD_Show(){
    if(cc.sys.localStorage.getItem(SELFAD_SHOW)==null)
    {
        setSelfAD_Show(0);
    }
    return cc.sys.localStorage.getItem(SELFAD_SHOW);
}
function setSelfAD_Show(i){
    cc.sys.localStorage.setItem(SELFAD_SHOW,i);
}

function getSelfAD_Title(){
    if(cc.sys.localStorage.getItem(SELFAD_TITLE_TEXT)==null)
    {
        setSelfAD_Title(0);
    }
    return cc.sys.localStorage.getItem(SELFAD_TITLE_TEXT);
}
function setSelfAD_Title(i){
    cc.sys.localStorage.setItem(SELFAD_TITLE_TEXT,i);
}

function getSelfAD_Content(){
    if(cc.sys.localStorage.getItem(SELFAD_CONTENT_TEXT)==null)
    {
        setSelfAD_Content(0);
    }
    return cc.sys.localStorage.getItem(SELFAD_CONTENT_TEXT);
}
function setSelfAD_Content(i){
    cc.sys.localStorage.setItem(SELFAD_CONTENT_TEXT,i);
}
function getSelfAD_URL(){
    if(cc.sys.localStorage.getItem(SELFAD_URL_TEXT)==null)
    {
        setSelfAD_URL(0);
    }
    return cc.sys.localStorage.getItem(SELFAD_URL_TEXT);
}
function setSelfAD_URL(i){
    cc.sys.localStorage.setItem(SELFAD_URL_TEXT,i);
}


function getLauchCheck(){
    if(cc.sys.localStorage.getItem(LAUCHCHECK)==null)
    {
        setLauchCheck(0);
    }
    return cc.sys.localStorage.getItem(LAUCHCHECK);
}
function setLauchCheck(i){
    cc.sys.localStorage.setItem(LAUCHCHECK,i);
}
function getCommunityAvailable(){
    if(cc.sys.localStorage.getItem(COMMUNITYAVAILABLE)==null)
    {
        setCommunityAvailable(0);
    }
    return cc.sys.localStorage.getItem(COMMUNITYAVAILABLE);
}
function setCommunityAvailable(i){
    cc.sys.localStorage.setItem(COMMUNITYAVAILABLE,i);
}

function getAZLauchCheck(){
    if(cc.sys.localStorage.getItem(AZLAUCHCHECK)==null)
    {
        setAZLauchCheck(0);
    }
    return cc.sys.localStorage.getItem(AZLAUCHCHECK);
}
function setAZLauchCheck(i){
    cc.sys.localStorage.setItem(AZLAUCHCHECK,i);
}
function getAZLauchCheck2(){
    if(cc.sys.localStorage.getItem(AZLAUCHCHECK2)==null)
    {
        setAZLauchCheck2(0);
    }
    return cc.sys.localStorage.getItem(AZLAUCHCHECK2);
}
function setAZLauchCheck2(i){
    cc.sys.localStorage.setItem(AZLAUCHCHECK2,i);
}

function getDeadTime(){
    if(cc.sys.localStorage.getItem(F16_DeadTime)==null)
    {
        setDeadTime(0);
    }
    return cc.sys.localStorage.getItem(F16_DeadTime);
}
function setDeadTime(dead){
    cc.sys.localStorage.setItem(F16_DeadTime,dead);
}
function getIsPauseGame (){
    if(cc.sys.localStorage.getItem(IS_PAUSE_GAME) == null||  cc.sys.localStorage.getItem(IS_PAUSE_GAME) == ""){
        setIsPauseGame("0");
    }
    return cc.sys.localStorage.getItem(IS_PAUSE_GAME);
}
function setIsPauseGame (isPause){
    cc.sys.localStorage.setItem(IS_PAUSE_GAME, isPause);
}
function getAd_Title1_Text (){
    if(cc.sys.localStorage.getItem(AD_TITLE1_TEXT) == null){
        setAd_Title1_Text("");
    }
    return cc.sys.localStorage.getItem(AD_TITLE1_TEXT);
}
function setAd_Title1_Text (str){
    cc.sys.localStorage.setItem(AD_TITLE1_TEXT, str);
}
function getAd_Title2_Text (){
    if(cc.sys.localStorage.getItem(AD_TITLE2_TEXT) == null){
        setAd_Title2_Text("");
    }
    return cc.sys.localStorage.getItem(AD_TITLE2_TEXT);
}
function setAd_Title2_Text (str){
    cc.sys.localStorage.setItem(AD_TITLE2_TEXT, str);
}
function getAd_Title3_Text (){
    if(cc.sys.localStorage.getItem(AD_TITLE3_TEXT) == null){
        setAd_Title3_Text("");
    }
    return cc.sys.localStorage.getItem(AD_TITLE3_TEXT);
}
function setAd_Title3_Text (str){
    cc.sys.localStorage.setItem(AD_TITLE3_TEXT, str);
}
function getAd_Title4_Text (){
    if(cc.sys.localStorage.getItem(AD_TITLE4_TEXT) == null){
        setAd_Title4_Text("");
    }
    return cc.sys.localStorage.getItem(AD_TITLE4_TEXT);
}
function setAd_Title4_Text (str){
    cc.sys.localStorage.setItem(AD_TITLE4_TEXT, str);
}

function getAd_Title5_Text (){
    if(cc.sys.localStorage.getItem(AD_TITLE5_TEXT) == null){
        setAd_Title5_Text("");
    }
    return cc.sys.localStorage.getItem(AD_TITLE5_TEXT);
}
function setAd_Title5_Text (str){
    cc.sys.localStorage.setItem(AD_TITLE5_TEXT, str);
}
//获取音效是否开启，0代表关闭，1代表开启
function getMusicIsOpen (){
    cc.log("in now " + cc.sys.localStorage.getItem(MUSIC_STATUS_STR));
    if(cc.sys.localStorage.getItem(MUSIC_STATUS_STR) == null ||  cc.sys.localStorage.getItem(MUSIC_STATUS_STR) == ""){
        cc.log("not exist now ");
        setMusicIsOpen(1);
    }
    return cc.sys.localStorage.getItem(MUSIC_STATUS_STR);
}
function setMusicIsOpen (isOpen){
    cc.sys.localStorage.setItem(MUSIC_STATUS_STR, isOpen);
}

function getGold (){
    if(cc.sys.localStorage.getItem(KD_KEY_GOLD_STR) == null ||  cc.sys.localStorage.getItem(KD_KEY_GOLD_STR) == ""){
        setGold(0);
    }
    return cc.sys.localStorage.getItem(KD_KEY_GOLD_STR);
}
function setGold (gold){
    cc.sys.localStorage.setItem(KD_KEY_GOLD_STR, gold);
}
function getIsBuyCheats (){
    if(cc.sys.localStorage.getItem(IS_BUY_CHEATS) == null ||  cc.sys.localStorage.getItem(IS_BUY_CHEATS) == ""){
        setIsBuyCheat(0);
    }
    return cc.sys.localStorage.getItem(IS_BUY_CHEATS);
}
function setIsBuyCheat (isBuy){
    cc.sys.localStorage.setItem(IS_BUY_CHEATS, isBuy);
}


function getIsRemoveAD (){
    if(cc.sys.localStorage.getItem(USER_IS_REMOVEAD) == null ||  cc.sys.localStorage.getItem(USER_IS_REMOVEAD) == ""){
        setIsRemoveAD(0);
    }
    return cc.sys.localStorage.getItem(USER_IS_REMOVEAD);
}
function setIsRemoveAD (isRemove){
    cc.sys.localStorage.setItem(USER_IS_REMOVEAD, isRemove);
}
function setLottery(time)
{
    cc.sys.localStorage.setItem(USER_LOTTERY,time);
}
function getLottery()
{
    if(cc.sys.localStorage.getItem(USER_LOTTERY)==null ||  cc.sys.localStorage.getItem(USER_LOTTERY) == "")
    {
        setLottery(3);
    }
    return cc.sys.localStorage.getItem(USER_LOTTERY);
}
function setTime()
{
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    cc.log("我的时间我做主："+year+"年"+month+"月"+day+"日"+hour+":"+minute+":"+second);
    cc.sys.localStorage.setItem(KD_KEY_TIME_STR,date);
}
function getTime()
{
    if(cc.sys.localStorage.getItem(KD_KEY_TIME_STR)==null ||  cc.sys.localStorage.getItem(KD_KEY_TIME_STR) == "")
    {
        setTime();
        cc.log("设置好了");0
    }
    return cc.sys.localStorage.getItem(KD_KEY_TIME_STR);
}
function getPassionStatusByLevel (level){



    var passionStatusStr = cc.sys.localStorage.getItem(KD_KEY_PASSION_STATUS_STR);
    if(passionStatusStr == null || passionStatusStr == ""){
        passionStatusStr = "0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0";
    }

    var passionArray = passionStatusStr.split("-");
//    console.log(passionArray);
    return passionArray[level-1];
}
//@param "ispass" '0' means false ,'1' means true
function setPassionStatusByLevel (level, isPass){

    var passionStatusStr = cc.sys.localStorage.getItem(KD_KEY_PASSION_STATUS_STR);
    if(passionStatusStr == null || passionStatusStr == ""){
        passionStatusStr = "0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0";
    }
    var passionArray = passionStatusStr.split("-");
//    console.log(passionArray);
    passionArray[level-1] = isPass;
    var passionRealStr = "";
//    console.log("passionArray.length: " +  passionArray.length)
    for(var i = 0;i<passionArray.length;i++){
//        console.log("passionArray index: " + i);
        if(i == passionArray.length-1){
            passionRealStr = passionRealStr + passionArray[i];
        }else{
            passionRealStr = passionRealStr + passionArray[i] + "-";
        }

    }
//    console.log(passionArray);
//    console.log("passionRealStr" + passionRealStr);
    cc.sys.localStorage.setItem(KD_KEY_PASSION_STATUS_STR, passionRealStr);
}
