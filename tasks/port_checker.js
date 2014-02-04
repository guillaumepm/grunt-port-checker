/*
 * grunt-port-checker
 * https://github.com/guillaumepm/grunt-port-checker
 *
 * Copyright (c) 2014 Guillaume Poulet-Mathis
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {


    var portchecker = require('portchecker'); // @see https://github.com/danielzzz/node-portchecker
    var url = require('url');

  grunt.registerMultiTask('portChecker', 'Verify that a port is available and update grunt configurations as necessary.', function() {

      var self = this;
      var targetPort = parseInt(grunt.config(self.data.target), 10);

      if(isNaN(targetPort)) {
          grunt.fail.warn("targetPort parameter must point to a port number configuration");
      }


      var endPort = targetPort + 100;
      var affectPaths = self.data.affectPaths;


      var done = self.async(); // async task, so wait until done()


      // Merge task-specific and/or target-specific options with these defaults.
      var options = this.options({
          affectPaths: [],
          host: "localhost"
      });


      portchecker.getFirstAvailable(targetPort, endPort, self.data.host, function(port, host) {

          // Change port only when it is not available
          if(port !== targetPort) {
              grunt.log.subhead("Port "+targetPort+" unavailable, changing to " + port);

              // Set target to new port
              grunt.config(self.data.target, port);
              grunt.log.ok("Updated configation key "+self.data.target+" with " + port);

              // Modify all affected paths to reflect the new port
              affectPaths.forEach(function(path) {

                  // Get configuration from path
                  var urlPath = grunt.config(path);

                  // Parse as URL object
                  // TODO negative test
                  var parsedURLPath = url.parse(urlPath);

                  // Fail when there is no port in the url
                  if(!parsedURLPath.port) {
                      grunt.fail.warn("URL path in affectPaths doesn't contain a port");
                  }

                  // Set host to null to force reformatting of the url, @see http://nodejs.org/api/url.html#url_url_format_urlobj
                  parsedURLPath.host = null;

                  // Set new port
                  parsedURLPath.port = port;

                  // Update configuration with the new url
                  grunt.config(path, url.format(parsedURLPath));
                  grunt.log.ok("Updated configuration key " + path + " with " + url.format(parsedURLPath));

              });

          } else {

              // Nothing to do
              grunt.log.subhead("Port "+self.data.target+" available");

          }
          done();
      });


  });

};
