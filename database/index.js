var pg = require('pg');
var Promise = require('bluebird');

var config = {
  user: 'sara', // name of the user account
  database: 'shareio', // name of the database
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
}

var pool = new pg.Pool(config)

 module.exports = {
 
 //Select all listings
 	getAllListings: () => {
		return new Promise (
 			(resolve, reject) => {
 				pool.query('SELECT * from listings', function (err, result) {
				    if (err) {
				      console.log(err)
				      reject(err)
				    }
				    else {
				    	console.log('In getlistings', result)
				    	resolve(JSON.parse(JSON.stringify(result.rows)))
				    }
				})			
  		}
 		)
 	},

	//create new booking
	// createBookings: (params) => {
	// 	console.log(params);
	// 	var queryString = 'INSERT INTO bookings (listingId, borrowerId) VALUES (params[0], params[1])'
	// 	var queryArgs = params

	// 	return new Promise (
	// 		(resolve, reject) => {
	// 			pool.query(queryString, queryArgs, (err, rows) => {
	// 				if (err) {
	// 					//reject (err)
	// 					//console.log(err);
	// 				} else {
	// 					console.log('got the rows');
	// 					//resolve(rows)
	// 				}
	// 			})
	// 		}
	// 	)

	// }

}
	//Get all listings for user
	// getListingsForUser: (params) => {
 
	// 	var queryString = "SELECT * FROM listings LEFT OUTER JOIN bookings \
	// 						ON (listings.id = booking.listingId) \
	// 					   	WHERE listings.lenderId = ?"

	// 	var queryArgs = params

	// 	return new Promise (
	// 		(resolve, reject) => {
	// 			db.query(queryString, queryArgs, (err, rows) => {
	// 				if (err) {
	// 					reject (err)
	// 				} else {
	// 					resolve(rows)
	// 				}
	// 			})
	// 		}
	// 	)
	// },

	// //Get username based on id
	// getUserName: (params) => {
	// 	var queryString = "SELECT * FROM users WHERE id = ?"

	// 	var queryArgs = params

	// 	return new Promise (
	// 		(resolve, reject) => {
	// 			db.query(queryString, queryArgs, (err, rows) => {
	// 				if (err) {
	// 					reject (err)
	// 				} else {
	// 					resolve(rows)
	// 				}
	// 			})
	// 		}
	// 	)
	// },

	// //Get user id based on username
	// getUserId: (params) => {
	// 	var queryString = "SELECT * FROM users WHERE username = ?"

	// 	var queryArgs = params

	// 	return new Promise (
	// 		(resolve, reject) => {
	// 			db.query(queryString, queryArgs, (err, rows) => {
	// 				if (err) {
	// 					reject (err)
	// 				} else {
	// 					resolve(rows)
	// 				}
	// 			})
	// 		}
	// 	)
	// }

//}

