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

const commentsService = require('./services/comments.service.server');
const dbService = require('./services/db.service.server');
const profileService = require('./services/profile.service.server');


commentsService(app);
dbService(app);
profileService(app);

app.get('/api/session/set/:name/:value',
  setSession);
app.get('/api/session/get/:name',
  getSession);
app.get('/api/session/get',
  getSessionAll);
app.get('/api/session/reset',
  resetSession);


function setSession(req, res) {
  var name = req.params['name'];
  var value = req.params['value'];
  req.session[name] = value;
  res.send(req.session);
}

function getSession(req, res) {
  var name = req.params['currentUser'];
  res.send(name);
}

function getSessionAll(req, res) {
  res.send(req.session);
}

function resetSession(req, res) {
  req.session.destroy();
  res.send(200);
}

app.listen(process.env.PORT || 5000);
