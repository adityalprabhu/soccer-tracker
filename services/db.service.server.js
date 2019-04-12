const dao = require('../daos/comments.dao.server');

module.exports = app => {
  populateDatabase = (req, res) =>
  res.json(dao.populateDatabase());

  truncateDatabase = (req, res) =>
  res.json(dao.truncateDatabase());

  // findStudentById = (req, res) =>
  //     res.json(
  //         studentDao.findStudentById(req.params.studentId)
  //     );
  //
  // deleteStudent = (req, res) =>
  //     res.json(
  //         studentDao.deleteStudent(req.params.studentId)
  //     );
  //
  // updateStudent = (req, res) =>
  //     res.json(
  //         studentDao.updateStudent(req.params.studentId, req.body)
  //     );
  //
  // app.put('/api/student/:studentId', updateStudent)
  // app.delete('/api/student/:studentId', deleteStudent)
  // app.get('/api/student/:studentId', findStudentById)
  app.post('/api/populate', populateDatabase);
  app.delete('/api/all', truncateDatabase)
};
