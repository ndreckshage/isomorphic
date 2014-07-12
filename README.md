#isomorphic

####WORK IN PROGRESS! INCOMPLETE!!

command line utility for isomorphic webapps with [react](http://facebook.github.io/react/) / [flux](http://facebook.github.io/react/docs/flux-overview.html).

###what?

- *'traditional' websites* (server rendered) provide SEO and initial page load performance.
- *'traditional' webapps* (client rendered; 'MVx') provide a much improved user experience, and are much faster after the initial page load. But, they struggle with SEO and initial page load performance (without jumping through hoops).

[isomorphic](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/) webapps provide the best of both worlds. they are single page applications, that render on both the server and client (using [nodejs](http://nodejs.org/)). The server first renders HTML, and then the client kicks in -- providing SEO and initial page load performance by default, without having to duplicate templates, or 'jump through hoops'.

> "MY SERVER WILL NEVER BE IN NODE AND I WILL NEVER USE MONGO." -- [PHP CEO](https://twitter.com/PHP_CEO)

- No problem. This CLI disconnects your frontend server from your backend server.
- Your clientside application **and** Node server interact with a language agnostic, backend API.

...your backend server can of course still be in Node, and you can still use Mongo.

###libraries / tools

- [react](http://facebook.github.io/react/) -- *ui*
- [flux](http://facebook.github.io/react/docs/flux-overview.html) -- *architecture*
- [director](https://github.com/flatiron/director) -- *routes*
- [superagent](https://github.com/visionmedia/superagent) -- *ajax*
- [express](http://expressjs.com/) -- *server*

######testing

- [jest](http://facebook.github.io/jest/) ([jasmine](http://jasmine.github.io/))

######build

- [gulp](http://gulpjs.com/)
- [bower](http://bower.io/)

*inspired by [ember-cli](https://github.com/stefanpenner/ember-cli).*

###goals

- Conveniently piece together a few excellent (but simple) open source projects (listed above), rather than reinventing the wheel.
- Provide initial structure for isomorphic applications (client / server).
- Provide a simple command line interface + build tool to ease development.
- **Gold** standard in performance. Initial page load + SEO. Single page app on client. Small, simple libraries with minimal dependencies (**no jQuery**).

> "WHY SO MANY FACEBOOK TOOLS????" -- [Creator of Yet Another Framework](http://blog.tastejs.com/yet-another-framework-syndrome-yafs)

- [react](http://facebook.github.io/react/) -- extremely impressive^^^, high performant library. It is a new way of thinking about the DOM, and is a viable jQuery replacement.
- [flux](http://facebook.github.io/react/docs/flux-overview.html) -- Flux is a simple architecture pattern, not a framework. I have worked on many large single page applications with several of the largest libraries. They are great, but can be overly complex^^^ and bloated^^^. Facebook has not released 'Flux', but outlined it as an architecture pattern. There is something to be said for simplicity^^^, and this uses that model.
- [jest](http://facebook.github.io/jest/): great^^^ addition to an already great^^^ test framework ([jasmine](http://jasmine.github.io/))

*^^^ Opinionated -- decide for yourself.*

###executable

```sh
isomorphic new {app-name}
  # Creates a new folder and runs isomorphic init in it.
isomorphic init {app-name}
  # Creates a new isomorphic project in the current folder.
  aliases: i
isomorphic serve {--options}
  # Builds and serves your app, rebuilding on file changes.
  aliases: server, s
  --port (Default: 4200)
  --host (Default: 0.0.0.0)
  --live-reload (Default: true)
  --environment (Default: development)
  --output-path (Default: dist/)
isomorphic build {--options}
  # Builds your app and places it into the output path (dist/ by default).
  --environment (Default: development)
  --output-path (Default: dist/)
isomorphic help {name}
  # Outputs the usage instructions for all commands or the provided command
  aliases: h, -h, --help
isomorphic test
  # Runs your apps test suite.
  aliases: t
isomorphic version
  # outputs isomorphic version
  aliases: v, -v, --version
```

###wrapper

```javascript
var isomorphic = require('isomorphic');
// isomorphic.react
// isomorphic.director
// isomorphic.superagent
```

###folder structure

```sh
  */__tests__/*     # jest tests -- ex: app/routes/__tests__/*
  app/*             # all server + client code
  app/app.js        # initialize application
  app/actions/*     # flux architecture
  app/constants/*   # link actions with dispatcher, etc
  app/components/*  # react -- flux architecture
  app/dispatcher/*  # flux architecture
  app/routes/*      # client + server routing
  app/stores/*      # flux architecture
  assets/*          # css, images, fonts
  vendor/*          # bower generated
  api.json          # settings to interact with api endpoint
  bower.json        # manage vendor assets
  gulpfile.js       # manage build
  package.json      # manage npm
  .gitignore
  .travis
  .jshintrc
```
