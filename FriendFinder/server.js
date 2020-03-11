//====================================================================
// Dependencies
//====================================================================
const path = require("path")
const express = require("express")
//require("./app/data/friends.js");
//const friendJS = require("../data/friends.js")

//let friends = friendJS.friends
//=====================================================================
// Set up express
//=====================================================================

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.static('app/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//=====================================================================
// Routes
//=====================================================================

require("./app/routing/apiRoutes.js")(app)
require("./app/routing/htmlRoutes.js")(app)


//=====================================================================
//Starts the server to begin listening
//=====================================================================

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});



