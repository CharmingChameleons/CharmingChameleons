const path = require('path');
var cors = require('cors');
var express = require('express');
var db = require('../database');
var session = require('./models/session');
const fs = require('fs');
const fileUpload = require('express-fileupload');


// var multer  = require('multer')
// var mkdirp = require('mkdirp');

// saving the pictures in the folder
// var storage = multer.diskStorage({
// 	destination: function(req, file, callback) {
// 		var path = './client/public/images/listings/temp';
// 		mkdirp(path, function(err) {
// 	   		callback(null, path)
// 		});
// 	},
// 	filename: function(req, file, callback) {
// 		callback(null, 1+ path.extname(file.originalname))
// 	}
// })
// var dirNum = 0;
// var storage = multer.diskStorage({
// 	destination: function(req, file, callback) {
// 			var path = './client/public/images/listings/'+(++dirNum);
// 			mkdirp(path, function(err) {
// 	   	callback(null, path)
// 		});
// 	},
// 	filename: function(req, file, callback) {
// 		callback(null, 1+ path.extname(file.originalname))
// 	}
// })

var app = express();
var util = require('./lib/hashUtils');
var middleware = require('./middleware');
var cors = require('cors');

const expressSession = require('express-session')
const passport = require('passport');
const config = require('./config/passport');
const LocalStrategy = require('passport-local').Strategy
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


var port = process.env.PORT || 3000;

app.use(cors());
app.options('*', cors())

//Use body parser for parsing the request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(cors());

app.set('trust proxy', 1) // trust first proxy

app.use(fileUpload());

//Initialize passport and express
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//Start --- Commented for redis-heroku deployment
//const redis = require('redis')
//const redisStore = require('connect-redis')(expressSession)
// var client;
// if (process.env.REDIS_URL) {
//   client = require('redis').createClient(process.env.REDIS_URL)
// } else {
//   client = redis.createClient(6379, 'localhost');
// }

// app.use(expressSession({
//   	name: 'session',
//   	secret: 'test',
//     store: new redisStore(),
//   	// store: new redisStore({
//   	// 	host: 'localhost',
//   	// 	post: 6379,
//   	// 	client,ttl: 260
// 	  // }),
// 	  saveUninitialized: false,
// 	  resave: false
// }))
//End --- Commented for redis-heroku deployment

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
  db.getAvailableListings()
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

app.get('/borrowerlistings', (req, res) => {
  console.log('request received borrowerlistings for', req.query);
  var params = [req.query.params];
  db.getListingsForBorrower(params)
    .then((data) => {
      console.log('grabbed all borrower listings for ...', data);
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
	if (JSON.stringify(req.body) === '{}') {
		return res.status(400).send('No files/inputs were uploaded.');
	}

	var params = [
		req.body.name,
		req.body.description,
		req.body.cost,
		req.body.tags,
		req.body.id
	];

	db.createListing(params)
		.then(data => {
			let imageFile = req.files.listingImage;

			if (imageFile === undefined) {
				res.status(201).redirect('/');
			} else {
				if (!fs.existsSync('./client/public/images/listings/' + data[0].id)) {
					fs.mkdir('./client/public/images/listings/' + data[0].id);
				}

				imageFile.mv('./client/public/images/listings/' + data[0].id + '/1.jpg', function(err) {
					if (err) {
						res.status(500).send(err);
					} else {
						res.status(201).redirect('/');
					}
				});
			}
		});
});

app.delete('/deletebooking',
(req, res) => {
  var params = [req.body.params];
  db.deleteBooking(params)
    .then((data) => {
      console.log('booking deleted');
      res.end(JSON.stringify(data));
    });

//works with multer
// app.post('/createlisting', (req, res) => {
// 	var upload = multer({
// 		storage: storage
// 	}).single('image')
// 	upload(req, res, function(err) {
// 		db.createListing(req.body.params.split(','))
//     	.then((data) => {
//     		console.log(data[0].id);
//     	fs.rename('./client/public/images/listings/temp', './client/public/images/listings/'+data[0].id, function (err) {
// 		  if (err) throw err;
// 		  console.log('renamed complete');
// 		});
//       	res.end(JSON.stringify(data));
//     	});
// 	})
 });

app.get('/search', (req, res) => {
	console.log('this query',req.query.param);
	db.searchListings(req.query.param)
	.then ((data) => {
		console.log('searched the database');
		res.end(JSON.stringify(data));
	})
});

app.get('/listingreview', (req, res) => {
	console.log(' get request for ',req.query);
  var params = [req.query.params];
	db.getListingReviews(params)
	.then ((data) => {
		console.log('searched the database');
		res.end(JSON.stringify(data));
	})
});


app.post('/listingreview',
(req, res) => {
	if (JSON.stringify(req.body) === '{}') {
		return res.status(400).send('No/inputs were uploaded.');
	}

	var params = [
    req.body.listingId,
    req.body.userId,
		req.body.review,
		req.body.stars,
	];

	db.createListingReview(params)
  .then ((data) => {
		console.log('created review');
		res.end(JSON.stringify(data));
	});
});




app.listen(port, function(req, res) {
  console.log('App running on port ' + port);
});
