'use strict';

var mongoose = require('mongoose');
var Schema =mongoose.Schema;


var postSchema = Schema({
    id:{
        type: Number,
        require: true,
        default: 10
    },
    title:{
        type: String,
        require: true,
        default: "Title is not defined"
    },
    post:{
        type: String,
        require: true,
        default: "This is a Sample post edited by API developer"
    },
    created_at:{
        type: Date,
        require: true
    },
    updated_at:{
        type: Date,
        require: true
    }
})

var Post = module.exports = mongoose.model('post', postSchema);