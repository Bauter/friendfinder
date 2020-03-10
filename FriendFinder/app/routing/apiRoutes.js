//===================================================================================
// Dependencies
//===================================================================================

const express = require("express");
const path = require("path");
require("../data/friends.js")(friends);

//===================================================================================
// API Routes (as an exported module)
//===================================================================================

module.exports = function(app) {

    app.get("/api/friends", function(reg, res) {
        return res.json(friends);
    });

    app.post("/api/friends", function(reg, res) {

        let newFriend = req.body;

        friends.push(newFriend);

        console.log(newFriend);

        res.json(newFriend);

    });

};