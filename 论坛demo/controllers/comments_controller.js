/**
 * Created by renminghe on 16/6/16.
 */
var mongoose = require('mongoose'),
    CommentThread = mongoose.model('CommentThread'),
    Reply = mongoose.model('Reply');

//获取评论主题模块
exports.getComment = function (req,res) {
    CommentThread.findOne({_id:req.query.commentId}).exec(function (err,comment) {
        if(!comment){
            res.json(404,{msg:'CommentThread Not Found.'});
        }else {
            res.json(comment);
        }
    });
};

//添加评论主题模块
exports.addComment = function (req,res) {
    CommentThread.findOne({_id:req.body.rootCommentId}).exec(function (err,commentThread) {
        if(!commentThread){
            res.json(404,{msg:'CommentThread Not Found.'});
        }else {
            var newComment = Reply(req.body.newComment);

            newComment.username = generateRandomUsername();
            addComment(req,res,commentThread,commentThread,req.body.parentCommentId,newComment);
        }
    });
};

//添加评论的方法
function addComment(req,res,commentThread,currentComment,parentId,newComment){
    if(commentThread.id == parentId){
        commentThread.replies.push(newComment);
        updateCommentThread(req,res,commentThread);
    }else {
        for (var i = 0; i < currentComment.length; i++) {
          var c = currentComment.replies[i];
            if(c._id == parentId){
                for (var k in newComment){
                    c[k] = newComment[k];
                }
                var replyThread = commentThread.replies.toObject();
                updateCommentThread(req,res,c);
                break;
            }else {
                addComment(req,res,commentThread,c,parentId,newComment);
            }

        }
    }
}

//更新评论信息
function updateCommentThread(req,res,commentThread){
    CommentThread.update({_id:commentThread.id},{$set:{replies:commentThread.replies}}).
        exec(function (err,saveComment) {
        if(err){
            res.json(404,{msg:'Failed to update CommentThread.'});
        }else {
            res.json({msg:'success'});
            console.log(commentThread);
        }
    });
}

//获取评论用户名
function generateRandomUsername(){
    var users = ["东方不败","任我行","老曹","诸葛孔明","张飞","赵云"];
    return users[Math.floor((Math.random()*5))];
}