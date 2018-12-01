var mongoose = require('mongoose');
mongoose.connect('mongodb://issa:isa123@ds119374.mlab.com:19374/homerji');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var itemSchema = mongoose.Schema({
  name: String,
  major: String,
  rating: Number,
  email: String,
  password: String,
  description: String,
  availability: String,
  phonenumber: Number,
  image: { data: Buffer, contentType: String }
});

var worker = mongoose.model('worker', itemSchema);

var selectAll = function(callback) {
  worker.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

var selectAllNames = function(name, callback) {
  worker.find({name: name}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports.selectAll = selectAll;
module.exports.selectAllNames = selectAllNames;