var mongoose = require('mongoose')

const IdSchema = mongoose.Schema
({

  prefix: { type: Number, required: true, index: { unique: true } },
  count: { type: Number, required: true }

}, {collection: 'id'});

module.exports = IdSchema;
