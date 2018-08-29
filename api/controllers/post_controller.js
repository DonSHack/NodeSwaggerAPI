'use strict';
var Post = require('../models/post_model');

var postController = module.exports = {}


postController.index = (req,res) => {
    Post.find({},(err,data)=>{
        if(err ==null || err == undefined){
            res.send(data);
        }else{
            res.send(err);
        }
    })
}

postController.create = (req,res) => {
    var data = req.body;
    var currentTime = new Date();
    var post = new Post({
        id:data.id,
        title:data.title,
        post:data.post,
        created_at:currentTime,
        updated_at:currentTime
    })
    post.save((err,data)=>{
        if(err ==null || err == undefined){
            res.send(data);
        }else{
            res.send(err);
        }
    })
    
}

postController.update = (req,res) => {
    var data = req.body;
    var currentTime = new Date();
    var id = parseInt(data.id);
    Post.update({id:id},{title:data.title,updated_at:currentTime},(err,data)=>{
        if(err ==null || err == undefined){
            res.send(data);
        }else{
            res.send(err);
        }
    })
}

postController.delete = (req,res) => {
    var data = req.body;
    var id = parseInt(data.id);
    Post.deleteOne({id:id},(err,data)=>{
        if(err ==null || err == undefined){
            res.send(data);
        }else{
            res.send(err);
        }
    })
}

postController.getOne = (req,res) => {
    var id  = req.swagger.params.id.value;;
    Post.findOne({id:id}, (err,data)=>{
        if((err ==null || err == undefined) && data != null){
            res.send(data);
        }else if(data == null){
            res.send({"message": "there is no record in the database"});
        }else if(err !=null || err != undefined){
            res.send(err);
        }
        
    })
}