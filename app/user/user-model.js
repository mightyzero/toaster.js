var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userModel = new Schema({
	email: String,
	name: {
		first  : String,
		middle : String,
		last   : String
	}
});

module.exports = mongoose.model('User', userModel);