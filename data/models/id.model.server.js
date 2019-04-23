const mongoose = require('mongoose');
const idSchema = require('./id.schema.server');
const idModel = mongoose.model('IdModel', idSchema);
const moment = require('moment');

var nextId = function (callback) {
  function prefix (date) {
    return parseInt(moment(date).format('YYMMDD'));
  }

  idModel.findOneAndUpdate(
    { prefix: prefix(new Date()) },
    { $inc:   { count: 1 } },
    { upsert: true },
    function (err, idDoc) {
      callback(err, idDoc);
    });
};

module.exports = idModel;
