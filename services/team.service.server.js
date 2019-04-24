const teamDao = require('../daos/team.dao.server');

module.exports = app => {
  createTeam = (req, res) =>
    teamDao.createTeam(req.body)
      .then(data => res.json(data));


  findAllTeams = (req, res) =>
    teamDao.findAllTeams()
      .then(data => res.json(data));

  findTeamById = (req, res) =>
    teamDao.findTeamById(req.params.id)
      .then(data => res.json(data));

  findTeamByManager = (req, res) =>
    teamDao.findTeamByManager(req.params.id)
      .then(data => res.json(data));

  updateTeam = (req, res) =>
    teamDao.updateTeam(req.params.id, req.body)
      .then(data => res.json(data));

  deleteTeam = (req, res) =>
    teamDao.deleteTeam(req.params.id)
      .then(data => res.json(data));


  app.post('/api/team', createTeam);
  app.get('/api/team', findAllTeams);
  app.get('/api/team/:id', findTeamById);
  app.post('/api/team/manager/:id', findTeamByManager);
  app.put('/api/team/:id', updateTeam);
  app.delete('/api/team/:id', deleteTeam);
};




