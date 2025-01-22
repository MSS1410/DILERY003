require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { users, projects, studios, exhibitions } = require('../../data/seedData')
const User = require('../../api/models/user')
const Project = require('../../api/models/project')
const Studio = require('../../api/models/studio')
const Exhibition = require('../../api/models/exhibition')

const DB_URL =
  'mongodb+srv://admin:2xPK0e2nULveJR8y@cluster003iidilery.my8zb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster003IIDILERY'

const seedDatabase = async () => {
  try {
    console.log('CONECTING to MongoDB...')
    await mongoose.connect(DB_URL)
    console.log('OK CONNECT MongoDB')

    // KLEAN COLECTION
    console.log('KLEAN colect...')
    await User.deleteMany({})
    await Project.deleteMany({})
    await Studio.deleteMany({})
    await Exhibition.deleteMany({})
    console.log('Colect Kleaned')

    // INSERTTIONE DATTI
    console.log('INSERTANDO USERS...')
    await User.insertMany(users)
    console.log(`Usuarios inserts: ${users.length}`)

    console.log('Insertando PROJECTS...')
    await Project.insertMany(projects)
    console.log(`projects inserts: ${projects.length}`)

    console.log('pulliiing STUDIOS...')
    await Studio.insertMany(studios)
    console.log(`studios on da wall: ${studios.length}`)

    console.log('Insertando EXPOS...')
    await Exhibition.insertMany(exhibitions)
    console.log(`Expos readys: ${exhibitions.length}`)

    console.log('Seed al toque ')
  } catch (error) {
    console.error('C Quebro el seed:', error)
  } finally {
    mongoose.disconnect()
    console.log('OFF SET  MongoDB')
  }
}

seedDatabase()
