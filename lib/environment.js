var path = require('path');
var merge = require('merge');

var isServer = typeof window === 'undefined';
var environmentJSON = isServer ? require(path.join(process.cwd(), 'environment')) : require('environment');

var DEFAULT_ENVIRONMENT = 'development';

/**
 * @constructor
 * @param {array} all
 */
function Environment () {
  this.all = {};
  this.active = {};
  this.DEFAULT_ENVIRONMENT = DEFAULT_ENVIRONMENT;

  environmentJSON.forEach(function (environment) {
    var settings = merge({
      endpoint: null,
      minifyCSS: true,
      uglify: true,
      envify: true
    }, environment);

    this.all[environment.name] = merge({
      name: environment.name
    }, settings);
  }.bind(this));

  return this;
}

/**
 * activate specified environment
 * @param {string} environment
 */
Environment.prototype.activate = function (environment) {
  this.active = this.all[environment];
}

module.exports = Environment;
