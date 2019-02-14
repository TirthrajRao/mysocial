var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  dob: String,
  profileImage: String,
  coverImage: String,
  friends:[{ type: Schema.Types.ObjectId, ref: 'user' }],
  posts:[{type:Schema.Types.ObjectId, ref: 'post'}],
});

module.exports = mongoose.model('Users', userSchema);