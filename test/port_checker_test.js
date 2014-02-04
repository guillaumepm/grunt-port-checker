'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.port_checker = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {

      grunt.task.run("connect:serverTest1");
      grunt.task.run("portChecker");

      // The port of our second server should have
      test.equal(grunt.config("connect.serverTest2.options.port"), "3335", "Target port should be modified");
      test.equal(grunt.config("connect.serverTest2.options.url"), "http://localhost:3335/test", "Port on url should be modified");

    test.done();
  }

};
