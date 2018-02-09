const express = require('express')
const router = express.Router()
const User = require('./model')

router.post('/', (req, res, next)=>{
  const requiredFields = ['email', 'password']
  const missingField = requiredFields.find(field => !(field in req.body))

  if (missingField) {
    return next({
      status: 422,
      message: `${missingField} is required`
    })
  }

  return User
    .find({email: req.body.email})
    .then(result=>{
      if(result.length > 0){
        return Promise.reject({
          status: 422,
          message: 'A user with that email already exists'
        })
      }

      return User.hashPassword(req.body.password)
    })
    .then(hash=>{
      return User
        .create({
          email: req.body.email,
          password: hash
        })
    })
    .then(result=>{
      res.status(200).send(result.email)
    })
    .catch(err=>next(err))
})

module.exports = router
