// let p = [
//     {
//       precipitation: { value: null, units: 'mm/hr' },
//       observation_time: { value: '2020-10-22T13:00:00.000Z' }
//     },
//     {
//       precipitation: { value: null, units: 'mm/hr' },
//       observation_time: { value: '2020-10-22T14:00:00.000Z' }
//     },
//     {
//       precipitation: { value: null, units: 'mm/hr' },
//       observation_time: { value: '2020-10-22T15:00:00.000Z' }
//     },
//     {
//       precipitation: { value: null, units: 'mm/hr' },
//       observation_time: { value: '2020-10-22T16:00:00.000Z' }
//     }
//   ]

// let future = [
//     {
//       precipitation: 
//       [
//           {
//               max: {
//                   units: 'mm/hr',
//                   value: 0.187
//               }
//           }
//         ],
//       observation_time: { value: '2020-10-22' },
//       lat: -22.886073,
//       lon: -43.029161
//     },
//     {
//         precipitation: 
//         [
//             {
//                 max: {
//                     units: 'mm/hr',
//                     value: null
//                 }
//             }
//         ],
//       observation_time: { value: '2020-10-23' },
//       lat: -22.886073,
//       lon: -43.029161
//     }
//   ]
  


// var valorInicial = 0;
// var soma = future.reduce(
//     (acumulador , valorAtual) => acumulador + valorAtual.precipitation[0].max.value
//     ,valorInicial 
// );

// console.log(soma) // loga 6

let timeRequired = 10.3
console.log((timeRequired - timeRequired % 10)*10)
var n = -2.50999974435; 
let decimal = (n + "").split(".")[1][0];
console.log((parseInt(decimal)))