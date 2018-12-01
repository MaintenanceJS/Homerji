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

//cookies and sessions
app.use(cookieParser('shhhh, very secret'));
app.use(session({
  secret: 'shhh, it\'s a secret',
  resave: false,
  saveUninitialized: true
}));

//connect to react
app.use(express.static(__dirname + '/../react-client/dist'));

//request functions
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


//add an item to dataBase
var manualAddingToDB = function() {
  var x = new worker({
    name: 'dandoon', 
    major: 'Plumber', 
    rating: '5', 
    email: 'hi@karak.com', 
    username:'firasK', 
    password: 'abc',
    description: '7arreef',
    availability: "true",
    phonenumber: 91827465
  })
  x.save()
  .then(function() {
    console.log('worker is saved in database, in signupWorker')
  })
}


//signup functions
var signupWorker = function(req, res) {
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

  db.selectAllUsernames(res, username, function(err, found) {
    if (err) {res.send('404')}; //only for unpredictable errors

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
        .then(function() {
          console.log('saved')
          createSession(req, res, newWorker)
          res.send('Saved!')
        })
      }
    }
  })
    // .then(function(user) {
    //   if (!user) {
    //     var newUser = new worker({
    //       username: username,
    //       password: password
    //     });
    //     newUser.save()
    //       .then(function(newUser) {
    //         Users.add(newUser);
    //         createSession(req, res, newUser);
    //       });
    //   } else {
    //     console.log('Account already exists');
    //     res.redirect('/signup'); //is to send to this endpoint to find an other username //TODO
    //   }
    // });
};

// var signupUserForm = function(req, res) {
//   res.render('signup'); //////////////TODO
// };

//login functions
var loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  console.log("in loginUser======", username, password)
  db.selectAllUsernames(username, function(err, found) {
    if (err) {res.send('404')}; //only for unpredictable errors

    if (found) {
      console.log("found==========", found[0].password, password)
      if (found.length === 0) {
        console.log("Username doesn't exist");
        res.send('Account already exists, please try another username');
      } else {
        console.log(found, "before error")
        var item = found[0].password 
        comparePassword(password, item,function(match) {
          console.log('match====', match)
          if (match) {
            createSession(req, res, user);
            res.send('')
          } else {
            res.send('wrong password', item);
          }
        })
      }
    }
  })
};



var isLoggedIn = function(req, res) {
  return req.session ? !!req.session.user : false;
};

var checkUser = function(req, res, next) {
  if (!exports.isLoggedIn(req)) {
    res.redirect('/login');
  } else {
    next();
  }
};

//create a session function
var createSession = function(req, res, newUser) {
  console.log("in createSession function")
  return req.session.regenerate(function() {
      req.session.user = newUser;
      res.redirect('/'); ////////////TODO
    });
};
//destroy a session function
var logoutUser = function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login');
  });
};

//password functions
var comparePassword = function(attemptedPassword, hashed,callback) {
  bcrypt.compare(attemptedPassword, hashed, function(err, isMatch) {
    callback(isMatch);
  });
}
var hashPassword = function() {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.get('password'), null, null).bind(this)
    .then(function(hash) {
      this.set('password', hash);
    });
}

//signup 
//app.get('/signup', signupUserForm);
app.post('/signup', signupWorker);
app.post('/login', loginUser);
app.post('/add', manualAddingToDB);

//listen to local host
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('listening on port 3000!');
});

//bcrypt.compareSync("bacon", hash); // true












