var MusicRes = {
    "c12" : {
        F12_LIGNTING_SOUNDS : "res/music/41.mp3",
        F12_ZZ_SOUNDS : "res/music/42.mp3",
        F12_HIT_SOUNDS : "res/music/43.mp3",
        F12_CLOCK_SOUNDS : "res/music/83.mp3",
        F12_WATER_SOUNDS : "res/music/45.mp3",
        F12_WIN_SOUNDS : "res/music/f12_994.mp3",
        F12_DIZZY_SOUNDS : "res/music/f12_993.mp3",
        F12_GHOST_SOUNDS : "res/music/f12_1002.mp3",
    },
};

var PngRes = {
    "public" : {
        com_btn_red:"res/main/com_btn_red.png",
        com_plist:"res/com.plist",
        com_png:"res/com.png",
        newgame_new:"res/newgame_new.png",
        newgame_hot:"res/newgame_hot.png",
        newgame_normal:"res/newgame_normal.png",
        home_btn_about_noword:"res/home_btn_about_noword.png",
    },

    "c12" : {
        k_12_png:"res/k12/k_12.png",
        k_12_plist:"res/k12/k_12.plist",
    },
};

var music_resources = [];
var png_resources = [];

//保存音乐数组
for (var c in MusicRes)
    for (var key in MusicRes[c])
        music_resources.push(MusicRes[c][key]);

//保存图片数组
for (var c in PngRes)
    for (var key in PngRes[c])
        png_resources.push(PngRes[c][key]);

console.log(music_resources);
console.log(png_resources);