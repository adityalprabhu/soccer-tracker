const dao = require('../daos/db.dao.server');
const logoDao = require('../daos/logo.dao.server');
const https = require('https');
const data = 'hello';

var options = {
  host: 'graph.facebook.com',
  path: 'teams/league/' + 2,
  method: 'GET',
  headers: { 'X-RapidAPI-Key': "2c4a4fc99amshe50fdd337dd7144p16d624jsn64cd58af65a9" }
};



const leagues = ['English', 'Spanish', 'French', 'German','Italian'];
const leagues_dict = { 'English':2, 'Spanish':87, 'French':4 , 'German':8, 'Italian':94};
module.exports = app => {

  let search = (req, res) => {
    https.get(options, (resp) => {

      console.log(this.data);

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        this.data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        console.log(JSON.parse(data));
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
    res.send('Found!');

  };



  let findLogoUrlByLeague = (req, res) => {
    logoDao.findLogoUrlByLeague(req.params['lid'])
      .then(response => res.json(response[0]['logoUrl']));
  };


  app.get('/api/logo/league/:lid', findLogoUrlByLeague);
  app.get('/api/search', findLogoUrlByLeague);

};
