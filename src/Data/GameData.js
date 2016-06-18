//全局变量
var MUSIC_STATUS_STR = "music_status_str";

//获取音效是否开启，0代表关闭，1代表开始
function getMusicIsOpen()
{
    cc.log("in now " + cc.sys.localStorage.getItem(MUSIC_STATUS_STR));
    if (cc.sys.localStorage.getItem(MUSIC_STATUS_STR) == null || cc.sys.localStorage.getItem(MUSIC_STATUS_STR) == "")
    {
        cc.log("not exist now");
        setMusicIsOpen(1);
    }
    return cc.sys.localStorage.getItem(MUSIC_STATUS_STR);
}

function setMusicIsOpen(isOpen)
{
    cc.sys.localStorage.setItem(MUSIC_STATUS_STR, isOpen);
}