const Studio = require('../models/studio')
const User = require('../models/user')
const Project = require('../models/project')

// crear newwww studio

const creatstudio = async (req, res) => {
  try {
    const { name, participants, owner, location, works, exhibitions } = req.body
    // verifico si existe owner
    const chekStudio = await Studio.findOne({ name })
    if (chekStudio) {
      return res.status(404).json({ message: 'ESTE studio YA EXISTE' })
    }
    const newStudio = new Studio({
      name,
      participants,
      owner,
      location,
      works,
      exhibitions
    })
    const savedStudio = await newStudio.save()
    return res.status(201).json({
      message: 'OK STUDIO CREADO',
      studio: savedStudio
    })
  } catch (error) {
    return res.status(500).json({ message: 'NO CREATE STUDIO' })
  }
}

// get it all

const getAllStudios = async (req, res) => {
  try {
    const studios = await Studio.find()
      .populate('owner', 'name email')
      .populate('participants', 'name email')
    return res.status(200).json(studios)
  } catch (error) {
    return res.status(500).json({ message: 'NOT GET ALL STUDIOS' })
  }
}

//studio x ID

const getStudioId = async (req, res) => {
  try {
    const { id } = req.params
    const studioId = await Studio.findById(id)
      .populate('owner', 'name email')
      .populate('participants', 'name email')
      .populate('works', 'name description')

    if (!studioId) {
      return res.status(404).json({ message: 'NO STUDIO FOUND' })
    }
    return res.status(200).json(studioId)
  } catch (error) {
    return res.status(500).json({ message: 'NO STUDIO BY ID' })
  }
}

//actualizar un studio // NECESITARE REPASO DE CHAT DE ESTE POPULATE NEN Y DE TODOS

const updatstudio = async (req, res) => {
  try {
    const { id } = req.params

    const actuStudio = await Studio.findByIdAndUpdate(id, req.body, {
      new: true
    })
      .populate('owner', 'name email')
      .populate('participants', 'name email')
      .populate('works', 'name description')

    if (!actuStudio) {
      return res.status(404).json({ message: 'STU NO FOUND' })
    }

    return res.status(200).json({ message: 'OK ACTU STU', studio: actuStudio })
  } catch (error) {
    return res.status(500).json({ message: 'ERR ACT STU' })
  }
}

// delete studio

const deletstudio = async (req, res) => {
  try {
    const { id } = req.params
    const elimStu = await Studio.findByIdAndDelete(id)
    if (!elimStu) {
      return res.status(404).json({ message: 'NO FOUND STUDIO' })
    }

    await User.updateMany(
      { studios: elimStu._id },
      { $pull: { studios: elimStu._id } }
    )
    //eliminar referencias de projects
    await Project.updateMany({ studio: elimStu._id }, { studio: null })
    return res.status(200).json({ message: 'OK DELETE STU', studio: elimStu })
  } catch (error) {
    return res.status(500).json({ message: 'NO POSIBLE DELETE STUDIO' })
  }
}

module.exports = {
  creatstudio,
  getAllStudios,
  getStudioId,
  updatstudio,
  deletstudio
}
