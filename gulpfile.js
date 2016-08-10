'use strict';

var gulp = require("gulp"),
    inject = require("gulp-inject"),
    sass = require("gulp-sass"),
    concat = require("gulp-concat"),
    watch = require("gulp-watch"),
    annotate = require("gulp-ng-annotate"),
    eslint = require("gulp-eslint"),
    ignore = require("gulp-ignore"),
    plumber = require("gulp-plumber"),
    bowerFiles = require("main-bower-files");

// index
gulp.task("index", function() {
    gulp.src("./app/index.html")
        .pipe(plumber())
        .pipe(inject(gulp.src(bowerFiles(), {"base": "./build/bower_components", "read": false}),
                     {"name": "bower", "ignorePath": "build"}))
        .pipe(gulp.dest("./build/"));
});

// assets
gulp.task("assets", function() {
    gulp.src("./app/assets/*")
        .pipe(plumber())
        .pipe(gulp.dest("./build/assets"));
});

// sass
gulp.task("sass", function() {
    gulp.src("./app/sass/main.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest("./build/"));
});

// js
gulp.task("js", function() {
    gulp.src("./app/**/*.js")
        .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(concat("app.js"))
        .pipe(annotate())
        .pipe(gulp.dest("./build/"));
});

// main tasks
gulp.task("build", ["index", "js", "sass", "assets"]);

gulp.task("watch", ["build"], function() {
    gulp.watch("./app/index.html", {interval: 500}, ["index"]);
    gulp.watch("./app/**/*.scss", {interval: 500}, ["sass"]);
    gulp.watch("./app/**/*.js", {interval: 500}, ["js"]);
});

// default task
gulp.task("default", ["build"]);
