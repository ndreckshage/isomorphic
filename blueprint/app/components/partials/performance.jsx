/**
 * @jsx React.DOM
 */
var isomorphic = require('isomorphic');
var React = isomorphic.React;

module.exports = React.createClass({
  /**
   * display component with initial state
   */
  getInitialState: function () {
    return {
      server: '000',
      client: '000',
      total: '000'
    };
  },

  /**
   * component in to dom
   */
  componentDidMount: function () {
    var self = this;
    isomorphic.performance.then(function (stats) {
      self.setState({ server: stats.server, client: stats.client, total: stats.total });
    });
  },

  /**
   * react render component
   */
  render: function () {
    var performance = <h2>rendered client-side</h2>;
    if (this.props.renderer === "server") {
      performance = <h2>rendered server-side in {this.state.total}ms ({this.state.server}ms server, {this.state.client}ms client). <span className={"css-state"}></span></h2>;
    }
    return (
      <div>
        {performance}
      </div>
    );
  }
});
