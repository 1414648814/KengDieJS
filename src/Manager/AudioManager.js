/**
 * Created by George on 16/5/12.
 */

/* 播放音效 */
function playEffect(fileName, loop){
    var soundId = 0;
    if(getMusicIsOpen() == 1){
        soundId = cc.audioEngine.playEffect(fileName,loop);
    }else{
        soundId = cc.audioEngine.playEffect(fileName,loop);
        setSoundOpenOrNot(0);
    }
    return soundId;
}
/* 停止音效 */
function stopEffect(soundId){
    cc.audioEngine.stopEffect(soundId);
}
/* 暂停音效 */
function pauseEffect(soundId){
    cc.audioEngine.pauseEffect(soundId);
}
/* 恢复音效 */
function resumeEffect(soundId){
    cc.audioEngine.resumeEffect(soundId);
}
/* 停止所有音效 */
function stopAllEffect(){
    cc.log("now is stop all effect");
    cc.audioEngine.stopAllEffects();
}
/* 暂停所有音效 */
function pauseAllEffect(){
    cc.audioEngine.pauseAllEffects();
}
/* 回复所有音效 */
function resumeAllEffect(){
    cc.audioEngine.resumeAllEffects();
}

/* 播放背影音乐 */
function playBackgroundMusic(fileName, loop) {
    if(getMusicIsOpen() == 1){
        cc.audioEngine.playMusic(fileName, loop);
    }else{
        cc.audioEngine.playMusic(fileName, loop);
        setSoundOpenOrNot(0);
    }
}
/* 停止背景音乐 */
function stopBackgroundMusic(release){
    cc.audioEngine.stopMusic(release);
}
/* 暂停背景音乐 */
function pauseBackgroundMusic(){
    cc.audioEngine.pauseMusic();
}
/* 回复背景音乐 */
function resumeBackgroundMusic(){
    if(getMusicIsOpen()==1) {
        cc.audioEngine.resumeMusic();
    }else{
        cc.audioEngine.resumeMusic();
        setSoundOpenOrNot(0);
    }
}

/* 回收音乐  */
//function unLoadMusicResource(fileName){
//    cc.audioEngine.unloadEffect(fileName)
//;
//}
/**
 *开关音乐
 */
function setSoundOpenOrNot(isOpen){
    if (isOpen == 1) {
        cc.log("set effect volumn 1");
        cc.audioEngine.setEffectsVolume(1.0);
        cc.audioEngine.setMusicVolume(1.0);
//        cc.audioEngine.resumeAllEffects();
//        cc.audioEngine.resumeMusic();
        setMusicIsOpen(isOpen);
    }else{
        cc.log("set effect volumn 0");
        cc.audioEngine.setEffectsVolume(0);
        cc.audioEngine.setMusicVolume(0);
//        cc.audioEngine.pauseAllEffects();
//        cc.audioEngine.pauseMusic();
        setMusicIsOpen(isOpen);
    }
}