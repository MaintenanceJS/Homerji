var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mongo');
var request = require('request'); //requires npm install
var partial = require('express-partial'); //requires npm install
var cookieParser = require('cookie-parser'); //requires npm install
var session = require('express-session'); //requires npm install
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var multer = require("multer");
//var upload = multer({dest: '/uploads/'})
var cloudinary = require("cloudinary");
var cloudinaryStorage = require("multer-storage-cloudinary");
var path = require("path");

//from Database
var worker = db.worker;
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
  cookie: {secure: false, maxAge: 60000},
  secret: 'shhh, it\'s a secret',
  resave: true,
  saveUninitialized: true
}));

//connect to react
app.use(express.static(__dirname + '/../react-client/dist'));


//get all workers (not used)
app.get('/workers', function (req, res) {
  db.selectAll(function (err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).send(data);
    }
  });
});


//Get all worker depending on major (categories)
app.post('/majors', function (req, res) {
  db.selectAllMajors(req.body.major, function (err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).json(data);
    }
  });
});


//Get all worker depending on name (search bar)
app.post('/name', function (req, res) {
  var name = req.body.name;
  db.selectAllNames(name, function (err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).json(data);
    }
  });
});


//add a client to dataBase (not used)
app.post('/makeclient', function (req, res) {
  console.log('req.body',req.body)
  var newClient = new client({
    name: req.body.name,
    phonenumber: req.body.phonenumber,
    issue: req.body.issue,
    //for the map location
    latitude: req.body.latitude,
    longtitude: req.body.latitude
  })
  newClient.save()
  .then(function() {
    console.log('saved')
    res.status(200).send()
  })
});


//add a worker and a client to dataBase (not used)
var manualAddingToDB = function () {
  var y = new client({ //client schema
    _id: new mongoose.Types.ObjectId(), //for linking the schemas
    name: 'jaa2e3',
    phonenumber: 123,
    issue: 'jo3aan',
    latitude: 19,
    longtitude: 15
  });
  y.save(function(err) {
    if (err) {return err}
    x = new worker({ //worker schema
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
      client: y._id //for linking the schemas
    })
    x.save()
    .then(function () {
      console.log('worker is saved in database, in signupWorker')
    })
  })  
}


//signup function
var signupWorker = function (req, res) {
  console.log('in singups')
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

  db.selectAllUsernames(username, req, res, function(err, found) {
    if (err) {res.sendStatus(500)}; //only for unpredictable errors

    if (found) {
      if (found.length > 0) { //account is not new
        res.status(403).send('Account already exists, please try another username');
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
          ratingCount: 1, //keep it 1 for rating equation
          client: []
        })
        newWorker.save() //save to database
        .then(function() {
          console.log('saved!')
          res.setHeader('Content-Type', 'application/json'); //res should be json
          createSession(req, res, newWorker) //res is from the session function
        })
      }
    }
  })
};


//login function
var loginUser = function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  db.selectAllUsernames(username, req, res, function(err, found) {
    if (err) { //only for unpredictable errors
      res.sendStatus(500)
      return err
    } else {
      if (found.length === 0) {
        console.log("Username doesn't exist");
        res.status(404).json('');
      } else {
        var hashed = found[0].password //hashed password in database
        comparePassword(password, hashed, function(match) {
          if (match) {
            res.setHeader('Content-Type', 'application/json'); //res should be json
            createSession(req, res, found[0])
          } else {
            console.log('wrong password or username')
            res.status(404).json();
          }
        })
      }
    }
  })
};


//create a session function
var createSession = function (req, res, newUser) {
  console.log("before regenerate", 'req.session', req.session)
  var clients = []
  req.session.regenerate(function (err) {
    if (err) { return err }
    req.session.userID = String(newUser._id); //most important section of this function
    req.session.cookie.expires = new Date(Date.now() + 3600000) //a date for expiration
    req.session.cookie.maxAge = 3600000; //a specific time to destroys
    req.session.save(function(err) {
      res.status(200).json(newUser)
      //header is json
      console.log('after save session', req.session)
    })
  });
  
};


//For authentication (not used)
var isLoggedIn = function (username, req, res, callback) {
  db.selectAllUsernames(username, req, res, function(err, found) {
    if (err) { //only for unpredictable errors
      res.sendStatus(500)
      return err
    } else {
      if (found.length === 0) {
        console.log("Username doesn't exist");
        res.status(404).json('');
      } else {
        var itemId = found[0]._id //req ID
        var sessionId = req.session.userID //seassion ID
        if (itemId === sessionId) {
          callback(true)
        } else {
          callback(false)
        }
      }
    }
  })
} 


//destroy session function
var logoutUser = function (req, res) {
  console.log("before", req.session)
  req.session.destroy(function() { //remove session
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

//Edit rating
var rating = function (req, res) {
  var newRating = Number(req.body.rating);
  var username = req.body.username;
  db.selectAllUsernames(username, req, res, function(err, found) { //search for the worker
    if (!found) {res.status(500).send()}
    if (found.length === 0) {res.status(401).send()}
    if (found.length !== 0) {
      //rating equation
      var count = found[0].ratingCount;
      var rate = found[0].rating;
      var ratio = count * rate;
      var newCount = count+1;
      var result = (newRating+ratio) / newCount //new rate
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

//after sign in editing
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

  db.selectAllUsernames(username, req, res, function(err, found) {
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
    db.updateWorkerAvailability(username, availability, function () {
      return
    })  
  })
  res.status(200).json('')
}

//adding a new client to database
var newClient = function (req, res) {
    var workerUsername = req.body.workerUsername
    var name = req.body.clientName
    var phonenumber = Number(req.body.phonenumber)
    var issue = req.body.issue
    //map
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
    console.log('requester', requester)
    requester.save(function (err) { //requester is the client
      if (err) return handleError(err);
      console.log('requester is saved', requester)
      db.updateClient(workerUsername, requester._id, function () { //update client row in worker table
        return
      })
    })
  res.status(200).send()
}

///////////////////
app.post('/signup', signupWorker);
app.post('/login', loginUser);
app.post('/logout', logoutUser);
app.get('/add', manualAddingToDB); //(not used)
app.post('/rating', rating);
app.post('/edit', edting); //edit worker profile
app.post('/newClient', newClient);

//show clients in worker profile
app.post('/show', function (req, res) {
  var arr = [];
  db.filterClients(req.body.username, function(err, data){
    if (err) {
      console.log('err', err)
      //res.sendStatus(500);
    } else {
      console.log('data', data)
      //res.setHeader('Content-Type', 'application/json');
      res.send(data)
    }
  })
});

//to remove client from the worker profile
app.post('/clientedit', function (req, res) {
  db.updateClientsArr(req.body.username, req.body.id, function(err, data) {
    if (err) {
      res.sendStatus(500)
    } else {
      res.sendStatus(200)
    }
  })
});

//to not get 404 error when reload page( redirect to index.html when reload )
app.get('/*', (req, res) => {
 res.sendFile(path.resolve(__dirname, '../react-client/dist', 'index.html'));
});


//listen to local host
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('listening on port 3000!');
});





