const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const routes = require('routes')

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use('/', routes)

// error handling
app.use((err, req, res, next)=>{
  console.error(err.message)
  res.status(err.status || 500).send(err.message)
})

mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost/basic-login-test', (err)=>{
  if (err) {
    console.error(err)
  } else {
    console.log('connected to db')
  }
})

app.listen(process.env.PORT || 8080, ()=> console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`))
  .on('error', err=>{
    mongoose.disconnect();
    console.error(err)
  })
