// gulp的配置文件
var gulp = require('gulp');
var connect = require('gulp-connect');
var less = require('gulp-less');
// 注册一个任务 第二个参数是触发第一个参数之前需要触发的任务
// gulp.task('task1',['task2'], function(){
    
// })

//转移html文件
gulp.task('html', function(){
    // src把文件转为文件流 
    // pipe传输
    // dest文件流转文件
    gulp.src('./src/index.html')
        .pipe(connect.reload())
        .pipe(gulp.dest('./dist'));
})
// 监听任务
gulp.task('watch', function(){
    gulp.watch('./src/index.html', ['html']);
    gulp.watch('./src/css/*.less', ['less']);
    gulp.watch('./src/js/*.js', ['js']);
})

gulp.task('server', function(){
    connect.server({
        port: 8081,
        livereload: true
    });
})

// 转换less到css
gulp.task('less', function(){
    gulp.src('./src/css/*.less')
        .pipe(less())
        .pipe(connect.reload())
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('js', function(){
    gulp.src('./src/js/*.js')
        .pipe(connect.reload())
        .pipe(gulp.dest('./dist/js'))
})

gulp.task('default', ['html', 'less', 'js', 'watch', 'server']);