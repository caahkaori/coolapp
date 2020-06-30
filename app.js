//jshint esversion:6

const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const ejs = require("ejs");
const mongoose = require("mongoose");
const http = require('http').createServer(express);
const io = require('socket.io')(http);


const app = express();

mongoose.connect("mongodb+srv://@cluster0-qqvh0.mongodb.net/votes",{ useNewUrlParser: true });

const votesSchema = {
  name: String,
  votes: 0,
};

const Vote = mongoose.model("Vote", votesSchema);

const sessionSchema = {
  name: votesSchema,
  votes: votesSchema,
}


const Session = mongoose.model("Session", votesSchema);



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
app.get("/host", function(req, res){
  res.render("host");

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
  const sessionID = req.body.session;

  Session.findOne({_id: sessionID}, function(err, foundSessions){

    if(!err){

      if(!foundSessions){
        res.redirect("/enter");

      }else{

        Session.findOneAndUpdate({_id:sessionID}, {name:playerName}, function(err, foundPlayer){

          if (err) {
        console.log("Something wrong when updating data!");
        console.log(foundPlayer);
      }else{
        console.log("Sucess");
        }
        res.redirect("/game/" + sessionID)

      })




    // const vote = new Vote({
    //   name: playerName,
    //   votes: 0
    // });
    //
    // vote.save()
//
//   res.redirect("/game");


};
}
})
});

app.post("/host", function(req, res){

  const partyName = req.body.partyName;
  const playerName = req.body.playerName;

  const vote = new Vote({
    name: playerName,
    votes: 0
  });


    const session = new Session({
      name: playerName,
      votes: 0
    });


  vote.save()
  session.save()

  res.redirect("/game");


})

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


app.get('/game/:sessionID', function(req, res) {

const sessionID = (req.params.sessionID);
Session.find({_id: sessionID}, function(err, foundSession){
  if(err){
    console.log(err);
  }else{



    res.render("game", {players: foundSession, votes: foundSession});



  }



});

// Session.findOne({__id: sessionID}, function(err, foundSession){};
//
//
//
});


app.listen(process.env.PORT || 3000, function(){

  console.log("Server is running on port 3000.");
});
