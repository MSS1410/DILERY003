const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isAdmin } = require('../../middlewares/admin')

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: 8
    },
    image: { type: String, required: false },
    description: { type: String, required: true },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    studios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Studio' }],
    exhibitions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exhibition' }],
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

const User = mongoose.model('User', userSchema)
module.exports = User
