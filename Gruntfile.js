/*
 * Copyright (c) 2015 PDX Technology, All rights reserved.
 *
 * Unpublished copyright. All rights reserved. This material contains
 * proprietary information that shall be used or copied only with
 * PDX Technology, except with written permission of PDX Technology.
 *
 */

module.exports = function(grunt) {

grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower_concat: {
        all: {
            dest: 'public/dist/bower.js'
        }
    },
    bower: {
        install: {
            options: {
                install: true,
                copy: false,
                targetDir: '.libs',
                cleanTargetDir: true
            }
        }
    },
    watch: {
        options: {
          livereload: true
        },
        dev: {
            files: [ 'Gruntfile.js', 'app.js', 'lib/**/*.js', 'public/**', 'views/**/*.ejs' ],
            tasks: [ 'express:dev' ],
            options: {
                atBegin: true,
                spawn: false
            }
        },
        test: {
            files: [ 'Gruntfile.js', 'lib/**/*.js', 'public/**/*.html', 'test/**/*.spec.js' ],
            tasks: [ 'mochaTest' ],
            options: {
                atBegin: true
            }
        }
    },
    concat_css: {
        options: {},
        all: {
            src: [
                "bower_components/bootstrap/dist/css/bootstrap.min.css",
                "public/stylesheets/inspinia.min.css"
            ],
            dest: "public/dist/bower.css"
        }
    },
    express: {
      options: {
      },
      dev: {
        options: {
          script: 'bin/www'
        }
      }
    }
});

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-express-server');

    grunt.registerTask('default', ['bower', 'bower_concat', 'concat_css', 'express:dev']);
    grunt.registerTask('build', ['bower', 'bower_concat', 'concat_css']);
    grunt.registerTask('dev', ['build', 'watch:dev']);
    grunt.registerTask('dev-test', ['build', 'watch:test']);
};
