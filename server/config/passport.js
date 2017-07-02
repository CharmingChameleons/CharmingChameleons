
var passport = require('passport');
var db = require('../../database');
var middleware = require('../middleware');
var util = require('../lib/hashUtils');

var host = ""
var LocalStrategy = require('passport-local').Strategy
//var FBStrategy = require('passport-facebook').Strategy
//var fbAppId = config.fb.appID
//var fbAppSecret = config.fb.appSecret
//var fbCallbackURL = config.fb.callbackURL

module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
	  done(null, { 
	  		id: user.id,
	  		username: user.username
	  	});
	});

	passport.deserializeUser(function(user, done) {
		//done(null, user);
	  	models.getUserName(user.id)
	  	.then((user) => {
	  		var temp = {
	  			id: user.id,
	  			username: user.username
	  		}
	  		return done(null, temp);
	  	})
	  	.error((err) => {
	  	    console.error('There was an error accessing the records of' +
	      		' user with id: ' + id);
	      	return done(err);
	  	})
	});

	//Local Strategy
	passport.use('local-signup', new LocalStrategy({
	    	usernameField : 'username',
	    	passwordField : 'password',
	    	passReqToCallback : true
		},
	  	function(req, username, password, done) {

	  		var hash;

	    	process.nextTick(function() {
	    	if (!req.username) {
	    		var user = {}
				middleware.authenticateLogin(req.body.username, req.body.password)
				.then((result) => {
					if(result) {
						//User found
						console.log('User Already Exist')
						return done(null, false, {errMsg: 'user already exists'})
					} else {
						//Create new salt and hash for the user
						var salt = util.createSalt()
						hash = util.createHash(req.body.password, salt)
						var args = [];

						args.push(req.body.username)
						args.push(hash)
						args.push(salt)
						db.createUser(args)
						.then((data) => {
							console.log('signup', data[0].id)
							user = {
								id: data[0].id,
								username: req.body.username
								//password: hash
							};
							console.log('user created')

							return done(null, user);
						})
						.catch((err) => {
							console.log('err in creating new user', err)
							return done(err);
						})
					}
				})
				.catch((err) => {
					console.log('err in authenticating user', err)
					return done(null, false, {errMsg: 'user not authenticated'})
				})
	    	} else {//user exists and is loggedin
			    var user = req.user; // pull the user out of the session
			    // update the current users local credentials

			    // save modifications to user

			}
	  	});
	}));

	//Local - Login
	passport.use('local-login', new LocalStrategy({
	    usernameField : 'username',
	    passwordField : 'password',
	    passReqToCallback : true
	 },
	  	function(req, username, password, done) {
	    	middleware.authenticateLogin(req.body.username, req.body.password)
	    	.then((user) => {
	    		if (user === false) {
	    			return done(null, false, {errMsg: 'Invalid user or password'})
	    		} else {
	    			var temp  = {
						id: user.id,
						username: user.username
						//password: hash
					};
	    			return done(null, temp);
	    		}	
	    	})
	    	.catch((err) => {
	    		return done(err);
	    	})
	  	})
	);

	//Facebook Strategy
	// passport.use(new FBStrategy({
	//     clientID: fbAppId,
	//     clientSecret: fbAppSecret,
	//     callbackURL: fbCallbackURL,
	//     profileFields: ['id', 'displayName', 'emails', 'photos'],
	//     passReqToCallback : true
	//   },
	//   function(req, accessToken, refreshToken, profile, done) {
	//     process.nextTick(function() {
	//       if(!req.user) {//confirm that user not loggedin
	//         User.findOne({'social.fb.id': profile.id }, function(err, user) {
	//           if (err) {
	//             console.error('There was an error accessing the dbase', err.message);
	//             return done(err);
	//             }
	//           if (user) {
	//               return done(null, user);
	//             }
	//           else {
	//               var newUser = new User();
	//               newUser.social.fb.id = profile.id;
	//               newUser.social.fb.token = accessToken;
	//               newUser.social.fb.displayName = profile.displayName;
	//               newUser.social.fb.email = profile.emails[0].value;
	//               newUser.social.fb.photo = profile.photos[0].value || '';
	//               newUser.save(function(err) {
	//                   if (err) {
	//                     console.error(err);
	//                     return done(err);
	//                   }
	//                   return done(null, newUser);
	//               });
	//             }
	//           }
	//         );
	//       }
	//       else {//user exists and is loggedin
	//         var user = req.user; // pull the user out of the session
	//         // update the current users facebook credentials
	//         user.social.fb.id = profile.id;
	//         user.social.fb.token = accessToken;
	//         user.social.fb.displayName = profile.displayName;
	//         user.social.fb.email = profile.emails[0].value;
	//         user.social.fb.photo = profile.photos[0].value || '';
	//         // save modifications to user
	//         user.save(function(err) {
	//           if (err) {
	//             console.error(err);
	//             return done(err);
	//           }
	//           //console.log('user fb', user.social.fb.displayName);
	//           //console.log('user fb tokens',user.social.fb.token);
	//           return done(null, user);
	//         });
	//       }
	//     });
	//   }));
}
