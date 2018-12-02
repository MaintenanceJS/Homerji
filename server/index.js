var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mongo');
var request = require('request'); //requires npm install
var partial = require('express-partial'); //requires npm install
var cookieParser = require('cookie-parser'); //requires npm install
var session = require('express-session'); //requires npm install
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var worker = db.worker;

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
//majors
app.post('/majors', function (req, res) {
  // console.log(req.body.major, 'majorssss')
  db.selectAllMajors(req.body.major, function (err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});
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


//add an item to dataBase
var manualAddingToDB = function () {
  var x = new worker({
    name: 'testName',
    major: 'testMajor',
    rating: 0,
    email: 'test@tester.com',
    username: 'tester',
    password: '123',
    description: 'testing',
    availability: "yes",
    phonenumber: 1111111,
    ratingCount: 0
  })
  x.save()
    .then(function () {
      console.log('worker is saved in database, in signupWorker')
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

  db.selectAllUsernames(username, function(err, found) {
    if (err) {res.sendStatus(500)}; //only for unpredictable errors

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
          ratingCount: 1
        })
        newWorker.save()
        .then(function() {
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
  db.selectAllUsernames(username, function(err, found) {
    if (err) {res.sendStatus(500)}; //only for unpredictable errors

    if (found) {
      if (found.length === 0) {
        console.log("Username doesn't exist");
        res.status(404).send();
      } else {
        var item = found[0].password
        comparePassword(password, item, function (match) {
          if (match) {
            res.setHeader('Content-Type', 'application/json');
            createSession(req, res, found[0]);
            res.status(200).send()
          } else {
            console.log('wrong password or username')
            res.status(404).send();
          }
        })
      }
    }
  })
};


//create a session function
var createSession = function (req, res, newUser) {
  console.log("before regenerate", 'req.session', req.session)
  return req.session.regenerate(function (err) {
    if (err) { return err }
    req.session.userID = newUser._id;
    console.log("in generator of session", "req.cookies", req.cookies)
    console.log("in generator of session", 'req.session', req.session)
    //res.redirect('/'); ////////////TODO
  });
};

//destroy a session function
var logoutUser = function (req, res) {
  console.log("before", req.session)
  req.session.destroy(function() {
    //res.redirect('/');
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
  db.selectAllUsernames(username, function(err, found) {
    if (!found) {res.status(500).send()}
    if (found.length === 0) {res.status(401).send()}
    if (found.length !== 0) {
      var count = found[0].ratingCount;
      var rate = found[0].rating;
      var ratio = count * rate;
      var newCount = count+1;
      var result = (newRating+ratio) / newCount
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

//signup 
//app.get('/signup', signupUserForm);
app.post('/signup', signupWorker);
app.post('/login', loginUser);
app.post('/logout', logoutUser);
app.get('/add', manualAddingToDB);
app.get('/test', function (req, res) {
  console.log(req.session)
  if(!req.session.userID) {
    res.status(401).send()
  } else {
    res.status(200).send()
  }
});
app.post('/rating', rating);


//listen to local host
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('listening on port 3000!');
});











