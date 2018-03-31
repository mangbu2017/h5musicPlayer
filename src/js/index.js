var root = window.player;
var $ = window.Zepto;
var $scope = $(document.body);
var songlist;
var ind;
var audioManager = new root.audioManager();
var processor = root.processor;

// 切换歌曲自定义事件
$scope.on('play:change', function(e, index){
    var curdata = songlist[index];
    // 更新歌曲信息
    root.render(songlist[index]);
    // 渲染歌曲信息
    audioManager.setAudioSource(curdata.audio);
    // 设置歌曲资源
    processor.renderTime(curdata.duration);
    // 渲染歌曲总时间
    processor.update(0);
    if(audioManager.status === 'play'){
        processor.start();
        audioManager.play();   
    }
})

$scope.on('click', '.prev-btn', function(){
    var index = ind.prev();
    $scope.trigger('play:change', [index])
})

$scope.on('click', '.next-btn', function(){
    var index = ind.next();
    $scope.trigger('play:change', [index])
})

$scope.on('click', '.play-btn', function(){
    if(audioManager.status === 'play'){
        audioManager.pause();
        processor.stop();
        // $scope.find('.play-btn').addClass('pause');
    }else{
        audioManager.play();
        // $scope.find('.play-btn').removeClass('pause');
        processor.start();
    }
    $scope.find('.play-btn').toggleClass('pause');
    // 如果有就去除 没有就添加
})

function getData(url){
    $.ajax({
        url: url,
        type: 'GET',
        success: successFn,
        error: function(){
            console.log('error');
        }
    });
}

function successFn(data){
    bindTouch();
    songlist = data;
    ind = new root.controlManager(songlist.length);
    $scope.trigger('play:change', [ind.index]);
}

getData('/mock/data.json');

function bindTouch(){
    var $slidePoint = $scope.find('.slide-point');
    var offset = $scope.find('.pro-wrapper').offset();
    var left = offset.left;
    var width = offset.width;
    $slidePoint.on('touchstart', function(e){
        processor.stop();
    }).on('touchmove', function(e){
        var x = e.changedTouches[0].clientX;
        var percent = (x - left) / width;
        if(percent < 0 || percent > 1){
            percent = 0;
        }
        processor.update(percent);
    }).on('touchend', function(e){
        var x = e.changedTouches[0].clientX;
        var percent = (x - left) / width;
        if(percent < 0 || percent > 1){
            percent = 0;
        }
        processor.start(percent);
        var duration = songlist[ind.index].duration;
        var dur = duration * percent;
        audioManager.jumptoPlay(dur);
    })
}