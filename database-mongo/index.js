var mongoose = require('mongoose');
mongoose.connect('mongodb://issa:isa123@ds119374.mlab.com:19374/homerji');

var db = mongoose.connection;

db.on('error', function () {
  console.log('mongoose connection error');
});

db.once('open', function () {
  console.log('mongoose connected successfully');
});

var itemSchema = mongoose.Schema({
  name: String,
  major: String,
  rating: Number,
  email: String,
  username: String,
  password: String,
  description: String,
  availability: String,
  phonenumber: Number,
  ratingCount: Number,
  //image: { data: Buffer, contentType: String }
});

var worker = mongoose.model('worker', itemSchema);

var clientSchema = mongoose.Schema({
  name: String,
  phonenumber: Number,
  issue: String,
  latitude: Number,
  longtitude: Number
});

var client = mongoose.model('client', clientSchema);


var selectAll = function (callback) {
  worker.find({}, function (err, items) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

var selectAllNames = function (name, callback) {
  worker.find({ name: name }, function (err, items) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

var selectAllUsernames = function (username, callback) {
  worker.find({ username: username }, function (err, items) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};
var selectAllMajors = function (major, callback) {
  worker.find({ major: major }, function (err, items) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

var updateRating = function(username, newRating, callback) {
  worker.updateOne({ username: username }, { rating: newRating }, function(err, res) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  })
}

var updateRatingCount = function(username, newCount, callback) {
  worker.updateOne({ username: username }, { ratingCount: newCount }, function(err, res) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  })
}

module.exports.worker = worker;
module.exports.client = client;
module.exports.selectAll = selectAll;
module.exports.selectAllNames = selectAllNames;
module.exports.selectAllUsernames = selectAllUsernames;
module.exports.selectAllMajors = selectAllMajors;
module.exports.updateRatingCount = updateRatingCount;
module.exports.updateRating = updateRating;




