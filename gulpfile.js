"use strict";

const del = require("del");
const gulp = require("gulp");
const less = require("gulp-less");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync");

gulp.task("html", function() {
    return gulp.src(["index.html", "src/**/*.html"])
        .pipe(gulp.dest("public"));
});

gulp.task("styles", function() {
    return gulp.src("src/**/*.less")
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat("styles.css"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("public"));
});

gulp.task("libs", function() {
    return gulp.src("node_modules/angular/angular.js")
        .pipe(gulp.dest("public"));
});

gulp.task("js", function() {
    return gulp.src("src/**/*.js")
        .pipe(concat("bundle.js"))
        .pipe(gulp.dest("public"));
});

gulp.task("clean", function() {
    return del("public");
});

gulp.task("watch", function() {
    gulp.watch(["index.html", "src/**/*.html"], gulp.series("html"));
    gulp.watch("src/**/*.less", gulp.series("styles"));
    gulp.watch("src/**/*.js", gulp.series("js"));
});

gulp.task("build", gulp.series("clean", gulp.parallel("html", "styles", "libs", "js")));

gulp.task("serve", function() {
    browserSync.init({
        server: "public"
    });

    browserSync.watch("public/**/*.*").on("change", browserSync.reload);
});

gulp.task("dev", gulp.series("build",  gulp.parallel("watch", "serve")));

gulp.task("default", gulp.series("clean", "dev"));
