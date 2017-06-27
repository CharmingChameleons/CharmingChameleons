var sqlite3 = require('sqllite3').verbose();
var Promise = require('bluebird')

//Connect to SQlLite3 database
<<<<<<< HEAD
var db = new sqlite3.Database('./shareio.db');

module.exports = {

	//Select all listings
	getListings: () => {

		return new Promise (
			(resolve, reject) => {
				db.all("SELECT * FROM listings", function (err, rows) {
					if (err) {
						reject(err)
					} else {
						resolve(rows)
					}
				})
			}
		)
	},

	//create new booking
	createBookings: (params) => {

		var queryString = "INSERT INTO bookings (listingId, borrowerId) VALUES (?, ?)"

		var queryArgs = params

		return new Promise (
			(resolve, reject) => {
				db.query(queryString, queryArgs, (err, rows) => {
					if (err) {
						reject (err)
					} else {
						resolve(rows)
					}
				})
			}
		)

	},

	//Get all listings for user
	getListingsForUser: (params) => {
 
		var queryString = "SELECT * FROM listings LEFT OUTER JOIN bookings \
							ON (listings.id = booking.listingId) \
						   	WHERE listings.lenderId = ?"

		var queryArgs = params

		return new Promise (
			(resolve, reject) => {
				db.query(queryString, queryArgs, (err, rows) => {
					if (err) {
						reject (err)
					} else {
						resolve(rows)
					}
				})
			}
		)
	},

	//Get username based on id
	getUserName: (params) => {
		var queryString = "SELECT * FROM users WHERE id = ?"

		var queryArgs = params

		return new Promise (
			(resolve, reject) => {
				db.query(queryString, queryArgs, (err, rows) => {
					if (err) {
						reject (err)
					} else {
						resolve(rows)
					}
				})
			}
		)
	},

	//Get user id based on username
	getUserId: (params) => {
		var queryString = "SELECT * FROM users WHERE username = ?"

		var queryArgs = params

		return new Promise (
			(resolve, reject) => {
				db.query(queryString, queryArgs, (err, rows) => {
					if (err) {
						reject (err)
					} else {
						resolve(rows)
					}
				})
			}
		)
	}

}
=======
//pg.defaults.ssl = true;
//|| process.env.DATABASE_URL


// var q = null;
// const connectionStr = 'postgres://127.0.0.1/shareio';

// pg.connect(connectionStr, function(err, client) {
//   if (err) {
//   	console.error(err);
//   } else {
// 	  console.log('Connected to postgres! Getting schemas...');
// 	  query = client.query('Select * from listings')
// 	  query.on('row', (row) => {
// 	  	console.log(row)
// 	  	q = row;
// 	  })
//   }
// });

// console.log('quesry outside',q);

var config = {
  user: 'sara', // name of the user account
  database: 'shareio', // name of the database
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
}

var pool = new pg.Pool(config)
//var myClient;


// module.exports.query = (text, values) => {
//   //console.log('query:', text, values)
//   console.log('query got called');
//   return pool.query(text, values)
// }

// pool.query('SELECT * from users', function (err, result) {
//     if (err) {
//       console.log(err)
//     }
//     else {
//     	console.log(result)
//     }
   
//   });

// pool.connect(function (err, client, done) {
//   if (err) console.log(err)
//   myClient = client
//   myClient.query('SELECT * from users', function (err, result) {
//     if (err) {
//       console.log(err)
//     }
//     console.log(result)
//   })
// })




//pg.connect(connectionStr);





// console.log(client.query);
 module.exports = {

// 	//Select all listings
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
 	}
 }

	// //create new booking
	// createBookings: (params) => {

	// 	var queryString = "INSERT INTO bookings (listingId, borrowerId) VALUES (?, ?)"

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





>>>>>>> pool works
