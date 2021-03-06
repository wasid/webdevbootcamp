var express = require("express");
var app = express();
var request = require('request');

app.set("view engine", "ejs");


app.get("/", function(req, res){
    res.render("search");
});

app.get("/results", function(req, res){
    var searchfor = req.query.movie_name;
    var url = 'http://www.omdbapi.com/?s=';
    request(url + searchfor, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      var persedData = JSON.parse(body);
      if (!error && response.statusCode == 200) {
          res.render("results", {result : persedData});
      }
    });
});




app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Has Started For Movie App!!!")
});