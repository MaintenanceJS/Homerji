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
  client: [{ type: mongoose.Schema.Types.ObjectId, ref: 'client' }]
});

var clientSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  phonenumber: Number,
  issue: String,
  latitude: Number,
  longtitude: Number
});

var worker = mongoose.model('worker', itemSchema);
var client = mongoose.model('client', clientSchema);

//select all workers
var selectAll = function (callback) {
  worker.find({}, function (err, items) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

//select all workers with the same name
var selectAllNames = function (name, callback) {
  worker.find({ name: name }, null, {sort: {rating: -1}}, function (err, items) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

//select all workers with the same username (it must be unique)
var selectAllUsernames = function (username, req, res, callback) {
  worker.find({ username: username }, null, {sort: {rating: -1}}, function (err, items) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

//select all worker depending on thier major
var selectAllMajors = function (major, callback) {
  worker.find({ major: major }, null, {sort: {rating: -1}}, function (err, items) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

//update worker rating
var updateRating = function(username, newRating, callback) {
  worker.updateOne({ username: username }, { rating: newRating }, function(err, res) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  })
}

//update profile fields//

var updateName = function(username, newName, callback) {
  worker.updateOne({ username: username }, { name: newName }, function(err, res) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  })
}
var updateMajor = function(username, newMajor, callback) {
  worker.updateOne({ username: username }, { major: newMajor }, function(err, res) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  })
}
var updateEmail = function(username, newEmail, callback) {
  worker.updateOne({ username: username }, { email: newEmail }, function(err, res) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  })
}
var updatePassword = function(username, newPassword, callback) {
  worker.updateOne({ username: username }, { password: newPassword }, function(err, res) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  })
}
var updateDescription = function(username, newDescription, callback) {
  worker.updateOne({ username: username }, { description: newDescription }, function(err, res) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  })
}
var updatePhonenumber = function(username, newPhonenumber, callback) {
  worker.updateOne({ username: username }, { phonenumber: newPhonenumber }, function(err, res) {
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

//to add a new client to worker
var updateClient = function(username, newClient, callback) {
  worker.find({ username: username }, function(err, res) {
    if(err) {
      callback(err, null);
    } else {
      var clientArr = res[0].client
      clientArr.push(newClient);
      worker.updateOne({ username: username }, { client: clientArr }, function(err, res) {
        if(err) {
          callback(err, null);
        } else {
          callback(null, res);
        }
      })
    }
  })  
}

//find clients depending on their id (used in worker profile)
var filterClients = function(user, callback) {
  console.log('in filterClients', user)
  worker.find({ username: user }, function(err, out) {
    if (err) {
      callback(err, null)
    } else {
      client.find({'_id': { $in: out[0].client}}, function(err, docs){
        if (err) {
          callback(err, null)
        } else {
          callback(null, docs)
        } 
      });
    }         
  }) 
}

//when remove a client
var updateClientsArr = function(username, id, callback) {
  console.log('username', username, 'id', id)
  worker.find({ username: username }, function(err, res) {
    console.log('worker find')
    if(err) {
      callback(err, null);
    } else {
      var clientArr = res[0].client
      console.log('clientArr', clientArr)
      for (var i = 0; i < clientArr.length; i++) {
        console.log(String(clientArr[i]), id, clientArr[i] == id)
        if ( clientArr[i] == String(id) ) {
          console.log("will be removed", clientArr[i])
          clientArr.splice(i, 1)
          console.log("after", clientArr)
        }
      }
      worker.updateOne({ username: username }, { client: clientArr }, function(err, data) {
        if(err) {
          callback(err, null);
        } else {
          callback(null, data);
        }
      })
    }
  }) 
}

//if the worker is not available anymore
var updateWorkerAvailability = function(username, newAvailability, callback) {
  worker.updateOne({ username: username }, { availability: newAvailability }, function(err, res) {
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
module.exports.updateName = updateName;
module.exports.updateMajor = updateMajor;
module.exports.updateEmail = updateEmail;
module.exports.updatePassword = updatePassword;
module.exports.updateDescription = updateDescription;
module.exports.updatePhonenumber = updatePhonenumber;
module.exports.updateClient = updateClient;
module.exports.filterClients = filterClients;
module.exports.updateClientsArr = updateClientsArr;
module.exports.updateWorkerAvailability = updateWorkerAvailability;






