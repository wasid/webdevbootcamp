var express = require('express');

var app = express();

app.get("/", function(req, res){
    res.send("Hi There! Welcome to my Assignment!");
});

app.get("/speak/:animal", function(req, res){
    
    var sounds = {
        pig: "Oink Oink",
        cat: "Meow Meow",
        cow: "Moo Moo",
        dog: "Woof Woof"
    }
    
    var animal = req.params.animal.toLowerCase();
    
    var sound = sounds[animal];
    
    res.send("The "+animal+" says '"+ sound + "'");
    

});

app.get("/repeat/:word/:number", function(req, res){
    var word = req.params.word;
    var number = Number(req.params.number);
    var result = "";
    
    console.log(number);
    
        for (var i = 1; i<=number; i++ ) {
            result += word+" ";
        }
        res.send(result);
});

app.get("*", function(req, res){
    res.send("Route not Available!!! What are you doing with you life???")
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Has Started For Assignment!!!")
});