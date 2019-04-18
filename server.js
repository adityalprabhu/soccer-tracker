var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

require('./data/db')();

var app = express();

app.use(session({
                  resave: false,
                  saveUninitialized: true,
                  secret: 'any string'
                }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin",
             "*");
  res.header("Access-Control-Allow-Headers",
             "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods",
             "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// app.get("https://api-football-v1.p.rapidapi.com/seasons")
//   .header("X-RapidAPI-Key", "2c4a4fc99amshe50fdd337dd7144p16d624jsn64cd58af65a9)")
//   .header("Accept", "application/json")
//   .end(function (result) {
//     console.log(result.status, result.headers, result.body);
//   });

const commentsService = require('./services/comments.service.server');
const dbService = require('./services/db.service.server');

commentsService(app);
dbService(app);

app.listen(process.env.PORT || 3000);
