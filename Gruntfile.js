/*jslint browser: true, indent: 2, */
/*global module*/
module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    'jslint'  : {
      all     : {
        src : [ 'jmonths-select.jquery.js', '*.json', 'Gruntfile.js' ],
        directives : {
          indent : 2
        }
      }
    },
    'uglify'  : {
      target : {
        files : { 'jmonths-select.jquery.min.js' : 'jmonths-select.jquery.js' }
      }
    }
  });

  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('lint',  ['jslint']);
  grunt.registerTask('default',  ['jslint', 'uglify']);

};
