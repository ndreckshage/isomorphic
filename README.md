#isomorphic

###_Work in Progress. Not Complete._

Command-line interface and project structure for building fast, isomorphic webapps with [React](http://facebook.github.io/react/) + [Flux](http://facebook.github.io/flux/).

######Install
```sh
npm install -g isomorphic
isomorphic new your-app # --todo (for example app)
cd your-app && npm install
isomorphic server
```
Then go to [localhost:3030](http://localhost:3030)...or see it now at [isomorphic-todo.frontendperformance.com](http://isomorphic-todo.frontendperformance.com).

[Basic code implementation snippet](https://github.com/frontendperformance/isomorphic/wiki/Basic-Implementation
)

###What?

- Server rendered websites provide SEO and initial page load performance\*.
- Client rendered webapps (MVx, etc.) offer a better user experience\*, and are faster after the initial page load\*. They struggle with SEO\*\* and initial page load performance\*\*.

[Isomorphic](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/) webapps are single page applications that render on both the client and server (using [nodejs](http://nodejs.org/)). They are ambitious client side webapps with SEO and initial page load performance by **default**.

\*_Typically_ and \*\*_without jumping through hoops_

###Goals

> "MY SERVER WILL NEVER BE IN NODE AND I WILL NEVER USE MONGO." -- [PHP CEO](https://twitter.com/PHP_CEO)

Many developers turn away from Node, because full stack JavaScript (API; data) might not be feasible, or desirable. This separates the frontend Node.js server from the data layer. Both the client, and frontend server interact with a language agnostic API endpoint.

- Provide the most 'JavaScript bang' for your 'performance buck'.
- Simplicity. Make it easy to create high quality, highly performant isomorphic webapps.
- Follow [performance best practices](https://developers.google.com/speed/docs/best-practices/rules_intro): Server rendered HTML; no blocking assets; critical css.
- Piece together simple, great tools, to provide an easy to use CLI and framework, without reinventing the wheel.
- Smart build tools: simple CLI (scaffolding + generators); Unit testing; [Gulp](http://gulpjs.com/) tasks.

*Note: Your backend server can still be written in Node.js, which can of course still use Mongo.*

###Libraries / Tools

######Core

- [React](http://facebook.github.io/react/)
- [Flux](http://facebook.github.io/flux/)

React and Flux are the most important parts of this project. I'd recommend listening to [this podcast](http://javascriptjabber.com/073-jsj-react-with-pete-hunt-and-jordan-walke/); [experimenting with React](http://facebook.github.io/react/); and reading the concepts behind [Flux architecture](http://facebook.github.io/react/docs/flux-overview.html).

Flux is very simple: [route](https://github.com/frontendperformance/isomorphic/blob/master/blueprint/app/routes/index.js#L6) resolves a promise via [services](https://github.com/frontendperformance/isomorphic/blob/master/blueprint/app/services/todo-list-service.js#L2) ---> [route](https://github.com/frontendperformance/isomorphic/blob/master/blueprint/app/routes/index.js#L5) renders [React component](https://github.com/frontendperformance/isomorphic/blob/master/blueprint/app/components/index.jsx#L57) ---> component calls [action setting initial data](https://github.com/frontendperformance/isomorphic/blob/master/blueprint/app/components/index.jsx#L36) ---> [action is dispatched](https://github.com/frontendperformance/isomorphic/blob/master/blueprint/app/actions/todo-list-actions.js#L23) ---> [store(s) listening to dispatch](https://github.com/frontendperformance/isomorphic/blob/master/blueprint/app/stores/todo-list-store.js#L43) ---> [store updates component](https://github.com/frontendperformance/isomorphic/blob/master/blueprint/app/stores/todo-list-store.js#L22) ---> [user clicks link](https://github.com/frontendperformance/isomorphic/blob/master/blueprint/app/components/index.jsx#L64) ---> route resolves promise...

There are a lot of great frameworks out there. React and Flux have a lot of pros. Play around with them and see if they are best for you. Run `npm install -g isomorphic && isomorphic new my-app` to explore the example application.

######Tools for Single Page Apps

- [Director](https://github.com/flatiron/director)
- [SuperAgent](https://github.com/visionmedia/superagent)
- [ES6-Promise](https://github.com/jakearchibald/es6-promise)
- [Browserify](https://github.com/substack/node-browserify)

Small isomorphic libraries for routing (Director) and Ajax requests (SuperAgent). Isomorphic wraps these (explained below) libraries, for ease of development. Picked for size, simplicity and isomorphic support.

######Testing

- [Jest](http://facebook.github.io/jest/)
- [Jasmine](http://jasmine.github.io/)

Jest extends Jasmine, adding useful tools to a test suite. Tests files in `*/__tests__` directories, and automatically mocks dependencies, amongst other things. Picked because it takes no setup (Jasmine does), and pairs nicely with both React and Flux (Facebook tools).

######Server / Build

- [Express](http://expressjs.com/)
- [Stylus](http://learnboost.github.io/stylus/)
- [Gulp](http://gulpjs.com/)

Frontend Node server uses express, with Stylus. This server will likely be relatively simple with the use of an external API. **Support for [Critical CSS](https://developers.google.com/speed/pagespeed/service/PrioritizeCriticalCss)** by defining a critical CSS entry point in a route.

Gulp is a stream-based build tool, which is simpler, and more efficient than Grunt. Gulp tasks are defined in outside of the project scaffold, but can be overwritten on a per app basis.

######Facebook...

React, Flux and Jest are all Facebook creations. There are plenty of other great tools out there. I've tried many to varying extents, and appreciate the simplicity + power of the Facebook stack. I think React is innovative, and a fun technology to use. There is also a huge benefit in knowing these tools are battle tested on one of the worlds most trafficked sites. These libraries are powerful, and committed to performance.

###Executable

*NOTE: WORK IN PROGRESS.*

```sh
isomorphic new <app-name> <options...>
  --todo (Default: false)
  # --crud (Default: false)
  # --bower (Default: false)
# isomorphic init <app-name>
isomorphic server
  --environment (Default: development)
isomorphic build
  --environment (Default: development)
isomorphic gulp <task>
# isomorphic generate <type> <name>
isomorphic help <name>
# isomorphic test
isomorphic version
```

###Wrapper (client/server)

*Include these in application JavaScript code to be used on the client and server.*

```javascript
var isomorphic = require('isomorphic');

// react and flux dispatcher
isomorphic.React;
isomorphic.Dispatcher;

// environment support (build options; api config)
isomorphic.environment;

// client takes over server.
isomorphic.isomorphize;

// wraps require to prefix filenames with what client/server expecting.
isomorphic.require;

// interact with api endpoint on client / server (uses Superagent)
isomorphic.request;

// promises to use with superagent in services.
isomorphic.Promise;

// initializes routes on client / server (uses Director)
isomorphic.router;

// basic performance stats
isomorphic.performance;
```

###Folder Structure

```sh
  */__tests__/*     # Tests -- ex: app/routes/__tests__/*
  app/*             # All server + client code
  app/client.js     # Initializes client application
  app/router.js     # Define application routes
  app/actions/*     # Flux architecture
  app/constants/*   # Link actions with dispatcher, etc
  app/components/*  # React components
  app/dispatcher/*  # Flux architecture
  app/routes/*      # Client + server routing
  app/services/*    # All requests to API endpoint
  app/stores/*      # Flux architecture
  assets/*          # CSS; Images; Fonts
  bower.json        # Manage Bower (optional)
  environment.json  # Environment / API settings
  gulpfile.js       # Overwrite gulp tasks defined in isomorphic
  index.html        # Entry point
  package.json      # Manage NPM
  server.js         # Initializes server application
  vendor/*          # Vendor Assets (Bower Managed, optional)
  .gitignore
  .jshintrc
```

### Example Application

- The example todo application can be seen at [isomorphic-todo.frontendperformance.com](http://isomorphic-todo.frontendperformance.com).

`isomorphic new your-app --todo` will install the example application.

This application is:

1. Isomorphic -- try disabling JavaScript.
2. Highly performant. I've seen times under **50ms total (40ms server, 10ms client)**.
3. Proxies (readonly) APIs at [isomorphic-todo-api.frontendperformance.com](http://isomorphic-todo-api.frontendperformance.com) and [isomorphic-crud-api.frontendperformance.com](http://isomorphic-crud-api.frontendperformance.com).

The todo example extends [TodoMVC](http://todomvc.com/architecture-examples/react/) to show a slightly more complex application with routing, and an API.
