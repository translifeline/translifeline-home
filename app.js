'use strict';

const express = require('express');
const favicon = require('serve-favicon');
const livereload = require('express-livereload');
const controllers = require('./controllers');

const app = express();
app.use(favicon(__dirname + '/public/images/favicon.ico'));

if (process.env.NODE_ENV === 'development') {
  livereload(app, {
    watchDir: process.cwd()
  });
}

// Set view engine.
app.set('view engine', 'pug');
// Serve static files from /public.
app.use(express.static(__dirname + '/public'));
// Initialize database
var Engine = require('tingodb')();
var db = new Engine.Db('/data/db', {});
app.set('db', db);
// Initialize controllers.
controllers(app);

// Start the server.
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('App listening on port ' + port);
});
