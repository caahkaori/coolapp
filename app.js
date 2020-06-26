//jshint esversion:6

const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const ejs = require("ejs");
const mongoose = require("mongoose");


const app = express();

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true
});


let players = [];
let votes = [0];




app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res){

  res.sendFile(__dirname + "/index.html");


})

app.get("/enter", function(req, res){
  res.render("enter");

});
app.get("/game", function(req, res){
  res.render("game", {players: players, votes: votes});

});

app.post("/enter", function(req, res) {

  const player = {
    name: req.body.player
  }


  players.push(player);


  // let post = [];
  //
  // let title = req.body.titleBox;
  // let body = req.body.bodyPost;
  //
  // post.push(title);
  // post.push(body);

  res.redirect("/game");
});

app.post("/game", function(req, res) {


  const clicks = {
    clicks: req.body.clickMe
  }


  votes++;







  res.redirect("/game");
});


// if (button.addEventListener("click", function() {
//   var randomNumber1 = Math.floor(Math.random() * 2 + 1)
//
//   var randomCardImage = "card" + randomNumber1 + ".png";
//   var randomImageSource = "images/" + randomCardImage;
//   deck.setAttribute("src", randomImageSource);
//
//   var sound = new Audio ("sounds/mmm-3.wav");
//   var name = prompt("Who do you think?");
//   document.querySelector("#winner").innerHTML = name + '😂';
//
// });






      //
      // const firstName = req.body.firstName;
      // const lastName = req.body.lastName;
      // const email = req.body.email;
      //
      // const data = {
      //   members: [{
      //
      //     email_address: email,
      //     status: "subscribed",
      //     merge_fields:{
      //       FNAME: firstName,
      //       LNAME: lastName
      //     }
      //   }]
      // };
      //
      // const jsonData = JSON.stringify(data);
      // const url = "https://us10.api.mailchimp.com/3.0/lists/016eda49d9";
      // const options = {
      //   method: "POST",
      //   auth: "caroline1:fe00616e0f3f25467141c4574b0e75d7-us10"
      // }
// const request = https.request(url, options, function(response){
//
//
//   if(response.statusCode === 200){
//     res.sendFile(__dirname + "/game.html");
//   }
//   else{
//     res.sendFile(__dirname + "/failure.html")
//   }
//
//   response.on("data", function(data){
//     console.log(JSON.parse(data));
//     console.log();
//   })
//
// request.write(jsonData);
// request.end();


// })
//








// Api Key
// fe00616e0f3f25467141c4574b0e75d7-us10
//unique
// 016eda49d9

app.listen(process.env.PORT || 3000, function(){

  console.log("Server is running on port 3000.");
});
