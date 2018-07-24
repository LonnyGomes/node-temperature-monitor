let sensorLib;
var http = require('http');
var fs = require('fs-extra');
const path = require('path');
const Sensor = require('./lib/Sensor');
const IotAdaptor = require('./lib/IotAdaptor');

// load different sensor module depending on platform
if (process.arch === 'arm') {
    sensorLib = require('node-dht-sensor');
} else {
    sensorLib = require('./lib/test-sensor');
}


var config;
var SENSOR_TYPE;
var SENSOR_PIN;
var SENSOR_DEVICE_NAME;
let sensor;
let iot;


function postData(deviceName, temperature, humidity) {
    const urlPath = `/api/temperature/${deviceName}/${temperature}/${humidity}`;

    http.get({
        hostname: config.remoteHostName,
        port: config.remotePort,
        path: urlPath
    }, (res) => {
        //console.log('posted results');
    })
        .on('error', function (err) {
            console.log('Failed to update temperature:', err);
        });
}

function recordReading() {
    sensor.getSensorReading()
        .then((result) => {
            console.log(result.temperature, result.humidity);
            iot.publish(
                Number(result.temperature.toFixed(2)),
                Number(result.humidity.toFixed(2)));
        }, (error) => {
            console.log(error);
        });
}

if (!fs.pathExistsSync(path.resolve(__dirname, 'config.json'))) {
    console.error(`Missing config.json file! Copy example.config.json to config.json`);
    process.exit(1);
}

config = require('./config.json');
SENSOR_TYPE = config.sensorType;
SENSOR_PIN = config.sensorPin;
SENSOR_DEVICE_NAME = config.deviceName;


sensor = new Sensor(sensorLib, SENSOR_TYPE, SENSOR_PIN);

// instantiate AWS IoT wrapper
iot = new IotAdaptor(config);
iot.connect();

// start temperature loop
recordReading();
setInterval(recordReading, config.pollingInterval);

