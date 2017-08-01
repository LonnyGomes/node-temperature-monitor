var sensor = require('node-dht-sensor');
var http = require('http');

var SENSOR_TYPE = 22;
var SENSOR_PIN = 4;
var SENSOR_DEVICE_NAME = 'device_name';

function celToFahr(celsiusVal) {
    return celsiusVal * 1.8 + 32;
}

function getSensorReading() {
    return new Promise((resolve, reject) => {
        sensor.read(SENSOR_TYPE, SENSOR_PIN, (err, temperature, humidity) => {
            if (err) {
                reject({status: false, msg: err});
            } else {
                resolve({
                    status: true,
                    temperature: celToFahr(temperature),
                    humidity: humidity
                });
                // console.log(`temp: ${temperature.toFixed(1)}, humidity: ${humidity.toFixed(1)}%`);
            }
        });
    });
}

function postData(deviceName, temperature, humidity) {
    const urlPath = `/api/temperature/${deviceName}/${temperature}/${humidity}`;

    http.get({
            hostname: 'hostname',
            port: 3000,
            path: urlPath
        }, (res) => {
            //console.log('posted results');
        })
    .on('error', function (err) {
        console.log('Failed to update temperature:', err);
    });
}

function recordReading() {
    getSensorReading()
        .then((result) => {
            console.log(result.temperature, result.humidity);
            postData(SENSOR_DEVICE_NAME,
                    result.temperature.toFixed(2),
                    result.humidity.toFixed(2));
        }, (error) => {
            console.log(error);
        });
}


// start temperature loop
recordReading();
setInterval(recordReading, 1000 * 60 * 10);

