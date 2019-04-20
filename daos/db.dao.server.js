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
      email: 'gabe@soccertracker.com',
      password: 'babe',
      firstName: 'Gabe',
      lastName: 'B',
      teams: ['42', '157']
    },

    {
      _id: 2,
      email: 'hk@soccertracker.com',
      password: '12345',
      firstName: 'Hassan',
      lastName: 'K',
      teams: ['529', '32']
    },

    {
      _id: 3,
      email: 'aditya@soccertracker.com',
      password: '0987',
      firstName: 'Aditya',
      lastName: 'P',
      teams: ['34', '165']
    }
  ];

  return userModel.insertMany(users);
};

//////////// User ///////////

createUser = user =>
  userModel.create(user);

updateUser = (userId, user) =>
  userModel.update({_id: userId}, {$set: user});

deleteUser = userId =>
  userId.remove({_id: userId});

findAllUsers = () =>
  userModel.find();

findUserById = userId =>
  userModel.findById(userId);

createComment = comment =>
{
  console.log(comment);
  return commentsModel.create(comment);
};

findAllComments = () =>  commentsModel.find();

findCommentsById = commentId => commentsModel.findById(commentId);

deleteComment = commentId =>
commentsModel.remove({_id: commentId});


module.exports = {
  truncateDatabase,
  populateDatabase,
  createComment,
  findAllComments,
  findCommentsById,
  deleteComment,
  createUser,
  updateUser,
  deleteUser,
  findAllUsers,
  findUserById
};
