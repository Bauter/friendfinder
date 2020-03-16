# friendfinder
basically a dating app. This full-stack site will take in results from your users' surveys, then compare their answers with those from other users. The app will then display the name and picture of the user with the best overall match.

## Link to project

https://f-finder-bauter.herokuapp.com/

## What you will need

-explanations to follow

1. A code editor, I prefer Visual Studio Code ("https://code.visualstudio.com/").
2. Node.js to run node commands in terminal ("https://nodejs.org/en/download/").
3. '.gitignore' file to write what files you would not like to upload. 
4. NPM packages: 'express' & 'path'.
5. If you choose to utilize it (like I did) Bootstrap-4 framework for html pages. See the 'DOCS' page for more information on how to implement BS4 if its new to you! ("https://getbootstrap.com/").
6. If you wish to host the site to a dynamic server, create an account with 'Heroku' and download the required installation ("www.Heroku.com")

## Lets get set up!

* Create a folder called `FriendFinder`. Inside the folder, organize your directories so it matches the following:

  ```
  FriendFinder
    - .gitignore
    - app
      - data
        - friends.js
      - public
        - home.html
        - survey.html
      - routing
        - apiRoutes.js
        - htmlRoutes.js
    - node_modules
    - package.json
    - server.js
  ```

-Create a 'package.json' file: Open terminal in the root of the project file. Then, first run:

`$ npm init -y`

-then run :

`$ npm i path`

`$ npm i express`

## What should each file look like?

### File 'friends.js'

-You should save your application's data inside of `app/data/friends.js` as an array of objects. Each of these objects should roughly follow the format below.

```json
{
  "name":"Ahmed",
  "photo":"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
  "scores":[
      5,
      1,
      4,
      4,
      5,
      1,
      2,
      5,
      4,
      1
    ]
}
```

-lets name this array of objects 'friends'. Create roughly 10 friend objects inside the array

-Last step, export the array like so: (we will make use of it later)

```
module.exports = friends;

```

### File 'htmlRoutes.js'

-First require the 'path' package and assign to variable 'path':

```
const path = require("path");
```

-Then we need to create and exported callback function we can make use of in our 'server.js' file. We will make use of the path package to create a route for our HTML files.

```
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

```

-Thats all we need to do with 'htmlRoutes.js'

### File 'apiRoutes.js'

-First, we need to require our friend array like so:

```
//===================================================================================
// Dependencies
//===================================================================================

const friend = require("../data/friends.js")

```

-Then we need to create another exported callback function to make use of in 'server.js'. This one gets a bit complicated because we have to write the JS code to determine a best match for the user based on the user input compared to our array of friend objects. Picking the best matched object and returning it to the user (this is done in the "POST" method and can be found under the "Find a Match" header. Take some time to read through and make sense of the code).

```
//===================================================================================
// API Routes (as an exported module)
//===================================================================================

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        return res.json(friend);
    });

    app.post("/api/friends", function(req, res) {

        let newFriend = req.body;
        

        

        console.log("Posting to api: " + JSON.stringify(newFriend));

        //res.json(newFriend);

        //=============================================================
        // Find a match
        //=============================================================

        let userScore;
        let eachFriend;
        let eachFriendScore;
        let resultArray= [];
        let result;
        let bestMatch = [];
        let lowestScore = 100;
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

            // find lowest total diff
            if( sumOfDifference < lowestScore) {
                lowestScore = sumOfDifference;
                console.log("BEST FRIENDS FOREVER")     
                bestMatch = [friend[i].name, friend[i].photo];
            };

            console.log(bestMatch);

        }; // END OF 'friend' for loop.

        res.json(bestMatch);

        friend.push(newFriend);
        
    }); // END OF 'post' function.

}; // END OF 'module'.

```

-Basically, Every friend object compares its scores to the Users, Each difference in score is calculated, then all differences are calculated to find the total difference. With each loop through, the lowest score is assigned to the 'best match'. Every iteration through the loop will calculate the next friend, id their score is lower, 'best match' is updated, if their score is higher, 'best match' doesn't change and the next iteration starts. This is done until all the objects have been looped through. Once thats complete the 'best match' is returned to the USER.


### File 'server.js'

-First we require our express package and assign it to the variable 'express':

```
//====================================================================
// Dependencies
//====================================================================

const express = require("express")

```

-Next we need to set up our express application:

```
//=====================================================================
// Set up express
//=====================================================================

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.static('app/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

```

##### Note:
1. When defining PORT, "8080" works on localhost, but if you plan on making use of an application like "Heroku" use "process.env.PORT ||             8080". This will give Heroku the ability to make use of their own environment.
2. If you plan on writing your OWN CSS, or JS files you will need to insert "app.use(express.static('app/public'));". This will avoid a "MIME" error in which the files are being interpreted as HTML/text opposed to script/styling. ("app/public") refers to the location in the project folder in which these add. files are located in.

