'use strict';

global.$ = {
  package: require('./package.json'),
  config: require('./gulp/config'),
  path: {
    task: require('./gulp/paths/tasks.js'),
    jsFoundation: require('./gulp/paths/js.foundation.js'),
    cssFoundation: require('./gulp/paths/css.foundation.js'),
    app: require('./gulp/paths/app.js'),
    admin: require('./gulp/paths/admin.js')
  },
  gulp: require('gulp'),
  rimraf: require('rimraf'),
  gp: require('gulp-load-plugins')(
    {
    rename: {
    }
  }),
  configsvg:                    {
    mode                : {
        css             : {     // Activate the «css» mode
            render      : {
                css     : true  // Activate CSS output (with default options)
            }
        }
    }
  }
};

$.path.task.forEach(function(taskPath) {
  require(taskPath)();
});

$.gulp.task('build', $.gulp.series(
  'clean.build',
  $.gulp.parallel(
    'sass',
    'js.foundation',
    'js.process',
    'copy.image',
    'copy.fonts',
    'copy.icons'
  ),
  $.gulp.parallel(
    'copy.assets',
    'copy.template'
  )
));