const mongoose = require('mongoose');
const logoSchema = mongoose.Schema
({

  teamId: Number,
  leagueId: Number,
  logoUrl: String

 }, {collection: 'logo'});

module.exports = logoSchema;
