var request = require('request');


var options = {
  uri: 'https://wolfesneck.farmos.net/farm/sensor/listener/834c74e03901cd1702c0a3060803f767?private_key=bfe468dc77b5530d65319b67cc39cdbc',
  method: 'POST',
  json: {
    "temp": "12.3"
  }
};

request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log('success') // Print the shortened url.
  }
});

