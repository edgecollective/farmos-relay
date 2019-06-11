var fs = require("fs");
const hostname = 'localhost';
var port = 1337;
var express = require("express");
var request = require('request');

var app = express();
app.use(express.static(__dirname + "/public")); //use static files in ROOT/public folder

const base_url='https://wolfesneck.farmos.net/farm/sensor/listener/'

// test url to use:
//'http://localhost:1337/?public_key=834c74e03901cd1702c0a3060803f767&private_key=bfe468dc77b5530d65319b67cc39cdbc&temp=14.3&moisture=23.3'


app.get("/", function(req, response){ //root dir

    response.send(req.query.public_key);
    
    console.log(req.query.public_key);
    console.log(req.query.private_key);
    console.log(req.query.temp);
    console.log(req.query.moisture);
    //console.log(Object.keys(req.params).length);
    //console.log(req.baseUrl);
    var post_url=base_url+req.query.public_key+'?private_key='+req.query.private_key;
    console.log(post_url);

request.post(
    post_url,
    { json: { 'temp': req.query.temp,'moisture':req.query.moisture } },
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


