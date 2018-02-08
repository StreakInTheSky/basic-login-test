const express = require('express')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const app = express()

app.use(express.static('public'))

app.listen(process.env.PORT || 8080, ()=> console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`))
