var Gulp = require('gulp');
var Gutil = require('gulp-util');
var Webpack = require('webpack');


var executionCount = 0;


Gulp.task('webpack', function (callback) {

    var config = {
        watch: global.isWatching,
        entry: {
            bingo: './client/pages/bingo/bingo.elm',
            anotherpage: './client/pages/another-page/another-page.elm'
        },
        output: {
            path: './public/pages',
            filename: '[name].js'
        },
        resolve: {
            extensions: ['', '.js', '.elm']
        },
        module: {
            loaders: [
                { test: /\.elm$/, loader: 'elm-webpack-loader' },
                { test: /\.js$/, loader: 'babel-loader' }
            ]
        },
        plugins: [
            // new UglifyJsPlugin({ compress: { warnings: false } })
        ]
    };

    Webpack(config, function (err, stats) {

        if (err) {
            throw new Gutil.PluginError('webpack', err);
        }

        Gutil.log('[webpack]', stats.toString({
            colors: true
        }));

        if (executionCount === 0) {
            callback();
        }
        executionCount += 1;
    });

});
