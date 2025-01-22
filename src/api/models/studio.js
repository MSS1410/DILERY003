const mongoose = require('mongoose')

const StudioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  owner: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  works: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  location: { type: String, required: false },
  exhibitions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exhibition' }]
})

module.exports = mongoose.model('Studio', StudioSchema)
