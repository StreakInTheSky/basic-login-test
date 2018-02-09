const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
  email: {type: String, required: true},
  password: {type: String, required: true}
})

userSchema.statics.hashPassword = password => {
  return bcrypt.hash(password, 10)
}

const User = mongoose.model('User', userSchema)

module.exports = User
