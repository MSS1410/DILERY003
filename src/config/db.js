const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    console.log('Conectando a MongoDB...')
    await mongoose.connect(process.env.DB_URL)
    console.log('OK LINK ---> BBDD')
  } catch (error) {
    console.error('NO LINK ---> BBDD', error)
    process.exit(1)
  }
}
module.exports = connectDB
