const mongoose = require('mongoose');

const teamSchema = mongoose.Schema
({
  _id: {type: Number, required: true},
  name: String,
  goalkeepers: [{type: String}],
  strikers: [{type: String}],
  midfielders: [{type: String}],
  defenders: [{type: String}],
  subs: [{type: String}],
  manager: {type: mongoose.Schema.Types.Number, ref: 'UserModel'},
}, {collection: 'team'});

module.exports = teamSchema;
