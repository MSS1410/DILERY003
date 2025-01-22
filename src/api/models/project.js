const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  raitings: [Number],
  comments: [String],
  postDate: { type: Date, required: true },
  studio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Studio',
    required: true
  },
  exhibitions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exhibition' }],
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

module.exports = mongoose.model('Project', ProjectSchema)
