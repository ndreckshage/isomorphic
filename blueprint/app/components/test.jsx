/**
 * @jsx React.DOM
 */
var isomorphic = require('isomorphic');
var React = isomorphic.React;

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <a href="/">index</a>
      </div>
    );
  }
});
