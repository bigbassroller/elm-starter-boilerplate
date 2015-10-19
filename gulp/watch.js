var Gulp = require('gulp');


Gulp.task('watch', function () {

    global.isWatching = true;
    Gulp.watch('./client/**/*.elm', ['elm']);
});

// Gulp.task('watch', ['watch'], function() {
//     global.isWatching = true;
//     Gulp.watch('./client/**/*.elm', ['elm']);
// });