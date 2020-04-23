/* Copyright G. Hemingway, 2019 - All rights reserved */
"use strict";

const path = require("path");
const fs = require("fs");
const http = require("http");
const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const session = require("express-session");
const mongoose = require("mongoose");
const envConfig = require("simple-env-config");
const redis = require('redis');

let app = express();
// let RedisStore = require("connect-redis")(session);
// app.redisClient = redis.createClient('6379','127.0.0.1');
/**********************************************************************************************************/
const env = "dev";
const setupServer = async () => {
  // Get the app config
  const conf = await envConfig("./config/config.json", env);
  const port = process.env.PORT ? process.env.PORT : conf.port;
  // Setup our Express pipeline
  if (env !== "test") app.use(logger("dev"));
  app.engine("pug", require("pug").__express);
  app.set("views", __dirname);
  app.use(express.static(path.join(__dirname, "../../public")));
  app.use(logger('dev'));
  // Setup pipeline session support
  app.store = session({
    name: "session",
    secret: "grahamcardrules",
    resave: false,
    // store: new RedisStore({ client: app.redisClient }),
    saveUninitialized: false,
    cookie: {
      path: "/"
    }
  });
  app.use(app.store);
  // Finish with the body parser
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  

  // // Import our Data Models
  // app.models = {
  //   Game: require("./models/game"),
  //   Move: require("./models/move"),
  //   User: require("./models/user"),
  //   GithubUser: require("./models/github_user")
  // };

  // // Import our routes
  // require("./api")(app);

  // Give them the SPA base page
  app.get("*", (req, res) => {
    const user = req.session.user;
    console.log(`Loading app for: ${user ? user.username : "nobody!"}`);
    let preloadedState = {};
    preloadedState = JSON.stringify(preloadedState).replace(/</g, "\\u003c");
    res.render("base.pug", {
      state: preloadedState
    });
  });

  // // Run the server itself
  // import the routes
  require("./api")(app);
  
  let server;
  if (env === "production") {
    const options = {
      key: fs.readFileSync(conf.security.keyPath,'utf8'),
      cert: fs.readFileSync(conf.security.certPath,'utf8'),
      ca: fs.readFileSync(conf.security.caPath,'utf8')
    };
    // Listen for HTTPS requests
    server = https.createServer(options, app).listen(port, () => {
      console.log(`Secure Tradeoff server listening on: ${server.address().port}`);
    });
    // Redirect HTTP to HTTPS
    http
      .createServer((req, res) => {
        const location = `https://${req.headers.host}${req.url}`;
        console.log(`Redirect to: ${location}`);
        res.writeHead(302, { Location: location });
        res.end();
      })
      .listen(80, () => {
        console.log(`Tradeoff server listening on 80 for HTTPS redirect`);
      });
  } else {
    server = app.listen(port, () => {
      console.log(`Tradeoff server ${env} listening on: ${server.address().port}`);
    });
  }

  // // Establish connection to Redis
  // app.redisClient
  // .on("ready", () => {
  //   console.log("\tRedis Connected.");
  //   app.checkCache = promisify(app.redisClient.get).bind(app.redisClient);
  //   app.setCache = promisify(app.redisClient.set).bind(app.redisClient);
  // })
  // .on("error", () => {
  //   console.log("Not able to connect to Redis.");
  //   process.exit(-1);
  // });
};

/**********************************************************************************************************/

// Run the server
setupServer();
