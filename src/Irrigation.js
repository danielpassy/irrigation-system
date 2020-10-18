const ewelink = require('ewelink-api');
let connection;
let devices;
const fs = require('fs');
var path = require('path');

//eventually build ontop of this API to manipulate when to activate
let WeatherApi = require('./previsao')


async function setup(){

    // load credentials from file that's not uploadded in github
    const file_path = path.join(process.cwd(), 'credentials.json');


    fs.readFile(file_path, (err, data) => {
        if (err) throw err;
        let credentials = JSON.parse(data);

    });


    // connect to my account 
    // Our region is US, btw 
    connection = new ewelink({
        email: 'daniel.passy@gmail.com',
        password: '123456789aaa',
        region: 'us'
    });

    // get devices data
    const devices = await connection.getDevices();
    for (device in devices) {
        console.log(devices[device].name,  " is currently ", devices[device].params.switch)
    }

    // functions goes here
    activate()
    
}

async function activate(){
    // activate the device[1], wait 5 seconds, than turn it off

    let status = await connection.setDevicePowerState(devices[1].deviceid, 'on');
    console.log(status)

    // this is the 'sleep' equivalent in javascript
    await new Promise(r => setTimeout(r, 5000)); 
    status = await connection.setDevicePowerState(devices[1].deviceid, 'off');
    console.log(status)
}


setup()



