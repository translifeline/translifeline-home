var express = require('express');
var app = express();
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('index', {});
});

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('App listening on port ' + port);
});
