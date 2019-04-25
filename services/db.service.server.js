const dao = require('../daos/db.dao.server');
const logoDao = require('../daos/logo.dao.server');

module.exports = app => {

  let populateDatabase = (req, res) => {
    dao.populateDatabase();
    res.send('DB Populated!');
  };

  let truncateDatabase = (req, res) => {
    dao.truncateDatabase();
    res.send("DB Truncated!");
  };

  let findAllUsers = (req, res) => {
    dao.findAllUsers()
      .then(response => res.json(response));
  };

  let findUsersByTeam = (req, res) => {
    dao.findUserByTeam(req.params['tid'])
      .then(response => res.json(response));
  };

  let populateLogos = (req, res) => {
    logoDao.populateLogos();
    res.send("Logos Populated!");
  };

  let findLogoUrlByTeam = (req, res) => {
    logoDao.findLogoUrlByTeam(req.params['tid'])
      .then(response => res.json(response[0]['logoUrl']));
  };

  let findLogoUrlByLeague = (req, res) => {
    logoDao.findLogoUrlByLeague(req.params['lid'])
      .then(response => res.json(response[0]['logoUrl']));
  };

  let truncateLogos = (req, res) => {
    logoDao.truncateLogos();
    res.send("Logos Truncated!");
  };

  let findAllLogos = (req, res) => {
    logoDao.findAllLogos()
      .then(response => res.json(response));
  };


  // Logos
  app.post('/api/logo/team/:tid', findLogoUrlByTeam);
  app.post('/api/logo/league/:lid', findLogoUrlByLeague);
  app.post('/api/populate_logos', populateLogos);
  app.delete('/api/logo/delete', truncateLogos);
  app.post('/api/logo', findAllLogos);

  app.post('/api/populate', populateDatabase);
  app.post('/api/user', findAllUsers);
  app.post('/api/user/team/:tid', findUsersByTeam);
  app.delete('/api/all', truncateDatabase);
};
