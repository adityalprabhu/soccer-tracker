const mongoose = require('mongoose');
const commentsSchema = mongoose.Schema({
  _id: String,
  username: String,
  // user: {type: mongoose.Schema.Types.Number, ref: 'UserModel'},
  comment: String
}, {collection: 'comments'});
module.exports = commentsSchema;
