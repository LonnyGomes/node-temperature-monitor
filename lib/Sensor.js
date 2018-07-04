class Sensor {
    constructor(sensor, sensorType, sensorPin) {
        this.sensor = sensor;
        this.sensorType = sensorType;
        this.sensorPin = sensorPin;
    }

    /**
     * Converts celsius to fahrenheit
     * @param {number} celsiusVal
     * @returns {number} converted value
     */
    celToFahr(celsiusVal) {
        return celsiusVal * 1.8 + 32;
    }

    /**
     * Retrieve reading from sensor
     * @param {number} precision - optional parameter to return
     * @returns {Promise} object with status, temperature, and humidity values
     */
    getSensorReading(precision) {
        return new Promise((resolve, reject) => {
            this.sensor.read(this.sensorType, this.sensorPin, (err, temperature, humidity) => {
                if (err) {
                    reject({ status: false, msg: err });
                } else {
                    resolve({
                        status: true,
                        temperature: this.celToFahr(temperature),
                        humidity: humidity
                    });
                    // console.log(`temp: ${temperature.toFixed(1)}, humidity: ${humidity.toFixed(1)}%`);
                }
            });
        });
    }
}

module.exports = Sensor;