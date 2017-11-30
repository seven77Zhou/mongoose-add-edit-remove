var mongoose = require('mongoose');
//schema
var kechengSchema = new mongoose.Schema({
	'kid':Number,
	'kname':String,
	'student':[Number]
})
//索引
kechengSchema.index({'kid':1})

kechengSchema.statics.tianjiaxuesheng = function(kids,sid,callback){
	for(var i=0; i<kids.length; i++){
		kecheng.update({"kid":kids[i]},{$push :{"student":sid}},callback)
	}
}

var kecheng = mongoose.model('kechengs',kechengSchema)

module.exports = kecheng;