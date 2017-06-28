var Promise = require('bluebird')
var db = require('../../database')

module.exports = {
	authenticate: (username, password) => {

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
	}
} 

// //Use Passport Locale Strategy for authentication
// passport.use(new LocalStrategy (  
// 	(username, password, done) => {
// 		var params = []
// 		params.push(username)
// 	    db.getUserId(params)
// 	    .then((user) => {

// 	    	//Check for password
// 	    	if (!user) {
// 	    		return done(null, false)
// 	    	}

// 	    	//Verify whether hash stored in db is same as hash created by password
// 	    	if (!(util.compareHash(user.hash, password, user.salt))) {
// 	    		return done(null, false)
// 	    	}

// 	    	return done (null, user)
// 	    })
// 	    .error((err) => {
// 	    	return done(null, false)
// 	    })
// 	}
// ))

// //Create session and store session details in Postgres Db
// app.use(session({  
// 	secret: 'awesome',	
// 	store: ,
// 	resave: false,
// 	saveUninitialized: false
// }))