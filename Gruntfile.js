/*
 * grunt-port-checker
 * https://github.com/guillaumepm/grunt-port-checker
 *
 * Copyright (c) 2014 Guillaume Poulet-Mathis
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },



    // Configuration to be run (and then tested).
    portChecker: {
        main: {
            target: "connect.serverTest1.options.port",
            affectPaths: ['']
        }
    },

    connect: {

        serverTest1: {
            options: {
                port:3335,
                url:"http://localhost:3335/test",
                base: "test/static"
            }
        },
        serverTest2: {
            options: {
                port:3335,
                url:"http://localhost:3335/test",
                base: "test/static"
            }
        }

    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'portChecker', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
