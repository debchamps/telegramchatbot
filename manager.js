const spreadsheet = require('./spreadsheet.js');
var Datastore = require('nedb')
  , db = new Datastore();

exports.processMessage = function(msg, callback) {
    //GET the userid.
    //check the latest state of the userID
    //current state START -> ASK_NAME -> ASK_EMAIL -> END

    getCurrentState(msg.from.id, function(err, lastState) {
      console.log("GOT last state " + lastState);
      if(!lastState) {
          //first state.
          console.log('NO last state');
          var data = {
            user : msg.from.id,
            state : "START"
          };
          createState(data)
          callback("Please tell me your name?");
      }  else {
        console.log('last state' + lastState  + " state " + lastState.state);

        if(lastState.state == "START") {
            lastState.name = msg.text;
            lastState.state = "ASK_EMAIL";
            updateState(lastState);
            callback("Please tell me your emailId?");

        } else if(lastState.state == "ASK_EMAIL") {
          lastState.email = msg.text;
          lastState.state = "END";
          updateState(lastState);
          spreadsheet.addEmail(lastState.name, lastState.email);

          callback("Thanks " + lastState.name + " for providing your email ");
        } else if (lastState.state == "END") {
          callback("I had already collected your email. Thanks again for coming back.");

        }
      }
    });

}

function getCurrentState(personId, callback) {
  db.findOne({user:personId}, function(err, doc) {
    if(err) {
      console.log("Unable to find in database because of error " + err);
      callback(null, null);
    } else {
      callback(null, doc);
    }
  })
}


function updateState(state) {
  db.update({user: state.user}, state, function(err) {
    console.log("Unable to update to database because of error " + err);
  });
}

function createState(state) {
  db.insert(state, function(err) {
    console.log("Unable to add to database because of error " + err);
  });
}
