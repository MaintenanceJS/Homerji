var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mongo');
var path = require('path');
var partial = require('express-partial'); //requires npm install
var cookieParser = require('cookie-parser'); //requires npm install
var session = require('express-session'); //requires npm install
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var worker = db.worker;
var mongoose = require('mongoose');
// import express from 'express';
// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import App from '../react-client/src/index';
var multer = require("multer");
var cloudinary = require("cloudinary");
var cloudinaryStorage = require("multer-storage-cloudinary");




var client = db.client;


//use express
var app = express();

//app.use(partial());

//body parser
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json());

//cookies and session
app.use(cookieParser('shhhh, very secret'));
app.use(session({
  // secret: 'shhh, it\'s a secret',
  // resave: true,
  // saveUninitialized: true,
  // cookie: { path: '/', httpOnly: true, secure: false, maxAge: 60000 }
  secret: 'shhh, it\'s a secret',
  resave: false,
  saveUninitialized: true
}));

//connect to react
app.use(express.static(__dirname + '/../react-client/dist'));

//request functions
app.get('/workers', function (req, res) {
  db.selectAll(function (err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});
//to not get 404 error when reload page( redirect to index.html when reload )
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../react-client/dist', 'index.html'));
});

//majors
app.post('/majors', function (req, res) {
  //req.params.something
  // console.log(req.body.major, 'majorssss')
  db.selectAllMajors(req.body.major, function (err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

//names
app.post('/name', function (req, res) {
  var name = req.body.name;
  db.selectAllNames(name, function (err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/userissue', function (req, res) {
  console.log(req.body)
  var newClient = new client({
    name: req.body.name,
    phonenumber: req.body.phonenumber,
    issue: req.body.issue,
    latitude: req.body.latitude,
    longtitude: req.body.latitude
  })
  newClient.save()
    .then(function () {
      console.log('saved')
      res.status(200).send()
    })
});


//add an item to dataBase
var manualAddingToDB = function () {
  var y = new client({
    _id: new mongoose.Types.ObjectId(),
    name: 'jaa2e3',
    phonenumber: 123,
    issue: 'jo3aan',
    latitude: 19,
    longtitude: 15
  });
  y.save(function (err) {
    if (err) { return err }
    x = new worker({
      name: 'Name',
      major: 'Major',
      rating: 0,
      email: 'test@tester.com',
      username: 'TEST',
      password: '123',
      description: 'testing',
      availability: "yes",
      phonenumber: 1111111,
      ratingCount: 0,
      client: y._id
    })
    x.save()
      .then(function () {
        console.log('worker is saved in database, in signupWorker')
      })
  })
}


//signup functions
var signupWorker = function (req, res) {
  // console.log('you are at signupWorker in server index.js')
  var name = req.body.name;
  var major = req.body.major;
  var rating = req.body.rating;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var description = req.body.description;
  var availability = req.body.availability;
  var phonenumber = req.body.phonenumber;
  var hash = bcrypt.hashSync(password);

  db.selectAllUsernames(username, req, res, function (err, found) {
    if (err) { res.sendStatus(500) }; //only for unpredictable errors

    if (found) {
      if (found.length > 0) {
        res.send('Account already exists, please try another username');
      } else {
        console.log("empty found array")
        var newWorker = new worker({
          name: name,
          major: major,
          rating: rating,
          email: email,
          username: username,
          password: hash,
          description: description,
          availability: availability,
          phonenumber: phonenumber,
          ratingCount: 1,
          client: []
        })
        newWorker.save()
          .then(function () {
            console.log('saved')
            createSession(req, res, newWorker)
            res.status(200).send()
          })
      }
    }
  })
};

//login functions
var loginUser = function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  db.selectAllUsernames(username, req, res, function (err, found) {
    if (err) { //only for unpredictable errors
      res.sendStatus(500)
      return err
    } else {
      if (found.length === 0) {
        console.log("Username doesn't exist");
        res.status(404).json('');
      } else {
        var item = found[0].password
        comparePassword(password, item, function (match) {
          if (match) {
            res.setHeader('Content-Type', 'application/json');
            createSession(req, res, found[0]);
          } else {
            console.log('wrong password or username')
            res.status(404).json("");
          }
        })
      }
    }
  })
};


//create a session function
var createSession = function (req, res, newUser) {
  console.log("before regenerate", 'req.session', req.session)
  req.session.regenerate(function (err) {
    if (err) { return err }
    req.session.userID = newUser._id;
    console.log("in generator of session", "req.cookies", req.cookies)
    console.log("in generator of session", 'req.session', req.session)
    //callback(true)
    res.json('');
  });
};

//destroy a session function
var logoutUser = function (req, res) {
  console.log("before", req.session)
  req.session.destroy(function () {
    //res.redirect('/');
    res.status(200).send()
  });
  console.log("after", req.session)
};

//password functions
var comparePassword = function (attemptedPassword, hashed, callback) {
  bcrypt.compare(attemptedPassword, hashed, function (err, isMatch) {
    callback(isMatch);
  });
}
var hashPassword = function () {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.get('password'), null, null).bind(this)
    .then(function (hash) {
      this.set('password', hash);
    });
}

//edit rating
var rating = function (req, res) {
  var newRating = Number(req.body.rating);
  var username = req.body.username;
  db.selectAllUsernames(username, req, res, function (err, found) {
    if (!found) { res.status(500).send() }
    if (found.length === 0) { res.status(401).send() }
    if (found.length !== 0) {
      var count = found[0].ratingCount;
      var rate = found[0].rating;
      var ratio = count * rate;
      var newCount = count + 1;
      var result = (newRating + ratio) / newCount
      db.updateRating(username, result, function () {
        return
      })
      db.updateRatingCount(username, newCount, function () {
        return
      })
      res.status(200).send('')
    }
  })
}

var edting = function (req, res) {
  var username = req.body.username
  var name = req.body.name
  var major = req.body.major
  var email = req.body.email
  var password = req.body.password
  var description = req.body.description
  var phonenumber = Number(req.body.phonenumber)
  var availability = req.body.availability
  var hash = bcrypt.hashSync(password);

  db.selectAllUsernames(username, req, res, function (err, found) {
    console.log(found)
    db.updateName(username, name, function () {
      return
    })
    db.updateMajor(username, major, function () {
      return
    })
    db.updateEmail(username, email, function () {
      return
    })
    db.updatePassword(username, hash, function () {
      return
    })
    db.updateDescription(username, description, function () {
      return
    })
    db.updatePhonenumber(username, phonenumber, function () {
      return
    })
    db.updateAvailability(username, availability, function () {
      return
    })
  })
  res.status(200).send('')
}

var newClient = function (req, res) {
  var workerUsername = req.body.workerUsername
  var name = req.body.clientName
  var phonenumber = Number(req.body.phonenumber)
  var issue = req.body.issue
  var latitude = Number(req.body.latitude)
  var longtitude = Number(req.body.longtitude)

  var requester = new client({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    phonenumber: phonenumber,
    issue: issue,
    latitude: latitude,
    longtitude: longtitude
  });
  requester.save(function (err) {
    if (err) return handleError(err);
    console.log('requester is saved', requester)
    db.updateClient(workerUsername, requester._id, function () {
      return
    })
  })
  res.status(200).send()
}

//signup 
//app.get('/signup', signupUserForm);
app.post('/signup', signupWorker);
app.post('/login', loginUser);
app.post('/logout', logoutUser);
app.get('/add', manualAddingToDB);
app.get('/test', function (req, res) {
  console.log(req.session)
  if (!req.session.userID) {
    res.status(401).send()
  } else {
    res.status(200).send()
  }
});
app.post('/rating', rating);
app.post('/edit', edting);
app.post('/newClient', newClient);


// app.get('/Gardener', function(req, res) {
//   console.log('isa')
//   res.json('')
// });
// app.get('/:majors(Gardener|Carpenter|article3)?', function(req, res) {
//   console.log('isa')
//   res.json('')
// });


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "demo",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
});
const parser = multer({ storage: storage });

app.post('/api/images', parser.single("image"), (req, res) => {
  console.log(req.file) // to see what is returned to you
  const image = {};
  image.url = req.file.url;
  image.id = req.file.public_id;
  Image.create(image) // save image information in database
    .then(newImage => res.json(newImage))
    .catch(err => console.log(err));
});



//listen to local host
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('listening on port 3000!');
});



//cloudinary.uploader.upload("sample.jpg", {"crop":"limit","tags":"samples","width":3000,"height":2000}, function(result) { console.log(result) });







