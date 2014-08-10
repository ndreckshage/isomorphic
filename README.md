#isomorphic

###_Work in Progress. Not Complete._

Command-line interface + build tool for creating isomorphic webapps with [React](http://facebook.github.io/react/) + [Flux](http://facebook.github.io/flux/).

```sh
npm install -g isomorphic
isomorphic new your-app # and then open (@TODO -- npm install and trigger gulp?) up a web browser
```

###What?

- Server rendered websites provide SEO and initial page load performance.
- Client rendered webapps (MVx) provide an improved user experience, and are typically faster after the initial page load. They struggle with SEO and initial page load performance (without jumping through hoops).

[Isomorphic](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/) webapps are single page applications that render on both the client and server (using [nodejs](http://nodejs.org/)). This helps developers create ambitious client side webapps, and provides SEO and initial page load performance by default.

###Goals

> "MY SERVER WILL NEVER BE IN NODE AND I WILL NEVER USE MONGO." -- [PHP CEO](https://twitter.com/PHP_CEO)

Many developers turn away from Node, because full stack (meaning API, and data) JavaScript might not be feasible, or desirable. This CLI/structure separates the frontend server from the data layer -- both the client, and frontend Node.js server interact with a language agnostic API endpoint.

- The ultimate goal of this project is to help people create high quality, highly performant webapps.
- Combine some of the best tools (Listed Below). Goal to provide the most 'JavaScript Power' possible with the smallest amount of code. This is opinionated, but good to shoot for.
- Make it simple to create highly performant (initial page load + single page app) client side webapps, where both the client and server interact with an API endpoint.
- Smart build tools - support a simple CLI (scaffolding + generators); Unit testing; [Gulp](http://gulpjs.com/) tasks.

*Note: Your backend server can still be written in Node.js, which can of course still use Mongo.*

###Libraries / Tools

- [React](http://facebook.github.io/react/)
- [Flux](http://facebook.github.io/flux/)

React and Flux are the most important parts of this project. I'd recommend listening to [this podcast](http://javascriptjabber.com/073-jsj-react-with-pete-hunt-and-jordan-walke/); experimenting with React on their [website](http://facebook.github.io/react/); and reading the concepts behind [Flux architecture](http://facebook.github.io/react/docs/flux-overview.html); installing `npm install -g isomorphic && isomorphic new my-app` to explore the example application. There's a lot of great frameworks out there. React and Flux have a lot of pros. Play around with it and see if it is best for you.

######Example with Flux:

> Views ---> (Route / UI Triggers action) ----> Dispatcher ---> (registered callback) ---> Stores -------+
> Ʌ                                                                                                     |
> |                                                                                                    V
> +-- (Controller-Views "change" event handlers) ---- (Stores emit "change" events) ------------------+

- [Director](https://github.com/flatiron/director)
- [SuperAgent](https://github.com/visionmedia/superagent)

Small isomorphic libraries for routing (Director) and Ajax requests (SuperAgent). Isomorphic wraps these and provides isomorphic.Router and isomorphic.request, which work on client + server. Picked for size, simplicity and isomorphic support.

- [Express](http://expressjs.com/)
- [Styles](http://learnboost.github.io/stylus/)

Frontend Node server uses express, with Stylus and [Jade](http://jade-lang.com/) (Jade less important with inclusion of React). This server will likely be simple with the use of an external API.

- [Jest](http://facebook.github.io/jest/)
- [Jasmine](http://jasmine.github.io/)

Jest extends Jasmine, adding useful tools to a test suite. Tests files in `*/__tests__` directories, and automatically mocks dependencies, amongst other things. Picked because it takes no setup (Jasmine does), and pairs nicely with both React and Flux (Facebook tools).

- [Browserify](https://github.com/substack/node-browserify)
- [Gulp](http://gulpjs.com/)

Browserify lets you use `require('module')` ([commonjs](http://wiki.commonjs.org/wiki/CommonJS)) syntax on the server and client. Gulp is a stream-based build tool, which is simpler, and more efficient than Grunt.

> "WHY SO MANY FACEBOOK TOOLS????" -- [Creator of Yet Another Framework](http://blog.tastejs.com/yet-another-framework-syndrome-yafs)

React, Flux and Jest are all Facebook tools. There are plenty of other great tools out there. Personally, I've tried them all to varying extents, and appreciate the simplicity + power of the Facebook stack. I think React is innovative, and a fun technology to use. Also, there is a huge benefit in knowing these tools are used on one of the most trafficked sites. The libraries are powerful, and committed to performance.

###Executable (#@TODO -- work in progress)

```sh
isomorphic new <app-name> <options...>
  # Creates a new folder and runs isomorphic init in it.
  --example-todo (Default: false)
  --example-crud (Default: false)
  --bower (Default: false)
isomorphic init <app-name>
  # Creates a new isomorphic project in the current folder.
  aliases: i
isomorphic server
  aliases: serve, s
  # Easy access point to 'isomorphic gulp server'
isomorphic gulp <task>
  # See below for full list of tasks
isomorphic generate <type> <name>
  # Generate new constants, actions, routes, components, stores, dispatchers
isomorphic help <name>
  # Outputs the usage instructions for all commands or the provided command
  aliases: h, -h, --help
isomorphic test
  # Runs your apps test suite.
  aliases: t
isomorphic version
  # outputs isomorphic version
  aliases: v, -v, --version
```

###Wrapper (client/server)

*Include these in application JavaScript code to be used on the client and server.*

```javascript
var isomorphic = require('isomorphic');
isomorphic.React;
isomorphic.Router;
isomorphic.request;
isomorphic.Dispatcher;
isomorphic.require
```

###Folder Structure

```sh
  */__tests__/*     # Tests -- ex: app/routes/__tests__/*
  app/*             # All server + client code
  app/client.js     # Initializes client application
  app/actions/*     # Flux architecture
  app/constants/*   # Link actions with dispatcher, etc
  app/components/*  # React components
  app/dispatcher/*  # Flux architecture
  app/routes/*      # Client + server routing
  app/stores/*      # Flux architecture
  assets/*          # CSS; Images; Fonts
  environment.json  # Environment / API settings
  gulp/*            # Gulp tasks
  gulpfile.js       # Initializes Gulp tasks
  vendor/*          # Vendor Assets (Bower Managed, optional)
  server.js         # Initializes server application
  package.json      # Manage NPM
  bower.json        # Manage Bower (optional)
  .gitignore
  .jshintrc
```

### Example Application

Running `isomorphic new your-app` will install a small example application. This application is (1) isomorphic (displays the 'renderer' -- client / server); (2) points to an external API hosted on [DigitalOcean](https://www.digitalocean.com/); (3) is built with multiple routes + components.
