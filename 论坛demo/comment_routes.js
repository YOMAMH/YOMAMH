/**
 * Created by renminghe on 16/6/17.
 */
//主服务器的路由
var express = require('express');
module.exports = function (app) {
    var photos = require('./controllers/photos_controller.js');
    var comments = require('./controllers/comments_controller.js');
    var pages = require('./controllers/pages_controller.js');
    app.use('/static',express.static('./static')).
        use('/images',express.static('./images'));
    app.get('/', function (req,res) {
        res.render('photos');
    });
    app.get('/photos',photos.getPhotos);
    app.get('/photo',photos.getPhoto);
    app.get('/page',pages.getPage);
    app.get('/comments/get',comments.getComment);
    app.post('/comments/add',comments.addComment);
};



























