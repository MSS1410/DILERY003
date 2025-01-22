const mongoose = require('mongoose')
const User = require('../api/models/user')

const DB_URL =
  'mongodb+srv://admin:2xPK0e2nULveJR8y@cluster003iidilery.my8zb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster003IIDILERY'

const checkUser = async () => {
  try {
    await mongoose.connect(DB_URL)
    const user = await User.findOne({ email: 'errorlog08@example.com' })
    console.log('found user:', user)
    mongoose.disconnect()
  } catch (error) {
    console.error('Error when conecting/searching user;', error.message)
  }
}
checkUser()
