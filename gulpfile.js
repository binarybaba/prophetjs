var gulp = require('gulp'),
    minify = require('gulp-minify'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename');



gulp.task('minify-css', function(){
    gulp.src('build/css/*.css')
        .pipe(gulp.dest('dist/css'))
        .pipe(cssmin())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('dist/css'))

});

gulp.task('minify-js', function(){
    gulp.src('build/js/*.js')
        .pipe(minify({
            min:'.js'
        }))
        .pipe(gulp.dest('dist/js/'))
    gulp.src('build/js/*.map')
        .pipe(gulp.dest('dist/js/'))
});

gulp.task('minify', ['minify-css', 'minify-js']);