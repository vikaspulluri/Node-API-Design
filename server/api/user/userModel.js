var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//It's the keyword 'type' that distiguishes nested object and string
var UserSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},

	address:{
		state: String,
	}
	/* Avoid type keyword. If you want to use, use like below
	type:{
		type: String
	}*/
});

module.exports = mongoose.model('user', UserSchema);
