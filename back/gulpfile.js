const gulp = require('gulp');
const ts = require('gulp-typescript');
const JSON_SRC = ['src/*.json', 'src/**/*.json'];
const JSON_TESTS = ['tests/*.json', 'tests/**/*.json'];

const tsProject = ts.createProject('tsconfig.json');


//sources files comp tasks
gulp.task('scripts', () => {
    const tsResult = tsProject.src().pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts'], () => {
    gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('assets', function() {
    return gulp.src(JSON_SRC).pipe(gulp.dest('dist'));
});

//tests files comp tasks
gulp.task('watch_tests', ['scripts'], () => {
    gulp.watch('tests/**/*.ts', ['scripts']);
});

gulp.task('assets_tests', function() {
    return gulp.src(JSON_TESTS).pipe(gulp.dest('dist'));
});

//call registrations
gulp.task('default', ['watch', 'assets', 'watch_tests', 'assets_tests']);
gulp.task('sources', ['watch', 'assets']);
gulp.task('tests', ['watch_tests', 'assets_tests']);