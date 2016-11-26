var serialPort = require("serialport");
var SerialPort = serialPort.SerialPort;
var soap = require('soap');
var url = 'http://peoplecouter-webservice.herokuapp.com/wsdl?wsdl';

var count = 0;

var ThingSpeakClient = require('thingspeakclient');
var client = new ThingSpeakClient();
var yourWriteKey = 'CEYJJC3KEVHJSLQ8';
var channelID = 185903;

client.attachChannel(channelID, { writeKey: yourWriteKey }, callBackThingspeak);



var mySerial = new SerialPort("/dev/ttyACM0", {
    baudrate: 9600,
    parser: serialPort.parsers.readline("\n")
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


	mySerial.on("open", function () {
	    console.log("Port is on.");
	});
	
	mySerial.on("data", function (dados) {
		count = count +1;
		console.log(count);

	});

	setInterval(function(){
		var sent = count;
		    soap.createClient(url, function (err, client) {
		        var args4 = { date: getDate(), time: getTime(), count:sent};
		
		        client.addMovie(args4, function (err, result) { //add
		            console.log(result.xml);
		        });
		    });
	
	        client.updateChannel(channelID, { field1: getDate(),field2: getTime(),field3: sent }, function (err, resp) {
	            if (!err && resp > 0) {
	                console.log('Thingspeak update successfully. Entry number was: ' + resp);
	            }
	            else {
	                console.log(err);
	            }
	        });
		count = 0;
	},60*1000);

function callBackThingspeak(err, resp) {
    if (!err && resp > 0) {
        console.log('Successfully. response was: ' + resp);
    }
    else {
        console.log(err);
    }
}