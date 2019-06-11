to use get:

http://mosspig.club/?public_key=[PUBLIC_KEY]&private_key=[PRIVATE_KEY]&temp=33.3&moisture=33.3

to use post:

curl -H "Content-Type: application/json" -X POST -d '{ "public_key": "[PUBLIC_KEY]","private_key":"[PRIVATE_KEY]", "temp": 76.5,"moisture":3.3 }' http://mosspig.club

