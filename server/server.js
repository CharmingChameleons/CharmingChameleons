const path = require('path');
var express = require('express');
var db = require('../database')
var app = express();

var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../client/public')));


// app.get('/', function(req, res) {
//   res.send(../public/index.html);
// });



db.getAllListings()

db.getUserId(['sara'])
.then((data) => {
	console.log('In server index.js')
	console.log(data);
})

app.listen(port, function(req, res) {
  console.log('App running on port ' + port);
})
