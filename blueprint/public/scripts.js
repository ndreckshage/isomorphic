require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process){
/**
 * Small wrapper around `superagent` module to make it easier to consume
 * the API the same way on client & server.
 */
var superagent = require('superagent')
  , isServer = typeof window === 'undefined'
  , apiPort = process.env.API_PORT || 3031
;

/**
 * Proxy each method to `superagent`, formatting the URL.
 */
['get', 'post', 'put', 'path', 'del'].forEach(function(method) {
  exports[method] = function(path) {
    var args = Array.prototype.slice.call(arguments, 1);
    return superagent[method].apply(null, [formatUrl(path)].concat(args));
  };
});

function formatUrl(path) {
  var url;
  if (isServer) {
    // Prepend host and port of the API server to the path.
    url = 'http://localhost:' + apiPort + path;
  } else {
    // Prepend `/api` to relative URL, to proxy to API server.
    url = '/api' + path;
  }
  return url;
}

}).call(this,require("FWaASH"))
},{"FWaASH":8,"superagent":160}],2:[function(require,module,exports){
var Router = require('./router')
  , routes = require('./routes')
  , router = new Router(routes)
;

window.router = router;

router.start();

},{"./router":3,"./routes":4}],3:[function(require,module,exports){
(function (__dirname){
var director = require('director')
  , isServer = typeof window === 'undefined'
  , Handlebars = require('handlebars')
  , React = require('react')
  , viewsDir = (isServer ? __dirname : 'app') + '/views'
  , DirectorRouter = isServer ? director.http.Router : director.Router
  , firstRender = true
;

module.exports = Router;

function Router(routesFn) {
  if (routesFn == null) throw new Error("Must provide routes.");

  this.directorRouter = new DirectorRouter(this.parseRoutes(routesFn));
}

/**
 * Capture routes as object that can be passed to Director.
 */
Router.prototype.parseRoutes = function(routesFn) {
  var routes = {};

  routesFn(function(pattern, handler) {
    // Server routes are an object, not a function. We just use `get`.
    if (isServer) {
      routes[pattern] = {
        get: this.getRouteHandler(handler)
      };
    } else {
      routes[pattern] = this.getRouteHandler(handler);
    }
  }.bind(this));

  return routes;
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
    var routeContext = this
      , params = Array.prototype.slice.call(arguments)
      , handleErr = router.handleErr.bind(routeContext)
    ;

    function handleRoute() {
      handler.apply(null, params.concat(function routeHandler(err, viewPath, data) {
        if (err) return handleErr(err);

        data = data || {};
        data.renderer = isServer ? 'server' : 'client';

        router.renderView(viewPath, data, function(err, html) {
          if (err) return handleErr(err);

          if (isServer) {
            router.handleServerRoute(viewPath, html, routeContext.req, routeContext.res);
          } else {
            router.handleClientRoute(viewPath, html);
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

Router.prototype.renderView = function(viewPath, data, callback) {
  try {
    var Component = require(viewsDir + '/' + viewPath);
    var html = React.renderComponentToString(Component(data));
    callback(null, html);
  } catch (err) {
    callback(err);
  }
};

Router.prototype.wrapWithLayout = function(locals, callback) {
  try {
    var layout = require(viewsDir + '/layout')
      , layoutHtml = layout(locals)
    ;
    callback(null, layoutHtml);
  } catch (err) {
    callback(err);
  }
};

Router.prototype.handleClientRoute = function(viewPath, html) {
  document.getElementById('view-container').innerHTML = html;
};

Router.prototype.handleServerRoute = function(viewPath, html, req, res) {
  var locals = {
    body: html
  };

  this.wrapWithLayout(locals, function(err, layoutHtml) {
    res.send(layoutHtml);
  });
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

}).call(this,"/")
},{"director":9,"handlebars":24,"react":159}],4:[function(require,module,exports){
var apiClient = require('./api_client');

module.exports = function(match) {
  match('/', function(callback) {
    console.log('index');

    callback(null, 'index');
  });

  match('/posts', function(callback) {
    console.log('posts');

    apiClient.get('/posts.json', function(err, res) {
      if (err) return callback(err);

      var posts = res.body;
      callback(null, 'posts', {posts: posts});
    });
  });

  match('/posts/:id', function(id, callback) {
    console.log('post: ' + id);

    apiClient.get('/posts/' + id + '.json', function(err, res) {
      if (err) return callback(err);

      var post = res.body;
      callback(null, 'post', post);
    });
  });
};

},{"./api_client":1}],"app/views/layout.hbs":[function(require,module,exports){
module.exports=require('T0hYrO');
},{}]