const express = require('express')
const { isAdmin } = require('../../middlewares/admin')

const {
  createExpo,
  getAllExhibitions,
  getExpoId,
  updateExhibition,
  deleteExhibition
} = require('../controllers/exhibition')
const { isAuth } = require('../../middlewares/auth')
const { is } = require('express/lib/request')

const router = express.Router()

//create
router.post('/', isAuth, createExpo)

// getFull
router.get('/', getAllExhibitions)

//ID
router.get('/:id', getExpoId)

//act

router.put('/:id', isAuth, updateExhibition)
//delete

router.delete('/:id', isAuth, isAdmin, deleteExhibition)

module.exports = router
