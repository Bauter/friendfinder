//===================================================================================
// Dependencies
//===================================================================================

//const express = require("express");
const path = require("path");


//===================================================================================
// HTML Routes (as an exported module)
//===================================================================================

module.exports = function(app) {

    

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public", "home.html"));
    });

    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "../public", "survey.html"));
    });

};