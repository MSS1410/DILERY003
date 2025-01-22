const mongoose = require('mongoose')

const ExhibitionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  organizers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  exhibitors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  location: { type: String, required: false }
})

module.exports = mongoose.model('Exhibition', ExhibitionSchema)
