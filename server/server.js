const path = require('path');
var cors = require('cors');
var express = require('express');
var db = require('../database');
var session = require('./models/session');


var app = express();
var util = require('./lib/hashUtils');
var middleware = require('./middleware');


var cors = require('cors');

const redis = require('redis')
const expressSession = require('express-session')
const redisStore = require('connect-redis')(expressSession)
const passport = require('Passport');
const config = require('./config/passport');
const bodyParser = require('body-parser');
var client = redis.createClient();

var port = process.env.PORT || 3000;

app.use(cors());
app.options('*', cors())

//Use body parser for parsing the request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(cors());

app.set('trust proxy', 1) // trust first proxy

//Initialize passport and express
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use(expressSession({
  	name: 'session',
  	secret: 'test',
  	store: new redisStore({
  		host: 'localhost',
  		post: 6379,
  		client,ttl: 260
	}),
	saveUninitialized: false,
	resave: false
}))

app.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
        if (err) { 
        	res.status(409).send(info.errMsg);
        }
        if (!user) { 
        	res.status(409).send(info.errMsg);
        }
        console.log('In app.post user', user)

		req.login(req.body, function(err) {
      		if (err) { throw new Error(err); }
    	});
        res.status(201).send(user)
    })(req, res, next);
});

app.post('/signup', function(req, res, next) {
	passport.authenticate('local-signup', function(err, user, info) {
      if (err) {
      	res.status(500).send(info.errMsg); // will generate a 500 error
      }
      if (!user) {
      	res.status(409).send(info.errMsg);
      }
      console.log('In app.post user', user)
      res.status(201).send(user)
    })(req, res, next);
});

app.get('/listings',
(req, res) => {
  db.getAllListings()
    .then((data) => {
      res.end(JSON.stringify(data));
    });
});

app.post('/confirm-booking',

(req, res) => {
	for (let i = 0; i < req.body.booking.length; i++) {
		req.body.booking[i] = parseInt(req.body.booking[i]);
	}
	console.log('request received', req.body.booking);
	db.createBookings(req.body.booking)
		.then((data) => {
			res.status(201).send('Booking created successfully');
		})
		.catch((err) => {
			res.status(500).send('Booking not created');
		});
});

app.get('/userlisting', (req, res) => {
  console.log('request received userlisting for', req.query);
  var params = [req.query.params];
  db.getListingsForUser(params)
    .then((data) => {
      console.log('grabbed all listings for ...', data);
      res.end(JSON.stringify(data));
    });
});

app.delete('/deletelisting', (req, res) => {
  console.log('request received deletelisting');
  var params = [req.body.params];
  db.deleteListing(params)
  .then((data) => {
    res.status(201).send('listing deleted');
  })
  .catch((err) => {
    res.status(500).send('listing not deleted', err);
  });
});


app.post('/createlisting', 
(req, res) => {
  db.createListing(req.body.params)
    .then((data) => {
      console.log('Created an entry');
      res.end(JSON.stringify(data));
    });
});

app.listen(port, function(req, res) {
  console.log('App running on port ' + port);
});
