var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mongo');

var app = express();

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());


app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/workers', function (req, res) {
  db.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/name', function (req, res) {
	var name = req.body.name
  db.find(name, function(err, data) {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send(data)
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

