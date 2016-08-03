/**
 * Created by Artoria on 2016/8/2 0002.
 */
var gulp = require('gulp');
var rubySass = require('gulp-ruby-sass');

//sass编译
gulp.task('sass',function () {
    return rubySass('./src/sass/*.scss')
        .on('error',rubySass.logError)
        .pipe(gulp.dest('src/css'));
});

gulp.task('sassWacth',function () {
    gulp.watch('./src/sass/*.scss',function () {
        gulp.run('sass');
    })
});

gulp.task('default',function () {
    console.log("default");
});