
  const { default: fetch } = require("node-fetch");

  // google maps, what's is here, get the coord
  const lat = -22.886073
  const lon = -43.029161

  const unit = 'si'
  const now = 'now'
  const fields = 'precipitation'
  const apikey = 'tNOoj0OypTE8tY65pbLZF02jxQ8Qf8c8'

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

  Promise.all([dataHistorical, dataPrediction]).
    then(values => Promise.all(values.map(r => r.json()))).
    then(([dataHistorical, dataPrediction]) => {
      console.log(dataHistorical, dataPrediction)
    })
