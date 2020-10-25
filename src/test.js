// const devicehandler = require('./Irrigation')


// devicehandler.setup().
// then(([devices, credentials]) => devicehandler.getRequiredWateringTime(devices, credentials)).
// then((devices, requiredWater) => {addJob(requiredWater, turnOff(devices))})


// // then((devices, credentials) 
// // it should be 2 arguments but it's returning one argument that's an array (inside devices)
// // check to see array descontruction

// class a {
//     constructor(){
//         this.print = this.print.bind(this)
//     }

//     funcExecutor(funct){
//         funct()
//     }

//     print(){
//         console.log("hi")
//     }
// }


// let b = new a
// b.funcExecutor(() => print())


function hello(a, b, c){
    console.log(a, b, c)
}

function example(afunction, args){
    afunction(...args)
  }

let a = [1,2,3,4,5]
let arrayTest = a.map(function(x){return 1})
console.log(arrayTest)
