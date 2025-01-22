const { verifyToken } = require('../utils/jwt')

const isAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization

    console.log('Token recibido:', token)

    if (!token) {
      return res.status(401).json({ message: 'NO OK TOKEN' })
    }

    // klean bearer
    const parseroToken = token.replace('Bearer ', '').trim()
    console.log("Token after 'Bearer':", parseroToken)

    const decoded = verifyToken(parseroToken)
    console.log('Token dykoded:', decoded)

    // decodificacion en req.useeeee
    req.user = decoded
    console.log('OK AUTH PASO NEXT MIDD')
    next() // next midd
  } catch (error) {
    console.error('Error en isAuth:', error.message)
    return res.status(401).json({ message: 'NO VALID/EXPIRED TOKEN' })
  }
}

module.exports = { isAuth }
