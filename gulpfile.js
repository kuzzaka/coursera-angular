"use strict";

var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    changed = require('gulp-changed'),
    gulpif = require('gulp-if'),
    browserSync = require('browser-sync'),
    del = require('del'),
    ngannotate = require('gulp-ng-annotate');

gulp.task('jshint', function() {
  return gulp.src('app/scripts/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter(stylish));
});

// Clean
gulp.task('clean', function() {
  return del(['dist']);
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('useref', 'imagemin', 'copyfonts');
});

gulp.task('useref', function() {
  return gulp.src('./app/**/*.html')
      .pipe(useref())
      .pipe(gulpif('*.js', ngannotate()))
      .pipe(gulpif('*.js', uglify()))
      .pipe(gulpif('*.css', minifycss()))
      .pipe(gulp.dest('./dist'));
});

// Images
gulp.task('imagemin', function() {
  return del(['dist/images']), gulp.src('app/images/**/*')
      .pipe(cache(imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true
      })))
      .pipe(gulp.dest('dist/images'))
      .pipe(notify({
        message: 'Images task complete'
      }));
});

gulp.task('copyfonts', ['clean'], function() {
  gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
      .pipe(gulp.dest('./dist/fonts'));
  gulp.src('./bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
      .pipe(gulp.dest('./dist/fonts'));
});

// Watch
gulp.task('watch', ['browser-sync'], function() {
  // Watch .js files
  gulp.watch('{app/scripts/**/*.js,app/styles/**/*.css,app/**/*.html}', ['useref']);
  // Watch image files
  gulp.watch('app/images/**/*', ['imagemin']);

});

// Deploy
gulp.task('deploy', function() {
  gulp.src('./dist/**/*')
      .pipe(gulp.dest('./json-server/public'))
});

gulp.task('browser-sync', ['default'], function() {
  var files = [
    'app/**/*.html',
    'app/styles/**/*.css',
    'app/images/**/*.png',
    'app/scripts/**/*.js',
    'dist/**/*'
  ];

  browserSync.init(files, {
    server: {
      baseDir: "dist",
      index: "index.html"
    },
    browser: 'google chrome canary'
  });
  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', browserSync.reload);
});
