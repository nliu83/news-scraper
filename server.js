
// Requiring npm packages
var express = require("express");

var exphbs = require("express-handlebars");

var bodyParser = require("body-parser");

var mongoose = require('mongoose');

// Setting port to 3333
var PORT = process.env.PORT || 3333;

var app = express();

var router = express.Router();

require("./routes/routes")(router);

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));

app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(router);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI);

mongoose.connect(MONGODB_URI, function(error) {
    if(error) {
        console.log(error);
    }
    else {
        console.log("mongoose connection successful");
    }
});

app.listen(PORT, function() {
    console.log("Listening on port: " + PORT);
});