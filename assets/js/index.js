// var http = require("http");
// var server = http.createServer(function(request, response) {
//     response.writeHead(200, {
//         'Content-Type': 'text/plain'
//     });
//     response.end();
// });
// server.listen(8080);

var firebase = require("firebase");

var config = {
    apiKey: "AIzaSyCeub1Izit-VEtvHBZ3haLhpNxWTZiOAoo",
    authDomain: "akilpo-94d83.firebaseapp.com",
    databaseURL: "https://akilpo-94d83.firebaseio.com",
    projectId: "akilpo-94d83",
    storageBucket: "akilpo-94d83.appspot.com",
    messagingSenderId: "1088161895181"
  };
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

function writeMessage(data) {
  // Get a key for a new Post.
  var newMessageKey = firebase.database().ref().child('messages').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/messages/' + newMessageKey] = data;
  return firebase.database().ref().update(updates);
}

function onLoad() {
  $('#sendMessage').click(function() {
    var $form = $('#messageForm');
    var name = $form.find('input[name="name"]').val();
    var email = $form.find('input[name="email"]').val();
    var room = $form.find('select[name="room"]').val();
    var date = $form.find('input[name="date"]').val();
    var message = $form.find('input[name="message"]').val();

    writeMessage({
      name: name,
      email: email,
      room: room,
      date: date,
      message: message,
      created_at: new Date().getTime(),
    });
  });
}