var Path = require('path');
var Gulp = require('gulp');
var ElmBins = require('elm');
var Glob = require('glob');
var SimpleSpawner = require('simple-spawner');
var Concat = require('gulp-concat');
var Newer = require('gulp-newer');


Gulp.task('elm', function () {

  // var bundleConfigs = [{
  //     entries: './client/pages/bingo/index.elm',
  //     dest: './public/pages',
  //     outputName: 'bingo.min.js'
  // }, {
  //     entries: './client/pages/another-page/index.elm',
  //     dest: './public/pages',
  //     outputName: 'another-page.min.js'
  // }];

  var elmPaths = Glob.sync('./client/*/*/*.elm')
  var args = elmPaths.concat([
    '--yes',
    '--output',
    'public/pages/bingo/bingo.js'
  ])

  return SimpleSpawner(ElmBins['elm-make'], args)

});