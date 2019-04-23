const mongoose = require('mongoose');
const teamSchema = require('./team.schema.server');
const teamModel = mongoose.model('TeamModel', teamSchema);
module.exports = teamModel;
