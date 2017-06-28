const crypto = require('crypto');

//Adding hash utilities

module.exports = {

	createHash: (data, salt) => {
  		let shasum = crypto.createHash('sha256');
  		shasum.update(data + salt);
  		return shasum.digest('hex');
	},

	compareHash: (attempted, stored, salt) => {
  		return stored === module.exports.createHash(attempted, salt);
	},

	createSalt: () => {
  		return crypto.randomBytes(32).toString('hex');
	}
}