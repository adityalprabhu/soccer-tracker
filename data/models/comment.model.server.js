const mongoose = require('mongoose');
const commentsSchema = require('./comment.schema.server');
const commentsModel = mongoose.model('CommentModel', commentsSchema);
module.exports = commentsModel;
