const path = require('path');
var express = require('express');
var db = require('../database');
var session = require('./models/session');


var app = express();
var util = require('./lib/hashUtils');
var middleware = require('./middleware');

var cors = require('cors');
const bodyParser = require('body-parser');

var cookieSession = require('cookie-session')

var port = process.env.PORT || 3000;

//Use body parser for parsing the request querystring
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(cors());

app.set('trust proxy', 1) // trust first proxy

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
<<<<<<< 285f6a90c86b609feb1fbc45f72e195cdde611a9
  db.getAllListings()
=======
  console.log('request received');
  db.getAvailableListings()
>>>>>>> only listings that are available are listed
    .then((data) => {
      res.end(JSON.stringify(data));
    });
});

app.listen(port, function(req, res) {
  console.log('App running on port ' + port);
});
