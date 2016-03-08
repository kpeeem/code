//############################### Require ###############################################

var
    gulp = require("gulp"),
    concat = require("gulp-concat"),
    filter = require("gulp-filter"),
    order = require("gulp-order"),
    mainBowerFiles = require("main-bower-files"),
    uglify = require("gulp-uglify"),
    styl = require("gulp-styl"),
    browserSync = require("browser-sync"),
    minifyHTML = require("gulp-minify-html"),
    sass = require("gulp-sass"),
    sourcemaps = require("gulp-sourcemaps"),
    bowerNormalizer = require("gulp-bower-normalize"),
    iconFont = require("gulp-iconfont"),
    iconFontCss = require("gulp-iconfont-css"),
    print = require("gulp-print"),
    autoprefixer = require("gulp-autoprefixer"),
    csso = require("gulp-csso"),
    gulpif = require("gulp-if"),
    template = require("gulp-template");

var argv = require("yargs").argv;
var reload = browserSync.reload;

//############################## Tasks ##################################################


gulp.task("iconfont", function () {

var fontName = "res_icons",
    runTimestamp = Math.round(Date.now() / 1000);
return gulp.src(["icons/*.svg"])

    .pipe(iconFontCss({
        fontName: fontName,
        path: "css/templates/_icons.scss",
        targetPath: "../css/_res_icons.scss",
        fontPath: "../fonts/"
    }))
    .pipe(iconFont({
        fontName: fontName, // required
        appendUnicode: true, // recommended option
        formats: ["ttf", "eot", "woff"],
        timestamp: runTimestamp
    }))
    .on("glyphs", function (glyphs, options) {
        // CSS templating, e.g.
        console.log(glyphs);

        gulp.src("templates/fonticon/fonticon.html")
            .pipe(template({ glyphs: glyphs, options: options, prefix : "res-", "cssUrls": "/static/build/pack.css"}))
            .pipe(gulp.dest("./../templates/"))
    })
    .pipe(gulp.dest("fonts/"));
});

gulp.task("js", function () {
    var vendors = mainBowerFiles();

    // vendors = vendors.concat([
    //     "js/init.js", 
    //     "js/helpers.js", 
    //     "js/*-module.js", 
    //     "js/app.js"
    //     ]);

    return gulp.src(vendors)
        // .pipe(bowerNormalizer({bowerJson: "./bower.json"}))
        .pipe(filter("*.js"))
        .pipe(print(function (filepath) {
            return "filter/order('*.js') " + filepath;
        }))
        .pipe(concat("pack.js"))
        .pipe(gulpif(argv.prod, uglify()))
        .pipe(gulp.dest("./build/"));
});

gulp.task("sass", function () {
    return gulp.src(["css/style.scss"])
        .pipe(sass().on("error", sass.logError))
        // .pipe(sourcemaps.init())
        .pipe(concat("pack.css"))
        .pipe(autoprefixer({
            browsers: ["last 6 versions"],
            cascade: false
        }))
        .pipe(gulpif(argv.prod, csso()))
        // .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./build"))
});
gulp.task("html", function () {
    var opts = {
        conditionals: true,
        spare: true
    };
    return gulp.src("*.html")
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest("buildhtml"))
});
gulp.task("serve", [/*"iconfont", */"sass", "js"], function () {
    browserSync.init({
        server: {
            port: 8000,
            baseDir: "."
        }
    });
    // gulp.watch("scss/*.scss", ["sass"]);//sc6s dir is undefined
    // gulp.watch("*.html").on("change", browserSync.reload);
});

gulp.task("watch", ["serve"], function () {
    gulp.watch(["./css/**.scss", "./js/**.js"], ["js", "sass"]);
    // gulp.watch(["*.html", ["html"]], ["main"]);
});
gulp.task("watchcss", function () {
    gulp.watch(["./css/**"], ["sass"]);
    // gulp.watch(["*.html", ["html"]], ["main"]);
});

gulp.task("default", ["sass", "js"]);
