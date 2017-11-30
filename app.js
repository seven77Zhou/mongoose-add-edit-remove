var express = require('express');
var app = express();
var router = require('./router/router.js')
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/xueshengguanli');
var db = mongoose.connection;
db.once('open', function (callback) {
    console.log("数据库成功打开");
});

app.set("view engine","ejs");

app.get('/',router.showpage)
app.get('/add',router.showadd)
app.get('/doadd',router.doadd)
app.get('/test',router.showtest)
app.get('/remove',router.remove)
app.get('/edit',router.edit)
app.get('/doedit',router.doedit)

app.listen(3000)
