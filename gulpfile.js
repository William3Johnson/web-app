var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    closureCompiler = require('gulp-closure-compiler'),
    htmlmin = require('gulp-htmlmin'),
    notify = require("gulp-notify");

gulp.task('build-css', function() {
    return gulp.src('source/css/app.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('public/css'))
        .pipe(notify({
            title: "SËCU",
            message: "CSS compiled"
        }));
});

gulp.task('build-js', function() {
    return gulp.src([
            'source/js/sjcl.js',
            'source/js/ractive.js',
            'source/js/ractive-events-tap.js',
            'source/js/ractive-events-keys.js',
            'source/js/main.js'
        ])
        .pipe(closureCompiler({
            compilerPath: 'node_modules/google-closure-compiler/compiler.jar',
            fileName: 'app.js',
            compilerFlags: {
                language_in: 'ES5',
                compilation_level: 'SIMPLE_OPTIMIZATIONS',
                warning_level: 'QUIET'
            }
        }))
        .pipe(gulp.dest('public/js'))
        .pipe(notify({
            title: "SËCU",
            message: "JS compiled"
        }));
});

gulp.task('build-html', function() {
    return gulp.src('source/html/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            conservativeCollapse: true,
            removeComments: true,
            removeCommentsFromCDATA: true,
            removeCDATASectionsFromCDATA: true,
            removeTagWhitespace: true,
            removeAttributeQuotes: true,
            preventAttributesEscaping: true,
            useShortDoctype: true,
            caseSensitive: true,
            includeAutoGeneratedTags: false
        }))
        .pipe(gulp.dest('public'))
        .pipe(notify({
            title: "SËCU",
            message: "HTML compiled"
        }));
});

gulp.task('watch', function() {
    gulp.watch('source/css/*.scss', ['build-css']);
    gulp.watch('source/js/*.js', ['build-js']);
    gulp.watch('source/html/*.html', ['build-html']);
});

gulp.start('build-css', 'build-js', 'build-html');

gulp.task('default', ['watch'], function() {
    return gutil.log('Gulp gulp gulp...');
});