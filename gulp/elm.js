var Path = require('path');
var Gulp = require('gulp');
var Elm  = require('gulp-elm');
var Concat = require('gulp-concat');
var Newer = require('gulp-newer');


Gulp.task('elm-init', Elm.init);

Gulp.task('elm', ['elm-init'], function () {

  var bundleConfigs = [{
      entries: './client/pages/home/home.elm',
      dest: './public/pages/home',
      outputName: 'home.js'
  }, {
      entries: './client/pages/bingo/bingo.elm',
      dest: './public/pages/bingo',
      outputName: 'bingo.js'
  }];

  return bundleConfigs.map(function (bundleConfig) {

      return Gulp.src(bundleConfig.entries)
          .pipe(Newer(Path.join(bundleConfig.dest, bundleConfig.outputName)))
          .pipe(Concat(bundleConfig.outputName))
          .pipe(Elm())
          .pipe(Gulp.dest(bundleConfig.dest));
  });

});
