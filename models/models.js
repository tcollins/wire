
var mongoose = require('mongoose');
var schemas = require('../models/schemas');

exports.schemas = schemas;

//var User = mongoose.model('User', UserSchema);
//var Wire = mongoose.model('Wire', WireSchema);
//var Message = mongoose.model('Message', MessageSchema);

exports.User = function(){
	return mongoose.model('User', schemas.UserSchema);
}

schemas.UserSchema.statics.findByUserName = function (username, cb) {
  this.find({ username: new RegExp(username, 'i') }, cb);
}