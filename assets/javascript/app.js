var config = {
    apiKey: "AIzaSyAjKb2BMs1vJjvqeGFzAlM8Mo-CJIBp1hU",
    authDomain: "trainmane.firebaseapp.com",
    databaseURL: "https://trainmane.firebaseio.com",
    projectId: "trainmane",
    storageBucket: "https://trainmane.firebaseio.com",
    messagingSenderId: "908932599272",
    appId: "1:908932599272:web:c3e825c57388e7c2"
  };

  firebase.initializeApp(config);

  let database = firebase.database();

  let name = "";
  let destination = "";
  let time = "";
  let reccurence = "";

  $("#submit-train").on("click", function(){
      event.preventDefault();
      name = $("#train-name").val().trim();
      destination = $("#destination").val().trim();
      time = moment($("#first-train").val().trim(), "HH:mm").subtract(1, "years").format("X");
      reccurence = $("#frequency").val().trim();

      database.ref().push({
          name,
          destination,
          time,
          reccurence
      });

      $("#train-name").val("");
      $("#destination").val("");
      $("#first-train").val("");
      $("#frequency").val("");
  
    });

    database.ref().on("child_added", function(snapshot){
        $("#train-name").text(snapshot.val().name)
        $("#destination").text(snapshot.val().destination)
        $("#first-train").text(snapshot.val().time)
        $("#frequency").text(snapshot.val().reccurence)

        let nameVal = snapshot.val().name;
        let destVal = snapshot.val().name;
        let timeVal = snapshot.val().name;
        let reccVal = snapshot.val().reccurence;

        let remainder = moment().diff(moment(time,"X"),"minutes") % reccurence;
        let minutes = reccurence - remainder;
        let arrival = moment().add(minutes,"minutes").format("hh:mm A")
        let newTr = $("<tr>")
        newTr.html(`<td>${nameVal}</td><td>${destVal}</td><td>${reccVal}</td><td>${arrival}</td><td>${minutes}</td>`)
        $("#main-holder").append(newTr)
    
    })
