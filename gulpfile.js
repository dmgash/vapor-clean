/*******************************************************************************
REQUIRED MODULES
*******************************************************************************/
var gulp = require('gulp'); // Core Gulp Module
var uglify = require('gulp-uglify'); // JS Minification Module
var uglifycss = require('gulp-uglifycss'); // CSS Minification Module
var rename = require('gulp-rename'); // File Renaming Utility
var sass = require('gulp-sass'); // Sass Compiler Module
var autoprefixer = require('gulp-autoprefixer'); // CSS Vendor Prefix Module
var sourcemaps = require('gulp-sourcemaps'); // CSS Sourcemap Generator Module

/*******************************************************************************
FILE PATH GLOBS - references the key files and locations used throughout
subsequent tasks.
*******************************************************************************/
var paths = {
  scripts: ['./Public/js/**/*.js', '!./Public/js/**/*.min.js'],
  scriptDest: './Public/js',
  sass: './Public/scss/*.scss',
  cssDest: './Public/css',
  css: ['./Public/css/**/*.css', '!./Public/css/**/*.min.css']
};

/*******************************************************************************
SCRIPTS TASK - selects each .js file - except those already minified - from the
source location, minifies them, adds '.min' as a suffix to the file names, and
drops them into the receiving location.
*******************************************************************************/
gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.scriptDest));
});

/*******************************************************************************
SASS TASK - selects each .scss file from the source location, initiates the
sourcemap library, passes each file through the Sass compiler, applies vendor
prefixes, writes the completed sourcemaps to the maps directory, and drops each
file into the receiving location.
*******************************************************************************/
gulp.task('sass', function() {
  return gulp.src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({browsers: 'last 3 versions'}))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest(paths.cssDest));
});

/*******************************************************************************
CSS TASK - selects each .css file - except those already minified - from the
source location, minifies them, adds '.min' as a suffix to the file names, and
drops them into the receiving location.
*******************************************************************************/
gulp.task('css', function() {
  return gulp.src(paths.css)
    .pipe(uglifycss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.cssDest));
});

/*******************************************************************************
WATCH TASK - monitors the js, scss, and css directories for changes, triggering
the associated task when a change is detected.
*******************************************************************************/
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.css, ['css']);
});

/*******************************************************************************
DEFAULT TASK - triggers each task when the 'gulp' command is first executed
on the command line. The watch task continues to run until the process is exited
by the user.
*******************************************************************************/
gulp.task('default', ['watch', 'scripts', 'sass', 'css']);
