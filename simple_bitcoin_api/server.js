const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
var axios = require("axios");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});



app.post("/", function(req, res){

    var crypto = req.body.crypto;
    var fiat = req.body.fiat;

    var baseURL = "https://api.nomics.com/v1/currencies/ticker?key=example_key";

    var finalURL = baseURL + "&interval=1h&convert=" + fiat;


    request(finalURL, function(error, response, body){
      var data = JSON.parse(body);
      var price = data[0].price;

      var currentDate = data[0].price_timestamp;

      res.write("<p>The current Date is " + currentDate + "</p>");

      res.write("<h1>The current price of " + crypto + " is " + price + " " + fiat + "</h1>");

      res.send();
    });
});

app.listen(3000, function(){
  console.log(" Server is running.");
});
