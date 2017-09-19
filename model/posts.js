//posts.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SocialPostsSchema = new Schema({
    message: String
});
//Need to add status

module.exports = mongoose.model('SocialPost', SocialPostsSchema);