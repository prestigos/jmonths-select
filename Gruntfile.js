/*jslint browser: true, indent: 2, */
/*global module*/
module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    'jslint'  : {
      all     : {
        src : [ 'src/months-selector.js', '*.json', 'Gruntfile.js' ],
        directives : {
          indent : 2
        }
      }
    },
    'uglify'  : {
      target : {
        files : { 'dist/months-selector.js' : 'src/months-selector.js' }
      }
    },
    'connect': {
      demo: {
        options: {
          open: true,
          keepalive: true
        }
      }
    },
    'gh-pages': {
      options: {
        clone: 'bower_components/months-selector'
      },
      src: [
        'bower_components/**/*',
        '!bower_components/months-selector/**/*',
        'demo/*', 'src/*', 'index.html'
      ]
    },
    vulcanize: {
      default: {
        options: {
          inline: true,
          'strip-excludes' : false
        },
        files: {
          'dist/months-selector.html' : 'dist/months-selector.html'
        }
      }
    },
    clean : [ 'dist/months-selector.js' ],
    'replace': {
      example: {
        src: ['src/*'],
        dest: 'dist/',
        replacements: [{
          from: 'bower_components',
          to: '..'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-vulcanize');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('lint',  ['jslint']);
  grunt.registerTask('default',  ['jslint', 'replace', 'uglify', 'vulcanize', 'clean']);
  grunt.registerTask('deploy', ['gh-pages']);
  grunt.registerTask('server', ['connect']);

};
