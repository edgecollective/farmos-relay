var fs = require("fs");
const hostname = 'localhost';
var port = 1337;
var express = require("express");
var request = require('request');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static(__dirname + "/public")); //use static files in ROOT/public folder

app.use(bodyParser.json())

const base_url='https://edgecollective.farmos.net/farm/sensor/listener/'

const public_key='d57fa2bd03e20408d17eb1d5ee58c9d6'
const private_key='edac3534c121c8d241719a2ba853acd3'

// test url to use:
//'http://localhost:1337/?public_key=[PUBLIC_KEY]&private_key=[PRIVATE_KEY]&temp=14.3&moisture=23.3'

// TTN Decoder for TTN OTAA Feather US915 DHT22 Sketch
// Link: https://github.com/mcci-catena/arduino-lmic/blob/master/examples/ttn-otaa-feather-us915-dht22/ttn-otaa-feather-us915-dht22.ino
function Decoder(bytes, port) {
    // Decode an uplink message from a buffer
    // (array) of bytes to an object of fields.
    var decoded = {};
    
    // temperature 
   
    rawTemp = bytes[0] + bytes[1] * 256;
    
    decoded.degreesC = sflt162f(rawTemp) * 100;
    
    // humidity 
    rawHumid = bytes[2] + bytes[3] * 256;
    decoded.humidity = sflt162f(rawHumid) * 100;
    
    return decoded;
  }
   
  function sflt162f(rawSflt16)
      {
      // rawSflt16 is the 2-byte number decoded from wherever;
      // it's in range 0..0xFFFF
      // bit 15 is the sign bit
      // bits 14..11 are the exponent
      // bits 10..0 are the the mantissa. Unlike IEEE format, 
      // 	the msb is transmitted; this means that numbers
      //	might not be normalized, but makes coding for
      //	underflow easier.
      // As with IEEE format, negative zero is possible, so
      // we special-case that in hopes that JavaScript will
      // also cooperate.
      //
      // The result is a number in the open interval (-1.0, 1.0);
      // 
      
      // throw away high bits for repeatability.
      rawSflt16 &= 0xFFFF;
   
      // special case minus zero:
      if (rawSflt16 == 0x8000)
          return -0.0;
   
      // extract the sign.
      var sSign = ((rawSflt16 & 0x8000) != 0) ? -1 : 1;
      
      // extract the exponent
      var exp1 = (rawSflt16 >> 11) & 0xF;
   
      // extract the "mantissa" (the fractional part)
      var mant1 = (rawSflt16 & 0x7FF) / 2048.0;
   
      // convert back to a floating point number. We hope 
      // that Math.pow(2, k) is handled efficiently by
      // the JS interpreter! If this is time critical code,
      // you can replace by a suitable shift and divide.
      var f_unscaled = sSign * mant1 * Math.pow(2, exp1 - 15);
   
      return f_unscaled;
      }
      
app.post("/", function(req,response){
	response.status(200).send(req.body);
	//console.log(req.body.temp);

	//var post_url=base_url+req.body.public_key+'?private_key='+req.body.private_key;
	var post_url=base_url+public_key+'?private_key='+private_key;

    console.log(post_url);

    //console.log(req.body.object.DecodeDataString)

    var myvar = req.body.object.DecodeDataString
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


