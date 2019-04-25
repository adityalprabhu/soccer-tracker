const dao = require('../daos/db.dao.server');

module.exports = app => {

  let findAllFollowings = (req, res) =>
    dao.findAllFollowings()
      .then(response => res.json(response));

  let followUser = (req, res) =>
    dao.followUser(req.body.follower, req.body.following)
      .then(response => res.send(response));

  let unfollowUser = (req, res) =>
    dao.unfollowUser(req.body.follower, req.body.following)
      .then(response => res.send(response));

  let findFollowingsOfUser = (req, res) =>
    dao.findFollowingsOfUser(req.body.follower)
      .then(response => res.send(response));

  let findFollowersOfUser = (req, res) =>
    dao.findFollowersOfUser(req.body.following)
      .then(response => res.send(response));

  app.post('/api/following', findAllFollowings);
  app.post('/api/followUser', followUser);
  app.post('/api/unfollowUser', unfollowUser);
  app.post('/api/findFollowingsOfUser', findFollowingsOfUser);
  app.post('/api/findFollowersOfUser', findFollowersOfUser);
};
