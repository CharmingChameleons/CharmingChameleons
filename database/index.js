var sqlite3 = require('sqllite3').verbose();
var Promise = require('bluebird')

//Connect to SQlLite3 database
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