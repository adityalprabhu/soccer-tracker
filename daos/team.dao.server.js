const teamModel = require('../data/models/team.model.server');

createTeam = (team) =>
  teamModel.create(team);

findAllTeams = () => teamModel.find();

findTeamById = teamId => teamModel.findById(teamId);

findTeamByManager = teamId => teamModel.find({manager: teamId});

updateTeam = (teamId, team) => {
  console.log(teamId)
  console.log(team)
  return teamModel.update({_id: teamId}, {$set: team});
}


deleteTeam = teamId =>
  teamModel.remove({_id: teamId});


module.exports = {
  createTeam,
  findAllTeams,
  findTeamById,
  findTeamByManager,
  updateTeam,
  deleteTeam
};
