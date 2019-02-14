var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var post = new Schema({	
  content: String,
  datetime: String,
  publish: Boolean,
  postImage: String,
  });

module.exports = mongoose.model('post', post);