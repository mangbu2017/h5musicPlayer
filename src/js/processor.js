(function($, root){
    var $scope = $(document.body);
    var startTime;
    var Duration;
    var id;
    var lastPercent = 0;
    // 格式化时间
    function formatTime(time){
        time = Math.round(time);
        var minute = Math.floor(time / 60);
        var second = time - minute * 60;
        // debugger
        if(minute < 10){
            minute = '0' + minute;
        }
        if(second < 10){
            second = '0' + second;
        }
        return minute + ':' + second;
    }
    // 更新当前时间和进度条
    function update(percent){
        var time = formatTime(percent * Duration);
        $scope.find('.cur-time').text(time);
        setProcessor(percent);
    }

    // 渲染总时间
    function renderTime(duration){
        lastPercent = 0;
        Duration = duration;
        var allTime = formatTime(duration);
        $scope.find('.all-time').text(allTime);
    }
    // 渲染当前时间
    function start(percent){
        if(percent !== undefined){
            lastPercent = percent;
        }
        cancelAnimationFrame(id);
        startTime = new Date().getTime();
        var frame = function(){
            var time = new Date().getTime();
            var percent = lastPercent + (time - startTime) / (Duration * 1000);
            update(percent);
            if(percent < 1){
                id = requestAnimationFrame(frame);
            }else{
                cancelAnimationFrame(id);
            }
        }
        frame();
    }
    function stop(){
        var time = new Date().getTime();
        lastPercent = lastPercent + (time - startTime) / (Duration * 1000);
        // 如果上面加var在执行过程中会变量声明提升 造成覆盖全局变量
        cancelAnimationFrame(id);
    }
    // 渲染进度条
    function setProcessor(percent){
        var percent  = (percent - 1) * 100 + '%';
        $scope.find('.pro-top').css({
            'transform': 'translateX(' + percent + ')'
        })
    }

    root.processor = {
        start,
        stop,
        renderTime,
        update
    }
}(window.Zepto, window.player || {}))