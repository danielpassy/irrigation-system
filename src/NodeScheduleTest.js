var schedule = require('node-schedule');
const devicehandler = require('./Irrigation')
let jobList = []

function jobFactory(date, instructions){
    return schedule.scheduleJob(date, instructions)
}

function addJob(date, instructions){
    if (jobList.length>=2){
        jobList.pop()
    }
    jobList.push(jobFactory(date, instructions))
}
async function CancelWrapper(task, devices){
    console.log('turning on the inner job at ' + new Date());
    async function returnFunction(){
        await task(devices)
        await jobList[1].cancel()
    }
    return returnFunction()
}



var turnOn = schedule.scheduleJob("32  22  *  *  *", function(fireDate){

    console.log('turning on at ' + new Date());
    devicehandler.setup().
    then(([devices, credentials]) => devicehandler.getRequiredWateringTime(devices, credentials)).
    then((devices, requiredWater) => {
        addJob(requiredWater, function(){CancelWrapper(devicehandler.turnOff, devices)}
    )})

})

jobList.push(turnOn)    

