var isServer = typeof window === 'undefined';
var path = require('path');
var cwd = process.cwd();
var firstRender = true;

var director = require('director');
var React = require('react');

var componentsDir, routesDir, DirectorRouter;
if (isServer) {
  componentsDir = path.join(cwd, 'app', 'components');
  routesDir = path.join(cwd, 'app', 'routes');
  DirectorRouter = director.http.Router;
} else {
  componentsDir = path.join('app', 'components');
  routesDir = path.join('app', 'routes');
  DirectorRouter = director.Router;
}

function Router (routes) {
  if (!routes) {
    throw new Error("Must provide routes.");
  }
  this.directorRouter = new DirectorRouter(this.parseRoutes(routes));
}

/**
 * Capture routes as object that can be passed to Director.
 */
Router.prototype.parseRoutes = function (routes) {
  var _routes = {};
  routes(function (pattern, file) {
    var handler = require(path.join(routesDir, file));
    if (isServer) {
      _routes[pattern] = {
        get: this.getRouteHandler(handler)
      };
    } else {
      _routes[pattern] = this.getRouteHandler(handler);
    }
  }.bind(this));
  return _routes;
};

Router.prototype.getRouteHandler = function(handler) {
  var router = this;

  return function() {
    /** If it's the first render on the client, just return; we don't want to
     * replace the page's HTML.
     */
    if (!isServer && firstRender) {
      firstRender = false;
      return;
    }

    // `routeContext` has `req` and `res` when on the server (from Director).
    var routeContext = this;
    var params = Array.prototype.slice.call(arguments);
    var handleErr = router.handleErr.bind(routeContext);

    function handleRoute() {
      handler.apply(null, params.concat(function routeHandler(err, componentPath, data) {
        if (err) return handleErr(err);

        data = data || {};
        data.renderer = isServer ? 'server' : 'client';

        router.renderComponent(componentPath, data, function(err, component) {
          if (err) return handleErr(err);

          if (isServer) {
            router.handleServerRoute(component, routeContext.req, routeContext.res);
          } else {
            router.handleClientRoute(component);
          }
        });
      }));
    }

    try {
      handleRoute();
    } catch (err) {
      handleErr(err);
    }
  };
};

Router.prototype.handleErr = function(err) {
  console.error(err.message + err.stack);

  // `this.next` is defined on the server.
  if (this.next) {
    this.next(err);
  } else {
    alert(err.message);
  }
};

Router.prototype.renderComponent = function(componentPath, data, callback) {
  try {
    var Component = require(path.join(componentsDir, componentPath));
    callback(null, Component(data));
  } catch (err) {
    callback(err);
  }
};

Router.prototype.handleClientRoute = function(component) {
  React.renderComponent(component, document.getElementById('isomorphic'));
};

Router.prototype.handleServerRoute = function (component, req, res) {
  var html = React.renderComponentToString(component);
  res.render('index', { body: html });
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
Router.prototype.setRoute = function(route) {
  this.directorRouter.setRoute(route);
};

module.exports = Router;
