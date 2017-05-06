const execFile = require('child_process').execFile;

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const pump = require('pump');

const src = `${__dirname}/src`;
const intermediate = `${__dirname}/intermediate`;
const dest = `${__dirname}/public/javascripts`;

const cleanup = () => execFile(`${__dirname}/removeIntermediate.sh`, [ intermediate ]);

const minify = () => pump(
  [
    gulp.src(`${intermediate}/*.js`),
    uglify(),
    gulp.dest(dest)
  ],
  () => cleanup()
);

gulp.task(
  'compile',
  () => execFile(
    `${__dirname}/compileTS.sh`,
    [ `${src}/*.ts`, `${intermediate}` ],
    (error, stdout, stderr) => {
      // if (error) console.log(error);

      // NOTE: `./intermediate` will still exist if compile failed. Good visual cue in editor.
      stdout.length > 0 ? console.log(stdout) : minify()
    }
  )
);

gulp.task('default', [ 'compile' ], () => gulp.watch([ `${src}/*.ts` ], [ 'compile' ]));
