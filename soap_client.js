var soap = require('soap');
var url = 'http://peoplecouter-webservice.herokuapp.com/wsdl?wsdl';
var args1 = { old_movie_name: "The Dark Knight", new_movie_name: "The Dark Knight2" };
var args2 = { movie_name: "The Dark Knight", director: "Christopher Nolan" };
var args3 = { movie_name: "Immortals", director: "Christopher Nolan" };
var args4 = { movie_name: "MOVIENAME", director: "DIRECTOR", year: "2016", genre: "GERNE", star: "STAR" };

  soap.createClient(url, function (err, client) {
      /*client.updateMovie(args1, function (err, result) { //change
          console.log(result.xml);
      });*/
      var args2 = { };
      client.deleteMovie(args2, function (err, result) { //remove
          console.log(result);
      });
      /*client.queryMovie(args3, function (err, result) { //query
          console.log(result.xml);
      });
      client.addMovie(args4, function (err, result) { //add
         console.log(result.xml);
      });*/
      /*var args4 = { date: getDate(), time: getTime() };

      client.addMovie(args4, function (err, result) { //add
          console.log(result.xml);
      });*/
  });

  function getDate() {

      var date = new Date();

      var year = date.getFullYear();

      var month = date.getMonth() + 1;
      month = (month < 10 ? "0" : "") + month;

      var day = date.getDate();
      day = (day < 10 ? "0" : "") + day;

      return year + ":" + month + ":" + day;

  }//http://stackoverflow.com/questions/7357734/how-do-i-get-the-time-of-day-in-javascript-node-js

  function getTime() {

      var date = new Date();

      var hour = date.getHours();
      hour = (hour < 10 ? "0" : "") + hour;

      var min = date.getMinutes();
      min = (min < 10 ? "0" : "") + min;

      var sec = date.getSeconds();
      sec = (sec < 10 ? "0" : "") + sec;

      return hour + ":" + min + ":" + sec;

  }//http://stackoverflow.com/questions/7357734/how-do-i-get-the-time-of-day-in-javascript-node-js

