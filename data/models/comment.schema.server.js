const mongoose = require('mongoose');
const user = require('./user.schema.server');

const commentsSchema = mongoose.Schema
({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
  leagueId: Number,
  comment: String
}, {collection: 'comment'});

module.exports = commentsSchema;
