#isomorphic

###_Work in Progress. Not Complete._

Command-line interface + build tool for creating isomorphic webapps with [React](http://facebook.github.io/react/) + [Flux](http://facebook.github.io/flux/).

######Install
```sh
npm install -g isomorphic
isomorphic new your-app --todo # or --crud for example applications
```
Then go to [localhost:3030](http://localhost:3030)...or see it now at [isomorphic-todo.frontendperformance.com](isomorphic-todo.frontendperformance.com).

[Basic code implementation snippet](https://github.com/frontendperformance/isomorphic/wiki/Basic-Implementation
)


###What?

- Server rendered websites provide SEO and initial page load performance\*.
- Client rendered webapps (MVx, etc.) give developers tools to build better user experiences\*, and are faster after the initial page load\*. They struggle with SEO\*\* and initial page load performance\*\*.

[Isomorphic](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/) webapps are single page applications that render on both the client and server (using [nodejs](http://nodejs.org/)). This give developers tools to build ambitious client side webapps, **and** provides SEO and initial page load performance by default.

\*_Typically_ and \*\*_without jumping through hoops_

###Goals

> "MY SERVER WILL NEVER BE IN NODE AND I WILL NEVER USE MONGO." -- [PHP CEO](https://twitter.com/PHP_CEO)

Many developers turn away from Node, because full stack (API; data) JavaScript might not be feasible, or desirable. This CLI and project structure separates the frontend server from the data layer. Both the client, and frontend Node.js server interact with a language agnostic API endpoint (with use of a proxy).

- Provide the most 'JavaScript bang' for the 'performance buck'.
- Give developers tools to easily create high quality, highly performant isomorphic webapps.
- Follow [performance best practices](https://developers.google.com/speed/docs/best-practices/rules_intro): Server rendered HTML; no blocking assets; critical css.
- Piece together simple, great tools, to provide an easy to use CLI and framework, without reinventing the wheel.
- Smart build tools: simple CLI (scaffolding + generators); Unit testing; [Gulp](http://gulpjs.com/) tasks.

*Note: Your backend server can still be written in Node.js, which can of course still use Mongo.*

###Libraries / Tools

######Core

- [React](http://facebook.github.io/react/)
- [Flux](http://facebook.github.io/flux/)

React and Flux are the most important parts of this project. I'd recommend listening to [this podcast](http://javascriptjabber.com/073-jsj-react-with-pete-hunt-and-jordan-walke/); [experimenting with React](http://facebook.github.io/react/); and reading the concepts behind [Flux architecture](http://facebook.github.io/react/docs/flux-overview.html).

Flux is very simple: route resolves a promise via services ---> route renders React component ---> component calls ajax complete action ---> action is dispatched ---> store(s) listening to dispatch ---> store updates component ---> user clicks button ---> component calls action ---> action is dispatched ---> store(s) listening to dispatch ---> store updates component ---> user clicks link to navigate to new route...

There's a lot of great frameworks out there. React and Flux have a lot of pros. Play around with it and see if it is best for you. Run `npm install -g isomorphic && isomorphic new my-app --example-todo` to explore the example application.

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

Frontend Node server uses express, with Stylus. This server will likely be relatively simple with the use of an external API.

Gulp is a stream-based build tool, which is simpler, and more efficient than Grunt.

######Facebook...
> "WHY SO MANY FACEBOOK TOOLS????" -- [Creator of Yet Another Framework](http://blog.tastejs.com/yet-another-framework-syndrome-yafs)

React, Flux and Jest are all Facebook creations. There are plenty of other great tools out there. I've tried many to varying extents, and appreciate the simplicity + power of the Facebook stack. I think React is innovative, and a fun technology to use. There is also a huge benefit in knowing these tools are battle tested on one of the worlds most trafficked sites. These libraries are powerful, easy to use, and committed to performance.

###Executable

*NOTE: WORK IN PROGRESS*

```sh
isomorphic new <app-name> <options...>
  --example-todo (Default: false)
  --example-crud (Default: false)
  --bower (Default: false)
isomorphic init <app-name>
  aliases: i
isomorphic server
  aliases: serve, s
isomorphic gulp <task>
isomorphic generate <type> <name>
isomorphic help <name>
  aliases: h, -h, --help
isomorphic test
  aliases: t
isomorphic version
  aliases: v, -v, --version
```

###Wrapper (client/server)

*Include these in application JavaScript code to be used on the client and server.*

```javascript
var isomorphic = require('isomorphic');

// react and flux dispatcher
isomorphic.React;
isomorphic.Dispatcher;

// client takes over server.
isomorphic.isomorphize;

// wraps require to prefix filenames with what client/server expecting.
isomorphic.require;

// interact with api endpoint on client / server (uses Superagent)
isomorphic.request;

// promises to use with superagent in services.
isomorphic.Promise;

// initializes routes on client / server (uses Director)
isomorphic.Router;
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

*WORK IN PROGRESS*

- The example todo application can be seen at [isomorphic-todo.frontendperformance.com](isomorphic-todo.frontendperformance.com).
- The example crud application can be seen at [isomorphic-crud.frontendperformance.com](isomorphic-crud.frontendperformance.com).

`isomorphic new your-app --todo` and `isomorphic new your-app --crud` will install the example application.

This application is:

1. Isomorphic -- try disabling JavaScript.
2. Highly performant -- look at network times.
3. Proxies (readonly) APIs at [isomorphic-todo-api.frontendperformance.com](isomorphic-todo-api.frontendperformance.com) and [isomorphic-crud-api.frontendperformance.com](isomorphic-crud-api.frontendperformance.com).

The todo example extends [TodoMVC](http://todomvc.com/architecture-examples/react/) to show a slightly more complex application with routing, and an API.
