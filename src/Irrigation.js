const ewelink = require('ewelink-api');
const { default: fetch } = require("node-fetch");
const fs = require('fs');
const path = require('path');
let connection;
let devices;
let credentials;

async function setup(){

    // load credentials from file that's not uploadded in github
    // const file_path = path.join(process.cwd(), 'credentials.json');
    const file_path = path.join(process.cwd(), 'irrigation-system', 'src', 'credentials.json');

    fs.readFile(file_path, (err, data) => {
        if (err) throw err;
        credentials = JSON.parse(data);

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
    return [devices, credentials]
}
    // if devices are on, it's 

async function getRequiredWateringTime(devices, credentials){

    function irrigationTimeModel(dataHist, dataPredict){
        const precip_goal = 6
        const mmPerMinute = 0.9
        let remaining_recip = precip_goal - dataHist - dataPredict
        let timeRequired  = remaining_recip / mmPerMinute
        let minutesRequired = timeRequired % 10
        let secondsRequired = parseInt((minutesRequired + "").split(".")[1][0])
        minutesRequired < 0 ? minutesRequired = 1: 1

        let currentTime = new Date()
        currentTime.setMinutes(currentTime.getMinutes() + minutesRequired);
        currentTime.setSeconds(currentTime.getSeconds() + secondsRequired);
        
        let hour = currentTime.getHours()
        let minute = currentTime.getMinutes()
        let seconds = currentTime.getSeconds()
        let cronDate = `${seconds} ${minute} ${hour} * * *`
        return cronDate
        // the dataHist is mm for the last 6 hours
        // data predict is mm for today and tomorrow.
    }

    async function APICALL (apikey){ 
        // CLIMA CEL API, not the best for Brazil, maybe
        
        // google maps, "what's is here", get the coord
        const lat = -22.886073
        const lon = -43.029161
        
        const unit = 'si'
        const now = 'now'
        const fields = 'precipitation'
        
        let currentTime = new Date()
        let currentMinus6h = new Date()
        let tomorrow = new Date()
        
        tomorrow.setHours(tomorrow.getHours() + 24 );
        currentMinus6h.setHours(currentMinus6h.getHours() - 6);
        
        currentTime = currentTime.toISOString()
        tomorrow = tomorrow.toISOString()
        currentMinus6h = currentMinus6h.toISOString()
        
        const urlHistorical = `https://api.climacell.co/v3/weather/historical/station?lat=${lat}&lon=${lon}&unit_system=${unit}&start_time=${currentMinus6h}&end_time=${now}&fields=${fields}&apikey=${apikey}`
        const urlPrediction = `https://api.climacell.co/v3/weather/forecast/daily?lat=${lat}&lon=${lon}&unit_system=${unit}&start_time=${now}&end_time=${tomorrow}&fields=${fields}&apikey=${apikey}`
        
        let dataHistorical = fetch(urlHistorical)
        let dataPrediction = fetch(urlPrediction)
        
        let data = await Promise.all([dataHistorical, dataPrediction])
        return await Promise.all(data.map(r => r.json()))
    }

    let [dataHistorical, dataPrediction] = await APICALL(credentials.apikey)

    let initialValue = 0;
    let dataPredictionSum = dataPrediction.reduce(
        (acumulador , valorAtual) => acumulador + valorAtual.precipitation[0].max.value
        ,initialValue 
    );
    let dataHistoricalSum = dataHistorical.reduce(
        (acumulador , valorAtual) => acumulador + valorAtual.precipitation.value
        ,initialValue 
    );

    // do the proper math to define the activating deactivating call
    let wait_time = irrigationTimeModel(dataHistoricalSum, dataPredictionSum)
    console.log(wait_time)
    return [devices, wait_time]
}

async function turnOff(devices){
    
    status = await connection.setDevicePowerState(devices[1].deviceid, 'off');
    // for (device in devices){
    //     // connection.setDevicePowerState(device.deviceid, 'on');
    // }
}

exports.getRequiredWateringTime = getRequiredWateringTime
exports.setup = setup
exports.turnOff = turnOff

// async function CancelWrapper(task, devices){
//     async function returnFunction(){
//         await task(devices)
//     }
//     return returnFunction()
// }


// setup().
// then(([devices, credentials]) => getRequiredWateringTime(devices, credentials)).
// then((devices, requiredWater) => function(){CancelWrapper(turnOff, devices)})