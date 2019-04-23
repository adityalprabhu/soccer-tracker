const mongoose = require('mongoose');
const userSchema = mongoose.Schema
({
   _id: {type: Number, required: true},
   email: String,
   password: String,
   firstName: String,
   lastName: String,
    manager: Boolean,
   teams: [{type: String}]
 }, {collection: 'user'});
module.exports = userSchema;
