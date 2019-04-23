const mongoose = require('mongoose');
const user = require('./user.schema.server');

const commentsSchema = mongoose.Schema
({
  _id: {type: Number, required: true},
  userId: {type: mongoose.Schema.Types.Number, ref: 'UserModel'},
  leagueId: Number,
  comment: String
}, {collection: 'comment'});

module.exports = commentsSchema;
