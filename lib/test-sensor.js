const readMethod = (sensorType, sensorPin, callback) => {
    const temperature = -1;
    const humidity = -1;
    if (sensorType && sensorPin) {
        callback(null, temperature, humidity);
    } else {
        callback('missing param')
    }
}

module.exports = {
    read: readMethod
};