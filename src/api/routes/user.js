const express = require('express')
const {
  register,

  updateUser,
  getUsers,
  login,
  getUserId,
  deleteUser,
  cambioRole
} = require('../controllers/user')
const { isAuth } = require('../../middlewares/auth')
const { isAdmin } = require('../../middlewares/admin')

// instancia router

const router = express.Router()

// registro de usuario
router.post('/register', register)
//login
router.post('/login', login)
// id user
router.get('/:id', isAuth, getUserId)
//actualizar usuario
router.put('/:id', isAuth, updateUser)
//obtener usuarios
router.get('/', getUsers)
// eliminar
router.delete('/:id', isAuth, deleteUser)
//ROL
router.put('/:id/role', isAuth, isAdmin, cambioRole)

module.exports = router
