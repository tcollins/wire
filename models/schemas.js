
var mongoose = require('mongoose');

var SchemaTypes = mongoose.Schema.Types;

// AuthProviderSchema is a Sub-doc of the the UserSchema
var AuthProviderSchema = mongoose.Schema({});
var UserSchema = mongoose.Schema({});
var WireSchema = mongoose.Schema({});
var MessageSchema = mongoose.Schema({});


AuthProviderSchema.add({
	providername   	: {type : String},
	username        : {type : String, required: true},
	displayname    	: {type : String},
	location		: {type : String},
	url				: {type : String}
});

UserSchema.add({
	name          	: {type : String},
	username        : {type : String, required: true},
	email          	: {type : String},
	providers		: [AuthProviderSchema],
	wires			: [{ type: SchemaTypes.ObjectId, ref: 'Wire' }]
});

WireSchema.add({
	title          	: {type : String, required: true},
	description    	: {type : String},		
	users			: [{ type: SchemaTypes.ObjectId, ref: 'User' }]
});

/*
* spawnedwire will be empty most of the time, but if someone leaves
* comments on this message a new wire will be spawned
*/

MessageSchema.add({
	type          	: {type : String, required: true},
	title          	: {type : String},
	message        	: {type : String},
	created			: {type: Date, default: Date.now},
	user			: { type: SchemaTypes.ObjectId, ref: 'User' },
	wire			: { type: SchemaTypes.ObjectId, ref: 'Wire' },
	spawnedwire		: { type: SchemaTypes.ObjectId, ref: 'Wire' }
});


module.exports = {
	UserSchema		: UserSchema,
	WireSchema		: WireSchema,
	MessageSchema	: MessageSchema
};
