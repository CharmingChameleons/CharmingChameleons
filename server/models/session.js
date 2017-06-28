// var express = require('express');
// var db = require('../database')

// var app = express();

// const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const passport = require('passport');   
// const LocalStrategy = require('passport-local').Strategy


// //Initialize passport and express
// app.use(passport.initialize());
// app.use(passport.session());


var Promise = require('bluebird')
var db = require('../../database')
var util = require('../lib/hashUtils');

module.exports = {

	createNewSession: (userAgent, username) => {
		return new Promise (
			(resolve, reject) => {
				var sessionId = util.createHash(userAgent, username)
				var session = {
					'sessionId': sessionId,
					'username': username
				}
				resolve(session)
			}
		)
	}
}