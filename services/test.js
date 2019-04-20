require('../data/db')();
const service = require('./profile.service.server');

const dao = require('../daos/db.dao.server');

// service.register({
//   email: "registertest@test.com",
//   password: "test",
//   firstName: "test",
//   lastName: "test",
// }).then(response => console.log(response));


var newUser = {
  _id: 1000,
  email: "TEST",
  password: "TEST",
};

dao.findUserByEmail("wow")
  .then(function (user) {
    console.log(user)
    if (user === null) {
      return dao.register(newUser);
    }
  }).then(response => console.log(response));
