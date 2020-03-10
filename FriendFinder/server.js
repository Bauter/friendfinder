//====================================================================
// Dependencies
//====================================================================

const express = require("express")
require("../data/friends.js")(friends);
//=====================================================================
// Set up express
//=====================================================================

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//=====================================================================
// Routes
//=====================================================================

require("./app/routing/apiRoutes.js")(app)
require("./app/routing/htmlRoutes")(app)


//=====================================================================
//Starts the server to begin listening
//=====================================================================

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});



