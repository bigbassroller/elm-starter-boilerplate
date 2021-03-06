var Path = require('path');
var Gulp = require('gulp');
var Newer = require('gulp-newer');
var Concat = require('gulp-concat');
var Sass = require('gulp-sass');

Gulp.task('sass', function () {

    var bundleConfigs = [{
        entries: [
            './client/core/variables.scss',
            './client/core/bootstrap.scss',
            './client/core/font-awesome.scss',
            './client/core/custom.scss'
        ],
        dest: './public',
        outputName: 'core.min.css'
    }, {
        entries: './client/pages/home/home.scss',
        dest: './public/pages/home',
        outputName: 'home.min.css'
    }, {
        entries: './client/pages/bingo/bingo.scss',
        dest: './public/pages/bingo',
        outputName: 'bingo.min.css'
    }];

    return bundleConfigs.map(function (bundleConfig) {

        return Gulp.src(bundleConfig.entries)
            .pipe(Newer(Path.join(bundleConfig.dest, bundleConfig.outputName)))
            .pipe(Concat(bundleConfig.outputName))
            // .pipe(Sass({outputStyle: 'compressed'}))
            .pipe(Sass())
            .pipe(Gulp.dest(bundleConfig.dest));
    });
});
