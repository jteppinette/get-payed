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
gulp.task("index:build", function() {
    gulp.src("./app/index.html")
        .pipe(plumber())
        .pipe(inject(gulp.src(bowerFiles(), {"base": "./build/bower_components", "read": false}),
                     {"name": "bower", "relative": true}))
        .pipe(gulp.dest("./build/"));
});

gulp.task("index:watch", ["index:build"], function() {
    connect.reload();
});


// assets
gulp.task("assets:build", function() {
    gulp.src("./app/assets/*")
        .pipe(plumber())
        .pipe(gulp.dest("./build/assets"));
});


// sass
gulp.task("sass:build", function() {
    gulp.src("./app/sass/main.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest("./build/"));
});

gulp.task("sass:watch", ["sass:build"], function() {
    connect.reload();
});


// js
gulp.task("js:build", function() {
    gulp.src("./app/**/*.js")
        .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(concat("app.js"))
        .pipe(annotate())
        .pipe(gulp.dest("./build/"));
});

gulp.task("js:watch", ["js:build"], function() {
    connect.restart();
});


// main tasks
gulp.task("build", ["index:build", "js:build", "sass:build", "assets:build"]);

gulp.task("watch", ["build"], function() {
    gulp.watch("./app/index.html", {interval: 500}, ["index:watch"]);
    gulp.watch("./app/**/*.scss", {interval: 500}, ["sass:watch"]);
    gulp.watch("./app/**/*.js", {interval: 500}, ["js:watch"]);
});


// default task
gulp.task("default", ["build"]);
