'use strict';

const express = require('express');
const favicon = require('serve-favicon');
const controllers = require('./controllers');
const moonclerk = require('./moonclerk');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcrypt');
const morgan = require('morgan')

const app = express();
app.use(favicon(__dirname + '/public/images/favicon.ico'));

if (process.env.NODE_ENV === 'development') {
  const livereload = require('express-livereload');
  livereload(app, {
    watchDir: process.cwd()
  });
}

// Morgan for logging.
app.use(morgan('common'))
// Set view engine.
app.set('view engine', 'pug');
// Serve static files from /public.
app.use(express.static(__dirname + '/public'));
// Initialize body parser.
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(bodyParser.json());
// Initialize database.
MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
  if (err) {
    console.log(err);
  } else {
    app.set('database', db);

    // Set passport strategy.
    db.collection('admin').findOne().then(function(doc){
      if (doc) {
        passport.use(new BasicStrategy(
          function(username, password, done) {
            if(username.valueOf() === 'admin') {
              bcrypt.compare(password.valueOf(), doc.password, function(err, res) {
                return done(null, res);
              });
            } else {
              return done(null, false);
            }
          }
        ));
      } else {
        console.log('Admin password is not set.');
      }
    }).catch(function(err) {
      console.log(err);
    });
  }
});
// Initialize passport.
app.use(passport.initialize());
// Initialize controllers.
controllers(app);
// Initialize moonclerk helper.
moonclerk(app);
// Let's Encrypt.
app.get('/.well-known/acme-challenge/:challenge', function(req, res) {
  res.send(process.env.LETSENCRYPT_TOKEN);
});

// Start the server.
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('App listening on port ' + port);
});
