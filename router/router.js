var Student = require('../model/student.js');
var Kecheng = require('../model/kecheng.js');

exports.showpage = function(req,res,next){
	Student.find({},function(err,result){
		res.render('showpage.ejs',{
			'students':result
		})	
	})	
}
exports.showadd = function(req,res,next){
	Kecheng.find({},function(err,result){
		res.render('add.ejs',{
			'kecheng':result
		})
	})
	
}
exports.doadd = function(req,res,next){
	var s_data = req.query;
	if(s_data.kecheng){
	Student.create(s_data,function(){		
		Kecheng.tianjiaxuesheng(s_data.kecheng,s_data.sid,function(){
			
		})
		res.redirect('/');		
		return next();
	})
	}else{
		res.json('必须填写所选课程')
	}
}
exports.showtest = function(req,res,next){
	res.render('addkc.ejs')
}

exports.remove = function(req,res,next){
	var sid = parseInt(req.query.sid);
	Student.remove({'sid':sid},function(){
		res.send('删除成功')
	})
	var newsid = [];
	Kecheng.find({},function(err,result){
		var index = 0,arr = [];
		
		for (var i=0; i<result.length; i++) {
			index = result[i].student.indexOf(sid);
			newsid = [];
			if(index!=-1){
				arr=result[i].student;
				arr.splice(index,1);
				newsid=arr;
			}else{
				newsid=result[i].student
			}
			Kecheng.update({'kid':result[i].kid},{$set:{'student':newsid}},function(){
				console.log('删除成功')
			})
		}
	})	
}

exports.edit = function(req,res,next){
	Student.find({'sid':req.query.sid},function(err,result){
		Kecheng.find({},function(err,result2){
			console.log(result)
			res.render('edit.ejs',{
				'student':result[0],
				'kecheng':result2
			})	
		})
		
	})
}

exports.doedit = function(req,res,next){
	var s_data = req.query;
	var sid = s_data.sid;
	if(s_data.kecheng){
		Kecheng.find({},function(err,result){
			var index = 0,arr = [];			
			for (var i=0; i<result.length; i++) {
				index = result[i].student.indexOf(sid);
				newsid = [];
				if(index!=-1){
					arr=result[i].student;
					arr.splice(index,1);
					newsid=arr;
				}else{
					newsid=result[i].student
				}
				Kecheng.update({'kid':result[i].kid},{$set:{'student':newsid}},function(){
					console.log('删除成功')
				})
			}
		})	
		Student.update({"sid":sid},s_data,function(){
			Kecheng.tianjiaxuesheng(s_data.kecheng,s_data.sid,function(){
				res.send('修改完毕')
			})
		})
	}else{
		res.json('必须填写所选课程')
	}
}
