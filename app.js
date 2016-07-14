var express = require('express');
var livereload = require('express-livereload')

var app = express();
livereload(app, config={});

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index', {});
});

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('App listening on port ' + port);
});
