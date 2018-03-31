(function($, root){
    audioManager = function(){
        this.audio = new Audio();
        this.status = 'pause';
    }
    audioManager.prototype = {
        play(){
            this.audio.play();
            this.status = 'play';
        },
        pause(){
            this.audio.pause();
            this.status = 'pause';
        },
        setAudioSource(src){
            this.audio.src = src;
            this.audio.load();
        },
        jumptoPlay(duration){
            this.audio.currentTime = duration;
        }
    }
    root.audioManager = audioManager;
}(window.Zipto, window.player || {}))