const gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    ts = require('gulp-typescript')
    pug = require('gulp-pug')
    gls = require('gulp-live-server');

const tsProject = ts.createProject("tsconfig.json");

gulp.task('pug', ()=>{
    return gulp
        .src('./index.pug')
        .pipe(pug())
        .pipe(gulp.dest('./build'))
});

gulp.task('ts', ()=>{
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(concat("bundle.js"))
        .pipe(uglify())
        .pipe(rename("bundle.min.js"))
        .pipe(gulp.dest("./build/js"))
});

gulp.task('tslint', ()=>{
    return gulp
        .src('./ts/main.ts')
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report())
})


gulp.task('sass', () => {
    return gulp
        .src('./sass/**/*.sass')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./build/css'));
});



gulp.task('server', ()=>{
    const server = gls.static('./build', 8888);
    server.start();

    gulp.watch(['build/**/*.css', 'build/**/*.html', 'build/**/*.min.js'], (file)=>{
        server.notify.apply(server, [file]);
    })
})

gulp.task('watch', ()=>{
    gulp.watch("ts/*.ts", ["ts"]);
    gulp.watch("sass/*.sass", ["sass"]);
    gulp.watch("./index.pug", ["pug"]);
});



gulp.task("run", ["sass", "ts", "pug", "server"]);

gulp.task("default", ["run", "watch"]);
