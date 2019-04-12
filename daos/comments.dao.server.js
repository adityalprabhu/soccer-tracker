const commentsModel = require('../data/models/comments.model.server');

truncateDatabase = () => commentsModel.remove()

populateDatabase = () => {

  const comments = [
    {
      userId: 1,
      username: 'John',
      comment: 'This is a comment!'
    },
    {
      userId: 2,
      username: 'Jane',
      comment: 'This is another comment!'
    },
    {
      userId: 3,
      username: 'Alice',
      comment: 'This is yet another comment!'
    }
  ];
  return commentsModel.insertMany(comments)

};

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
  deleteComment
};
