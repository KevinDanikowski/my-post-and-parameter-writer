//server.js
'use strict';

// import  dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Param = require('./model/params');
var SocialPost = require('./model/posts');

//create  instances
var app = express();
var router = express.Router();

var port = process.env.API_PORT || 3001;

//db config
var mongoDB = 'mongodb://<user>:<password>@<your url>.mlab.com:<your port>/mernpostwriter';
mongoose.connect(mongoDB, { useMongoClient: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// handling data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// allows CORS with middleware
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//API
router.get('/', function(req, res) {
    res.json({ message: 'API Initialized!'});
});

/****** START: ROUTER FOR PARAMS ******/
router.route('/params')
    .get(function(req, res) {
        Param.find(function(err, params) {
            if (err)
                res.send(err);
            res.json(params)
        });
    })
    .post(function(req, res) {
        var param = new Param();
        param.param = req.body.param;
        param.input = req.body.input;
        param.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Parameter successfully added!' });
        });
    });
router.route('/params/:param_id')
    .put(function(req, res) {
        Param.findById(req.params.param_id, function(err, param){
            if (err)
                res.send(err);
            (req.body.param) ? param.param = req.body.param : null;
            (req.body.input) ? param.input = req.body.input : null;
            param.save(function(err){
                if(err)
                    res.send(err);
                res.json({message: 'Param ' + param.param + ' has been updated'});
            });
        });
    })
    .delete(function(req,res){
        Param.remove({_id: req.params.param_id}, function(err, param){
            if(err)
                res.send(err);
            res.json({message: 'Param has been deleted'});
        });
    });
/******** END: ROUTER FOR PARAMS ********/

/****** START: ROUTER FOR SOCIALPOSTS ******/
router.route('/posts')
    .get(function(req, res) {
        SocialPost.find(function(err, socialPosts) {
            if (err)
                res.send(err);
            res.json(socialPosts)
        });
    })
    .post(function(req, res) {
        var socialPost = new SocialPost();
        //body parser lets us use the req.body
        socialPost.message = req.body.message;
        socialPost.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Post successfully added!' });
        });
    });
router.route('/posts/:socialpost_id')
    .put(function(req, res) {
        SocialPost.findById(req.params.socialpost_id, function(err, socialPost){
            if (err)
                res.send(err);
            (req.body.message) ? socialPost.message = req.body.message : null;
            socialPost.save(function(err){
                if(err)
                    res.send(err);
                res.json({message: 'Post ' + socialPost.message + ' has been updated'});
            });
        });
    })
    .delete(function(req,res){
        SocialPost.remove({_id: req.params.socialpost_id}, function(err, socialPost){
            if(err)
                res.send(err);
            res.json({message: 'Post has been deleted'});
        });
    });
/******** END: ROUTER FOR SOCIALPOSTS ********/

//Use router for API
app.use('/api', router);

//starts the server and listens for requests
app.listen(port, function() {
    console.log(`api running on port ${port}`);
});