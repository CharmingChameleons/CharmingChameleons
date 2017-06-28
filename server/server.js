const path = require('path');
var express = require('express');
var db = require('../database')
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/public')));

app.get('/listings', 
(req, res) => {
  console.log('request received');
  db.getAllListings()
    .then((data) => {
      console.log('grabbed all listings', data);
      res.end(JSON.stringify(data));
    });
});

app.listen(port, function(req, res) {
  console.log('App running on port ' + port);
});
