# grunt-port-checker

> Based on npm module [portchecker](https://github.com/danielzzz/node-portchecker).
> Verify that a port is available and update grunt configurations as necessary.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-port-checker --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-port-checker');
```

## The "portChecker" task

### Overview
In your project's Gruntfile, add a section named `port_checker` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  portChecker: {
    target: 'connect.test.options.port',
    affectPaths: ['jasmine.options.host']
  },
});
```

#### target
Type: `String`

The configuration path to where the port is defined as an integer

#### affectPaths
Type: `Array`
Optional

An array of url configuration paths affected by the port change (e.g. 'jasmine.options.host')


### Usage Examples

```js
grunt.initConfig({
  port_checker: {
    target: 'connect.test.options.port',
    affectPaths: ['jasmine.options.host']
  },
});
```


## Release History
_(Nothing yet)_
