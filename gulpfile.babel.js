import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import path from 'path';

// Load plugins to plugin variable
const plugins = loadPlugins();

const paths = {
    js: ['./**/*.js', '!dist/**', '!node_modules/**']
}

// Compiles babel js into ES5, put it in dist dir
gulp.tast('babel', () => {
    return gulp.src(paths.js, { base: '.'})
    .pipe(plugins.babel())
    .pipe(gulp.desk('dist'));
});

// Start server with restart on file change events
gulp.task('nodemon', ['babel'], () =>
    plugins.nodemon({
        script: path.join('dist', 'index.js'),
        ext: 'js',
        ignore: ['node_modules/**/*.js', 'dist/**/*.js'],
        tasts: ['babel']
    })
);