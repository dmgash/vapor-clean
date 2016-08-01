var gulp = require('gulp');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
  scripts: ['./Public/js/**/*.js', '!./Public/js/**/*.min.js'],
  scriptDest: './Public/js',
  sass: './Public/scss/*.scss',
  cssDest: './Public/css',
  css: ['./Public/css/**/*.css', '!./Public/css/**/*.min.css']
};

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.scriptDest));
});

gulp.task('sass', function() {
  return gulp.src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({browsers: 'last 3 versions'}))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest(paths.cssDest));
});

gulp.task('css', function() {
  return gulp.src(paths.css)
    .pipe(uglifycss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.cssDest));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.css, ['css']);
});

gulp.task('default', ['watch', 'scripts', 'sass', 'css']);
