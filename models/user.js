
var mongoose = require('mongoose');
var schemas = require('../models/schemas');


/******************************************
*   User Static Methods
*/

// findByUserName
schemas.UserSchema.statics.findByUserName = function (username, cb) {
  this.find({ username: new RegExp(username, 'i') }, cb);
}

// Query for user by provider username 
schemas.UserSchema.statics.findByProviderUserName = function (providername, username, cb) {
  this.find({
				providers:
				{ $elemMatch: {username: username, providername: providername} }
			}, cb);
}


/******************************************
*   User Instance Methods
*/

// containsProvider
schemas.UserSchema.methods.containsProvider = function (providername) {
	if(this.providers && this.providers.length > 0){
		for (var i = 0; i < this.providers.length; i++) {
			if(this.providers[i].providername === providername){
				return true;	
			}
		};
	}
	return false;
}


module.exports = mongoose.model('User', schemas.UserSchema);
