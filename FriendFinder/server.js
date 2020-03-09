// from class activity

const express = require("express")

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "survey.html"));
});
