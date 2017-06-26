const path = require('path');
var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));


// app.get('/', function(req, res) {
//   res.send(../public/index.html);
// });

app.listen(port, function(req, res) {
  console.log('App running on port ' + port);
})
