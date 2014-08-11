/**
 * @jsx React.DOM
 */
var isomorphic = require('isomorphic');
var React = isomorphic.React;

module.exports = React.createClass({
  render: function () {
    return (
      <footer id="info">
        <p>Originally created by <a href="http://facebook.com/bill.fisher.771">Bill Fisher</a></p>
        <p>Isomorphized by <a href="https://github.com/ndreckshage/">Nick Dreckshage</a></p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    );
  }
});
