const dao = require('../daos/db.dao.server');

module.exports = app => {

  // app.post('/api/logout', logout);
  // app.get('/api/profile', profile);
  // app.post('/api/login', login);



  function register(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var fname = req.body.firstName;
    var lname = req.body.lastName;
    var manager = req.body.manager;
    var id = req.body._id;

    if (email == null || password == null || fname == null || lname == null){
      return null;
    }

    var newUser = {
      _id: id,
      email: email,
      password: password,
      firstName: fname,
      lastName: lname,
      manager: manager
    };
    dao.findUserByEmail(newUser.email)
      .then(function (user) {
        if (!user) {
          return dao.register(newUser);
        }
      })
      .then(function (user) {
        req.session['currentUser'] = user;
        res.send(user);
      });
  }


  function getLoggedInUser(req, res){
    if(req.session['currentUser']){
      res.send(req.session['currentUser']);

    }else{
      res.send(null);
    }

  }

  function deleteUser(req, res){
    dao.deleteUser(req.params['uid'])
      .then(response =>
        res.send(response)
      )
  }

  function logout(req, res) {
    req.session.cookie.expires = new Date().getTime();
    req.session.destroy();
    res.send({status: "Logged out"});
  }

  function login(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    dao.findUserByCredentials(email, password)
      .then(function (user) {
        if(user) {
          req.session['currentUser'] = user;
          res.send(user);
        } else {
          res.send(null);}});
  }

  function updateUser(req, res) {
    dao.updateUser(req.params['uid'], req.body)
      .then(response => {
        res.json(response);
      });

    // must update session aswell
    req.session['currentUser'] = req.body;
  }

  function findUserById(req, res) {
    dao.findUserById(req.params['uid'])
      .then(response => {
        res.json(response)
      });
  }

  app.put('/api/user/:uid', updateUser);
  app.post('/api/register', register);
  app.post('/api/currentUser', getLoggedInUser);
  app.post('/api/logout', logout);
  app.post('/api/login', login);
  app.post('/api/user/:uid', findUserById);
  app.post('/api/user/:uid/delete', deleteUser);
};

