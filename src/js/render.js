(function($, root){
    var $scope = $(document.body);
    function renderInfo(data){
        var html = '<h1 class="song-name">'+ data.song + '</h1>' +
        '<h3 class="singer-name">'+ data.singer + '</h3>' +
        '<h1 class="album-name">'+ data.album + '</h3>';
        $scope.find('.song-info').html(html);
    }
    function renderImage(data){
        var image = new Image();
        image.onload = function(){
            $scope.find('.song-img img').attr('src', data);
            root.blurImg(image, $scope);
        }
        image.src = data;
        
    }
    function renderLikeBtn(isLike){
        if(isLike){
            $scope.find('.like-btn').addClass('liked');
        }else{
            $scope.find('.like-btn').removeClass('liked');
        }
    }
    root.render = function(data){
        renderInfo(data);
        renderImage(data.image);
        renderLikeBtn(data.isLike);
    }
}(window.Zepto, window.player || {}))