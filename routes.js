const express = require('express')
const router = express.Router()
const User = require('./model')

router.post('/', (req, res, next)=>{
  console.log(req.body)
})

module.exports = router
