const express = require('express')
const { isAdmin } = require('../../middlewares/admin')

const {
  createProject,
  getAllProjects,
  getProjectsById,
  updateProject,
  deleteProject
} = require('../controllers/project')
const { isAuth } = require('../../middlewares/auth')

const router = express.Router()

//create Proshecto

router.post('/', isAuth, createProject)

// obtener projects

router.get('/', getAllProjects)

//Proyecto x Id

router.get('/:id', getProjectsById)

// act

router.put('/:id', isAuth, updateProject)

//deleteProject

router.delete('/:id', isAuth, isAdmin, deleteProject)

module.exports = router
