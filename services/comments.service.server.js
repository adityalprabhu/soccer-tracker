const commentsDao = require('../daos/db.dao.server');

module.exports = app => {
  createComment = (req, res) =>
  commentsDao.createComment(req.body)
    .then(data => res.json(data));

  findAllComments = (req, res) =>
  commentsDao.findAllComments()
    .then(data => res.json(data));

  findCommentsById = (req, res) =>
  commentsDao.findCommentsById(req.params.id)
    .then(data => res.json(data));

  deleteComment = (req, res) =>
  commentsDao.deleteComment(req.params.id)
    .then(data => res.json(data));

  app.post('/api/comment', findAllComments);
  app.post('/api/comment', createComment);
  app.post('/api/comment/:id', findCommentsById);
  app.delete('/api/comment/:id', deleteComment);
};
