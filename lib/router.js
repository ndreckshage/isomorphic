var path = require('path');
var cwd = process.cwd();
var fs = require('fs');
var firstRender = true;
var director = require('director');
var React = require('react');
var SafePromise = require('es6-promise').Promise;

// @TODO refactor
var appDir, componentsDir, routesDir, storesDir, DirectorRouter;
function Router () {
  var renderer = typeof window !== 'undefined' ? 'client' : 'server';

  if (renderer === 'server') {
    appDir = path.join(cwd, 'app');
    componentsDir = path.join(cwd, 'app', 'components');
    routesDir = path.join(cwd, 'app', 'routes');
    storesDir = path.join(cwd, 'app', 'stores');
    DirectorRouter = director.http.Router;
  } else {
    appDir = path.join('app');
    componentsDir = path.join('app', 'components');
    routesDir = path.join('app', 'routes');
    storesDir = path.join('app', 'stores');
    DirectorRouter = director.Router;
  }

  var routes = require(path.join(appDir, 'router'));

  this.renderer = renderer;
  this.directorRouter = new DirectorRouter(this.parseRoutes(routes));
}

/**
 * Capture routes as object that can be passed to Director.
 */
Router.prototype.parseRoutes = function (routes) {
  var _routes = {};
  routes(function (pattern, file) {
    if (this.renderer === 'server') {
      _routes[pattern] = {
        get: this.getRouteHandler(file)
      };
    } else {
      _routes[pattern] = this.getRouteHandler(file);
    }
  }.bind(this));
  return _routes;
};

/**
 * immediately resolve a promise
 */
function emptyPromise () {
  return new SafePromise(function (resolve) {
    resolve();
  });
}

/**
 * call the route file associated with matched route
 * @param {string} file
 */
Router.prototype.getRouteHandler = function (file) {
  var router = this;
  var renderer = this.renderer;

  return function() {
    /**
     * If it's the first render on the client, just return; we don't want to
     * replace the page's HTML.
     */
    if (renderer === 'client' && firstRender) {
      firstRender = false;
      return;
    }

    var routeContext = this;
    var params = Array.prototype.slice.call(arguments);
    var handleErr = router.handleErr.bind(routeContext);

    try {
      // adding route files are optional. but recommended...
      try {
        var handler = require(path.join(routesDir, file));
      } catch (e) {
        var handler = {};
      }

      // if render not specified, default to structure specified in router
      if (!handler.render) {
        handler.render = file;
      }

      // promise is optional in routes
      if (!handler.promise) {
        handler.promise = emptyPromise;
      }

      /**
       * route returns promise, renders component
       */
      handler.promise.apply(null, params).then(function (data) {
        data = data || {};
        data.renderer = renderer;
        router.renderComponent(handler.render, data, handler.criticalCSS, routeContext);
      }, function (err) {
        return handleErr(err);
      });
    } catch (err) {
      handleErr(err);
    }
  };
};

Router.prototype.handleErr = function (err) {
  // `this.next` is defined on the server.
  if (this.next) {
    this.next(err);
  } else {
    alert(err.message);
  }
};

/**
 * adds critical css if specified. all css if not specified.
 * @param {string} criticalCSSPath
 * @returns {object} css
 */
Router.prototype.renderCriticalCSS = function (criticalCSSPath) {
  var criticalCSS = null;
  try {
    var criticalCSS = fs.readFileSync(path.join(cwd, 'public', 'critical', criticalCSSPath + '.css'), 'utf8');
    criticalCSS = '<style>' + criticalCSS + '</style>';
  } catch (e) {}

  if (criticalCSS) {
    return {
      critical: criticalCSS,
      nonCritical: JSON.stringify('/isomorphic.css')
    }
  } else {
    return {
      critical: '<link href="/isomorphic.css" rel="stylesheet" type="text/css">',
      nonCritical: JSON.stringify(null)
    }
  }
};

/**
 * creates an empty div component when needed
 */
function defaultComponent () {
  return React.createClass({displayName: 'defaultComponent',
    render: function () {
      return (
        React.DOM.div(null)
      );
    }
  });
}

/**
 * finds the component, compiles it, and call callback
 * @param {string} componentPath
 * @param {object} data
 * @param {string} criticalCSSPath
 * @param {function} req
 * @param {function} res
 */
Router.prototype.renderComponent = function (componentPath, data, criticalCSS, routeContext) {
  try {
    try {
      var Component = require(path.join(componentsDir, componentPath));
    } catch (e) {
      var Component = defaultComponent();
    }

    var component = Component(data);
    if (this.renderer === 'server') {
      var css = this.renderCriticalCSS(criticalCSS);
      var htmlReplace = {
        component: React.renderComponentToString(component),
        componentPath: JSON.stringify(componentPath),
        data: JSON.stringify(data),
        criticalCSS: css.critical,
        nonCriticalCSS: css.nonCritical
      };

      this.indexHTML(htmlReplace, routeContext.req, routeContext.res);
    } else {
      React.renderComponent(component, document.getElementById('isomorphic'))
    }
  } catch (err) {
    this.handleErr(err);;
  }
};

/**
 * replace index html with React components and serve
 */
Router.prototype.indexHTML = function (htmlReplace, req, res) {
  try {
    var html = fs.readFileSync(path.join(cwd, 'index.html'), 'utf8');
    html = html.replace('{{BODY}}', htmlReplace.component);
    html = html.replace('{{COMPONENT_PATH}}', htmlReplace.componentPath);
    html = html.replace('{{DATA}}', htmlReplace.data);
    html = html.replace('{{CRITICAL_CSS}}', htmlReplace.criticalCSS);
    html = html.replace('{{NON_CRITICAL_CSS}}', htmlReplace.nonCriticalCSS);
    res.send(html);
  } catch (e) {
    res.send(500, 'Cannot find index.html');
  }
};

/**
 * time for the client to take over
 * @param {string} componentPath
 * @param {object} data
 */
Router.prototype.serverToClient = function (componentPath, data) {
  var self = this;
  if (self.renderer === 'client') {
    self.renderComponent(componentPath, data);
  }
};

/*
 * Express middleware function, for mounting routes onto an Express app.
 */
Router.prototype.middleware = function() {
  var directorRouter = this.directorRouter;

  return function middleware(req, res, next) {
    // Attach `this.next` to route handler, for better handling of errors.
    directorRouter.attach(function() {
      this.next = next;
    });

    // Dispatch the request to the Director router.
    directorRouter.dispatch(req, res, function (err) {
      // When a 404, just forward on to next Express middleware.
      if (err && err.status === 404) {
        next();
      }
    });
  };
};

/**
 * Client-side handler to start router.
 */
Router.prototype.start = function(bootstrappedData) {
  this.bootstrappedData = bootstrappedData;

  /**
   * Tell Director to use HTML5 History API (pushState).
   */
  this.directorRouter.configure({
    html5history: true
  });

  /**
   * Intercept any links that don't have 'data-pass-thru' and route using
   * pushState.
   */
  document.addEventListener('click', function(e) {
    var el = e.target
      , dataset = el && el.dataset
    ;
    if (el && el.nodeName === 'A' && (
        dataset.passThru == null || dataset.passThru === 'false'
      )) {
      this.directorRouter.setRoute(el.attributes.href.value);
      e.preventDefault();
    }
  }.bind(this), false);

  /**
   * Kick off routing.
   */
  this.directorRouter.init();
};

/**
 * Client-side method for redirecting.
 */
Router.prototype.setRoute = function (route) {
  this.directorRouter.setRoute(route);
};

module.exports = new Router();
