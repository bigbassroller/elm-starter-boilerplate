var Path = require('path');
var Gulp = require('gulp');
var Newer = require('gulp-newer');
var Concat = require('gulp-concat');
var Sass = require('gulp-sass');


Gulp.task('sass', function () {

    var bundleConfigs = [{
        entries: [
            './client/core/bootstrap.scss',
            './client/core/font-awesome.scss'
        ],
        dest: './public',
        outputName: 'core.min.css'
    }, {
        entries: './client/pages/bingo/index.scss',
        dest: './public/pages/bingo',
        outputName: 'style.min.css'
    }, {
        entries: './client/pages/home/index.scss',
        dest: './public/pages/home',
        outputName: 'style.min.css'
    }];

    return bundleConfigs.map(function (bundleConfig) {

        return Gulp.src(bundleConfig.entries)
            .pipe(Newer(Path.join(bundleConfig.dest, bundleConfig.outputName)))
            .pipe(Concat(bundleConfig.outputName))
            .pipe(Sass({ compress: true }))
            .pipe(Gulp.dest(bundleConfig.dest));
    });
});
