var schedule = require('node-schedule');
const devicehandler = require('./Irrigation')


class FlexibleScheduler {

    constructor(task, endingTask) {
        // task is a dictionary containings 
        // "task" - an array of function to be execute
        // "args" - arguments for those functions
        // an argument can be the return value of the function before it.
        // then, it this case, it should be an exact string of its return name 
        // Ending task should be also a dictionary, with the last execution
        this.jobList = []
        this.task = task
        this.start()
    }

    async CancelWrapper(task, ...args) {
        console.log('turning on the inner job at ' + new Date());
        async function returnFunction() {
            await task(args)
            await jobList[1].cancel()
        }
        return returnFunction()
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

    start() {
        let turnOn = schedule.scheduleJob("32  22  *  *  *", async function () {
            // execute each function in order using the arguments as provided
            // To do
            // save the results in a variable in an array of the same size as the task array
            // let argumentsOutput = task['tasks'].map(function(x){return 1})
            // finally call the 
        })
        thijobList.push(turnOn)
    }
}

let structure = {functions: [1,2,3],
    arguments: [2,3,4]}


module.exports = {
    foo: foo,
    bar: bar
};