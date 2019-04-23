const mongoose = require('mongoose');

const commentsModel = require('../data/models/comment.model.server');
const userModel = require('../data/models/user.model.server');

truncateDatabase = () =>
  // commentsModel.remove();

  userModel.countDocuments().then(
    response => {

      // Only drop if it has any records
      if (response !== 0) {
        mongoose.connection.collections['user'].drop();
      }
    }
  );

populateDatabase = () => {

  // const comments = [
  //   {
  //     userId: 1,
  //     username: 'John',
  //     comment: 'This is a comment!'
  //   },
  //   {
  //     userId: 2,
  //     username: 'Jane',
  //     comment: 'This is another comment!'
  //   },
  //   {
  //     userId: 3,
  //     username: 'Alice',
  //     comment: 'This is yet another comment!'
  //   }
  // ];
  // return commentsModel.insertMany(comments)

  const users = [
    {
      _id: 1,
      email: 'test',
      password: 'test',
      firstName: 'Hassan',
      lastName: 'K',
      manager: true,
      teams: ['529', '42', '34', '40', '85']
    },
    {
      _id: 2,
      email: 't',
      password: 't',
      firstName: 'Gabe',
      lastName: 'B',
      manager: true,
      teams: ['170', '42', '80', '40', '50', '537']
    },
    {
      _id: 3,
      email: 'adi',
      password: 'adi',
      firstName: 'Aditya',
      lastName: 'P',
      manager: false,
      teams: ['42', '80', '40', '50', '728']
    }
  ];

  return userModel.insertMany(users);

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

findUserByTeam = (teamId) =>
  userModel.find({$or: [{favoriteTeam: teamId}, {teams: teamId}]});



createComment = comment =>
  commentsModel.create(comment);

findAllComments = () => commentsModel.find();

findCommentsById = commentId => commentsModel.findById(commentId);

deleteComment = commentId =>
  commentsModel.remove({_id: commentId});

module.exports = {
  truncateDatabase,
  populateDatabase,
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
  createComment,
  findUserByTeam

};
