var Gulp = require('gulp');


Gulp.task('build', ['elm']);


// after
// Gulp.task(
//   'build',
//   Gulp.series(
//     'clean',
//     Gulp.parallel('elm'),
//     'index'
//   )
// );

