const User = require('../models/user')
const bcrypt = require('bcrypt')
const { generateToken } = require('../../utils/jwt')

const register = async (req, res) => {
  try {
    const { name, email, password, description, image } = req.body

    const userExist = await User.findOne({ email })
    if (userExist) {
      return res.status(400).json('este email ya esta registrado')
    }

    console.log('Pasword received in register:', password)

    // const hashisPassword = await bcrypt.hash(password, 10)
    // const isMatch = await bcrypt.compare(password, hashisPassword)
    // console.log('Hash compare:', isMatch)
    // console.log('String Pasword:', password)
    // console.log('encripted password:', hashisPassword)
    // creo nuevo user
    const newUser = new User({
      name,
      email,
      password,
      description,
      image
    })
    // guardamos usuario en bbdd
    const savedUser = await newUser.save()
    console.log('Registered user;', savedUser)
    // genero tok
    const token = generateToken({
      id: savedUser._id,
      role: savedUser.role,
      email: savedUser.email
    })

    return res.status(201).json({
      message: 'OK Usuario registrado',
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email
      },
      token
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'NO REGISTER' })
  }
}

// logeeeeee

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    // verifik usuario existente
    console.log('email received:', email)
    console.log('password received:', password)
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'NO USER NO LOG' })
    }
    console.log('sent password:', password)
    console.log('pasword bbdd:', user.password)
    // verificar password
    const pswrdOK = await bcrypt.compare(password, user.password)
    console.log(' bcrypt.compare results:', pswrdOK)
    if (!pswrdOK) {
      return res.status(401).json({ message: 'NO OK CREDENCIALS' })
    }

    ///generar token
    const token = generateToken({
      id: user._id,
      role: user.role,
      email: user.email
    })

    return res.status(200).json({
      message: 'OK LOGG',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'NO OK LOGG, CHECK PSWRD' })
  }
}

// funcion para encontrar perfil por id

const getUserId = async (req, res) => {
  try {
    const { id } = req.params
    console.log('ID recibido:', id)
    const user = await User.findById(id).select('-passdword') // asi excluimos el campo de la contra (-)
    if (!user) {
      return res.status(404).json({ message: 'CANT FOUND USER' })
    }
    return res.status(200).json(user)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'NO OK FIND USER BY ID' })
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id
    const userRole = req.user.role
    // solo si es admin o si es su propia account
    if (userId !== id && userRole !== 'admin') {
      return res.status(403).json({ message: 'Denied permission' })
    }
    const eliminadoUser = await User.findByIdAndDelete(id)
    if (!eliminadoUser) {
      return res.status(400).json({ message: 'NO FIND USER TO DELET' })
    }
    return res
      .status(200)
      .json({ message: 'OK DELETE USER', user: eliminadoUser })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'CANNOT DELETE USER' })
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    return res.status(200).json(users)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'CANNOT GET USERS' })
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { role, actualizables } = req.body

    // posible cambio de password

    if (role) {
      return res.status(403).json({ message: 'Cannot change your role' })
    }

    const actutzUser = await User.findByIdAndUpdate(id, actualizables, {
      new: true
    }).select('-password')
    if (!actutzUser) {
      return res.status(400).json({ message: 'NO OK ACT' })
    }
    return res.status(200).json({ message: 'OK ACT', user: actutzUser })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'ERROR ACT USER' })
  }
}

const cambioRole = async (req, res) => {
  try {
    const { id } = req.params
    const { role } = req.body
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'ONLY ADMNIN' })
    }

    const userActud = await User.findByIdAndUpdate(id, { role }, { new: true })
    if (!userActud) {
      return res.status(400).json({ message: 'NO OK USER FIND' })
    }
    return res.status(200).json({
      message: 'OK ACT ROLE',
      user: 'userActud'
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'NO OK ROLE ACT' })
  }
}
module.exports = {
  register,
  deleteUser,
  updateUser,
  getUsers,
  login,
  getUserId,
  cambioRole
}
