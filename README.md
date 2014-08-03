#isomorphic

###_WORK IN PROGRESS! INCOMPLETE!!_

command line interface for building isomorphic webapps using [react](http://facebook.github.io/react/) + [flux](http://facebook.github.io/flux/).

```sh
npm install -g isomorphic
isomorphic new your-app # and then open up a web browser
```

###what?

- *'traditional' websites* (server rendered) provide SEO and initial page load performance.
- *'traditional' webapps* (client rendered; MVx) provide a much improved user experience, and are much faster after the initial page load. but, they struggle with SEO and initial page load performance (without jumping through hoops).

[isomorphic](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/) webapps are the holy grail. they are single page applications, that render on both the client **and** server (using [nodejs](http://nodejs.org/)). the server first renders HTML, and then the client kicks in -- providing a client side application, SEO and initial page load performance by **default**.

###hypothesis / goals

many developers have a knee jerk reaction to node.js, and roll their eyes at the idea of having their entire stack in javascript. while i don't necessarily agree, i believe it is a valid critique. but luckily, it is not required to take advantage of isomorphic concepts.

> "MY SERVER WILL NEVER BE IN NODE AND I WILL NEVER USE MONGO." -- [PHP CEO](https://twitter.com/PHP_CEO)

- no problem. this CLI disconnects your frontend server from your backend server.
- your client side application **and** node server interact with a language agnostic API.

...your backend server can of course still be in node, and you can still use mongo.

i believe that a frontend server in node that interacts with a backend, language agnostic API is an intuitive concept that will make node.js more feasible for many engineering teams.

######goals

- **gold standard in performance**. the ultimate goal of this project is to help people create the highest performant websites by todays standards. initial page load speed. snappy, client side application. small, carefully chosen libraries with minimal dependencies (**no** jQuery...).
- disconnect the frontend server from the data layer. the client and server can interact with an API. *complete application can be developed within this project though if desired.*
- conveniently piece together a few excellent (but simple) open source projects (listed below). no reinventing of wheels.
- simple command line interface to scaffold out + build upon initial structure.
- sane defaults -- build tools; app structure; library configuration.

###libraries / tools

- [react](http://facebook.github.io/react/) -- *ui*
- [flux](http://facebook.github.io/flux/) -- *architecture*
- [director](https://github.com/flatiron/director) -- *routes*
- [superagent](https://github.com/visionmedia/superagent) -- *ajax*
- [express](http://expressjs.com/) -- *server*
- [stylus](http://learnboost.github.io/stylus/) -- *css*
- [jest](http://facebook.github.io/jest/) (with [jasmine](http://jasmine.github.io/)) -- *testing*
- [browserify](https://github.com/substack/node-browserify) -- *commonjs*
- [gulp](http://gulpjs.com/) -- *build*

> "WHY SO MANY FACEBOOK TOOLS????" -- [Creator of Yet Another Framework](http://blog.tastejs.com/yet-another-framework-syndrome-yafs)

- [react](http://facebook.github.io/react/) -- extremely impressive^^^, high performant library. react is a new way of thinking about the DOM, and is a viable jQuery replacement.
- [flux](http://facebook.github.io/flux/) -- flux is a simple architecture pattern, not a framework. I have worked on many large single page applications with several of the largest libraries. They are great, but can be overly complex^^^ and bloated^^^. There is something to be said for simplicity^^^, and this uses that model.
- [jest](http://facebook.github.io/jest/): great^^^ addition to an already great^^^ test framework ([jasmine](http://jasmine.github.io/))

*^^^ Opinionated -- decide for yourself. But I'd recommend listening to [this](http://javascriptjabber.com/073-jsj-react-with-pete-hunt-and-jordan-walke/), and giving it a shot before dismissing the idea.*

###executable (IDEAS)

```sh
isomorphic new {app-name}
  # Creates a new folder and runs isomorphic init in it.
isomorphic init {app-name}
  # Creates a new isomorphic project in the current folder.
  aliases: i
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

###gulp based build

```sh
gulp
gulp server
  # Builds and serves your app, rebuilding on file changes.
gulp build {--options}
  # Builds your app and places it into the output path (dist/ by default).
  --environment (Default: development)
```

###wrapper (client/server)

```javascript
var isomorphic = require('isomorphic');
isomorphic.React;
isomorphic.Router;
isomorphic.Request;
isomorphic.Dispatcher;
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
  environment.json  # environment / API settings
  gulp/*            # gulp tasks
  gulpfile.js       # manage build
  package.json      # manage npm
  .gitignore
  .jshintrc
```

### example application

running `isomorphic new your-app` will install a small example application. this is (1) isomorphic + displays whether the page was rendered by the client or the server; (2) points to an external API hosted on [DigitalOcean](https://www.digitalocean.com/); (3) uses multiple routes + components.
