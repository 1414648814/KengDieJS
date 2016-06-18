/* 播放音效，返回音效id */
function playEffect(filename, loop)
{
    var soundId = 0;
    if (getMusicIsOpen() == 1)
    {
        soundId = cc.audioEngine.playEffect(filename, loop);
    }
    else
    {
        soundId = cc.audioEngine.playEffect(filename, loop);
        setSoundOpenOrNot(0);
    }
};

/* 关闭音效 */
function stopEffect(soundId)
{
    cc.audioEngine.stopEffect(soundId);
}

/* 关闭所有音效 */
function stopAllEffect()
{
    cc.audioEngine.stopAllEffects();
}

//开关音乐
function setSoundOpenOrNot(isOpen)
{
    if(isOpen == 1)
    {
        cc.log("set effect volume 1");
        cc.audioEngine.setEffectsVolume(1.0);
        cc.audioEngine.setMusicVolume(1.0);

        setMusicIsOpen(isOpen);
    }
    else
    {
        cc.log("set effect volume 0");
        cc.audioEngine.setEffectsVolume(0.0);
        cc.audioEngine.setMusicVolume(0.0);

        setMusicIsOpen(isOpen);
    }
}


