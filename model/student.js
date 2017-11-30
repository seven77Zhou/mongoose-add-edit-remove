var mongoose = require('mongoose');
//schema
var studentSchema = new mongoose.Schema({
	'sid':Number,
	'sname':String,
	'sage':Number,
	'kecheng':[Number]
})
//索引
studentSchema.index({'sid':1})

var student = mongoose.model('students',studentSchema)

module.exports = student;