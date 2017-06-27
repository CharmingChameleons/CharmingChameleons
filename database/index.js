var pg = require('pg');
var Promise = require('bluebird');

var host = "localhost";
var password = 'test';

if (process.env.DATABASE_URL) {
  host = process.env.DATABASE_URL;
  password = 'password';
}

var config = {
  user: 'henri', // name of the user account
  host: host,
  password: password,
  database: 'henri', // name of the database
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000
 // how long a client is allowed to remain idle before being closed
}

//create connection
var pool = new pg.Pool(config)

 module.exports = {

 //returns all listings
 	getAllListings: () => {

		return new Promise (
 			(resolve, reject) => {
 				pool.query('SELECT * from listings', function (err, result) {
				    if (err) {
				      console.log(err)
				      reject(err)
				    }
				    else {
				    	console.log('got all the listings')
				    	resolve(JSON.parse(JSON.stringify(result.rows)))
				    }
				})
  		}
 		)
 	},
 	//Input: replace the following with its values[name, description, cost, tags]
 	//Output: returns the id of the listing object created => [{id: 1}]
 	createListing: (params) => {
		console.log(params);
		var queryString = 'INSERT INTO listings (name, description, cost, tags) VALUES ($1, $2, $3, $4) returning id'
		var queryArgs = params

		return new Promise (
			(resolve, reject) => {
				pool.query(queryString, queryArgs, (err, rows) => {
					if (err) {
						reject (err)
						console.log(err);
					} else {
						console.log('added this item to DB');
						resolve(JSON.parse(JSON.stringify(rows.rows)))
					}
				})
			}
		)
	},
	//Input: Replace the following with its values[listingId, borrowerId] --> internal use
  //Output: returns the id of the booking object created => [{id: 1}]
	createBookings: (params) => {
		console.log(params);
		var queryString = 'INSERT INTO bookings (listingId, borrowerId) VALUES ($1, $2) returning id'
		var queryArgs = params

		return new Promise (
			(resolve, reject) => {
				pool.query(queryString, queryArgs, (err, rows) => {
					if (err) {
						reject (err)
						console.log(err);
					} else {
						console.log('got data from createBookings');
						resolve(JSON.parse(JSON.stringify(rows.rows)))
					}
				})
			}
		)
	},
  //Input: Replace the following with its values[userid]
  //Output: Returns all the listings that belongs to one user-> array
	getListingsForUser: (params) => {
		var queryString = 'SELECT * FROM listings LEFT OUTER JOIN bookings \
							ON (listings.id = bookings.listingId) \
						   	WHERE listings.lenderId = $1'
		var queryArgs = params

		return new Promise (
			(resolve, reject) => {
				pool.query(queryString, queryArgs, (err, rows) => {
					if (err) {
						reject (err)
					} else {
						console.log('got listing for user');
						resolve(JSON.parse(JSON.stringify(rows.rows)))
					}
				})
			}
		)
	},

	//Input: Replace the following with its values[userid]
  //Output: Returns the row containing that user id -> array
	getUserName: (params) => {
		var queryString = "SELECT * FROM users WHERE id = $1"
		var queryArgs = params

		return new Promise (
			(resolve, reject) => {
				pool.query(queryString, queryArgs, (err, rows) => {
					if (err) {
						reject (err)
					} else {
						console.log('got username');
						resolve(JSON.parse(JSON.stringify(rows.rows)))
					}
				})
			}
		)
	},

	//Input: Replace the following with its values['username']
  //Output: Returns the row containing that name -> array
	getUserId: (params) => {
		var queryString = "SELECT * FROM users WHERE username = $1"
		var queryArgs = params

		return new Promise (
			(resolve, reject) => {
				pool.query(queryString, queryArgs, (err, rows) => {
					if (err) {
						reject (err)
					} else {
						console.log('user id');
						resolve(JSON.parse(JSON.stringify(rows.rows)))
					}
				})
			}
		)
	}

}
