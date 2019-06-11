var fs = require("fs");
const hostname = 'localhost';
var port = 1337;
var express = require("express");
var request = require('request');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static(__dirname + "/public")); //use static files in ROOT/public folder

app.use(bodyParser.json())

const send_url='https://wolfesneck.farmos.net/farm/sensor/listener/[PUBLIC_KEY]?private_key=[PRIVATE_KEY]=4.2&moisture=5.2'

app.post("/", function(req,response){
	response.status(200).send(req.body);
	console.log(req.body.temp);

    console.log(send_url);

	request.post(
    send_url,
    //{ json: { 'temp': req.body.temp,'moisture':req.body.moisture } },
 { json: { 'temp': 23.2,'moisture': 3.1 }},
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
);


});

app.get("/", function(req, response){ //root dir

    response.status(200).send(req.query.public_key);
    
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


