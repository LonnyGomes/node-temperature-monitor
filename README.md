# node-temperature-monitor

A NodeJS app that monitors temperature and humidity on a DHT-based hardware sensor on a raspberry pi.

This node app interfaces with the [home base](https://github.com/LonnyGomes/home_base) REST api to log data at set intervals.

## Build

This module depends needs to communicate with the GPIO pins on the [BCM2835 chip](https://www.raspberrypi.org/documentation/hardware/raspberrypi/bcm2835/README.md). You must install an userland interface availabe [here](http://www.airspayce.com/mikem/bcm2835/).

After building and installing the `bcm2835` C interface, run `npm install` in top level of the project and confirm the library was found.

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
npm start
```
