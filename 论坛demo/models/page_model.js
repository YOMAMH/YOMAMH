/**
 * Created by renminghe on 16/6/17.
 */
//定义评论页面mongoDB模型
var mongoose = require('mongoose'),
    Scheam = mongoose.Schema;
var PageScheam = new Scheam({
    name:{type:String,unique:true},
    commentId:Scheam.ObjectId
});
mongoose.model('Page',PageScheam);