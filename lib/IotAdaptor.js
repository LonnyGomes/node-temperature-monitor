const path = require('path');
const deviceModule = require('aws-iot-device-sdk').device
const TOPICS = {
    UPDATE: 'climate/update'
};

class IotAdaptor {
    constructor(config) {
        this.config = config;
    }

    _resolve(relPath) {
        return path.resolve(__dirname, '..', relPath);
    }

    connect() {
        const opts = {
            keyPath: this._resolve(this.config.privateKey),
            certPath: this._resolve(this.config.clientCert),
            caPath: this._resolve(this.config.caCert),
            host: this.config.host
        };

        // create IoT device reference
        this.device = deviceModule(opts);

        // set up listeners
        this.device
            .on('connect', function () {
                console.log('connected');
            });
        this.device
            .on('close', function () {
                console.log('closed');
            });
        this.device
            .on('reconnect', function () {
                console.log('reconnected');
            });
        this.device
            .on('offline', function () {
                console.log('offline');
            });
        this.device
            .on('error', function (error) {
                console.log('error', error);
            });
        this.device
            .on('message', function (topic, payload) {
                console.log('message', topic, payload.toString());
            });
    }

    publish(temperature, humidity) {
        const payload = JSON.stringify({
            location: this.config.deviceName,
            temperature,
            humidity,
            timestamp: new Date().getTime()
        });

        this.device.publish(TOPICS.UPDATE, payload, undefined, (err) => {
            if (err) {
                console.log('failed to submit temperature');
            } else {
                console.log('published:', payload)
            }
        })
    }
}

module.exports = IotAdaptor;