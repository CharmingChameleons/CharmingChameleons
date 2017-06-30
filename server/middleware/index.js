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
				    			resolve(user[0])
				    		} else {
				    			resolve(false)
				    		}

				    		resolve(user[0])
				    	}
				    	//return user
				    })
				    .error((err) => {
				    	reject(err)
				    })
		})	
	},

	authenticate: (req, res, next) => {
		console.log('In authenticate')

		console.log('req.session.sessionId', req.session.sessionId)
		console.log('req.session.username', req.session.username)
		console.log(util.compareHash(req.headers['user-agent'], req.session.sessionId, req.session.username))

		if (util.compareHash(req.headers['user-agent'], req.session.sessionId, req.session.username)) {
			next()
		} else {
			res.status(500).send();
		}		
	}
} 
