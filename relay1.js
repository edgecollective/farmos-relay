var fs = require("fs");
const hostname = 'localhost';
var port = 1337;
var express = require("express");
var request = require('request');

var app = express();
app.use(express.static(__dirname + "/public")); //use static files in ROOT/public folder




app.get("/", function(req, response){ //root dir

    response.send("Hello!!");

    console.log(req.query.temp);

request.post(
    'https://wolfesneck.farmos.net/farm/sensor/listener/834c74e03901cd1702c0a3060803f767?private_key=bfe468dc77b5530d65319b67cc39cdbc',
    { json: { 'temp': req.query.temp } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
);





});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
//app.listen(port, hostname);


