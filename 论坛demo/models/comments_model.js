/**
 * Created by renminghe on 16/6/16.
 */
//定义评论对象的mongoose模型
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ReplySchema = new Schema({
    username:String,
    subject:String,
    timestamp:{type:Date,default:Date.now},
    body:String,
},{_id:true});
    ReplySchema.replies = [ReplySchema];
var CommentThreadSchema = new Schema({
    title:String,
    replies:[ReplySchema]
});
mongoose.model('Reply',ReplySchema);
mongoose.model('CommentThread',CommentThreadSchema);