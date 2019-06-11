var request = require('request');

request.post(
    'https://wolfesneck.farmos.net/farm/sensor/listener/834c74e03901cd1702c0a3060803f767?private_key=bfe468dc77b5530d65319b67cc39cdbc',
    { json: { 'temp': '22.3' } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
);
