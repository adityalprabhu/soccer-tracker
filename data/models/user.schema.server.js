const mongoose = require('mongoose');
const userSchema = mongoose.Schema
({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  manager: Boolean,
  teams: [{type: String}]
}, {collection: 'user'});
module.exports = userSchema;
