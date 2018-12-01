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

app.use(partial());

//body parser
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json());

//connect to react
app.use(express.static(__dirname + '/../react-client/dist'));

//cookies and sessions
app.use(cookieParser('shhhh, very secret'));
app.use(session({
  secret: 'shhh, it\'s a secret',
  resave: true,
  saveUninitialized: true,
}));

//request functions
app.get('/workers', function (req, res) {
  db.selectAll(function (err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
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
    phonenumber: 1111111
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

  db.selectAllUsernames(username, function (err, found) {
    if (err) { res.sendStatus(404) }; //only for unpredictable errors

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
          phonenumber: phonenumber
        })
        newWorker.save()
          .then(function () {
            console.log('saved')
            createSession(req, res, newWorker)
            res.send()
          })
      }
    }
  })
};

//login functions
var loginUser = function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  db.selectAllUsernames(username, function (err, found) {
    if (err) { res.sendStatus(404) }; //only for unpredictable errors

    if (found) {
      if (found.length === 0) {
        console.log("Username doesn't exist");
        res.send('Account already exists, please try another username');
      } else {
        var item = found[0].password
        comparePassword(password, item, function (match) {
          if (match) {
            res.setHeader('Content-Type', 'application/json');
            createSession(req, res, found[0]);
            res.send()
          } else {
            res.send('wrong password', item);
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
  req.session.destroy(function () {
    res.redirect('/');
  });
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

//signup 
//app.get('/signup', signupUserForm);
app.post('/signup', signupWorker);
app.post('/login', loginUser);
app.get('/add', manualAddingToDB);
app.get('/logout', logoutUser);
app.get('/test', function (req, res) {
  console.log(req.session)
  res.end()
});


//listen to local host
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('listening on port 3000!');
});











