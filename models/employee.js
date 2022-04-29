const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  designation:{
      type: String,
      required: true
  },
  email:{
      type: String,
      required: true,
      unique: true
  },
  password:{
      type: String,
      required: true
  },
  project:{
    type:String
  }
})

module.exports = mongoose.model('Employee', employeeSchema)