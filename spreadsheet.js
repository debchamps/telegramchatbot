var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');

// Create a document object using the ID of the spreadsheet - obtained from its URL.
var doc = new GoogleSpreadsheet('1qVEI6QQ4Eur3PvEI6KM6pYKLFNOVwaVmtsDVKHv5x-A');

// Authenticate with the Google Spreadsheets API.


exports.addEmail = function(name, email) {
  doc.useServiceAccountAuth(creds, function (err) {

    var data = {
      'name' : name,
      'email' : email
    };

    doc.addRow(1, data, function(err, rows) {
      console.log(rows);
    });

  });

}
