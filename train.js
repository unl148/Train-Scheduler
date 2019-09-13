// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAOtfGU4fxQFaAgAbhvc8xqluQamyUB0eo",
    authDomain: "first-pro-4dd25.firebaseapp.com",
    databaseURL: "https://first-pro-4dd25.firebaseio.com",
    projectId: "first-pro-4dd25",
    storageBucket: "",
    messagingSenderId: "464117412714",
    appId: "1:464117412714:web:62263cb7b5ee5702376b13"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Assign a variable to firebse db
var db = firebase.database();

// function to submit data
$("#submit").on("click", function () {
    var trainName = $("#train-name").val();
    var destination = $("#destination").val();
    var frequency = $("#frequency").val();
    var firstArrival = $("#first-arrival").val();
    //console.log(trainName + destination+frequency+firstArrival);

    db.ref().push({
        trainNameDB: trainName,
        destinationDB: destination,
        frequencyDB: frequency,
        firstArrivalDB: firstArrival,
    });  //end db push

}); // end submit click

// function database ref on new child added

db.ref().on("child_added", function (snaps) {
    
    var firstTimeConverted = moment(snaps.val().firstArrivalDB, "HH:mm").subtract(1, "years");
    // Current Time
    var currentTime = moment();
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // Time apart (remainder)
    var tRemainder = diffTime % snaps.val().frequencyDB;
    // Minute Until Train
    var tMinutesTillTrain = snaps.val().frequencyDB - tRemainder;
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    var newRow = $("<tr>");
    newRow.append("<td>" + snaps.val().trainNameDB + "</td>");
    newRow.append("<td>" + snaps.val().destinationDB + "</td>");
    newRow.append("<td>" + snaps.val().frequencyDB + "</td>");
    newRow.append("<td>" + nextTrain.format("HH:mm") + "</td>");
    newRow.append("<td>" + tMinutesTillTrain + "</td>");
   // console.log(snaps);
    $(".table").append(newRow);
})

