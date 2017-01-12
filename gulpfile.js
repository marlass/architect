"use strict"

const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const postcssScss = require('postcss-scss');
const reporter = require('postcss-reporter');
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const csso = require('postcss-csso');
const postcss_single_charset = require('postcss-single-charset');
const bs = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const stylelint = require('stylelint');
const imagemin = require('gulp-imagemin');
const shell = require('gulp-shell');

const config = {
    src: {
        sass: "./src/scss/",
        uploadedImages: './app/public/uploads/'
    },
    dest: {
        css: "./app/public/css/"
    }
}

function server(){
    bs.init({
        proxy: 'localhost:3000'
    });
}

function compileSass(){
    let processors = [
        autoprefixer({browsers: ['>1%']}),
        csso({ restructure: false }),
        postcss_single_charset()
    ];
    return gulp.src(config.src.sass + '*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(postcss([stylelint(),reporter({clearMessages: true})],{syntax: postcssScss}))
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.dest.css))
        .pipe(bs.reload({stream:true}));
}

function uploadedImages(){
    return gulp.src(config.src.uploadedImages + '**/*.+(jpeg|jpg|png|tiff|webp|svg|gif)')
        .pipe(imagemin())
        
}

function uploadedImages2() {
    return gulp.src('./gulpfile.js')
        .pipe(shell('npm run uploadedImages'))
}   

function watch(){
    gulp.watch(config.src.sass + "*.scss", styles);
    gulp.watch(config.src.uploadedImages + "**/*.+(jpeg|jpg|png|tiff|webp|svg|gif)", gulp.series(uploadedImages,uploadedImages2));
}

const styles = gulp.series(compileSass);

gulp.task('styles', styles);
gulp.task('uploadedImages', uploadedImages);
gulp.task('uploadedImages', uploadedImages2);
gulp.task('watch', gulp.parallel(server, watch));
gulp.task('build', gulp.parallel(styles, gulp.series(uploadedImages, uploadedImages2)));

gulp.task('default', watch);
