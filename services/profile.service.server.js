const dao = require('../daos/db.dao.server');

module.exports = app => {

  // app.post('/api/logout', logout);
  // app.get('/api/profile', profile);
  // app.post('/api/login', login);



  function register(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var id = req.body._id
    var fname = req.body.firstName;
    var lname = req.body.lastName;

    var newUser = {
      _id: id,
      email: email,
      password: password,
      firstName: fname,
      lastName: lname,
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
    res.send(req.session['currentUser'])
  }

  function logout(req, res) {
    req.session.destroy();
    res.send(200);
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


  app.post('/api/register', register);
  app.get('/api/currentUser', getLoggedInUser);
  app.post('/api/logout', logout);
  app.post('/api/login', login)
};

