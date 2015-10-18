var Path = require('path');
var Gulp = require('gulp');
var elmBins = require('elm');
var glob = require('glob');
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

  var elmPaths = glob.sync('./*.elm')
  var args = elmPaths.concat([
    '--yes',
    '--output',
    'public/pages/bingo.js'
  ])

  return SimpleSpawner(elmBins['elm-make'], args)

});