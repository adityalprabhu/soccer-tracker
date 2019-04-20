module.exports = function () {
  const mongoose = require('mongoose');
  //const databaseName = 'soccer-tracker';
  //var connectionString = 'mongodb://localhost/';
  let connectionString = 'mongodb://heroku_0jq6t1kc:i6fk3gthkdp5mqlknvf8dcj9kp@ds145356.mlab.com:45356/heroku_0jq6t1kc';

  //connectionString += databaseName;
  mongoose.connect(connectionString);
};
