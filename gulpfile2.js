var gulp = require('gulp');
var browserSync = require('browser-sync')();
var $ = require('gulp-load-plugins')();


gulp.task('serve', ['build:clean', 'index'], function () {

    browserSync.init({
        server: ['./', './src']
    });

    gulp.watch('src/js/*/**.js').on('change', browserSync.reload);
    gulp.watch('src/css/*/**.js').on('change', browserSync.reload);
    gulp.watch('src/*/**.html').on('change', browserSync.reload);
});

gulp.task('js', function () {   

    gulp.src('src/js/app/*.js')
        .pipe($.uglify())
        .pipe(gulp.dest('build/js/'));
    
    gulp.src('src/js/app/api/*.js')
        .pipe($.uglify())
        .pipe(gulp.dest('build/js/'));
    
    gulp.src('src/js/app/controllers/*.js')
        .pipe($.uglify())
        .pipe(gulp.dest('build/js/'));
    
    gulp.src('src/js/app/security/*.js')
        .pipe($.uglify())
        .pipe(gulp.dest('build/js/'));
    
    gulp.src('src/js/app/*/**.js')
        //.pipe($.sourcemaps.init())
        .pipe($.uglify())
        //.pipe($.concat('all.js'))
        //.pipe($.sourcemaps.write())
        .pipe(gulp.dest('build/js/'));
});

gulp.task('mainJs', function () {
    return gulp.src('src/js/app/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('build/js/'));
});

gulp.task('css', function () {
    return gulp.src('src/css/*.css')
        .pipe($.cssmin())
        .pipe(gulp.src('src/scss/style.scss').pipe($.sass()))
        .pipe($.rename({ suffix: '.min' }))
        .pipe($.concat('all.css'))
        .pipe(gulp.dest('build/css/'));
});

gulp.task('index',['mainJs','js', 'css'], function () {

    var target = gulp.src('src/index.html');
    var sources = gulp.src(['build/js/**/*.js', 'build/css/*.css'], { read: false });
    
    return target.pipe($.inject(sources))
        .pipe(gulp.dest('build/'));
    
});

gulp.task('build:clean', function () {
    return gulp.src(['build/css', 'build/js', 'build/*.html'])
        .pipe($.clean({ read: false }));
});


// gulp.task('html', ['index'], function () {

//     return gulp.src('src/*/**.html')
//         .pipe(gulp.dest('build/html/'));
// });