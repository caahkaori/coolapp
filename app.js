//jshint esversion:6

const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const ejs = require("ejs");
const mongoose = require("mongoose");


const app = express();

mongoose.connect("mongodb://localhost:27017/votes", {
  useNewUrlParser: true
});

const votesSchema = {
  name: String,
  votes: Number
};

const Vote = mongoose.model("Vote", votesSchema);



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

  Vote.find({}, function(err, foundNames){
   res.render("game", {players: foundNames});

 });
});


 app.get("/results", function(req, res){

   Vote
      .find({})
      .sort({"votes" : -1})
      // .limit(1)
      .exec(function(err, foundVotes){

     if(err){
       console.log(err);
     }else{

          res.render("results", {players: foundVotes, votes: foundVotes});

     }

   });

 });

app.post("/enter", function(req, res) {

  const playerName = req.body.player;

  const vote = new Vote({
    name: playerName,
    votes: 0
  });

  vote.save()






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


  const clicks =  req.body.clickMe
  Vote.findOneAndUpdate({_id: clicks}, {$inc:{votes: 1 }}, function(err){
    if (err) {
  console.log("Something wrong when updating data!");
  console.log(clicks);

}else{
  console.log("Sucess");
}
      res.redirect("/results");
    });

        });

app.post("/results", function(req, res){

  Vote.updateMany({},{votes:0}, function(err, foundList){
    if(!err){
      res.redirect("/game");
}
});
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
