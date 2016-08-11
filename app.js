'use strict';

const express = require('express');
const favicon = require('serve-favicon');
const controllers = require('./controllers');
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(favicon(__dirname + '/public/images/favicon.ico'));

if (process.env.NODE_ENV === 'development') {
  const livereload = require('express-livereload');
  livereload(app, {
    watchDir: process.cwd()
  });
}

// Set view engine.
app.set('view engine', 'pug');
// Serve static files from /public.
app.use(express.static(__dirname + '/public'));
// Initialize database.
MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
  if (err) {
    console.log(error);
  } else {
    app.set('database', db);
  }
});
// Initialize controllers.
controllers(app);

// Start the server.
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('App listening on port ' + port);
});
