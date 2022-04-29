const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  startDate: {
      type: Date
  },
  endDate:{
      type: Date
  },
  projectManager:{
      type: String
  },
  projectManagerEmail:{
      type: String
  },
  employees:{
      type: Array
  }
})

module.exports = mongoose.model('Project', projectSchema)