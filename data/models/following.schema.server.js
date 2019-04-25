const mongoose = require('mongoose');
const followingSchema = mongoose.Schema
({
   follower: {
     ref: 'UserModel',
     type: mongoose.Schema.Types.Number,
   },
   following: {
     ref: 'UserModel',
     type: mongoose.Schema.Types.Number,
   }
 }, {collection: 'following'});
module.exports = followingSchema;