-Next we need to set up our routes. We already created our routes in 'apiRoutes.js' and 'htmlRoutes.js'. We now need to "require" these exported call back functions. as we will use the argument ('app') to connect our express application to the functions.

```
//=====================================================================
// Routes
//=====================================================================

require("./app/routing/apiRoutes.js")(app)
require("./app/routing/htmlRoutes.js")(app)


```

-Finally we need to set our server up to start listening.

```
//=====================================================================
//Starts the server to begin listening
//=====================================================================

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});


```

### File 'home.html' and 'survey.html'

-Both these files where created using Bootstrap 4 framework, feel free to use whatever means to create your HTML files

#### 'home.html'

-This HTML file is basically just a large Jumbotron, with a H1 header tag (application title), and 2 buttons. One button takes us to the 'survey.html' page, the other to the logged 'api' page.

#### 'survey.html'

-Survey.html gets a little more complex, mainly because we include script tags at the bottom to write our JS code for how to handle the USER input.

-Start by creating a form, You want to prompt the user for a "Name", "PhotoURL", and 10 questions with answer options 1-5 (1 (strongly disagree), 2, 3 (neutral), 4, 5 (strongly agree)).

-Lastly before we get into the script, create some sort of pop up to display the returned match (since I used 'Bootstrap 4', I went with a 'modal')

##### Inside the script tags in 'survey.html'

-The goal here is to write some code, so that when the user hits the submit button, The values entered by the user are grabbed, used to create a 'newFriend' object, that gets pushed to the 'friends' object array, and then links up with the code in 'apiRoutes' to find and return the best match. Here's what the code looks like:

```
<script>
  
    // JS code goes here for survey values and posting

    //Submit button JS
    $('#submit').on("click", function (event) {
        event.preventDefault();
        
        let q1 = $('#question1').val()
        let q2 = $('#question2').val()
        let q3 = $('#question3').val()
        let q4 = $('#question4').val()
        let q5 = $('#question5').val()
        let q6 = $('#question6').val()
        let q7 = $('#question7').val()
        let q8 = $('#question8').val()
        let q9 = $('#question9').val()
        let q10 = $('#question10').val()

        // Have to create my own validation because Bootstrap validation isn't working....
        // Validation ,IF no values, alert. IF values entered create newFriend object, post to api, find match, and assign attr. to submit button to display modal.
        if ($('#name').val() === "" || $('#photoURL').val() === "" || q1 === "" || q2 === "" || q3 === "" || q4 === "" || q5 === "" || q6 === "" || q7 === "" || q8 === "" || q9 === "" || q10 === "") {
          alert("You need to fill out all the values and answer all the questions!");
        } else {

          $('#survey-div').fadeOut();
          // Create newFriend object and input values from survey
          let newFriend = {
            name: $('#name').val(),
            photo: $('#photoURL').val(),
            scores: [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10]
          };
          // POST to 'api/friends', then use the response data (from JS code for finding match in 'apiRoutes.js') to display in modal
          $.post("/api/friends", newFriend).then(function(data) {
            console.log("survey.html", data);
            $("#matchName").text(data[0]);
            $("#matchPhoto").attr("src", data[1]);
          });

          // give these attr. to submit button to display modal IF values are entered.
          $('#submit').attr({
              "data-toggle":"modal",
               "data-target":"#resultModal"
        });

        };

    });

    // Retake test
    $('#takeItAgainBtn').on("click", function(){
      location.reload();
    });

</script>

```

*Note:

1. There is add. code for the buttons I incorporated into the modal, ("#takeItAgainBtn").
2. User validation has been created, not to allow the USER to create a 'newFriend' object or return a blank result, if all the values have no been entered. This was done because Bootstrap 4's standard user validation proved to be problematic.

### Closing notes

-If you choose to create your own JS script file and/or CSS file, please remember to include the required code in 'server.js' (see note section in server.js).

-If you feel like posting to an application like "heroku" follow these steps:

1. Create a Heroku account (its free!) and download installation files
2. login to Heroku 
3.  in your project root directory, run:

`$ heroku create 'app-name here' `

4. run your normal git commands:

`$ git add . `
`$ git commit -m "saving final changes"`

5. Now instead of pushing to github, push to heroku.

`$ git push heroku master`

6. And thats it, your application should be created, with your files pushed. Navigate tou your heroku 'dashboard' (in browser) to view your application.

## Guidelines for Collaboration ##

-As I am still new to coding, and my initial projects will be used to create a portfolio to show to potential employers, i ask that no modifications are made at this time.

#### However ####

-Any input to improve my coding would be GREATLY appreciated. I am not opposed to the files being pulled for the sake of modifying and using as an example to teach/explain alt. methods, better practice, etc. Again I would ask they not be pushed to the repo to modify the initial document, but instead be sent to me an some alt. way.

--Thank you for taking the time to look over this 'README' file--