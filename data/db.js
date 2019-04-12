module.exports = function () {
  const mongoose = require('mongoose');
  const databaseName = 'soccer-tracker';
  var   connectionString = 'mongodb://localhost/';
  // var   connectionString = 'mongodb://heroku_kjcxnp96:n1td8eecph3t0vo4oo8cvqa6ep@ds133556.mlab.com:33556/heroku_kjcxnp96';


  connectionString += databaseName;
  mongoose.connect(connectionString);
};
