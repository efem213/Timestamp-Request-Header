# FreeCodeCamp
#### Back End Development and APIs Projects 
---

Timestamp Microservice & Request Header Parser Microservice.

All tests passed.

#### Try it out!

If you want to try the converter, open [this link on Heroku](https://back-end-projects-efe.herokuapp.com/).

#### Test the app

To test the app, just run ```npm test``` (after ```npm i```, of course).

---

##### Timestamp Microservice Requirements:

 - You should provide your own project, not the example URL.

 - A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds

 - A request to /api/:date? with a valid date should return a JSON object with a utc key that is a string of the input date in the format: Thu, 01 Jan 1970 00:00:00 GMT

 - A request to /api/1451001600000 should return { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }

 - Your project can handle dates that can be successfully parsed by new Date(date_string)

 - If the input date string is invalid, the api returns an object having the structure { error : "Invalid Date" }

 - An empty date parameter should return the current time in a JSON object with a unix key

 - An empty date parameter should return the current time in a JSON object with a utc key

##### [FreeCodeCamp TimestampMicroservice Challange Page](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/timestamp-microservice)

---

##### Request Header Parser Microservice Requirements:


 - You should provide your own project, not the example URL.

 - A request to /api/whoami should return a JSON object with your IP address in the ipaddress key.

 - A request to /api/whoami should return a JSON object with your preferred language in the language key.

 - A request to /api/whoami should return a JSON object with your software in the software key.


##### [Request Header Parser Microservice Challange Page](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/request-header-parser-microservice)



---

[EFE AKPULLUKCU](https://twitter.com/SoftwareLoading)