/**
 * Created by renminghe on 16/6/16.
 */
//主服务器
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://127.0.0.1/comments');
require('./models/comments_model.js');
require('./models/photo_model.js');
require('./models/page_model.js');
var app = express();
app.engine('.html',require('ejs').__express);
app.set('views',__dirname + '/views');
app.set('view engine','html');
app.use(bodyParser());
require('./comment_routes.js')(app);
app.listen(8888, function () {
    console.log('listen to port 8888');
});
//18610562100 老罗
