'use strict';

var path = require('path');
var gulp = require('gulp');
var changed = require('gulp-changed');
var sftp = require('gulp-sftp');

var user = '4249580';
var vhost = 'keydiag.healthfactory.io';
var taskTarget = 'dist';

gulp.task('deploy', function () {
  return gulp.start('sftp');
})

gulp.task('sftp', function () {
  return gulp.src([path.join(taskTarget, '/**'), '!' + path.join(taskTarget, '\.DS_Store')], {
      dot: true
    })
    .pipe(changed('.' + taskTarget, {
      hasChanged: changed.compareSha1Digest
    }))
    .pipe(gulp.dest('.' + taskTarget))
    .pipe(sftp({
      host: 'sftp.dc0.gpaas.net',
      user: user,
      passphrase: 'win7352',
      remotePath: 'vhosts/' + vhost + '/htdocs'
    }));
});
