/**
 * Created by renminghe on 16/6/16.
 */
//初始化应用程序
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://127.0.0.1/comments');
require('./models/comments_model.js');
require('./models/photo_model.js');
require('./models/page_model.js');
var CommentThread = mongoose.model('CommentThread');
var Reply = mongoose.model('Reply');
var Photo = mongoose.model('Photo');
var Page = mongoose.model('Page');
function addPhoto(title,filename){
    var comment = new CommentThread({title:title});
    comment.save(function (err,comment) {
        var photo = new Photo({title:title,filename:filename});
        photo.commentId = comment.id;
        console.log(photo.commentId);
        photo.save(function () {
            console.log(title + "Saved.");
        });
    });
}
CommentThread.remove().exec(function () {
    Photo.remove().exec(function(){
        Page.remove().exec(function () {
           var comment = new CommentThread({title:"Photo Page Comments"});
            comment.save(function (err,comment) {
                var page = new Page({name:"Photos Page"});
                page.commentId = comment.id;
                page.save();
            });
            addPhoto('黄图一','4.jpg');
            addPhoto('黄图二','04.jpg');
            addPhoto('黄图三','bg.jpg');
            addPhoto('黄图四','bg4.jpg');
            addPhoto('黄图五','bg5.jpg');
            addPhoto('黄图六','bg.jpg');
        });
    });
});