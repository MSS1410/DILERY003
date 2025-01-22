const express = require('express')
const { isAdmin } = require('../../middlewares/admin')

const {
  creatstudio,
  getAllStudios,
  updatstudio,
  deletstudio,
  getStudioId
} = require('../controllers/studio')

const { isAuth } = require('../../middlewares/auth')

const router = express.Router()

// create
router.post('/', isAuth, creatstudio)

//getfull
router.get('/', getAllStudios)

//act
router.put('/:id', isAuth, updatstudio)

//delete
router.delete('/:id', isAuth, isAdmin, deletstudio)

// by ID

router.get('/:id', getStudioId)

module.exports = router
