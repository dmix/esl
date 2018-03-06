// =================================================
// Directories
// =================================================

import gulp from 'gulp';
import _ from 'gulp-load-plugins';

import gulpsmith from 'gulpsmith';
import layouts from 'metalsmith-layouts';
import collections from 'metalsmith-collections';
import templates from 'metalsmith-in-place';
import assign from 'lodash.assign';
import markdown from 'metalsmith-markdown';
import permalinks from 'metalsmith-permalinks';
import dateFormatter from 'metalsmith-date-formatter';

import log from 'fancy-log';
import harmonize from 'harmonize';
import superstatic from 'superstatic';


// Directories
// -------------------------------------------------

const jsVendor = [
    'assets/vendor/js/*.js',
    'assets/vendor/js/**/*.js',
];
const jsSource = [
    'assets/js/*.js',
    'assets/js/**/*.js',
];
const htmlSource = [
    'src/*.html',
    'src/**/*.html',
    'src/blog_posts/*.md'
];
const blogSource = 'src/blog_posts/*.md';
const cssVendor = [
    'assets/vendor/css/.css',
    'assets/vendor/css/**/*.css',
];
const cssSource = [
    'assets/css/style.css',
    'assets/css/_layout.css',
    'assets/css/_content.css',
    'assets/css/_contact.css',
    'assets/css/_blog.css',
];
const imgSource = [
    // 'src/assets/images#<{(|.png',
    // 'src/assets/images#<{(|.jpg',
    // 'src/assets/images#<{(|.jpeg',
    // 'src/assets/images#<{(|.gif',
    'assets/images/*',
    'assets/images/**'
];
const fontSource = [
    'assets/fonts/*'
];
const output = './build/';
harmonize(); // Fixes issues with gulpsmith


// Javascript
// -------------------------------------------------
gulp.task('jslib', () => {
    gulp.src(jsVendor)
        .pipe(_.concat('lib.js'))
        .pipe(gulp.dest(output + '/js'))
        .pipe(_.size({title: 'js'}));
});

gulp.task('js', () => {
    gulp.src(jsSource)
        .pipe(_.concat('fortedefence.js'))
        .pipe(_.uglify())
        .on('error', handleError)
        .pipe(gulp.dest(output + '/js'))
        .pipe(_.size({title: 'js'}));
});


// HTML
// -------------------------------------------------

gulp.task('html', () => {
    gulp.src(htmlSource)
        .pipe(_.front-matter()).on("data", function(file) {
            assign(file, file.frontMatter);
            delete file.frontMatter;
        })
        .pipe(
            gulpsmith()
                .use(collections({
                    blog_posts: {
                        pattern: 'blog_posts/*.md',
                        sortBy: 'date',
                    }
                }))
                .use(layouts({
                    directory: 'src/layouts',
                    engine: 'handlebars',
                    partials: 'src/partials',
                    default: 'application.html'
                }))
                .use(templates({
                    engine: 'handlebars',
                    partials: 'src/partials',
                }))
        )
        // .on('error', handleError)
        // .pipe(_.html-minifier({collapseWhitespace: true}))
        .pipe(gulp.dest(output));
});

// Blog
// -------------------------------------------------

gulp.task('blog', () => {
    gulp.src(blogSource)
        .pipe(_.front-matter()).on("data", function(file) {
            assign(file, file.frontMatter);
            delete file.frontMatter;
        })
        .pipe(
            gulpsmith()
                .use(dateFormatter({
                    dates: [
                        {
                            key: 'date',
                            format: 'MMMM Do, YYYY'
                        }
                    ]
                }))
                .use(markdown({
                    smartypants: true
                }))
                .use(layouts({
                    directory: 'src/layouts',
                    engine: 'handlebars',
                    partials: 'src/partials',
                    default: 'blog_post.html'
                }))
                .use(permalinks(':permalink'))
        )
        .pipe(gulp.dest(output));
});

// CSS
// -------------------------------------------------

gulp.task('csslib', () => {
    gulp.src(cssVendor)
        .pipe(_.concat('lib.css'))
        .pipe(gulp.dest(output + '/css'))
        .pipe(_.size({title: 'styles'}));
});

gulp.task('css', () => {
    gulp.src(cssSource)
        .pipe(_.concat('fortedefence.css'))
        .pipe(_.nano())
        .on('error', handleError)
        .pipe(gulp.dest(output + '/css'))
        .pipe(_.size({title: 'styles'}));
});


// Static Assets
// -------------------------------------------------

gulp.task('images', () => {
    gulp.src(imgSource)
        // .pipe(_.imagemin({
        //   progressive: true,
        //   interlaced: true
        // }))
        .pipe(gulp.dest(output + '/img'))
        .pipe(_.size({title: 'images'}));
});

gulp.task('fonts', () =>
    gulp.src(fontSource)
        .pipe(gulp.dest(output + '/fonts'))
        .pipe(_.size({title: 'fonts'}))
);


// Server
// -------------------------------------------------

const server = superstatic({
    root: output,
    clean_urls: true,
    port: 9000,
    config: {
        root: output
    },
    gzip: true,
    debug: true
});


gulp.task('server-reload', () => {
    server.close();
});

gulp.task('server', () => {
    server.listen(() => {
        console.log( 'Server running on port ' + server.port );
    });
});


// Tasks
// -------------------------------------------------

gulp.task('complete', () => {
    _.notify({
        message: 'Gulp build complete'
    });
});

gulp.task('watch', () => {
    gulp.watch(cssSource,  ['css',    'server-reload', 'server']);
    gulp.watch(jsSource,   ['js',     'server-reload', 'server']);
    gulp.watch(htmlSource, ['html',   'server-reload', 'server']);
    gulp.watch(imgSource,  ['images', 'server-reload', 'server']);
});

gulp.task('build', _.async([
    'html',
    'blog',
    'images',
    'fonts',
    'csslib',
    'css',
    'jslib',
    'js',
    'complete'
]));

gulp.task('default', ['build', 'server', 'watch']);


// Helpers
// -------------------------------------------------

function handleError(err) {
    log.error(err);
    gulp.notify({
        message: err
    });
}
