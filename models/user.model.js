//https://thinkster.io/tutorials/node-json-api/creating-the-user-model

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const { Schema } = mongoose;

const UserSchema = new Schema({
	username: {
		type: String, 
		lowercase: false, 
		required: [true, "Anna käyttäjänimi"], 
		match: [/^[a-zA-Z0-9]+$/, 'Käyttäjänimi ei kelpaa'],
		minlength: [6, 'Käyttäjänimen tulee olla vähintään 6 merkkiä pitkä.'],
		unique: true
	},
	email: {
		type: String, 
		lowercase: true, 
		required: [true, "Anna sähköpostiosoite"], 
		match: [/\S+@\S+\.\S+/, 'Sähköposti ei kelpaa'], 
		unique: true
	},
	hash: String,
	salt: String,
	lists: [{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'ShoppingList'
	}]
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, { message: '{VALUE} on jo varattu' });

UserSchema.methods.setPassword = function( password ){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
	return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
	var today = new Date();
	var exp = new Date(today);
	exp.setDate( today.getDate() + 60 );

	return jwt.sign({
		id: this._id,
		username: this.username,
		exp: parseInt(exp.getTime() / 1000),
	}, secret);
};

UserSchema.methods.toAuthJSON = function(){
	return {
		username: this.username,
		email: this.email,
		token: this.generateJWT(),
		bio: this.bio,
		image: this.image
	};
};

const userModel = mongoose.model('User', UserSchema);

module.exports = userModel;