const mongoose = require('mongoose');
const logoSchema = require('./logo.schema.server');
const logoModel = mongoose.model('LogoModel', logoSchema);
module.exports = logoModel;
