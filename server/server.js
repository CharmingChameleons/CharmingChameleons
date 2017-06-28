const path = require('path');
var cors = require('cors');
var express = require('express');
var db = require('../database');
var session = require('./models/session');


var app = express();
var util = require('./lib/hashUtils');
var middleware = require('./middleware');

<<<<<<< HEAD
var cors = require('cors');
=======

const passport = require('passport');   
const LocalStrategy = require('passport-local').Strategy
const cookieParser = require('cookie-parser');
const session = require('express-session');
>>>>>>> create lisitng works except image
const bodyParser = require('body-parser');

var cookieSession = require('cookie-session')

var port = process.env.PORT || 3000;

app.use(cors());
app.options('*', cors())
//Use body parser for parsing the request querystring
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(cors());

app.set('trust proxy', 1) // trust first proxy


//Initialize passport and express
app.use(passport.initialize());
app.use(passport.session());


app.use(cookieSession({
  name: 'session',
  keys: ['sessionmgmt'],

  // Cookie Options
  maxAge: 5 * 60 * 60 * 1000 // 5 hours
}))

app.post('/login', function(req, res, next) {

	//check authenticated user
	middleware.authenticateLogin(req.body.username, req.body.password)
		.then((result) => {
			//If yes, create/overwrite session details
			if (result === true) {
				session.createNewSession(req.headers['user-agent'], req.body.username)
				.then((session) => {
					req.session.id = session.sessionId //token based on user-agent
					req.session.username = session.username   //username 
					//store in db?? No for now
					console.log('In app.post/Login before res')
		    		res.status(201).send('Login successful')
				})
				.catch((err) => {
					res.redirect('/')
				})
		    } else {
		   		throw result
			}
		})
		.catch((err) => {
			//If no, not a authenticated user
				//clear cookies and redirect to signup page
			res.redirect('/')
		})
		.error((err) => {
			console.log(err)
			res.redirect('/')
		})
});

app.post('/signup', function(req, res, next) {

	middleware.authenticateLogin(req.body.username, req.body.password)
	.then((result) => {
		if(result) {
			//User found
			console.log('User found')
			res.status(201).send('User Exists')
		} else {

			//Create new salt and hash for the user
			var salt = util.createSalt()
			var hash = util.createHash(req.body.password, salt)
			var args = [];

			args.push(req.body.username)
			args.push(hash)
			args.push(salt)
			db.createUser(args)
			.then((data) => {
				console.log('user created')
				//Create new session cookie
				console.log(req.headers['user-agent'])
				return session.createNewSession(req.headers['user-agent'], req.body.username)
			})
			.then((session) => {
				req.session.id = session.sessionId 		  //token based on user-agent
				req.session.username = session.username   //username 
				res.status(201).send('User created successfully')
			})
			.catch((err) => {
				console.log('err in creating new user', err)
				res.status(500).send('User not created')
			})
		}
	})
	.catch((err) => {
		console.log('err in authenticating user', err)
		res.status(500).send('User not authenticated')
	})
});

app.get('/listings', 
(req, res) => {
  db.getAvailableListings()
    .then((data) => {
<<<<<<< HEAD
=======
     // console.log('grabbed all listings', data);
>>>>>>> create lisitng works except image
      res.end(JSON.stringify(data));
    });
});

<<<<<<< HEAD
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


=======
app.post('/createlisting', 
(req, res) => {
  db.createListing(req.body.params)
    .then((data) => {
      console.log('Created an entry');
      res.end(JSON.stringify(data));
    });
});
>>>>>>> create lisitng works except image

app.listen(port, function(req, res) {
  console.log('App running on port ' + port);
});
