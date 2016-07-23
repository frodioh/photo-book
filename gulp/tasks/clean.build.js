'use strict';

module.exports = function() {
  $.gulp.task('clean.build', function(cb) {
    return $.rimraf('./public', cb);
  });
};
