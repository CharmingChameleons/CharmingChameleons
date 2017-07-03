const Promise = require('bluebird');
const pg = require('pg');
const url = require('url');


let config = {
  user: "henri", // name of the user account
  host: "localhost",
  password: "test",
  database: "henri",
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000,
};

if (process.env.DATABASE_URL) {


  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
  };
};

//create connection
var pool = new pg.Pool(config);

module.exports = {
  //Select all listings
  getAllListings: () => {
    return new Promise (
      (resolve, reject) => {
        pool.query('select listings.id, listings.name, listings.description, listings.cost,listings.tags, listings.lenderid, users.username from listings inner join users on users.id = listings.lenderid', function (err, result) {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve(JSON.parse(JSON.stringify(result.rows)));
            }
        })
      }
    )
  },

  getAvailableListings: () => {
    return new Promise (
      (resolve, reject) => {
        pool.query('SELECT listings.id, listings.name, listings.description, listings.cost,listings.tags, listings.lenderid, users.username \
                      FROM listings  \
                      INNER JOIN users on users.id = listings.lenderid \
                      WHERE listings.id NOT IN (SELECT listingid FROM bookings)', function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(JSON.stringify(result.rows)));
          }
        });
      }
    )
  },

  createListing: (params) => {
    var queryString = 'INSERT INTO listings (name, description, cost, tags, lenderId) VALUES ($1, $2, $3, $4, $5) returning id'
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

  createBookings: (params) => {
    var queryString = 'INSERT INTO bookings (listingId, borrowerId) VALUES ($1, $2) returning id';
    var queryArgs = params;
    console.log('query', queryArgs);
    return new Promise (
      (resolve, reject) => {
        pool.query(queryString, queryArgs, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(JSON.stringify(result.rows)));
          }
        })
      }
    )
  },

  //Input: Replace the following with its values[userid]
  //Output: Returns all the listings that belongs to one user-> array
  getListingsForUser: (params) => {
    var queryString = 'SELECT listings.id, listings.name, listings.description, listings.cost,\
                         listings.tags, listings.lenderid,  lu.username, bookings.borrowerid, bu.username AS borrowername \
                       FROM listings \
                           LEFT OUTER JOIN bookings ON (listings.id = bookings.listingId) \
                           INNER JOIN users AS lu on lu.id = listings.lenderid \
                           LEFT OUTER JOIN users AS bu on bu.id = bookings.borrowerid \
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

  getListingsForBorrower: (params) => {
    var queryString = 'SELECT listings.id, listings.name, listings.description, listings.cost,\
                         listings.tags, listings.lenderid,  users.username, bookings.borrowerid \
                       FROM listings \
                           INNER JOIN bookings on listings.id = bookings.listingid \
                           INNER JOIN users on users.id = listings.lenderid \
                       WHERE bookings.borrowerid = $1'
    var queryArgs = params

    return new Promise (
      (resolve, reject) => {
        pool.query(queryString, queryArgs, (err, rows) => {
          if (err) {
            reject (err)
          } else {
            console.log('got listing for borrower');
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
    //Output: Returns the row containing that name -> arra


  getUserId: (params) => {
    var queryString = "SELECT * FROM users WHERE username = $1"
    var queryArgs = params

    return new Promise (
      (resolve, reject) => {
        pool.query(queryString, queryArgs, (err, data) => {
          if (err) {
            reject (err)
          } else {
            resolve(JSON.parse(JSON.stringify(data.rows)))
          }
        })
      }
    )
  },

  searchListings: (term) => {
    term = " '%'|| '" + term + "' ||'%'";
    var queryString = 'SELECT listings.id, listings.name, listings.description, listings.cost,listings.tags, listings.lenderid, users.username \
	                       FROM listings \
  	                         INNER JOIN users on users.id = listings.lenderid \
                         WHERE listings.id NOT IN (SELECT listingid FROM bookings) AND \
	                         listings.tags ILIKE' + term ;
    return new Promise (
      (resolve, reject) => {
        pool.query(queryString, (err, data) => {
          if (err) {
            reject (err)
          } else {
            resolve(JSON.parse(JSON.stringify(data.rows)));
          }
        })
      }
    )
  },

  //Create New User
  createUser: (params) => {
    var queryString = 'INSERT INTO users (username, hash, salt) VALUES ($1, $2, $3) returning id'
    var queryArgs = params

    return new Promise (
      (resolve, reject) => {
        pool.query(queryString, queryArgs, (err, rows) => {
          if (err) {
            reject (err)
            console.log(err);
          } else {
            console.log('user id');
            resolve(JSON.parse(JSON.stringify(rows.rows)))
          }
        })
      }
    )
  },

  deleteListing: (params) => {
    console.log('inside deleteListing')
    console.log(params);

    var queryString = 'DELETE FROM listings WHERE id =$1'
    var queryArgs = params;

    return new Promise (
      (resolve, reject) => {
        pool.query(queryString, queryArgs, (err, rows) => {
          if (err) {
            reject (err)
            console.log(err);
          } else {
            console.log('deleted!');
            resolve(JSON.parse(JSON.stringify(rows.rows)))
          }
        })
      }
    )
  },

  deleteBooking: (params) => {
    console.log('inside deleteListing')
    console.log(params);

    var queryString = 'DELETE FROM bookings WHERE listingid = $1'
    var queryArgs = params;

    return new Promise (
      (resolve, reject) => {
        pool.query(queryString, queryArgs, (err, rows) => {
          if (err) {
            reject (err)
            console.log(err);
          } else {
            console.log('deleted!');
            resolve(JSON.parse(JSON.stringify(rows.rows)))
          }
        })
      }
    )
  },

  getListingReviews: (params) => {
    var queryString = "SELECT reviews.id, reviews.review, reviews.stars, users.username \
                      FROM reviews \
                        INNER JOIN users on users.id = reviews.borrowerid \
                      WHERE reviews.listingid = $1";
    var queryArgs = params;

    return new Promise (
      (resolve, reject) => {
        pool.query(queryString, queryArgs, function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(JSON.stringify(result.rows)));
          }
        });
      }
    )
  },
  createListingReview: (params) => {
    var queryString = 'INSERT INTO reviews (LISTINGID, BORROWERID, REVIEW, STARS) VALUES ($1, $2, $3, $4) returning id'
    var queryArgs = params

    return new Promise (
      (resolve, reject) => {
        pool.query(queryString, queryArgs, (err, rows) => {
          if (err) {
            reject (err)
            console.log(err);
          } else {
            console.log('added this review to DB');
            resolve(JSON.parse(JSON.stringify(rows.rows)))
          }
        })
      }
    )
  }
}
