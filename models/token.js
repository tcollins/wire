
var mongoose = require('mongoose');
var schemas = require('../models/schemas');

var RandomString = require('../services/randomstring');
var Moment = require('moment');


/******************************************
*   Token Static Methods
*/

// generateTokenKey
schemas.TokenSchema.statics.generateTokenKey = function () {
	return RandomString.generate(15) + Moment().format('YYDDDDHHmmss') + RandomString.generate(14);
}

// generateTokenAndSave
schemas.TokenSchema.statics.generateTokenAndSave = function (userId, cb) {
	
	console.log('inside generateTokenAndSave');

	var token = new this(); //new Token();
    token.key = this.generateTokenKey();
    token.user = userId;
    token.save(cb);
}



/******************************************
*   Token Instance Methods
*/

// containsProvider
//schemas.TokenSchema.methods.containsProvider = function (providername) {
//}


module.exports = mongoose.model('Token', schemas.TokenSchema);
