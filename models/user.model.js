//https://thinkster.io/tutorials/node-json-api/creating-the-user-model

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const { Schema } = mongoose;

var UserSchema = new Schema({
	username: {
		type: String, 
		lowercase: true, 
		required: [true, "Anna käyttäjänimi"], 
		match: [/^[a-zA-Z0-9]+$/, 'Käyttäjänimi ei kelpaa'], 
		index: true
	},
	email: {
		type: String, 
		lowercase: true, 
		required: [true, "Anna sähköpostiosoite"], 
		match: [/\S+@\S+\.\S+/, 'is invalid'], 
		index: true},
	hash: String,
	salt: String
}, {timestamps: true});

const userModel = mongoose.model('User', UserSchema);

module.exports = userModel;