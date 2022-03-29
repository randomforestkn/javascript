const express = require("express");
const bodyParser = require("body-parser");
const fetch = require('node-fetch');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [
      {
        "email_address": email,
        "status": "subscribed",
        "merge_fields": {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);


  var options = {
    url: "https://us18.api.mailchimp.com/3.0/lists/90641b8fa3",
    method: "POST",
    headers: {
      "Authorization": "your key"
    },
    body: jsonData
  };

  fetch('https://us18.api.mailchimp.com/3.0/lists/90641b8fa3', {
         method: 'post',
         body:    JSON.stringify(data),
         headers: { "Authorization": "your key" },
     })
     .then(res => res.json())
     .then(json => console.log(json));

     if (res.statusCode == 200) {
       res.sendFile(__dirname + "/success.html");
     } else {
       res.sendFile(__dirname + "/failure.html");
     }
});


app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log(" Server is running on port 3000.");
});
