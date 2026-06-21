const mongoose = require('mongoose')

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  service: {
    type: String,
    default: 'Not specified'
  },
  source: {
    type: String,
    enum: ['website', 'meta', 'google'],
    required: true
  },
  campaign: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'converted'],
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})
//modal
module.exports = mongoose.model('Lead', leadSchema)