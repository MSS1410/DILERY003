require('dotenv').config()
const express = require('express')

const connectDB = require('./config/db')

// importo rutas
const userRoutes = require('./api/routes/user')
const projectRoutes = require('./api/routes/project')
const studioRoutes = require('./api/routes/studio')
const exhibitionRoutes = require('./api/routes/exhibition')

// connectar bd

connectDB()

//instancia
const app = express()
const PORT = process.env.PORT || 5000

//midleuare

app.use(express.json())

// check body

app.use((req, res, next) => {
  console.log('Received body before controller:', req.body)
  next()
})
// dispo routes principalle

app.use('/Dilery/users', userRoutes)
app.use('/Dilery/projects', projectRoutes)
app.use('/Dilery/studios', studioRoutes)
app.use('/Dilery/exhibitions', exhibitionRoutes)

//midd para routinhas never found

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url} - Body:`, req.body)
  next()
})

app.use((req, res, next) => {
  res.status(404).json({ message: '...DILERY - [Auth] Digital Gallery...' })
})
//para 500
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'ERROR INTERNO' })
})

//INIZIALIUZAR SERVEEE

app.listen(PORT, () => {
  console.log(`Dilery funcionando en http://localhost:${PORT} `)
})
