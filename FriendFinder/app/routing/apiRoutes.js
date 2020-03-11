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
        

        //friend.push(newFriend);

        console.log("Posting to api: " + JSON.stringify(newFriend));

        res.json(newFriend);

        //=============================================================
        // Find a match
        //=============================================================

        let userScore;
        let eachFriend;
        let eachFriendScore;
        let resultArray= [];
        let result;
        
        function addEmUp (total, num) {
            return total + num;
          };
        

        // Loop through friend objects in friends array.
        for(let i = 0; i < friend.length; i++) {

            eachFriend = friend[i];
            //let difference = 0;
            friend[i].calculatedDifferenceArray = [];
            // Loop through friends scores.
            for(let n = 0; n < 10; n++) {

                userScore = newFriend.scores[n];
                eachFriendScore = eachFriend.scores[n];

                // Find the difference between each friend score.
                let difference = Math.abs(parseInt(userScore) - parseInt(eachFriendScore));
                // throw the each difference into a "calculated array" to later add
                friend[i].calculatedDifferenceArray.push(difference);
                
                
    
            }; // END OF 'scores' for loop

            sumOfDifference = friend[i].calculatedDifferenceArray.reduce(addEmUp);
            // Console.log each firend objects difference
            console.log(friend[i].calculatedDifferenceArray);
            //console.log the sum of each friends difference with helper function 'addEmUp'
            console.log(parseInt(sumOfDifference) + " " + friend[i].name);
            resultArray.push(sumOfDifference);
            
            console.log("resultArray: " + resultArray);
            // Need to somehow find the lowest value in the Array and the name and photo associated with it
            result = Math.min(resultArray);
            console.log(result) // returning as not a number. DAMNIT!
            // Some kind of conditional to find lowest sum




        }; // END OF 'friend' for loop

        
    }); // END OF 'post' function

}; // END OF 'module'