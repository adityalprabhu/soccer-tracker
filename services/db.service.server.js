const dao = require('../daos/db.dao.server');

module.exports = app => {

  let populateDatabase = (req, res) => {
    res.json(dao.populateDatabase());
  };

  let truncateDatabase = (req, res) => {
    dao.truncateDatabase();
    res.send("DB Truncated!");
  };

  let findAllUsers = (req, res) => {
    dao.findAllUsers()
      .then(response => res.json(response));
  }

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
  app.get('/api/user', findAllUsers);
  app.delete('/api/all', truncateDatabase);
};
