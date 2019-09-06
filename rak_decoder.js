var fs = require("fs");
const hostname = 'localhost';
var port = 1337;
var express = require("express");
var request = require('request');
var bodyParser = require('body-parser');
var decoder = require('./decoder');
var app = express();
app.use(express.static(__dirname + "/public")); //use static files in ROOT/public folder

app.use(bodyParser.json())

const base_url='https://edgecollective.farmos.net/farm/sensor/listener/'

const public_key='d57fa2bd03e20408d17eb1d5ee58c9d6'
const private_key='edac3534c121c8d241719a2ba853acd3'

// test url to use:
//'http://localhost:1337/?public_key=[PUBLIC_KEY]&private_key=[PRIVATE_KEY]&temp=14.3&moisture=23.3'

var tempBytes = new Buffer([0x09,0x92,0xe4,0x0c])

//console.log(decoder.temperature(tempBytes.slice(0,0+2)))

console.log(decoder.decode(tempBytes,[decoder.temperature,decoder.humidity],['temp','humidiy']));

app.post("/", function(req,response){
	response.status(200).send(req.body);
	//console.log(req.body.temp);

	//var post_url=base_url+req.body.public_key+'?private_key='+req.body.private_key;
	var post_url=base_url+public_key+'?private_key='+private_key;

    console.log(post_url);

    //console.log(req.body.object.DecodeDataString)

    var myvar = req.body.object.DecodeDataString
    var myvar = "0x09,0x92,0x00";
    console.log(decoder.temperature(bytes.slice(x,x+2)))


    var tempBytes = new Buffer([0x09,0x92,0xe4,0x0c])

//console.log(decoder.temperature(tempBytes.slice(0,0+2)))

console.log(decoder.decode(tempBytes,[decoder.temperature,decoder.humidity],['temp','humidiy']));



	//var myvar = String('hello');

	console.log(myvar);

	request.post(
    post_url,
    //{ json: { 'temp': 23.,'moisture':32. } },
    { json: { 'temp': 18, 'moisture':myvar } },  
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


