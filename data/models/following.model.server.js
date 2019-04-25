const mongoose = require('mongoose');
const followingSchema = require('./following.schema.server');
const followingModel = mongoose.model('FollowingModel', followingSchema);
module.exports = followingModel;
