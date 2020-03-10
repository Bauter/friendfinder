//===================================================================================
// Dependencies
//===================================================================================

const express = require("express");
const path = require("path");
//require("./app/data/friends.js");
const friend = require("../data/friends.js")



//===================================================================================
// API Routes (as an exported module)
//===================================================================================

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        return res.json(friend);
    });

    app.post("/api/friends", function(req, res) {

        let newFriend = req.body;

        friend.push(newFriend);

        console.log(newFriend);

        res.json(newFriend);

    });

};