var express = require('express');

var app = express();

app.get("/", function(req, res){
    res.send("Hi There! Welcome to my Assignment!");
});

app.get("/speak/:animal", function(req, res){
    
    var animal = req.params.animal;
    
    var sound = "";
    
    if (animal) {
        
        if (animal === "dog") {
            
            sound += "'woof woof'";
            
        } 
        
        else if(animal === "cat") {
            
            sound += "'Meow Meow!'";
            
        }
        
        else if(animal === "pig") {
            
            sound += "'Oink Oink!'";
            
        } 
        
        else{
            
            res.send("The "+animal+" is not in the list!");
            
        }
        
        res.send("The "+animal+" says "+ sound);
        
    } 
    
    else {
        
        res.send("Wrong Entry!");
        
    }
    
});

app.get("/repeat/:word/:number", function(req, res){
    var word = req.params.word;
    var number = Number(req.params.number);
    
    console.log(number);
    
        for (var i = 1; i<=number; i++ ) {
            res.send(word);
        }
});

app.get("*", function(req, res){
    res.send("Route not Available!!! What are you doing with you life???")
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Has Started For Assignment!!!")
});