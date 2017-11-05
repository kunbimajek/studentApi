var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
	surname: String,
	firstname: String,
	level: String,
	department: String,
	college: String,
	matric_number: String,
	date : { type: Date, default: Date.now },
})


module.exports = mongoose.model('Student',studentSchema);