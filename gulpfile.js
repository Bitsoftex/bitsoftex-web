var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var fs = require('fs');
var Qrcodesvg = require('qrcodesvg');
var pkg = require('./package.json');
var contact = require('./contact.json');
var date = new Date();

// Set the banner content
var banner = [  '/*!',
                ' * Bitsoftex - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)',
                ' * Copyright 2016-' + date.getFullYear(), ' <%= pkg.author %>',
                ' * Licensed under <%= pkg.license.type %>',
                ' */'].join('');

// vCard data
var vcard = [   'BEGIN:VCARD\n',
                'VERSION:3.0\n',
                'N:'+contact.support.surname+';'+contact.support.name+';;;\n',
                'FN:'+contact.support.name+' '+contact.support.surname+'\n',
                'ORG:'+contact.support.organisation+'\n',
                'TITLE:'+contact.support.type+'\n',
                'EMAIL;INTERNET:'+contact.support.email+'\n',
                'URL;WORK:'+contact.support.url.work+'\n',
                'TEL;WORK:'+contact.support.telephone.work+'\n',
                'X-TELEGRAM:'+contact.support.telegram+'\n',
                'PHOTO;ENCODING='+contact.support.photo.encoding+';TYPE='+contact.support.photo.type+':'+contact.support.photo.data+'\n',
                'REV:'+date.toISOString()+'\n',
                'END:VCARD'].join('');
var vcardqr = [ 'BEGIN:VCARD\n',
                'VERSION:3.0\n',
                'N:'+contact.support.surname+';'+contact.support.name+';;;\n',
                'FN:'+contact.support.name+' '+contact.support.surname+'\n',
                'ORG:'+contact.support.organisation+'\n',
                'TITLE:'+contact.support.type+'\n',
                'EMAIL;INTERNET:'+contact.support.email+'\n',
                'URL;WORK:'+contact.support.url.work+'\n',
                'TEL;WORK:'+contact.support.telephone.work+'\n',
                'X-TELEGRAM:'+contact.support.telegram+'\n',
                'REV:'+date.toISOString()+'\n',
                'END:VCARD'].join('');

// Compile LESS files from /less into /css
gulp.task('less', function() {
    return gulp.src('assets/less/grayscale.less')
        .pipe(less())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('assets/css/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify compiled CSS
gulp.task('minify-css', ['less'], function() {
    return gulp.src('assets/css/grayscale.css')
        .pipe(cleanCSS({ compatibility: 'ie8', keepSpecialComments: 0 }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('assets/css/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify JS
gulp.task('minify-js', function() {
    return gulp.src('assets/js/grayscale.js')
        .pipe(header(banner, { pkg: pkg }))
        .pipe(uglify({ preserveComments: false }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('assets/js/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('vcard', function () {
    fs.writeFileSync('assets/contact/support-bitsoftex.vcf', vcard);
})

gulp.task('qrcode', function () {
    var qrcode = new Qrcodesvg(vcardqr, 400, {"ecclevel" : 2});
    fs.writeFileSync('assets/contact/support-qr.svg', qrcode.generate());
})

gulp.task('copy', function() {
    gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('assets/vendor/bootstrap'))

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('assets/vendor/jquery'))

    gulp.src([
            'node_modules/font-awesome/**',
            '!node_modules/font-awesome/**/*.map',
            '!node_modules/font-awesome/.npmignore',
            '!node_modules/font-awesome/*.txt',
            '!node_modules/font-awesome/*.md',
            '!node_modules/font-awesome/*.json'
        ])
        .pipe(gulp.dest('assets/vendor/font-awesome'))
})

// Run everything
gulp.task('create', ['less', 'minify-css', 'minify-js', 'copy', 'vcard', 'qrcode']);

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
})

gulp.task('watch', ['browserSync', 'less', 'minify-css', 'minify-js'], function() {
    gulp.watch('assets/less/*.less', ['less']);
    gulp.watch('assets/css/*.css', ['minify-css']);
    gulp.watch('assets/js/*.js', ['minify-js']);
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('assets/css/**/*.css', browserSync.reload);
    gulp.watch('assets/js/**/*.js', browserSync.reload);
});
