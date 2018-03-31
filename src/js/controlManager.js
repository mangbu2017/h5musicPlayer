(function($, root){
    function controlManager(songlength){
        this.index = 0;
        this.length = songlength;
    }
    controlManager.prototype = {
        next(){
            return this.getIndex(1);
        },
        prev(){
            return this.getIndex(-1);
        },
        getIndex(val){
            var index = this.index;
            var len = this.length;
            var curIndex = (index + val + len) % len;
            this.index = curIndex;
            console.log(this);
            // 再加 一个 len是为了 prev的情况
            return curIndex;
        }
    }
    root.controlManager = controlManager;
}(window.Zepto, window.player || {}))