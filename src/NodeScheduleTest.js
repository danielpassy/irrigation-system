var schedule = require('node-schedule');
const devicehandler = require('./Irrigation')


async function CancelWrapper(task, devices) {
    console.log('turning on the inner job at ' + new Date());
    async function returnFunction() {
        await task(devices)
        await jobList[1].cancel()
    }
    return returnFunction()
}


class FlexibleScheduler {

    constructor() {
        let jobList = []
        this.start()

    }

    addJob(date, instructions) {
        if (jobList.length >= 2) {
            jobList.pop()
        }
        jobList.push(jobFactory(date, instructions))
    }

    jobFactory(date, instructions) {
        return schedule.scheduleJob(date, instructions)
    }

    async CancelWrapper(task, devices) {
        console.log('turning on the inner job at ' + new Date());
        async function returnFunction() {
            await task(devices)
            await jobList[1].cancel()
        }
        return returnFunction()
    }


    start() {
        schedule.scheduleJob("32  22  *  *  *", function (fireDate) {

            console.log('turning on at ' + new Date());

            devicehandler.setup().
            then(([devices, credentials]) => devicehandler.getRequiredWateringTime(devices, credentials)).
            then((devices, requiredWater) => {
                    addJob(requiredWater, function () { CancelWrapper(devicehandler.turnOff, devices) }
                    )
            })
        })
        jobList.push(turnOn)
    }


}

async function a (a){
    return async function(a, b, c) {
        let devices = await devicehandler.setup()
        let requiredWater = await devicehandler.getRequiredWateringTime()
        await addJob(requiredWater, function () {
            CancelWrapper(devicehandler.turnOff, devices) 
        })
    }
}

module.exports = {
    foo: foo,
    bar: bar
};