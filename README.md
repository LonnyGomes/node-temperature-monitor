# node-temperature-monitor

A NodeJS app that monitors temperature and humidity on a DHT-based hardware sensor on a raspberry pi.

This node app interfaces with the [home base](https://github.com/LonnyGomes/home_base) REST api to log data at set intervals.

## Usage

Copy the example config file and change the parameters

```bash
cp example.config.json config.json
vim config.json
```

| Config Name   | Description
----------------|-------------
sensorType      | DHT type ( 22 or 11 )
sensorPin       | sensor PIN used
deviceName      | device name to send to remote host
remoteHostName  | remote host that runs home base api
remotePort      | remote port of host
pollingInterval | interval to read sensor and post updates

Ensure the DHT device is properly wired to your Raspberry Pi and then start the service

```bash
npm install
npm start
```