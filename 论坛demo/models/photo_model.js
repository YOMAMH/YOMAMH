/**
 * Created by renminghe on 16/6/17.
 */
//定义评论照片mongoose模型
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var PhotoScheam = new Schema({
    title:String,
    filename:String,
    timestamp:{type:Date,default:Date.now},
    commentId:Schema.ObjectId
});
mongoose.model('Photo',PhotoScheam);