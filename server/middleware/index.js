var Promise = require('bluebird')
var db = require('../../database')
var util = require('../lib/hashUtils')

module.exports = {
	authenticateLogin: (username, password) => {

		return new Promise (
			(resolve, reject) => {
				var params = []
				params.push(username)
				db.getUserId(params)
				    .then((user) => {

				    	//Check for password
				    	if (!user[0]) {
				    		resolve(false)
				    	} else {

				    		console.log('In authenticate', util.compareHash(password, user[0].hash, user[0].salt))

				    		//Verify whether hash stored in db is same as hash created by password
				    		if (util.compareHash(password, user[0].hash, user[0].salt)) {
				    			resolve(true)
				    		} else {
				    			resolve(false)
				    		}

				    		resolve(true)
				    	}
				    	//return user
				    })
				    .error((err) => {
				    	reject(err)
				    })
		})	
	},

	authenticate: (req, res, next) => {

		if (util.compareHash(req.headers['user-agent'], req.session.sessionId, req.session.username)) {
			next()
		} else {
			res.redirect('/login');
		}		
	}
} 
