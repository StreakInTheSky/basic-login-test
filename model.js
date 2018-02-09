const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
  email: {type: String, required: true},
  password: {type: String, required: true}
})

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10)
}

const User = mongoose.model('User', userSchema)

module.exports = User
