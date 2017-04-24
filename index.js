const express = require('express')
const app = express()
const fetchData = require('./fetchData')

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  fetchData()
    .then(data => {
      res.render('index', { data: data })
    })
})

app.listen(3030, () => {
  console.log('Listening on port 3030...')
})
