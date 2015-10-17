var Gulp = require('gulp');
var Gutil = require('gulp-util');
var Webpack = require('webpack');


var CommonsChunkPlugin = Webpack.optimize.CommonsChunkPlugin;
var UglifyJsPlugin = Webpack.optimize.UglifyJsPlugin;
var executionCount = 0;


Gulp.task('webpack', function (callback) {

    var config = {
        watch: global.isWatching,
        entry: {
            bingo: './client/pages/bingo/index',
            anotherpage: './client/pages/another-page/index'
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
                { test: /\.elm$/, exclude: /node_modules/, loader: 'elm-webpack-loader' }
            ]
        },
        plugins: [
            new UglifyJsPlugin({ compress: { warnings: false } })
        ]
    };

    Webpack(config, function (err, stats) {

        if (err) {
            throw new Gutil.PluginError('webpack', err);
        }

        Gutil.log('[webpack]', stats.toString({
            colors: true,
            chunkModules: false
        }));

        if (executionCount === 0) {
            callback();
        }
        executionCount += 1;
    });
});
