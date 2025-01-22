const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    console.log('usuario es admin OK')
    return next() // si es admin continuara
  }
  return res.status(403).json({ message: 'ONLY ADMIN' })
}
module.exports = { isAdmin }
