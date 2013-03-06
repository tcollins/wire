
var mongoose = require('mongoose');
var schemas = require('../models/schemas');

exports.schemas = schemas;

//var User = mongoose.model('User', UserSchema);
//var Wire = mongoose.model('Wire', WireSchema);
//var Message = mongoose.model('Message', MessageSchema);

exports.User = function(){
	return mongoose.model('User', schemas.UserSchema);
}

// User Static Methods
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

// User Instance Methods
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

/*

// Query for all users with a twitter username of 'johnnyx'
providers: {
                $elemMatch: {
                     	username: 'johnnyx',  
			providername: "twitter"
                }
      	}  

*/