const mongoose = require('mongoose');

const commentsModel = require('../data/models/comment.model.server');
const userModel = require('../data/models/user.model.server');

const leagues = ['English', 'Spanish', 'French', 'German','Italian'];
const leagues_dict = { 'English':2, 'Spanish':87, 'French':4 , 'German':8, 'Italian':94};

constructor = () => {
  console.log("yellllloo")
};

//////////// User ///////////

register = user =>
  userModel.create(user);

findUserByEmail = email =>
  userModel.findOne({email: email});

updateUser = (userId, user) =>
  userModel.update({_id: userId}, {$set: user});

deleteUser = userId =>
  userModel.remove({_id: userId});

findAllUsers = () =>
  userModel.find();

findUserById = userId =>
  userModel.findById(userId);

findUserByCredentials = (email, password) =>
  userModel.findOne({email: email, password: password});

createComment = comment =>
  commentsModel.create(comment);

findAllComments = () => commentsModel.find();

findCommentsById = commentId => commentsModel.findById(commentId);

deleteComment = commentId =>
  commentsModel.remove({_id: commentId});

module.exports = {
  findAllComments,
  findCommentsById,
  deleteComment,
  register,
  updateUser,
  deleteUser,
  findAllUsers,
  findUserById,
  findUserByCredentials,
  findUserByEmail,
  createComment

};
